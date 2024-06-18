import * as React from 'react';
import { useState } from 'react';
import { Box, Stack, Typography, Grid, Divider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './ComboBox3.scss';
import Audio from '../../../components/Audio/Audio';
import answerServices from '../../../services/answerServices';
import StyledButton from '../../../components/StyledButton/StyledButton';

function ComboBox3({ ex }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(ex.record ? ex.record : null);
  const [optionList, setOptionList] = useState([]);
  const [questionWithAnswer, setQuestionWithAnswer] = React.useState();
  const [showAnswers, setShowAnswer] = React.useState(false);

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
    if (optionList.length > 0) {
      GetExerciseWithAnswer();
    }
  }, [optionList]);
  React.useEffect(() => {
    setSelectedAnswers([]);
    setCorrectAnswer([]);
    setIsCheck(false);
    setCurrentAudio(ex.record ? ex.record : null);
    setShowAnswer(false);
    setQuestionWithAnswer(null);
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
  const letterColors = ['#A511A8', '#f57f17', '#12A60E', '#1017B5', '#FC0404', '#000'];

  const colors = ['#f9e4fd', '#fff9c4', '#d3ffcf', '#e9edfe', '#ffc7cb', '#eaeaea'];

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
    setCorrectAnswer(selectedAnswers.filter((item) => item.id === item.answer));
  };
  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      {/* <Box sx={{ width: '100%', px: '2rem', pt: '4rem' }}> */}
      <Box sx={{ width: '100%', px: '2rem', pt: '4rem' }} className="combobox3-question-wrapper">
        <Stack direction="column">
          {optionList.map((answer, index) => {
            const label = String.fromCharCode(65 + (index % 26));
            return (
              <div key={answer.id}>
                <div className="combobox3-answer-list">
                  <Typography
                    variant="body"
                    sx={{
                      fontWeight: 'bold',
                      p: '4px 24px',
                      mr: '4rem',
                      color: letterColors[index % colors.length],
                      backgroundColor: colors[index % colors.length],
                      border: `1px ${colors[index % colors.length]} solid`,
                      borderRadius: '2rem',
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography variant="body">{answer.content}</Typography>
                </div>
                <Divider
                  orientation="horizontal"
                  sx={{ mt: '4px', mb: '12px', backgroundColor: colors[index % colors.length] }}
                />
              </div>
            );
          })}
        </Stack>
      </Box>
      <div id="combobox3-wrapper">
        {ex.questions.length > 0 &&
          ex.questions.map((question) => {
            return (
              <div style={{ display: 'flex', alignItems: 'center' }} key={question.id}>
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
                      }`}
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

export default ComboBox3;
