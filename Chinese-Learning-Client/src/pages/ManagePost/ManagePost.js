import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PostCard from '../../components/PostCard/PostCard';
import { useEffect, useState } from 'react';
import postServices from '../../services/postServices';
import { useNavigate } from 'react-router-dom';
function ManagePost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postServices
      .getAllAvailable()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 5, mx: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center' }}>
        DANH SÁCH BÀI VIẾT
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
          Bài viết mới
        </Button>
      </div>
      <div className="list-post-wrapper">
        {/* map post */}
        {posts?.length > 0 &&
          posts.map((post) => {
            return <PostCard post={post} postList={posts} setPostList={setPosts} key={post.id} />;
          })}
      </div>
    </Box>
  );
}

export default ManagePost;
