import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookServices from '../../services/bookServices';
import BookCard from '../../components/BookCard/BookCard';

function ManageExercise() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    bookServices
      .getAll()
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 5, mx: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center' }}>
        TẤT CẢ SÁCH
      </Typography>
      <div style={{ textAlign: 'end', marginTop: '16px', marginBottom: '16px' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            fontSize: '1.2rem',
            backgroundColor: '#fdd835',
            color: '#000',
            boxShadow: 'none',
            mr: '6rem',
            '&:hover': {
              backgroundColor: '#fbc02d',
            },
          }}
          onClick={() => navigate('tao')}
        >
          Thêm sách
        </Button>
      </div>
      <div className="list-post-wrapper">
        {/* map post */}
        {books?.length > 0 &&
          books.map((book) => {
            return <BookCard book={book} />;
          })}
      </div>
    </Box>
  );
}

export default ManageExercise;
