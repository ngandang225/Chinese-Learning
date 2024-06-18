import * as React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './NewWords.scss';
import ReactAudioPlayer from 'react-audio-player';
import AudioBox from '../../../components/Audio/Audio';

function NewWords({ ex }) {
  const [currentAudio, setCurrentAudio] = React.useState();
  const [clickedAudio, setClickedAudio] = React.useState(false);
  const [audioKey, setAudioKey] = React.useState(0);

  const handlePlayAudio = (record) => {
    const audio = new Audio(record); // Create an audio element with the record URL
    audio.addEventListener('loadedmetadata', () => {
      const durationInSeconds = audio.duration; // Get the duration in seconds
      const durationInMilliseconds = durationInSeconds * 1000; // Convert to milliseconds

      setAudioKey((prevKey) => prevKey + 1);

      setCurrentAudio(record);
      setClickedAudio(true);
      setTimeout(() => {
        setClickedAudio(false);
      }, durationInMilliseconds);
    });
  };

  return (
    <div id="new-words-wrapper">
      {ex.record && <AudioBox exeAudio={ex.record} />}
      <Box sx={{ backgroundColor: '#FCE9DA', padding: '2rem', marginTop: '2.8rem' }}>
        <Typography
          variant="h2"
          color="#E56B03"
          sx={{ textAlign: 'center', fontWeight: 600, marginBottom: '2rem' }}
        >
          New Words
        </Typography>
        <Grid container>
          {ex.questions?.map((item) => {
            let contentList = item.content.split(',');
            return (
              <Grid item key={item.id} xs={11.4} md={5.4} lg={3.8} className="word-item">
                <Typography
                  variant="body"
                  color="#B45B0D"
                  fontWeight="600"
                  sx={{ position: 'relative', zIndex: 10 }}
                >{`${item.ordinalNumber}. ${contentList[0]}`}</Typography>
                <br></br>
                <Typography variant="body" sx={{ position: 'relative', zIndex: 10 }}>
                  {contentList[1]}
                </Typography>
                <br></br>
                <Typography variant="body" sx={{ position: 'relative', zIndex: 10 }}>
                  {contentList[2]}
                </Typography>
                <br></br>
                <Typography variant="body" sx={{ position: 'relative', zIndex: 10 }}>
                  {contentList[3]}
                </Typography>
                <Box className="speaker-wrapper">
                  <VolumeUpIcon
                    sx={{
                      fontSize: '2.8rem',
                      display: 'block',
                      color: '#fff',
                    }}
                    onClick={() => handlePlayAudio(item.record)}
                    style={{ cursor: 'pointer' }}
                    className={`speaker ${clickedAudio && currentAudio === item.record ? 'clicked' : ''
                      }`}
                  />
                </Box>
                {item.images !== 'no' && <img src={item.images} alt="question" className="image" />}
              </Grid>
            );
          })}
        </Grid>
        {currentAudio && (
          <ReactAudioPlayer
            key={audioKey}
            src={currentAudio}
            autoPlay
            controls
            style={{ display: 'none' }}
          />
        )}
      </Box>
    </div>
  );
}

export default NewWords;
