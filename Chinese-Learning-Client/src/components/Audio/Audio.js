import { Box } from '@mui/material';
import ReactAudioPlayer from 'react-audio-player';
import './Audio.scss';
function AudioBox({ exeAudio }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      position="relative"
      sx={{ mt: '4rem', mb: '2rem' }}
    >
      <ReactAudioPlayer src={exeAudio} controls className="audio" />
    </Box>
  );
}

export default AudioBox;
