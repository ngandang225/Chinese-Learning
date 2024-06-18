import { Box, Toolbar, Typography } from '@mui/material';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

function LecturerLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </div>
  );
}

export default LecturerLayout;
