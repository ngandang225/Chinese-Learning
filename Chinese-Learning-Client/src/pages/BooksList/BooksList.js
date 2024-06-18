import * as React from 'react';
import BookItem from '../../components/BookItem/BookItem';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './BooksList.scss';
import bookServices from '../../services/bookServices';
import slugUrl from '../../utils/slugUrl';

function BooksList() {
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    bookServices
      .getAll()
      .then((data) => {
        setBooks(data.map(item => ({ ...item, slug: slugUrl(item.name) })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="books-list-wrapper">
      <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2 }} alignItems="center">
        {books?.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id} >
            <Link to={`/nghe/so-cap/${book.slug}-b${book.id}`} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
              <BookItem book={book} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default BooksList;
