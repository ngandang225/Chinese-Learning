import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/material';
import './AlertDialog.scss';
export default function AlertDialog({ handleClose, id, confirmDelete }) {
  const handleConfirmClick = () => {
    confirmDelete(id);
    handleClose();
  };
  return (
    <Box>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ padding: '20px' }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: '1.8rem', fontWeight: 'bold', p: 0, mb: 2 }}
        >
          Xác nhận xóa bài viết
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2 }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.6rem' }}>
            Bạn có chắc chắn muốn xóa bài viết không? Động tác này sẽ không thể hoàn lại!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Button
            variant="contained"
            sx={{
              fontSize: '1.2rem',
              backgroundColor: '#fff',
              color: '#f9a825',
              boxShadow: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#fff9c4',
              },
              border: '1px solid #fbc02d',
            }}
            onClick={handleClose}
            autoFocus
          >
            Không xóa nữa
          </Button>
          <Button
            startIcon={<DeleteOutlineIcon />}
            sx={{
              fontSize: '1.2rem',
              backgroundColor: '#f57f17',
              color: '#fff',
              boxShadow: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#f9a825',
              },
            }}
            onClick={handleConfirmClick}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
