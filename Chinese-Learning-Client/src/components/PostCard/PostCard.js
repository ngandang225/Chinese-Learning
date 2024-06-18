import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertDialog from '../AlertDialog/AlertDialog';
import { CardActionArea } from '@mui/material';
import postServices from '../../services/postServices';
import './PostCard.scss';

function PostCard({ post, postList, setPostList }) {
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  const handleDelete = () => {
    postServices
      .delete(post.id)
      .then(() => {
        const updatedPosts = postList.filter((item) => item.id !== post.id);
        setPostList(updatedPosts);
        navigate('/quan-ly-bai-viet');
      })
      .catch((err) => console.log(err));
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  let dateCreated = {};
  const getDate = (datetime) => {
    const date = datetime.split('T')[0];
    dateCreated.year = date.split('-')[0];
    dateCreated.month = date.split('-')[1];
    dateCreated.day = date.split('-')[2];
    return `Ngày ${dateCreated.day} tháng ${dateCreated.month} năm ${dateCreated.year}`;
  };
  return (
    <div
      id="post-card-wrapper"
      style={{ display: 'flex', justifyContent: 'space-between', padding: '0 6rem 0 4rem' }}
    >
      <Tooltip
        title={<Typography fontSize={'1rem'}>Nhấp vào để xem chi tiết bài viết</Typography>}
        placement="left"
      >
        <Card
          sx={{
            minWidth: '600px',
            marginTop: '1.2rem',
            marginBottom: '1.2rem',
            boxShadow: 'none',
          }}
          onClick={() => navigate(`${post.id}`)}
        >
          <CardActionArea sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: 160, height: 110, cursor: 'pointer', borderRadius: '0.4rem 0 0 0' }}
              image={post.image}
              alt={post.title}
            />

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  mb: 2,
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  lineHeight: '1.25rem',
                  textDecoration: 'none',
                }}
              >
                {getDate(post.createdAt)}
              </Typography>

              <Typography sx={{ cursor: 'pointer' }} component="div" variant="h5" fontWeight="bold">
                {post.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Tooltip
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
            onClick={() => navigate(`${post.id}/chinh-sua`)}
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
        </Tooltip>
      </Box>
      {showDialog && (
        <AlertDialog handleClose={handleCloseDialog} id={post.id} confirmDelete={handleDelete} />
      )}
    </div>
  );
}

export default PostCard;
