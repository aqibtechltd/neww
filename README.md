# PDF Tools Website

A comprehensive web application for manipulating PDF files with a modern, user-friendly interface. This application provides various PDF tools including merging, splitting, conversion, compression, and more.

## Features

- PDF Merging
- PDF Splitting
- PDF to Word Conversion
- Word to PDF Conversion
- PDF Compression
- PDF Protection
- PDF Unlocking
- PDF to Image Conversion
- Image to PDF Conversion
- PDF Rotation
- PDF Watermarking
- PDF Text Extraction
- PDF Metadata Editing
- PDF Form Filling
- PDF Digital Signing
- PDF Page Reordering
- PDF Page Deletion

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for UI components
- React Router for navigation
- Zustand for state management
- Axios for API requests
- PDF.js for PDF rendering
- React Dropzone for file uploads

### Backend
- Node.js with Express
- TypeScript
- PDF-lib for PDF manipulation
- Sharp for image processing
- Multer for file uploads
- Winston for logging

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-tools-website
```

2. Install dependencies:
```bash
npm run install:all
```

3. Create environment files:

Create `.env` file in the backend directory:
```env
PORT=3001
NODE_ENV=development
```

## Development

1. Start the development servers:
```bash
npm start
```

This will start both the frontend and backend servers:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

2. For individual development:

Frontend only:
```bash
npm run start:frontend
```

Backend only:
```bash
npm run start:backend
```

## Building for Production

1. Build the frontend:
```bash
npm run build
```

2. The built files will be in the `frontend/build` directory

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── package.json
```

## API Endpoints

### PDF Operations
- `POST /api/merge-pdf`: Merge multiple PDF files
- `POST /api/split-pdf`: Split PDF into multiple files
- `POST /api/convert-pdf`: Convert PDF to other formats
- `POST /api/compress-pdf`: Compress PDF file
- `POST /api/protect-pdf`: Add password protection to PDF
- `POST /api/unlock-pdf`: Remove PDF password protection
- `POST /api/pdf-to-image`: Convert PDF to images
- `POST /api/image-to-pdf`: Convert images to PDF
- `POST /api/rotate-pdf`: Rotate PDF pages
- `POST /api/watermark-pdf`: Add watermark to PDF
- `POST /api/extract-text`: Extract text from PDF
- `POST /api/edit-metadata`: Edit PDF metadata
- `POST /api/fill-form`: Fill PDF forms
- `POST /api/sign-pdf`: Add digital signature to PDF
- `POST /api/reorder-pages`: Reorder PDF pages
- `POST /api/delete-pages`: Delete pages from PDF

## Security Considerations

- File size limits enforced
- Temporary file cleanup
- Rate limiting implemented
- CORS configured
- Helmet.js for security headers
- No persistent storage of user files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details