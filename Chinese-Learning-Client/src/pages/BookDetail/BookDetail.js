import * as React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import Topic from './Topic';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './BookDetail.scss';
import topicServices from '../../services/topicServices';
import bookServices from '../../services/bookServices';
import slugUrl from '../../utils/slugUrl';
const emptyTopic = require('../../assets/images/empty_topic.jpg');

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BookDetail() {
  const location = useLocation();
  let { bookId } = useParams();
  let splitBookId = bookId.split('-');
  splitBookId = splitBookId[splitBookId.length - 1].split('b');
  bookId = splitBookId[splitBookId.length - 1];

  const searchParams = new URLSearchParams(location.search);
  const topicId = searchParams.get('t'); // show collapse
  const [selectedTopic, setSelectedTopic] = React.useState(null);
  const [value, setValue] = React.useState(parseInt(bookId) - 1 || 0);
  const [booksList, setBooksList] = React.useState([]);

  React.useEffect(() => {
    setSelectedTopic(topicId);
  }, [topicId]);

  React.useEffect(() => {
    bookServices
      .getByLevelId(1)
      .then(async (data) => {
        const bookList = await Promise.all(
          data.map(async (book) => {
            try {
              const topics = await topicServices.getByBookId(book.id);
              return {
                id: book.id,
                name: book.name,
                thumbnail: book.image,
                topic: topics.map((item) => ({ ...item, slug: slugUrl(item.name) })),
              };
            } catch (err) {
              console.log(err);
              return {
                id: book.id,
                name: book.name,
                thumbnail: book.image,
                topic: null, // or any default value in case of error
              };
            }
          }),
        );
        setBooksList(bookList.map((item) => ({ ...item, slug: slugUrl(item.name) })));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleThumbnailClick = () => {};
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="book-detail-wrapper">
      <Link to={'/nghe/so-cap'} className="back-link">
        VỀ TRANG SÁCH
      </Link>
      <Box sx={{ width: '100%' }}>
        <Box className="book-list">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            {booksList.map((book, index) => {
              const nameList = book.name.split(',');
              return (
                <Tab
                  key={index}
                  label={
                    <Stack
                      {...a11yProps(index)}
                      direction="row"
                      className="thumbnail-container"
                      onClick={handleThumbnailClick}
                    >
                      <img src={book.thumbnail} alt="book-thumbnail" className="thumbnail" />
                      <Box className="title">
                        {nameList.map((item, index) => (
                          <div key={`name-${index}`}>
                            <Typography variant="h4" className="book-title">
                              {item}
                            </Typography>
                          </div>
                        ))}
                      </Box>
                    </Stack>
                  }
                  {...a11yProps(index)}
                ></Tab>
              );
            })}
          </Tabs>
        </Box>
        {booksList.length > 0 &&
          booksList.map((book, index) => (
            <CustomTabPanel value={value} index={index} key={index}>
              <Box
                sx={{
                  width: '100%',
                  backgroundColor: '#ffeb3b',
                  height: '4.4rem',
                  paddingLeft: '1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body" color="#000" fontWeight="bold">
                  Chủ đề
                </Typography>
              </Box>
              {book.topic.length > 0 ? (
                <Box className="topic-list">
                  {book.topic.map((topic, index) =>
                    !topic.deleted && topic.id == selectedTopic ? (
                      <Topic topic={topic} isOpen={true} key={index} book={book} />
                    ) : (
                      <Topic topic={topic} key={index} book={book} />
                    ),
                  )}
                </Box>
              ) : (
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '4rem',
                  }}
                >
                  <img
                    src={emptyTopic}
                    alt="empty_topic"
                    height={180}
                    style={{ borderRadius: '50%' }}
                  />
                  <Typography sx={{ fontSize: '1.4rem', mt: '1.2rem' }} color="rgba(0, 0, 0, 0.7)">
                    Chủ đề của sách đang được cập nhật.
                  </Typography>
                </div>
              )}
            </CustomTabPanel>
          ))}
      </Box>
    </div>
  );
}

export default BookDetail;
