import * as React from 'react';
import { Box, Stack, Typography, Grid, Button, Hidden } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import StyledButton from '../../../components/StyledButton/StyledButton';
import './Choose1.scss';

function Choose1({ ex }) {
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
      <div id="choose1-wrapper">
        <Grid container>
          {ex.questions.length > 0 &&
            ex.questions.map((question) => (
              <Grid key={question.id} item className="grid-item" xs={12} md={12} lg={6}>
                <Typography
                  variant="body"
                  className={`ordinal-number ${unSelectedAnswers.some((item) => item.id === question.id) ? 'not-choose' : ''
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
                <Box
                  className={`audio`}
                  onClick={() => handlePlayAudio(question.record)}
                  style={{ cursor: 'pointer' }}
                >
                  <CampaignIcon
                    // className={`${currentAudio === question.record ? 'clicked' : ''}`}
                    className={`speaker ${clickedAudio && currentAudio === question.record ? 'clicked' : ''
                      }`}
                    sx={{ fontSize: '8rem', color: '#0531f2' }}
                  />
                </Box>
                <Stack direction="column" className="option-list">
                  {question.content.split(',').map((item, index) => {
                    let contentList = [];
                    if (item.includes('(')) contentList = item.split('(');
                    return (
                      <Box
                        key={index}
                        className={`option-item 
                      ${isCheck === false
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
                        {/* {item} */}
                        {contentList.length ? (
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body" fontSize="1.2rem">
                              {`(${contentList[1]}`}
                            </Typography>
                            <Typography variant="body">{contentList[0]}</Typography>
                          </Box>
                        ) : (
                          <Typography variant="body">{item}</Typography>
                        )}
                      </Box>
                    );
                  })}
                </Stack>
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
          {/* <Button
            variant="contained"
            sx={{
              fontSize: '1.6rem',
              backgroundColor: '#ffeb3b',
              color: '#000',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#fbc02d',
              },
            }}
            disabled={isCheck}
            onClick={handleCheckAnswer}
          >
            Kiểm tra
          </Button> */}
          <StyledButton onClick={handleCheckAnswer} disabled={isCheck} content="Kiểm tra" />
        </Stack>
      </div>
    </>
  );
}

export default Choose1;
