import * as React from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from '@mui/material';
import './Choose.scss';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';
function Choose({ ex }) {
  const [chooseAnswers, setChooseAnswers] = React.useState([]);
  const [checkExercise, setCheckExercise] = React.useState([]);
  const [failedAnswer, setFailedAnswer] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [isCheck, setIsCheck] = React.useState(false);

  React.useEffect(() => {
    setChooseAnswers([]);
    setCheckExercise([]);
    setFailedAnswer([]);
    setIsCheck(false);
    setCurrentAudio(ex.record ? ex.record : null);
  }, [ex]);
  const checkAnswer = (ex) => {
    setIsCheck(true);
    setCheckExercise((prevState) => [...prevState, ex.id]);
    // lấy đáp án của câu hỏi
    const answers = ex.questions.map((item) => item.answer);
    // lấy những câu có đáp án đúng
    const results = chooseAnswers.filter((answer) =>
      answers.some((item) => item === answer.answer),
    );
    // lấy những câu có đáp án sai
    const failAnswers = chooseAnswers.filter((item) => !results.includes(item));
    // lấy những câu không có đáp án
    const nullAnswers = ex.questions
      .filter((question) => !chooseAnswers.some((answer) => answer.id === question.id))
      .map((question) => ({ id: question.id, answer: null }));
    setFailedAnswer((prevState) => {
      return [...prevState, ...failAnswers, ...nullAnswers];
    });
  };
  const handleChooseAnswers = (e, questionId) => {
    setChooseAnswers((prevState) => {
      const updatedAnswers = prevState.map((answer) => {
        if (answer.id === questionId) {
          return { id: questionId, answer: e.target.value };
        }
        return answer;
      });

      const isNewAnswer = !prevState.some((answer) => answer.id === questionId);
      if (isNewAnswer) {
        updatedAnswers.push({ id: questionId, answer: e.target.value });
      }

      return updatedAnswers;
    });
  };
  return (
    <div className="choose-wrapper">
      {ex.record && <Audio exeAudio={currentAudio} />}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginTop: '2.8rem', width: '100%' }}>
          {ex.questions.length > 0 &&
            ex.exerciseType === 'Choose' &&
            ex.questions.map((question) => {
              let questionContents = question.content.split(',');
              return (
                <Box marginTop="1.2rem" key={question.id} className="question-3-wrapper">
                  <Grid
                    container
                    className="question-3"
                    spacing={{ xs: 1, md: 2, lg: 1 }}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Grid item xs={2} md={2} lg={2}>
                      {`(${question.ordinalNumber})`}
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                      <RadioGroup
                        row
                        onChange={(e) => handleChooseAnswers(e, question.id)}
                        value={
                          chooseAnswers.length > 0 &&
                            chooseAnswers.find((item) => item.id === question.id)
                            ? chooseAnswers.find((item) => item.id === question.id).answer
                            : ''
                        }
                      >
                        <Grid container>
                          {questionContents.map((item, index) => (
                            <Grid
                              item
                              xs={12 / questionContents.length}
                              md={12 / questionContents.length}
                              lg={12 / questionContents.length}
                              key={index}
                            >
                              <FormControlLabel
                                disabled={checkExercise.includes(ex.id)}
                                value={item}
                                control={
                                  <Radio
                                    sx={{
                                      '&.Mui-checked': {
                                        color: '#fbc02d',
                                      },
                                      marginRight: '0.8rem',
                                    }}
                                    className="radio-btn"
                                  />
                                }
                                label={
                                  <Typography
                                    variant="body"
                                    className={`question-key ${checkExercise?.length > 0 &&
                                      checkExercise.includes(ex.id) &&
                                      failedAnswer.some(
                                        (answer) =>
                                          answer.id === question.id && question.answer === item,
                                      )
                                      ? 'true'
                                      : 'false'
                                      }`}
                                  >
                                    {item}
                                  </Typography>
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <br></br>
                </Box>
              );
            })}
        </div>
      </div>
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
          onClick={() => checkAnswer(ex)}
          disabled={checkExercise.includes(ex.id)}
        >
          Kiểm tra
        </Button> */}
        <StyledButton
          onClick={() => checkAnswer(ex)}
          disabled={isCheck && checkExercise.includes(ex.id)}
          content="Kiểm tra"
        />
      </Stack>
    </div>
  );
}

export default Choose;
