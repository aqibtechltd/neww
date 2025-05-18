import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Container,
  useTheme,
} from '@mui/material';
import {
  Merge as MergeIcon,
  CallSplit as SplitIcon,
  Transform as ConvertIcon,
  Compress as CompressIcon,
  Lock as ProtectIcon,
  LockOpen as UnlockIcon,
  Image as ImageIcon,
  Rotate90DegreesCcw as RotateIcon,
  Water as WatermarkIcon,
  TextFields as TextIcon,
  Edit as EditIcon,
  Description as FormIcon,
  Draw as SignIcon,
  Reorder as ReorderIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const tools = [
  {
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document',
    path: '/merge-pdf',
    icon: MergeIcon,
  },
  {
    name: 'Split PDF',
    description: 'Separate PDF pages into multiple documents',
    path: '/split-pdf',
    icon: SplitIcon,
  },
  {
    name: 'Convert PDF',
    description: 'Convert PDF to Word or other formats',
    path: '/convert-pdf',
    icon: ConvertIcon,
  },
  {
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    path: '/compress-pdf',
    icon: CompressIcon,
  },
  {
    name: 'Protect PDF',
    description: 'Secure PDF with password and permissions',
    path: '/protect-pdf',
    icon: ProtectIcon,
  },
  {
    name: 'Unlock PDF',
    description: 'Remove password protection from PDF files',
    path: '/unlock-pdf',
    icon: UnlockIcon,
  },
  {
    name: 'PDF to Image',
    description: 'Convert PDF pages to image formats',
    path: '/pdf-to-image',
    icon: ImageIcon,
  },
  {
    name: 'Image to PDF',
    description: 'Create PDF from images',
    path: '/image-to-pdf',
    icon: ImageIcon,
  },
  {
    name: 'Rotate PDF',
    description: 'Rotate PDF pages to any angle',
    path: '/rotate-pdf',
    icon: RotateIcon,
  },
  {
    name: 'Watermark PDF',
    description: 'Add text or image watermarks to PDF',
    path: '/watermark-pdf',
    icon: WatermarkIcon,
  },
  {
    name: 'Extract Text',
    description: 'Extract text content from PDF files',
    path: '/extract-text',
    icon: TextIcon,
  },
  {
    name: 'Edit Metadata',
    description: 'Edit PDF document properties and metadata',
    path: '/edit-metadata',
    icon: EditIcon,
  },
  {
    name: 'Fill Form',
    description: 'Fill and save PDF forms',
    path: '/fill-form',
    icon: FormIcon,
  },
  {
    name: 'Sign PDF',
    description: 'Add digital signatures to PDF documents',
    path: '/sign-pdf',
    icon: SignIcon,
  },
  {
    name: 'Reorder Pages',
    description: 'Change the order of pages in PDF',
    path: '/reorder-pages',
    icon: ReorderIcon,
  },
  {
    name: 'Delete Pages',
    description: 'Remove unwanted pages from PDF',
    path: '/delete-pages',
    icon: DeleteIcon,
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          PDF Tools
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          All the tools you need to work with PDF files in one place
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={tool.path}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(tool.path)}
                  sx={{ flexGrow: 1 }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 48,
                          color: theme.palette.primary.main,
                          mb: 1,
                        }}
                      />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        align="center"
                      >
                        {tool.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {tool.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;