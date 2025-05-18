import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Description as FileIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface FileUploadProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesSelected,
  onFileRemove,
  maxFiles = 1,
  acceptedFileTypes = ['application/pdf'],
  maxFileSize = 100 * 1024 * 1024, // 100MB default
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) =>
          acceptedFileTypes.includes(file.type) && file.size <= maxFileSize
      );

      if (files.length + validFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} file(s)`);
        return;
      }

      onFilesSelected(validFiles);
    },
    [files, maxFiles, maxFileSize, acceptedFileTypes, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    multiple: maxFiles > 1,
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          border: 2,
          borderColor: isDragActive ? 'primary.main' : 'divider',
          borderStyle: 'dashed',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Maximum file size: {formatFileSize(maxFileSize)}
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ mt: 2 }}
          onClick={(e) => e.stopPropagation()}
        >
          Select Files
        </Button>
      </Paper>

      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onFileRemove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <FileIcon />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={formatFileSize(file.size)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FileUpload;