import { Button, Typography } from '@mui/material';
import PostDetail from '../../../components/PostDetail.js/PostDetail';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import postServices from '../../../services/postServices';

function PostRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  useEffect(() => {
    postServices
      .getById(id)
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
      <Link to={'/quan-ly-bai-viet'} style={{ textDecoration: 'none' }}>
        <Typography
          fontSize="1.2rem"
          sx={{
            color: '#000',
            margin: '0 0 4rem 0',
            '&:hover': {
              fontStyle: 'italic',
              color: '#f57f17',
            },
          }}
        >
          VỀ DANH SÁCH BÀI VIẾT
        </Typography>
      </Link>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold" marginBottom={1}>
          THÔNG TIN BÀI VIẾT
        </Typography>
      </div>
      {post && <PostDetail post={post} />}
      <div style={{ textAlign: 'end', marginTop: '40px' }}>
        <Button
          variant="contained"
          sx={{
            minWidth: '200px',
            textAlign: 'end',
            fontSize: '1.2rem',
            backgroundColor: '#fdd835',
            color: '#000',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#fbc02d',
            },
          }}
          onClick={() => navigate('chinh-sua')}
        >
          Chỉnh sửa
        </Button>
      </div>
    </div>
  );
}

export default PostRead;
