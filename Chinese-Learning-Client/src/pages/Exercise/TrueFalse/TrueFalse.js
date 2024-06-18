import * as React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import './TrueFalse.scss';
import { useState } from 'react';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';

function TrueFalse({ ex }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [failedAnswer, setFailedAnswer] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(ex.record ? ex.record : null);

  React.useEffect(() => {
    setSelectedAnswers([]);
    setCorrectAnswer([]);
    setFailedAnswer([]);
    setIsCheck(false);
    setCurrentAudio(ex.record ? ex.record : null);
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
    const correctAnswers = ex.questions.map((answer) => ({ id: answer.id, answer: answer.answer }));
    setCorrectAnswer(correctAnswers);
    const nullAnswers = ex.questions.filter(
      (item) => !selectedAnswers.some((answer) => answer.id === item.id),
    );
    const failedAnswers = selectedAnswers.filter((answer) => {
      return ex.questions.some((item) => item.id === answer.id && answer.answer !== item.answer);
    });
    setFailedAnswer([...failedAnswers, ...nullAnswers]);
  };

  // const handlePlayAudio = (record) => {
  //   setCurrentAudio(record);
  // };

  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div id="true-false-wrapper">
          <Stack className="true-false-text-wrapper" direction="row">
            <Stack direction="row" className="true-false-text">
              <Typography variant="body" className="true-text">
                True
              </Typography>
              <Typography variant="body">False</Typography>
            </Stack>
          </Stack>
          {/* Question */}
          <Box>
            {ex.questions.length > 0 &&
              ex.questions.map((question) => {
                let contentList = question.content.split('(');
                return (
                  <Stack direction="row" className="question" key={question.id}>
                    <Box marginTop="0.3rem" marginBottom="0.4rem" className="image">
                      <img src={question.images} alt="question" className="image-item" />
                    </Box>
                    <Stack direction="column" className="content">
                      <Typography variant="body" fontSize="1.2rem">
                        {`(${contentList[1]}`}
                      </Typography>
                      <Typography variant="body">{`${contentList[0]}`}</Typography>
                    </Stack>
                    <Stack direction="row" className="box-wrapper">
                      <Box
                        className={`true-box ${
                          selectedAnswers.some(
                            (answer) => answer.id === question.id && answer.answer === 'true',
                          )
                            ? 'clicked'
                            : ''
                        }`}
                        onClick={() => handleSelectAnswer(question.id, 'true')}
                      />
                      <Box
                        className={`false-box ${
                          selectedAnswers.some(
                            (answer) => answer.id === question.id && answer.answer === 'false',
                          )
                            ? 'clicked'
                            : ''
                        }`}
                        onClick={() => handleSelectAnswer(question.id, 'false')}
                      />
                    </Stack>
                    <Box
                      className={`answer ${
                        failedAnswer.some((answer) => answer.id === question.id) ? 'false' : ''
                      }`}
                    >
                      ✘
                    </Box>
                  </Stack>
                );
              })}
          </Box>

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
      </div>
    </>
  );
}

export default TrueFalse;
