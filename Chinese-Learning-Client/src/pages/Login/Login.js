import {
  Box,
  Button,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import userServices from '../../services/userServices';
import './Login.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    value: '',
    message: '',
  });
  const [password, setPassword] = useState({
    value: '',
    message: '',
    isShow: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email: email.value, password: password.value };
    const loginData = await userServices.login(data);
    if (loginData) {
      navigate('/quan-ly-bai-viet');
      // add to local storage
      localStorage.setItem('user', JSON.stringify(loginData.data));
      dispatch(setUser(loginData));
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: ' center',
      }}
      id="login-wrapper"
    >
      <Typography variant="h3" color="#000" sx={{ mt: '80px' }}>
        ĐĂNG NHẬP
      </Typography>

      <Box component="form" onSubmit={handleSubmit} className="form-wrapper">
        <InputLabel required sx={{ fontSize: '1.6rem', mb: 1 }} htmlFor="email">
          Địa chỉ email:{' '}
        </InputLabel>
        <OutlinedInput
          placeholder="Nhập địa chỉ email"
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail({ ...email, value: e.target.value })}
        />
        <InputLabel required sx={{ fontSize: '1.6rem', mb: 1, mt: 2 }} htmlFor="password">
          Mật khẩu:
        </InputLabel>
        <OutlinedInput
          placeholder="Nhập mật khẩu"
          required
          fullWidth
          name="password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          onChange={(e) => setPassword({ ...password, value: e.target.value })}
          endAdornment={
            showPassword ? (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                <VisibilityIcon fontSize="large" />
              </IconButton>
            ) : (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                <VisibilityOffIcon fontSize="large" />
              </IconButton>
            )
          }
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#fdd835', color: '#000', fontSize: '1.6rem' }}
        >
          Đăng nhập
        </Button>
      </Box>
      {showAlert && (
        <Alert severity="error" className="alert">
          Thông tin đăng nhập sai. Hãy kiểm tra lại.
        </Alert>
      )}
    </Box>
  );
}

export default Login;
