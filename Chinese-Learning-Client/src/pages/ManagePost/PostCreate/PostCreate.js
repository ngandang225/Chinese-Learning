import UpdateCreatePost from '../../../components/UpdateCreatePost/UpdateCreatePost';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
function PostCreate() {
  return (
    <div>
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
      <UpdateCreatePost type={'create'} />
    </div>
  );
}

export default PostCreate;
