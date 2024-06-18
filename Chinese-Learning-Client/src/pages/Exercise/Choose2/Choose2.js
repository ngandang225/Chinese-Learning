import * as React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import StyledButton from '../../../components/StyledButton/StyledButton';
import StarIcon from '@mui/icons-material/Star';
import './Choose2.scss';

function Choose2({ ex }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [unSelectedAnswers, setUnSelectedAnswers] = useState([]);
  // const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [failedAnswer, setFailedAnswer] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [exeAudio, setExeAudio] = useState(ex.record ? ex.record : null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [clickedAudio, setClickedAudio] = React.useState(false);
  const [audioKey, setAudioKey] = React.useState(0);

  React.useEffect(() => {
    setUnSelectedAnswers([]);
    setSelectedAnswers([]);
    setCorrectAnswer([]);
    setFailedAnswer([]);
    setIsCheck(false);
    setCurrentAudio(null);
    setExeAudio(ex.record ? ex.record : null);
  }, [ex]);

  const handleSelectAnswer = (questionId, answerItem) => {
    !isCheck &&
      setSelectedAnswers((prevState) => {
        const updatedAnswers = prevState.map((answer) => {
          if (answer.id === questionId) {
            return { id: questionId, answer: answerItem };
          }
          return answer;
        });
        const isNewAnswer = !prevState.some((answer) => answer.id === questionId);
        if (isNewAnswer) {
          updatedAnswers.push({ id: questionId, answer: answerItem });
        }
        return updatedAnswers;
      });
  };
  const handleCheckAnswer = () => {
    setIsCheck(true);
    setCurrentAudio(null);
    // const correctAnswers = ex.questions.map((answer) => ({ id: answer.id, answer: answer.answer }));
    const correctAnswers = selectedAnswers.filter((answer) => {
      return ex.questions.some((item) => item.id === answer.id && answer.answer === item.answer);
    });
    setCorrectAnswer(correctAnswers);
    const failedAnswers = selectedAnswers.filter((answer) => {
      return ex.questions.some((item) => item.id === answer.id && answer.answer !== item.answer);
    });
    setFailedAnswer(failedAnswers);
    const unSelectAnswers = ex.questions.filter(
      (item) => !selectedAnswers.some((answer) => answer.id === item.id),
    );
    setUnSelectedAnswers(unSelectAnswers);
  };

  // const handlePlayAudio = (record) => {
  //   setCurrentAudio(record);
  // };

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
    <>
      <div id="choose2-wrapper">
        <Grid container>
          {ex.questions.length > 0 &&
            ex.questions.map((question) => (
              <Grid key={question.id} item className="grid-item" xs={12}>
                <Typography
                  variant="body"
                  className={`ordinal-number ${
                    unSelectedAnswers.some((item) => item.id === question.id) ? 'not-choose' : ''
                  }`}
                >
                  {isNaN(question.ordinalNumber) === true ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body" fontSize="1.2rem">
                        {`(${question.ordinalNumber.split('(')[1]}`}
                      </Typography>
                      <Typography variant="body">{question.ordinalNumber.split('(')[0]}</Typography>
                    </Box>
                  ) : (
                    question.ordinalNumber + '.'
                  )}
                </Typography>
                <Grid container direction="row">
                  {question.content.split('/').map((content, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Typography sx={{ ml: '2.5rem' }} variant="body">
                          {index === 0 && content}
                        </Typography>
                        {index === 1 && (
                          <Box
                            sx={{
                              width: '100%',
                              margin: '1.2rem 2rem',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <StarIcon sx={{ color: '#09CEFA', fontSize: '2rem', mr: '0.8rem' }} />
                            <Typography
                              variant="body"
                              sx={{ display: 'inline', fontWeight: 'bold' }}
                            >
                              {content}
                            </Typography>
                          </Box>
                        )}
                        <Grid
                          container
                          className="option-list"
                          columnGap={{ xs: 2, md: 4, lg: 8 }}
                          wrap="nowrap"
                        >
                          {index === 2 &&
                            content.split(',').map((item) => (
                              <Grid
                                item
                                xs={12}
                                md={4}
                                lg={4}
                                key={item}
                                className={`option-item 
                         ${
                           isCheck === false
                             ? selectedAnswers.some(
                                 (answer) => answer.id === question.id && answer.answer === item,
                               )
                               ? 'clicked'
                               : ''
                             : correctAnswer.some(
                                 (answer) => answer.id === question.id && answer.answer === item,
                               )
                             ? 'true'
                             : failedAnswer.some(
                                 (answer) => answer.id === question.id && answer.answer === item,
                               )
                             ? 'false'
                             : 'not-choose'
                         }`}
                                onClick={() => handleSelectAnswer(question.id, item)}
                              >
                                <Typography variant="body">{item}</Typography>
                              </Grid>
                            ))}
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </Grid>
            ))}
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

        <Stack direction="row" className="button">
          <StyledButton onClick={handleCheckAnswer} disabled={isCheck} content="Kiểm tra" />
        </Stack>
      </div>
    </>
  );
}

export default Choose2;
