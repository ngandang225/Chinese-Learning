import * as React from 'react';
import { useState } from 'react';
import { Stack, Grid, Button } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import './ChooseImage.scss';
import ReactAudioPlayer from 'react-audio-player';
import StyledButton from '../../../components/StyledButton/StyledButton';

function ChooseImage({ ex }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [failedAnswer, setFailedAnswer] = useState([]);
  const [unSelectedAnswers, setUnSelectedAnswers] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioKey, setAudioKey] = React.useState(0);
  const [clickedAudio, setClickedAudio] = React.useState(false);


  React.useEffect(() => {
    setUnSelectedAnswers([]);
    setSelectedAnswers([]);
    setCorrectAnswer([]);
    setFailedAnswer([]);
    setIsCheck(false);
    setCurrentAudio(null);
    // setExeAudio(ex.record ? ex.record : null);
  }, [ex]);

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

  const handleSelectAnswer = (questionId, answerIndex) => {
    !isCheck &&
      setSelectedAnswers((prevState) => {
        const updatedAnswers = prevState.map((answer) => {
          if (answer.id === questionId) {
            return { id: questionId, answer: answerIndex };
          }
          return answer;
        });
        const isNewAnswer = !prevState.some((answer) => answer.id === questionId);
        if (isNewAnswer) {
          updatedAnswers.push({ id: questionId, answer: answerIndex });
        }
        return updatedAnswers;
      });
  };

  const handleCheckAnswer = () => {
    //   setIsCheck(true);
    //   setCurrentAudio(null);

    //   const correctAnswers = ex.questions.map((answer) => ({ id: answer.id, answer: answer.answer }));
    //   setCorrectAnswer(correctAnswers);
    //   const failedAnswers = selectedAnswers.filter((answer) => {
    //     return ex.questions.some((item) => item.id === answer.id && answer.answer != item.answer);
    //   });
    //   setFailedAnswer(failedAnswers);

    setIsCheck(true);
    setCurrentAudio(null);
    // const correctAnswers = ex.questions.map((answer) => ({ id: answer.id, answer: answer.answer }));
    const correctAnswers = selectedAnswers.filter((answer) => {
      return ex.questions.some(
        (item) => item.id === answer.id && answer.answer.toString() === item.answer,
      );
    });
    setCorrectAnswer(correctAnswers);
    const failedAnswers = selectedAnswers.filter((answer) => {
      return ex.questions.some(
        (item) => item.id === answer.id && answer.answer.toString() !== item.answer,
      );
    });
    setFailedAnswer(failedAnswers);
    const unSelectAnswers = ex.questions.filter(
      (item) => !selectedAnswers.some((answer) => answer.id === item.id),
    );
    setUnSelectedAnswers(unSelectAnswers);
  };

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div id="choose-image-wrapper">
          {ex.questions.length > 0 &&
            ex.questions.map((question) => (
              <Grid container key={question.id}>
                <Grid
                  item
                  xs={2}
                  md={2}
                  lg={2}
                  className={`item ${unSelectedAnswers.some((item) => item.id === question.id) ? 'not-choose' : ''
                    }`}
                >
                  <HeadphonesIcon
                    className={`audio ${clickedAudio && currentAudio === question.record ? 'clicked' : ''}`}
                    sx={{ fontSize: '6rem' }}
                    onClick={() => handlePlayAudio(question.record)}
                  />
                </Grid>
                {question.images.split(',').map((image, index) => (
                  <Grid
                    key={index}
                    item
                    xs={(12 - 2) / question.images.split(',').length}
                    md={(12 - 2) / question.images.split(',').length}
                    lg={(12 - 2) / question.images.split(',').length}
                    className={`item 
                  ${isCheck === false
                        ? selectedAnswers.some(
                          (answer) => answer.id === question.id && answer.answer == index,
                        )
                          ? 'clicked'
                          : ''
                        : correctAnswer.some(
                          (answer) => answer.id === question.id && answer.answer == index,
                        )
                          ? 'true'
                          : failedAnswer.some(
                            (answer) => answer.id === question.id && answer.answer == index,
                          )
                            ? 'false'
                            : ''
                      }`}
                    onClick={() => handleSelectAnswer(question.id, index)}
                  >
                    <img src={image} alt={'logo'} className="image" />
                  </Grid>
                ))}
              </Grid>
            ))}
          {currentAudio && (
            <ReactAudioPlayer src={currentAudio} autoPlay controls style={{ display: 'none' }} />
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
              onClick={handleCheckAnswer}
              disabled={isCheck}
            >
              Kiểm tra
            </Button> */}
            <StyledButton onClick={handleCheckAnswer} disabled={isCheck} content="Kiểm tra" />
          </Stack>
        </div>
      </div>
    </>
  );
}

export default ChooseImage;
