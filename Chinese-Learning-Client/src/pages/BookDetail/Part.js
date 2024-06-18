import * as React from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Part({ part, book, topic }) {
  const navigate = useNavigate();
  let linkExercise = `/nghe/so-cap/${book.slug}-b${book.id}/${topic.slug}-t${topic.id}/${part.slug}-p${part.id}`;

  const handleClick = () => {
    navigate(linkExercise);
  };

  return (
    <React.Fragment>
      <Box onClick={handleClick} className={`part-item`}>
        <Typography style={{ marginLeft: '3.2rem' }} variant="body" color="rgba(0, 0, 0, 0.7)">
          {part.name}
        </Typography>
      </Box>
    </React.Fragment>
  );
}

export default Part;
