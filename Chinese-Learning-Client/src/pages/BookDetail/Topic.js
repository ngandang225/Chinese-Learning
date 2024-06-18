import * as React from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Part from './Part';
import partServices from '../../services/partServices';
import slugUrl from '../../utils/slugUrl';
function Topic({ topic, isOpen, book }) {
  const [parts, setParts] = React.useState([]);
  const [openTopic, setOpenTopic] = React.useState(isOpen ? isOpen : false);
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    partServices
      .getByTopicId(topic.id)
      .then((data) => {
        const partWithSlug = data.map((item) => ({
          ...item,
          slug: slugUrl(item.name),
        }));
        setParts(partWithSlug);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick = () => {
    setOpenTopic(!openTopic);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 100);
  };

  return (
    <React.Fragment>
      {/* Topic */}
      <Box onClick={handleClick} className={`topic-item ${clicked ? 'clicked' : ''}`}>
        {openTopic ? (
          <KeyboardArrowDownIcon className="topic-icon" />
        ) : (
          <KeyboardArrowRightIcon className="topic-icon" />
        )}
        <Typography variant="body" color="rgba(0, 0, 0, 0.7)">
          {topic.name}
        </Typography>
      </Box>

      {/* Part */}
      {parts.length > 0 &&
        parts.map((part, index) => (
          <Collapse in={openTopic} timeout="auto" unmountOnExit key={index}>
            {!part.deleted && <Part part={part} book={book} topic={topic} />}
          </Collapse>
        ))}
    </React.Fragment>
  );
}

export default Topic;
