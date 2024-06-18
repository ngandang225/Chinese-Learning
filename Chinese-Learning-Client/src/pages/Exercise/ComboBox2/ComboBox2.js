import * as React from 'react';
import { useState } from 'react';
import { Box, Stack, Typography, Grid, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './ComboBox2.scss';
import Audio from '../../../components/Audio/Audio';
import answerServices from '../../../services/answerServices';
import StyledButton from '../../../components/StyledButton/StyledButton';

function ComboBox2({ ex }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(ex.record ? ex.record : null);
  const [optionList, setOptionList] = useState([]);
  const [questionWithAnswer, setQuestionWithAnswer] = React.useState();
  const [showAnswers, setShowAnswer] = React.useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const GetExerciseWithAnswer = () => {
    const questionList = [...ex.questions];
    const questionsWithAnswer = questionList.map((ques) => {
      const foundItem = optionList.find((item) => item.questionId === ques.id);
      return {
        ...ques,
        answer: foundItem ? foundItem.label : '', // Use the content of the found item or an empty string if not found
      };
    });
    setQuestionWithAnswer(questionsWithAnswer);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // No need to remove event listener in React 18+
      // React will handle it automatically
    };
  }, []);

  React.useEffect(() => {
    if (optionList.length > 0) {
      GetExerciseWithAnswer();
    }
  }, [optionList]);

  React.useEffect(() => {
    setSelectedAnswers([]);
    setCorrectAnswer([]);
    setIsCheck(false);
    setCurrentAudio(ex.record ? ex.record : null);
    setQuestionWithAnswer(null);
    setShowAnswer(false);
    answerServices
      .getByExerciseId(ex.id)
      .then((data) =>
        setOptionList(
          data.map((item, index) => {
            const label = String.fromCharCode(65 + index);
            return {
              label: label,
              ...item,
              questionId: item.questionId ? item.questionId : -1,
            };
          }),
        ),
      )
      .catch((err) => console.log(err));
  }, [ex]);

  const handleSelectAnswer = (questionId, answerItem) => {
    !isCheck &&
      setSelectedAnswers((prevState) => {
        if (prevState.length <= 0) {
          return [
            {
              id: questionId,
              answer: answerItem,
            },
          ];
        } else {
          const existedId = prevState.findIndex((answer) => answer.id === questionId);
          let updatedAnswers = prevState;

          if (existedId !== -1)
            updatedAnswers[existedId] = {
              id: questionId,
              answer: answerItem,
            };
          else
            updatedAnswers.push({
              id: questionId,
              answer: answerItem,
            });

          return [...updatedAnswers];
        }
      });
  };

  const handleCheckAnswer = () => {
    setIsCheck(true);
    // lấy những câu có đáp án đúng
    setCorrectAnswer(selectedAnswers.filter((item) => item.id === item.answer));
  };
  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <Box
        className="image-list"
        display="flex"
        sx={{ flexGrow: 1, width: '100%', px: '2rem', pt: '4rem' }}
      >
        <Grid container spacing={2} rowSpacing={6}>
          {optionList.map((answer) => {
            return (
              <Grid item xs={6} sm={6} md={4} key={answer.id} sx={{ display: 'flex' }}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                  <Typography variant="body" sx={{ marginRight: '1rem' }}>
                    {answer.label}
                  </Typography>
                  <div style={{ flex: '90%', maxWidth: '100%', maxHeight: '15rem' }}>
                    <img className="image-answer" src={answer.content} alt="question" />
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <div
        id="combobox2-wrapper"
        style={
          ex.questions[0].content === ''
            ? {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }
            : {
                // paddingLeft: `${ex.questions[0].content === '' ? '2rem' : '2rem'}`,
                // paddingRight: `${ex.questions[0].content === '' ? '2rem' : '2rem'}`,
              }
        }
        // style={{ paddingLeft: '8rem' }}
      >
        {ex.questions.length > 0 &&
          ex.questions.map((question) => {
            return (
              <div
                key={question.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: `${
                    ex.questions[0].content === ''
                      ? windowSize.width >= 740
                        ? '50%'
                        : '100%'
                      : '100%'
                  }`,
                }}
              >
                <Typography variant="body" sx={{ flex: 1, mr: '1.2rem', mt: '0.2rem' }}>
                  {`(${question.ordinalNumber})`}
                </Typography>
                <Stack
                  direction="row"
                  className="question"
                  flexWrap="wrap"
                  flex={11}
                  sx={{ marginBottom: '1.2rem' }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body">{question.content}</Typography>
                    <FormControl
                      className={`combo-box
                      ${
                        isCheck
                          ? correctAnswer.some((answer) => answer.id === question.id)
                            ? 'true'
                            : 'false'
                          : ''
                      }
                      `}
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ fontSize: '1.6rem' }}
                        value={
                          selectedAnswers.find((answer) => answer.id === question.id)?.answer || ''
                        }
                        onChange={(e) => handleSelectAnswer(question.id, e.target.value)}
                      >
                        {optionList.map((option, index) => (
                          <MenuItem
                            sx={{ fontSize: '1.6rem' }}
                            key={index}
                            value={option.questionId}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Stack>
              </div>
            );
          })}

        <Stack direction="row" className="button">
          <StyledButton onClick={handleCheckAnswer} disabled={isCheck} content="Kiểm tra" />
          <div style={{ marginLeft: '2rem' }}>
            <StyledButton
              onClick={() => setShowAnswer(!showAnswers)}
              content={!!showAnswers ? 'Đóng đáp án' : 'Xem đáp án'}
              type="border-accent"
            />
          </div>
        </Stack>
        {!!showAnswers && (
          <Grid
            container
            style={{ marginTop: '4rem', marginLeft: '2.8rem' }}
            className="answer-wrapper"
          >
            {questionWithAnswer.map((question) => (
              <Grid item xs={6} md={6} lg={6} key={question.id} style={{ marginTop: '1.2rem' }}>
                <Typography
                  variant="body"
                  marginRight="2rem"
                >{`(${question.ordinalNumber})`}</Typography>
                <Typography variant="body">{question.answer}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

export default ComboBox2;
