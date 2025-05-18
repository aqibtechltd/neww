import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
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
import { useThemeStore } from '../stores/themeStore';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 280;

const tools = [
  { name: 'Merge PDF', path: '/merge-pdf', icon: <MergeIcon /> },
  { name: 'Split PDF', path: '/split-pdf', icon: <SplitIcon /> },
  { name: 'Convert PDF', path: '/convert-pdf', icon: <ConvertIcon /> },
  { name: 'Compress PDF', path: '/compress-pdf', icon: <CompressIcon /> },
  { name: 'Protect PDF', path: '/protect-pdf', icon: <ProtectIcon /> },
  { name: 'Unlock PDF', path: '/unlock-pdf', icon: <UnlockIcon /> },
  { name: 'PDF to Image', path: '/pdf-to-image', icon: <ImageIcon /> },
  { name: 'Image to PDF', path: '/image-to-pdf', icon: <ImageIcon /> },
  { name: 'Rotate PDF', path: '/rotate-pdf', icon: <RotateIcon /> },
  { name: 'Watermark PDF', path: '/watermark-pdf', icon: <WatermarkIcon /> },
  { name: 'Extract Text', path: '/extract-text', icon: <TextIcon /> },
  { name: 'Edit Metadata', path: '/edit-metadata', icon: <EditIcon /> },
  { name: 'Fill Form', path: '/fill-form', icon: <FormIcon /> },
  { name: 'Sign PDF', path: '/sign-pdf', icon: <SignIcon /> },
  { name: 'Reorder Pages', path: '/reorder-pages', icon: <ReorderIcon /> },
  { name: 'Delete Pages', path: '/delete-pages', icon: <DeleteIcon /> },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useThemeStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          PDF Tools
        </Typography>
      </Toolbar>
      <List>
        {tools.map((tool) => (
          <ListItem
            button
            key={tool.path}
            onClick={() => {
              navigate(tool.path);
              if (isMobile) {
                handleDrawerToggle();
              }
            }}
          >
            <ListItemIcon>{tool.icon}</ListItemIcon>
            <ListItemText primary={tool.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            PDF Tools
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;