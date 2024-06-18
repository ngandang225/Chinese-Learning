import { Typography } from '@mui/material';
import PostDetail from '../../../components/PostDetail.js/PostDetail';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import postServices from '../../../services/postServices';
import './PostRead.scss';

function PostReadClient() {
  const { id } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    postServices
      .getById(id)
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{ padding: '4rem 6rem', display: 'flex', flexDirection: 'column' }}
      id="post-read-client-wrapper"
    >
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Typography
          fontSize="1.2rem"
          sx={{
            color: '#000',
            '&:hover': {
              fontStyle: 'italic',
              color: '#f57f17',
            },
          }}
        >
          VỀ TRANG CHỦ
        </Typography>
      </Link>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      ></div>
      {post && <PostDetail post={post} />}
    </div>
  );
}

export default PostReadClient;
