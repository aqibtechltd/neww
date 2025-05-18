import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { PDFDocument, degrees } from 'pdf-lib';
import sharp from 'sharp';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Helper function to read PDF file
async function readPDF(filePath: string) {
  try {
    const pdfBytes = await fs.promises.readFile(filePath);
    return await PDFDocument.load(pdfBytes);
  } catch (error) {
    throw new AppError('Error reading PDF file', 400);
  }
}

// Helper function to save PDF file
async function savePDF(doc: PDFDocument, outputPath: string) {
  try {
    const pdfBytes = await doc.save();
    await fs.promises.writeFile(outputPath, pdfBytes);
    return outputPath;
  } catch (error) {
    throw new AppError('Error saving PDF file', 500);
  }
}

// Merge PDFs
export const mergePDF = async (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length < 2) {
    throw new AppError('Please provide at least 2 PDF files', 400);
  }

  const mergedPdf = await PDFDocument.create();
  
  for (const file of req.files) {
    const pdf = await readPDF(file.path);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const outputPath = path.join(req.app.locals.uploadDir, 'merged.pdf');
  await savePDF(mergedPdf, outputPath);

  // Cleanup uploaded files
  req.files.forEach(file => fs.unlinkSync(file.path));

  res.download(outputPath, 'merged.pdf', (err) => {
    if (err) logger.error('Error sending merged PDF:', err);
    fs.unlinkSync(outputPath);
  });
};

// Split PDF
export const splitPDF = async (req: Request, res: Response) => {
  if (!req.file) throw new AppError('Please provide a PDF file', 400);
  if (!req.body.pages) throw new AppError('Please specify pages to split', 400);

  const pdf = await readPDF(req.file.path);
  const pageRanges = req.body.pages.split(',').map((range: string) => {
    const [start, end] = range.split('-').map(Number);
    return { start: start - 1, end: end || start - 1 };
  });

  const outputPath = path.join(req.app.locals.uploadDir, 'split.pdf');
  const newPdf = await PDFDocument.create();

  for (const range of pageRanges) {
    const pages = await newPdf.copyPages(pdf, 
      Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i));
    pages.forEach(page => newPdf.addPage(page));
  }

  await savePDF(newPdf, outputPath);
  fs.unlinkSync(req.file.path);

  res.download(outputPath, 'split.pdf', (err) => {
    if (err) logger.error('Error sending split PDF:', err);
    fs.unlinkSync(outputPath);
  });
};

// Rotate PDF
export const rotatePDF = async (req: Request, res: Response) => {
  if (!req.file) throw new AppError('Please provide a PDF file', 400);
  if (!req.body.angle) throw new AppError('Please specify rotation angle', 400);

  const pdf = await readPDF(req.file.path);
  const angle = parseInt(req.body.angle);
  const pages = req.body.pages ? req.body.pages.split(',').map(Number) : pdf.getPageIndices();

  pages.forEach(pageNum => {
    const page = pdf.getPage(pageNum);
    page.setRotation(degrees(angle));
  });

  const outputPath = path.join(req.app.locals.uploadDir, 'rotated.pdf');
  await savePDF(pdf, outputPath);
  fs.unlinkSync(req.file.path);

  res.download(outputPath, 'rotated.pdf', (err) => {
    if (err) logger.error('Error sending rotated PDF:', err);
    fs.unlinkSync(outputPath);
  });
};

// Convert PDF to Images
export const pdfToImage = async (req: Request, res: Response) => {
  if (!req.file) throw new AppError('Please provide a PDF file', 400);

  const pdf = await readPDF(req.file.path);
  const format = req.body.format || 'png';
  const dpi = parseInt(req.body.dpi) || 300;

  // TODO: Implement PDF to image conversion using pdf2img or similar library
  throw new AppError('PDF to Image conversion not implemented yet', 501);
};

// Convert Images to PDF
export const imageToPDF = async (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    throw new AppError('Please provide at least one image file', 400);
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of req.files) {
    const image = await sharp(file.path)
      .resize(2000, 2000, { fit: 'inside' })
      .toBuffer();

    const img = file.mimetype.includes('png')
      ? await pdfDoc.embedPng(image)
      : await pdfDoc.embedJpg(image);

    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
    });
  }

  const outputPath = path.join(req.app.locals.uploadDir, 'converted.pdf');
  await savePDF(pdfDoc, outputPath);

  // Cleanup uploaded files
  req.files.forEach(file => fs.unlinkSync(file.path));

  res.download(outputPath, 'converted.pdf', (err) => {
    if (err) logger.error('Error sending converted PDF:', err);
    fs.unlinkSync(outputPath);
  });
};

// Placeholder functions for other PDF operations
// These should be implemented with appropriate PDF processing logic
export const convertPDF = async (req: Request, res: Response) => {
  throw new AppError('PDF conversion not implemented yet', 501);
};

export const compressPDF = async (req: Request, res: Response) => {
  throw new AppError('PDF compression not implemented yet', 501);
};

export const protectPDF = async (req: Request, res: Response) => {
  throw new AppError('PDF protection not implemented yet', 501);
};

export const unlockPDF = async (req: Request, res: Response) => {
  throw new AppError('PDF unlocking not implemented yet', 501);
};

export const watermarkPDF = async (req: Request, res: Response) => {
  throw new AppError('PDF watermarking not implemented yet', 501);
};

export const extractText = async (req: Request, res: Response) => {
  throw new AppError('PDF text extraction not implemented yet', 501);
};

export const editMetadata = async (req: Request, res: Response) => {
  throw new AppError('PDF metadata editing not implemented yet', 501);
};

export const fillForm = async (req: Request, res: Response) => {
  throw new AppError('PDF form filling not implemented yet', 501);
};

export const signPDF = async (req: Request, res: Response) => {
  throw new AppError('PDF signing not implemented yet', 501);
};

export const reorderPages = async (req: Request, res: Response) => {
  throw new AppError('PDF page reordering not implemented yet', 501);
};

export const deletePages = async (req: Request, res: Response) => {
  throw new AppError('PDF page deletion not implemented yet', 501);
};