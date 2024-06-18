import FavoriteIcon from '@mui/icons-material/Favorite';
import './Home.scss';
import PostItem from '../../components/PostItem/PostItem';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import postServices from '../../services/postServices';

function Home() {
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
    <div className="home-wrapper">
      <div style={{ padding: '0 40px' }}>
        {/* Danh sách post */}
        <div>
          <div
            className="study-program"
            style={{
              paddingTop: '10px',
              width: '100%',
            }}
          >
            <div
              style={{
                padding: '15px',
                width: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className="title">
                <h2>
                  <FavoriteIcon
                    sx={{
                      fontSize: '20px',
                      mr: '5px',
                    }}
                  />
                  Bài viết
                </h2>
              </div>
            </div>
            {posts?.length > 0 ? (
              <div className="content">
                <Grid container spacing={{ xs: 6, md: 2, lg: 4 }} sx={{ m: 0, flexGrow: 1 }}>
                  {posts?.map((item) => (
                    <Grid key={item.id} item xs={12} md={6} lg={4}>
                      <PostItem post={item} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Typography variant="body">Hiện chưa có bài viết nào!</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
