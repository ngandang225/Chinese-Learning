import * as React from 'react';
import { Grid, Box, Typography, TextField, Stack } from '@mui/material';
import './FillInNumber.scss';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';
function FillInNumber({ ex }) {
  const [fillNumberAnswer, setFillNumberAnswer] = React.useState([]);
  const [rightAnswer, setRightAnswer] = React.useState([]);
  const [checkExercise, setCheckExercise] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [showAnswers, setShowAnswer] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);

  React.useEffect(() => {
    setFillNumberAnswer([]);
    setRightAnswer([]);
    setCheckExercise([]);
    setCurrentAudio(ex.record ? ex.record : null);
    setShowAnswer(false);
    setIsCheck(false);
  }, [ex]);
  const checkAnswer = (ex) => {
    setIsCheck(true);
    setCheckExercise((prevState) => [...prevState, ex.id]);
    // lấy đáp án của câu hỏi
    const answers = ex.questions.map((item) => ({ id: item.id, answer: item.answer.split(',') }));
    // lấy những câu có đáp án đúng
    const results = fillNumberAnswer.map((answer) => ({
      ...answer,
      data: answer.data.filter((answerData) =>
        answers.some((item) => item.id === answer.id && item.answer.includes(answerData.answer)),
      ),
    }));

    // lấy những câu có đáp án sai
    // const failAnswers = answers.filter((answer) => {
    //   return !results.some((item) => item.id === answer.id && item.answer === answer.answer);
    // });
    setRightAnswer((prevState) => {
      return [...prevState, ...results];
    });
  };
  console.log(rightAnswer);
  const handleFillNumberAnswer = (e, questionId, index) => {
    setFillNumberAnswer((prevState) => {
      if (prevState.length <= 0) {
        return [
          {
            id: questionId,
            data: [
              {
                index: index,
                answer: e.target.value.toLowerCase(),
              },
            ],
          },
        ];
      } else {
        let updatedAnswers = prevState.map((answer) => {
          if (answer.id === questionId) {
            let answerData = answer.data;
            const indexExisted = answerData.findIndex((item) => item.index === index);
            if (indexExisted !== -1) {
              answerData[indexExisted] = {
                index: index,
                answer: e.target.value.toLowerCase(),
              };
            } else {
              answerData.push({
                index: index,
                answer: e.target.value.toLowerCase(),
              });
            }
            return {
              id: questionId,
              data: answerData,
            };
          }
          return answer;
        });

        const isNewAnswer = !prevState.some((answer) => answer.id === questionId);

        if (isNewAnswer) {
          updatedAnswers.push({
            id: questionId,
            data: [
              {
                index: index,
                answer: e.target.value.toLowerCase(),
              },
            ],
          });
        }
        return updatedAnswers;
      }
    });
  };
  console.log(fillNumberAnswer);
  return (
    <div className="fill-in-number-wrapper">
      <div style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>
        *Lưu ý: Trên mỗi dòng chỉ điền 1 số và không có ký tự gì đi kèm.
      </div>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <Grid container className="question-7-wrapper" spacing={{ xs: 1, md: 2, lg: 2 }}>
        {ex.questions.length > 0 &&
          ex.exerciseType === 'Fill in number' &&
          ex.questions.map((question) => {
            let answersList = question.answer.split(',');
            return (
              <Grid
                item
                key={question.id}
                xs={12 / ex.questions.length}
                md={12 / ex.questions.length}
                lg={12 / ex.questions.length}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack direction="column">
                    <Box
                      // variant="h4"
                      // marginLeft="2.4rem"
                      className={`question-key`}
                    >
                      <img draggable={false} src={question.images} alt="column" width="64rem" />
                    </Box>
                    {answersList.map((item, index) => (
                      <TextField
                        value={
                          fillNumberAnswer?.length > 0 &&
                          fillNumberAnswer?.find((item) => item.id === question.id)
                            ? fillNumberAnswer.find((item) =>
                                item.data.some((data) => data.index === index),
                              )
                              ? fillNumberAnswer.find((item) =>
                                  item.data
                                    .some((data) => data.index === index)
                                    .data?.find((data) => data.index === index),
                                )?.answer
                              : ''
                            : ''
                        }
                        key={index}
                        id="standard-basic"
                        variant="standard"
                        className={`textfield-word 
                        ${
                          isCheck
                            ? rightAnswer.some(
                                (answer) =>
                                  answer.id === question.id &&
                                  answer.data.some((item) => item.index === index),
                              )
                              ? 'true'
                              : 'false'
                            : ''
                        }`}
                        sx={{
                          marginLeft: '0.8rem',
                          maxWidth: '6rem',
                          marginTop: '0.4rem',
                        }}
                        onChange={(e) => handleFillNumberAnswer(e, question.id, index)}
                      />
                    ))}
                  </Stack>
                </div>
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
      {!!showAnswers && (
        <Grid container style={{ marginTop: '4rem' }}>
          {ex.exerciseType === 'Fill in number' &&
            ex.questions.map((question) => (
              <Grid
                item
                xs={6}
                md={6}
                lg={6}
                key={question.id}
                display="flex"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '1.2rem' }}
                alignItems="center"
                marginBottom="0.8rem"
              >
                <img src={question.images} alt="column" width="64rem" />
                <Typography variant="body" marginLeft="1.2rem">
                  {question.answer.split(',').join(', ')}
                </Typography>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}

export default FillInNumber;
