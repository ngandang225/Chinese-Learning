import { useEffect, useState } from 'react';
import { Box, Button, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './UpdateCreatePost.scss';
import postServices from '../../services/postServices';
import TextEditor from '../TextEditor/TextEditor';
import { useNavigate, useParams } from 'react-router-dom';
import AlertDialog from '../AlertDialog/AlertDialog';

function UpdateCreatePost({ type }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [post, setPost] = useState({});
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (type === 'update') {
      postServices
        .getById(id)
        .then((data) => setPost(data))
        .catch((error) => console.log(error));
    }
  }, []);
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleImageChange = (event) => {
    const selectedFile = {};
    selectedFile.file = event.target.files[0];
    selectedFile.preview = URL.createObjectURL(selectedFile.file);
    setImage(selectedFile);
    setPost({ ...post, image: selectedFile.preview });
  };
  const handleCreatePost = () => {
    const data = {
      title: post.title,
      description: null,
      image: image?.file,
      content: content,
      createdBy: user?.id,
    };

    postServices
      .create(data)
      .then((response) => {
        navigate('/quan-ly-bai-viet');
      })
      .catch((err) => console.log(err));
  };

  const handleUpdatePost = () => {
    const data = {
      id: id,
      title: post.title,
      description: null,
      image: image?.file,
      content: content,
      createdBy: user?.id,
    };

    postServices
      .update(data)
      .then(() => {
        navigate('/quan-ly-bai-viet');
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = () => {
    setShowDialog(true);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  const handleDelete = () => {
    postServices
      .delete(id)
      .then(() => navigate('/quan-ly-bai-viet'))
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center' }}>
        {type === 'create' ? 'TẠO BÀI VIẾT MỚI' : 'THÔNG TIN BÀI VIẾT'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, fontSize: '1.6rem' }}>
        <InputLabel required sx={{ fontSize: '1.6rem', mb: 1, fontWeight: 600 }} htmlFor="title">
          Tên bài viết:
        </InputLabel>
        <OutlinedInput
          className="title-input"
          placeholder="Nhập tên bài viết"
          required
          fullWidth
          name="title"
          id="title"
          value={post?.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <InputLabel
          required
          sx={{ fontSize: '1.6rem', mb: 1, mt: 4, fontWeight: 600 }}
          htmlFor="image"
        >
          Ảnh bài viết:
        </InputLabel>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <OutlinedInput
            className="file-input"
            required
            style={{ maxWidth: 'fit-content', height: 'fit-content', marginRight: 40 }}
            name="image"
            id="image"
            type="file"
            inputProps={{
              accept: 'image/png, image/gif, image/jpeg',
            }}
            onChange={handleImageChange}
          />
          <div className="image-container">
            <img
              src={post?.image}
              alt={post?.title}
              style={{ objectFit: 'cover' }}
              width="100%"
              height="100%"
            />
          </div>
        </Box>

        <InputLabel required sx={{ fontSize: '1.6rem', mb: 1, mt: 4, fontWeight: 600 }}>
          Nội dung bài viết:
        </InputLabel>
        <div className="post-editor">
          <TextEditor initData={post?.content} setData={setContent} />
        </div>
        <Stack direction={'row'} sx={{ mt: 3, justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            sx={{
              fontSize: '1.2rem',
              backgroundColor: '#fff',
              color: '#f9a825',
              boxShadow: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#fff9c4',
              },
              border: '1px solid #fbc02d',
              visibility: type !== 'update' ? 'hidden' : 'visible',
            }}
            startIcon={<DeleteOutlineIcon />}
            onClick={handleDeleteClick}
          >
            Xóa bài viết
          </Button>

          <Button
            variant="contained"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              backgroundColor: '#fdd835',
              color: '#000',
              boxShadow: 'none',
              minWidth: '16rem',
              '&:hover': {
                backgroundColor: '#fbc02d',
              },
            }}
            onClick={type === 'create' ? handleCreatePost : handleUpdatePost}
          >
            {type === 'create' ? `Tạo` : 'Lưu'}
          </Button>
        </Stack>
      </Box>
      {showDialog && (
        <AlertDialog handleClose={handleCloseDialog} id={id} confirmDelete={handleDelete} />
      )}
    </Box>
  );
}

export default UpdateCreatePost;
