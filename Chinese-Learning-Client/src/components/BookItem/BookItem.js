import './BookItem.scss';
import Typography from '@mui/material/Typography';

function PostItem({ book }) {
  const nameList = book.name.split(',');
  return (
    <div className="book-item-container">
      <img
        className="thumbnail"
        src={book.image}
        alt="book-item"
        style={{
          width: '22rem',
          height: '30rem',
          objectFit: 'cover',
          border: '1px solid #fff9c4',
          borderRadius: '15px',
        }}
      />
      <div className="book-item-details">
        {/* <Typography className="book-item-time">{book.createdAt}</Typography> */}
        {nameList.map((item, index) => (
          <div key={`name-${index}`}>
            <Typography variant="h4" className="book-name">
              {item}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostItem;
