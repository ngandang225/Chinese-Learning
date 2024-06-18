import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../../redux/userSlice';
import logo from '../../../assets/images/logo.png';
import { useState } from 'react';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
    navigate('/dang-nhap');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fdd835' }}
      >
        <Toolbar sx={{ display: 'flex', mx: 5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '5.2rem',
                height: '5.2rem',
                borderRadius: '50%',
                overflow: 'hidden',
                marginTop: '0.6rem',
                marginBottom: '0.6rem',
              }}
            >
              <Link to={'/'}>
                <img
                  src={logo}
                  alt="trungvanthuongthuong"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Link>
            </div>

            <Stack
              direction="row"
              alignItems="center"
              onClick={handleClickAvatar}
              sx={{
                cursor: 'pointer',
              }}
            >
              <IconButton>
                <Avatar src={user.avatar} />
              </IconButton>
              <Typography variant="h5" color="#000">
                {user.name}
              </Typography>
            </Stack>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 0.6,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem onClick={handleLogout}>
                <Typography variant="h5"> Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
