import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@mui/material';

import ArticleIcon from '@mui/icons-material/Article';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <Typography
                  variant="h4"
                  sx={{
                    color: '#000',
                    fontWeight: 'bold',
                    pt: 4,
                    pb: 2,
                  }}
                >
                  Quản lý
                </Typography>
              </ListSubheader>
            }
          >
            <ListItem disablePadding onClick={() => navigate('/quan-ly-bai-viet')}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                  <ArticleIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h5">Quản lý bài viết</Typography>} />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/* <ListItem disablePadding onClick={() => navigate('/quan-ly-tai-lieu')}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                  <ArticleIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h5">Quản lý tài liệu</Typography>} />
              </ListItemButton>
            </ListItem>
            <Divider /> */}
            {/* <ListItem disablePadding onClick={() => navigate('/quan-ly-bai-tap')}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                  <ArticleIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h5">Quản lý sách</Typography>} />
              </ListItemButton>
            </ListItem>
            <Divider /> */}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
