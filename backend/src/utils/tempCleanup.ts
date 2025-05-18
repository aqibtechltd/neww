import fs from 'fs';
import path from 'path';
import logger from './logger';

// Maximum age of temporary files in milliseconds (30 minutes)
const MAX_FILE_AGE = 30 * 60 * 1000;

// Interval to run cleanup (every 15 minutes)
const CLEANUP_INTERVAL = 15 * 60 * 1000;

export const setupTempCleanup = (tempDir: string) => {
  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    logger.info(`Created temporary directory: ${tempDir}`);
  }

  const cleanup = () => {
    try {
      const now = Date.now();
      const files = fs.readdirSync(tempDir);

      files.forEach((file) => {
        const filePath = path.join(tempDir, file);
        const stats = fs.statSync(filePath);

        if (now - stats.mtimeMs > MAX_FILE_AGE) {
          fs.unlinkSync(filePath);
          logger.info(`Cleaned up temporary file: ${file}`);
        }
      });
    } catch (error) {
      logger.error('Error during temporary file cleanup:', error);
    }
  };

  // Run cleanup periodically
  setInterval(cleanup, CLEANUP_INTERVAL);

  // Run initial cleanup
  cleanup();

  // Clean up on process exit
  process.on('exit', () => {
    try {
      if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);
        files.forEach((file) => {
          fs.unlinkSync(path.join(tempDir, file));
        });
        fs.rmdirSync(tempDir);
        logger.info('Cleaned up temporary directory on exit');
      }
    } catch (error) {
      logger.error('Error cleaning up temporary directory on exit:', error);
    }
  });

  // Handle SIGINT and SIGTERM
  const handleExit = () => {
    process.exit(0);
  };

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);
};