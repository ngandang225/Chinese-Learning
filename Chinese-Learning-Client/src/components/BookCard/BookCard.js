import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertDialog from '../AlertDialog/AlertDialog';
import { CardActionArea } from '@mui/material';

function BookCard({ book }) {
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  const handleDelete = () => {};

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div
      id="book-card-wrapper"
      style={{ display: 'flex', justifyContent: 'space-between', padding: '0 6rem 0 4rem' }}
    >
      <Tooltip
        title={<Typography fontSize={'1rem'}>Nhấp vào để xem chi tiết</Typography>}
        placement="left"
      >
        <Card
          sx={{
            width: '100%',
            marginTop: '1.2rem',
            marginBottom: '1.2rem',
            boxShadow: 'none',
          }}
          onClick={() => navigate(`${book.id}`)}
        >
          <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardMedia
              component="img"
              sx={{
                width: 'auto',
                height: 110,
                cursor: 'pointer',
                borderRadius: '0.4rem 0 0 0',
                objectFit: 'contain',
              }}
              image={book.image}
              alt={book.name}
            />

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography sx={{ cursor: 'pointer' }} component="div" variant="h5" fontWeight="bold">
                {book.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* <Tooltip
          title={<Typography fontSize={'1.2rem'}>Chỉnh sửa</Typography>}
          arrow
          placement="left"
        >
          <IconButton
            sx={{
              borderRadius: '4px',
              mb: 1,
              p: '4px',
              backgroundColor: '#fdd835',
              '&:hover': {
                backgroundColor: '#fbc02d',
              },
            }}
            onClick={() => navigate(`${book.id}/chinh-sua`)}
          >
            <EditNoteIcon sx={{ fontSize: '2rem', color: '#000' }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={<Typography fontSize={'1.2rem'}>Xóa</Typography>}
          arrow
          placement="left"
          sx={{ backgroundColor: '#000' }}
        >
          <IconButton
            sx={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              p: '4px',
              '&:hover': {
                backgroundColor: '#fff9c4',
              },
            }}
            onClick={handleDeleteClick}
          >
            <DeleteOutlineIcon sx={{ fontSize: '2rem', color: '#f57f17' }} />
          </IconButton>
        </Tooltip> */}
      </Box>
      {showDialog && (
        <AlertDialog handleClose={handleCloseDialog} id={book.id} confirmDelete={handleDelete} />
      )}
    </div>
  );
}

export default BookCard;
