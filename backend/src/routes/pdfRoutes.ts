import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../middleware/errorHandler';
import * as pdfController from '../controllers/pdfController';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, req.app.locals.uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept PDF files for most operations
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  }
  // Accept images for image-to-pdf conversion
  else if (req.path === '/image-to-pdf' && file.mimetype.startsWith('image/')) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

// PDF Operations Routes
router.post('/merge-pdf', upload.array('files'), catchAsync(pdfController.mergePDF));
router.post('/split-pdf', upload.single('file'), catchAsync(pdfController.splitPDF));
router.post('/convert-pdf', upload.single('file'), catchAsync(pdfController.convertPDF));
router.post('/compress-pdf', upload.single('file'), catchAsync(pdfController.compressPDF));
router.post('/protect-pdf', upload.single('file'), catchAsync(pdfController.protectPDF));
router.post('/unlock-pdf', upload.single('file'), catchAsync(pdfController.unlockPDF));
router.post('/pdf-to-image', upload.single('file'), catchAsync(pdfController.pdfToImage));
router.post('/image-to-pdf', upload.array('files'), catchAsync(pdfController.imageToPDF));
router.post('/rotate-pdf', upload.single('file'), catchAsync(pdfController.rotatePDF));
router.post('/watermark-pdf', upload.single('file'), catchAsync(pdfController.watermarkPDF));
router.post('/extract-text', upload.single('file'), catchAsync(pdfController.extractText));
router.post('/edit-metadata', upload.single('file'), catchAsync(pdfController.editMetadata));
router.post('/fill-form', upload.single('file'), catchAsync(pdfController.fillForm));
router.post('/sign-pdf', upload.single('file'), catchAsync(pdfController.signPDF));
router.post('/reorder-pages', upload.single('file'), catchAsync(pdfController.reorderPages));
router.post('/delete-pages', upload.single('file'), catchAsync(pdfController.deletePages));

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'PDF API is running' });
});

export default router;