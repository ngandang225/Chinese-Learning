import SlideshowImages from '../SlideshowImages/SlideshowImages';
import Contact from '../Contact/Contact';
import { Box } from '@mui/material';
import './Background.scss';
function Background() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div id="background-wrapper">
        <Box className="slideshow-image">
          <SlideshowImages />
        </Box>
      </div>
    </div>
  );
}

export default Background;
