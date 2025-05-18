import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeStore } from './stores/themeStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import MergePDF from './pages/tools/MergePDF';
import SplitPDF from './pages/tools/SplitPDF';
import ConvertPDF from './pages/tools/ConvertPDF';
import CompressPDF from './pages/tools/CompressPDF';
import ProtectPDF from './pages/tools/ProtectPDF';
import UnlockPDF from './pages/tools/UnlockPDF';
import PDFToImage from './pages/tools/PDFToImage';
import ImageToPDF from './pages/tools/ImageToPDF';
import RotatePDF from './pages/tools/RotatePDF';
import WatermarkPDF from './pages/tools/WatermarkPDF';
import ExtractText from './pages/tools/ExtractText';
import EditMetadata from './pages/tools/EditMetadata';
import FillForm from './pages/tools/FillForm';
import SignPDF from './pages/tools/SignPDF';
import ReorderPages from './pages/tools/ReorderPages';
import DeletePages from './pages/tools/DeletePages';

const App: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merge-pdf" element={<MergePDF />} />
            <Route path="/split-pdf" element={<SplitPDF />} />
            <Route path="/convert-pdf" element={<ConvertPDF />} />
            <Route path="/compress-pdf" element={<CompressPDF />} />
            <Route path="/protect-pdf" element={<ProtectPDF />} />
            <Route path="/unlock-pdf" element={<UnlockPDF />} />
            <Route path="/pdf-to-image" element={<PDFToImage />} />
            <Route path="/image-to-pdf" element={<ImageToPDF />} />
            <Route path="/rotate-pdf" element={<RotatePDF />} />
            <Route path="/watermark-pdf" element={<WatermarkPDF />} />
            <Route path="/extract-text" element={<ExtractText />} />
            <Route path="/edit-metadata" element={<EditMetadata />} />
            <Route path="/fill-form" element={<FillForm />} />
            <Route path="/sign-pdf" element={<SignPDF />} />
            <Route path="/reorder-pages" element={<ReorderPages />} />
            <Route path="/delete-pages" element={<DeletePages />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;