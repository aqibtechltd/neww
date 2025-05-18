import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  AlertTitle,
  Paper,
} from '@mui/material';

export type ProcessStatus = 'idle' | 'processing' | 'success' | 'error';

interface ProcessingStatusProps {
  status: ProcessStatus;
  progress?: number;
  message?: string;
  error?: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  status,
  progress = 0,
  message = '',
  error = '',
}) => {
  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress
              variant={progress > 0 ? 'determinate' : 'indeterminate'}
              value={progress}
              size={48}
            />
            <Typography variant="h6" color="text.secondary">
              {message || 'Processing...'}
            </Typography>
            {progress > 0 && (
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(progress)}%`}
              </Typography>
            )}
          </Box>
        );

      case 'success':
        return (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {message || 'Operation completed successfully!'}
          </Alert>
        );

      case 'error':
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error || 'An error occurred during processing.'}
          </Alert>
        );

      default:
        return null;
    }
  };

  return status !== 'idle' ? (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 120,
      }}
    >
      {renderContent()}
    </Paper>
  ) : null;
};

export default ProcessingStatus;