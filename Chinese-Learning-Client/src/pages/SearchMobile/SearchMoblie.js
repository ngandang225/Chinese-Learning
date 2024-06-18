import { IconButton, InputBase, Typography } from '@mui/material';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import './SearchMobile.scss';
import slugUrl from '../../utils/slugUrl';

function SearchMobile() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    // Perform search when the input changes
    performSearch(value);
  };

  const handleInputClick = (e) => {
    performSearch(e.target.value);
  };

  const performSearch = (value) => {
    fetch(`${process.env.REACT_APP_API_URL}/topics/search?q=${encodeURIComponent(value)}`)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        if (!data) setSearchResults([]);
        else setSearchResults(data.map(item => ({ ...item, bookId: { ...item.bookId, slug: slugUrl(item.bookId.name) } })));
      })
      .catch((error) => {
        console.log('Error searching topics:', error);
      });
  };
  return (
    <div className="search-container">
      <div className="search-bar">
        <ArrowBackIcon
          style={{ fontSize: '3.4rem', marginRight: '8px' }}
          htmlColor="#f57f17"
          onClick={() => {
            window.history.back();
          }}
        />
        <InputBase
          className="search-input"
          placeholder="Tìm chủ đề của bạn..."
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleInputClick}
          sx={{
            border: '1px solid #f57f17',
            width: '100%',
            backgroundColor: '#fff',
            color: '#000',
            height: '36px',
            borderRadius: '8px',
            fontSize: '1.4rem',
            pl: '15px',
            pr: '30px',
          }}
        />
        <IconButton
          sx={{
            ml: '-40px',
            position: 'absolute',
            pointerEvents: 'none',
            borderRadius: '0 8px 8px 0px',
            backgroundColor: '#f57f17',
          }}
        >
          <SearchIcon sx={{ fontSize: '2rem', color: '#fff' }} />
        </IconButton>
      </div>
      <ul className="search-result" style={{ display: 'flex' }}>
        {searchResults?.length <= 0 ? (
          <div style={{ padding: '8px', textAlign: 'center' }}>Không tìm thấy topic nào !</div>
        ) : (
          searchResults.map((topic) => (
            <div key={topic.id}>
              <Link
                to={`/nghe/so-cap/${topic.bookId.slug}-b${topic.bookId.id}?t=${topic.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <li>
                  <img
                    src={topic.bookId.image}
                    alt={topic.bookId.name}
                    style={{ width: '24px', height: '32px' }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      marginLeft: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="body1">
                      {topic.bookId.name.split(',').join(' - ')}
                    </Typography>
                    <Typography variant="h6">
                      <b>{topic.name}</b>
                    </Typography>
                  </div>
                </li>
              </Link>

              <Divider />
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default SearchMobile;
