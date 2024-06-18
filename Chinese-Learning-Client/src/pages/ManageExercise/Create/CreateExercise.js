import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function CreateExercise() {
  return (
    <React.Fragment>
      <Link to={'/quan-ly-bai-viet'} style={{ textDecoration: 'none' }}>
        <Typography
          fontSize="1.2rem"
          sx={{
            color: '#000',
            margin: '2rem 0 0 4rem',
            '&:hover': {
              fontStyle: 'italic',
              color: '#f57f17',
            },
          }}
        >
          VỀ DANH SÁCH BÀI VIẾT
        </Typography>
      </Link>
      <Box
        sx={{
          borderRadius: '1rem',
          padding: '2rem',
          backgroundColor: '#fff',
          boxShadow: '1px 2px 4px #ccc',
        }}
      ></Box>
    </React.Fragment>
  );
}

export default CreateExercise;
