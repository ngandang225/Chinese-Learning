import * as React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import './TrueFalse2.scss';
import { useState } from 'react';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';

function TrueFalse2({ ex }) {
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

      <div id="true-false-2-wrapper">
        <Stack className="true-false-text-wrapper" direction="row">
          <Stack direction="row" className="true-false-text">
            <Typography
              variant="body"
              sx={{ color: '#1fe161', fontWeight: 'bold' }}
              className="true-text"
            >
              True
            </Typography>
            <Typography variant="body" sx={{ color: '#f53217', fontWeight: 'bold' }}>
              False
            </Typography>
          </Stack>
        </Stack>
        {/* Question */}
        <table className="table-container">
          {ex.questions.length > 0 &&
            ex.questions.map((question, index) => {
              return (
                <tbody key={question.id}>
                  <tr className="question">
                    <td className="ordinal-number">{question.ordinalNumber}</td>
                    <td className="image">
                      <img src={question.images} alt="question" className="image-item" />
                    </td>
                    <td className="content">{question.content}</td>
                    <td className="box-wrapper">
                      <div
                        style={{
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <p
                          className={`true-box ${
                            selectedAnswers.some(
                              (answer) => answer.id === question.id && answer.answer === 'true',
                            )
                              ? 'clicked'
                              : ''
                          }`}
                          onClick={() => handleSelectAnswer(question.id, 'true')}
                        />
                        <p
                          className={`false-box ${
                            selectedAnswers.some(
                              (answer) => answer.id === question.id && answer.answer === 'false',
                            )
                              ? 'clicked'
                              : ''
                          }`}
                          onClick={() => handleSelectAnswer(question.id, 'false')}
                        />
                      </div>
                    </td>
                    <td
                      className={`answer ${
                        failedAnswer.some((answer) => answer.id === question.id) ? 'false' : ''
                      }`}
                    >
                      ✘
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>

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

export default TrueFalse2;
