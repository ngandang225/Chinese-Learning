import * as React from 'react';
import { useState } from 'react';
import { Stack, Typography, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './ComboBox4.scss';
import Audio from '../../../components/Audio/Audio';
import answerServices from '../../../services/answerServices';
import StyledButton from '../../../components/StyledButton/StyledButton';

function ComboBox4({ ex }) {
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
        answer: foundItem ? foundItem.content : '', // Use the content of the found item or an empty string if not found
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
    setShowAnswer(false);
    setQuestionWithAnswer(null);
    setCurrentAudio(ex.record ? ex.record : null);
    answerServices
      .getByExerciseId(ex.id)
      .then((data) => setOptionList(data))
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
    setCorrectAnswer(selectedAnswers.filter((item) => item.id === item.answer));
  };

  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <div id="combobox4-wrapper">
        {ex?.questions?.length > 0 &&
          ex?.questions?.map((question) => (
            <div style={{ display: 'flex' }} key={question.id}>
              <Typography variant="body" marginRight="2rem">
                {`(${question.ordinalNumber})`}
              </Typography>
              <Stack
                direction="row"
                className="question"
                key={question.id}
                sx={{ marginBottom: '3rem' }}
              >
                <img className="image-answer" src={question.images} alt="questtion" />

                <div style={{ display: 'flex' }}>
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
                      {optionList?.map((option, index) => (
                        <MenuItem sx={{ fontSize: '1.6rem' }} key={index} value={option.questionId}>
                          {option.content}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Stack>
            </div>
          ))}

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

export default ComboBox4;
