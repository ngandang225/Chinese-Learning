import './PostItem.scss';
import { useNavigate } from 'react-router-dom';
function PostItem({ post }) {
  const navigate = useNavigate();
  const dateObject = new Date(post.createdAt);
  return (
    <div className="post-container" onClick={() => navigate(`/bai-viet/${post.id}`)}>
      <div
        className="thumbnail"
        style={{
          padding: '4px',
          height: '250px',
          borderRadius: '15px',
          backgroundColor: '#fff',
        }}
      >
        <img
          src={post.image}
          alt="post"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            border: '1px solid #fff9c4',
            borderRadius: '15px',
          }}
        />
      </div>
      <div className="post-details">
        <em className="post-time">{`Ngày ${dateObject.getDate()} tháng ${
          dateObject.getMonth() + 1
        } năm ${dateObject.getFullYear()}`}</em>
        <h3 className="post-title">{post.title}</h3>
      </div>
    </div>
  );
}

export default PostItem;
