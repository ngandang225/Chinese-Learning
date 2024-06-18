import { Box, Typography } from '@mui/material';
import './PostDetail.scss';
function PostDetail({ post }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
      <Typography
        variant="h3"
        fontWeight={700}
        color="#000"
        sx={{ marginBottom: '16px', textAlign: 'center', marginLeft: '4rem', marginRight: '4rem' }}
      >
        {post.title}
      </Typography>

      {/* <Typography variant="h5">{post.content}</Typography> */}
      <div
        className="post-content"
        style={{ fontSize: '1.6rem', color: '#000', textAlign: 'justify' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Box>
  );
}

export default PostDetail;
