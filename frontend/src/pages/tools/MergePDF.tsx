import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Description as FileIcon,
  ArrowUpward as MoveUpIcon,
  ArrowDownward as MoveDownIcon,
  Merge as MergeIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import ProcessingStatus, { ProcessStatus } from '../../components/ProcessingStatus';
import axios from 'axios';

const MergePDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string>('');

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
  };

  const handleFileRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMoveFile = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === files.length - 1)
    ) {
      return;
    }

    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    setStatus('processing');
    setProgress(0);

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/api/merge-pdf', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.loaded / progressEvent.total * 100;
          setProgress(progress);
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setResultUrl(url);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.error('Error merging PDFs:', error);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement('a');
      link.href = resultUrl;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Merge PDF Files
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Combine multiple PDF files into a single document. Drag and drop your
          files below and arrange them in the desired order.
        </Typography>
      </Box>

      <FileUpload
        files={files}
        onFilesSelected={handleFilesSelected}
        onFileRemove={handleFileRemove}
        maxFiles={10}
        acceptedFileTypes={['application/pdf']}
        maxFileSize={50 * 1024 * 1024} // 50MB
      />

      {files.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              File Order
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Drag files to reorder them or use the arrows to move them up/down.
              Files will be merged in this order.
            </Typography>
            <List>
              {files.map((file, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="move up"
                          onClick={() => handleMoveFile(index, 'up')}
                          disabled={index === 0}
                        >
                          <MoveUpIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="move down"
                          onClick={() => handleMoveFile(index, 'down')}
                          disabled={index === files.length - 1}
                        >
                          <MoveDownIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      <FileIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<MergeIcon />}
          onClick={handleMerge}
          disabled={files.length < 2 || status === 'processing'}
        >
          Merge PDFs
        </Button>
        {status === 'success' && (
          <Button
            variant="contained"
            size="large"
            color="success"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Download Result
          </Button>
        )}
      </Box>

      <ProcessingStatus
        status={status}
        progress={progress}
        message={status === 'processing' ? 'Merging PDF files...' : undefined}
      />
    </Container>
  );
};

export default MergePDF;