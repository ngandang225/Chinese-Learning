import * as React from 'react';
import { Grid, Box, Button, Typography, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import './SameOrNot.scss';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';
function SameOrNot({ ex }) {
  const [sameAnswer, setSameAnswer] = React.useState([]);
  const [failedSameAnswer, setFailedSameAnswer] = React.useState([]);
  const [rightAnswer, setRightAnswer] = React.useState([]);
  const [checkExercise, setCheckExercise] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [showAnswers, setShowAnswer] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);

  React.useEffect(() => {
    setSameAnswer([]);
    setCheckExercise([]);
    setRightAnswer([]);
    setFailedSameAnswer([]);
    setCurrentAudio(ex.record ? ex.record : null);
    setShowAnswer(false);
    setIsCheck(false);
  }, [ex]);
  const checkAnswer = (ex) => {
    setIsCheck(true);
    setCheckExercise((prevState) => [...prevState, ex.id]);

    const correctAnswers = ex.questions.filter((ques) => ques.answer === 'same');
    // lấy những câu đã trả lời đúng
    const results = sameAnswer.filter((id) =>
      correctAnswers.some((item) => item.id === parseInt(id)),
    );
    setRightAnswer(results);
    // lấy những câu đã trả lời sai
    const failAnswers = sameAnswer.filter((item) => !results.includes(item));
    setFailedSameAnswer((prevState) => {
      return [...prevState, ...failAnswers];
    });
  };
  const handleQuestionCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSameAnswer((pre) => [...pre, value]);
    } else {
      setSameAnswer((pre) => {
        return [...pre.filter((ans) => ans !== value)];
      });
    }
  };

  return (
    <div className="same-or-not-wrapper">
      <div style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>
        *Chọn đáp án mà bạn cho là đúng.
      </div>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <Grid container className="exercise-same-or-not" spacing={{ xs: 0, md: 2, lg: 3 }}>
        {ex.questions.length > 0 &&
          ex.exerciseType === 'Same or not' &&
          ex.questions.map((question) => {
            return (
              <Grid item xs={6} md={6} lg={6} key={question.id} className="same-or-not-question">
                <Typography
                  variant="body"
                  marginRight="0.8rem"
                >{`(${question.ordinalNumber})`}</Typography>

                <Box
                  className={`question-key ${
                    checkExercise?.length > 0 &&
                    checkExercise.includes(ex.id) &&
                    failedSameAnswer.some((item) => item === question.id.toString())
                      ? 'false'
                      : rightAnswer.some((item) => item === question.id.toString())
                      ? 'true'
                      : ''
                  }`}
                >
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={question.id}
                    disabled={checkExercise.includes(ex.id)}
                    checked={sameAnswer.includes(question.id.toString())}
                    onChange={(event) => handleQuestionCheckboxChange(event)}
                  />
                  <Typography variant="body">{question.content}</Typography>
                </Box>
              </Grid>
            );
          })}
      </Grid>
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
        <div style={{ marginLeft: '2rem' }}>
          <StyledButton
            onClick={() => setShowAnswer(!showAnswers)}
            content={!!showAnswers ? 'Đóng đáp án' : 'Xem đáp án'}
            type="border-accent"
          />
        </div>
      </Stack>
      {/* Answer */}
      {!!showAnswers && (
        <Grid container style={{ marginTop: '4rem', marginLeft: '2rem' }}>
          <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlineIcon
              sx={{
                fontSize: '2.8rem',
                marginRight: '1.2rem',
                color: '#09ef71',
              }}
            />
            {ex.questions
              .filter((ques) => ques.answer === 'same')
              .map((question) => (
                <Typography
                  key={question.id}
                  variant="body"
                  marginRight="2rem"
                >{`(${question.ordinalNumber})`}</Typography>
              ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: 'flex', alignItems: 'center', marginTop: '1.2rem' }}
          >
            <CancelOutlinedIcon
              sx={{
                fontSize: '2.8rem',
                marginRight: '1.2rem',
                color: '#ef0909',
              }}
            />
            {ex.questions
              .filter((ques) => ques.answer === 'not')
              .map((question) => (
                <Typography
                  key={question.id}
                  variant="body"
                  marginRight="2rem"
                >{`(${question.ordinalNumber})`}</Typography>
              ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default SameOrNot;
