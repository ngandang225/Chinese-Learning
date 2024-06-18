import * as React from 'react';
import { Grid, Typography, Box, Button, TextField, Stack } from '@mui/material';
import './Match.scss';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';
function Match({ ex }) {
  const [matchAnswers, setMatchAnswers] = React.useState([]);
  const [checkExercise, setCheckExercise] = React.useState([]);
  const [failedMatchAnswer, setFailedMatchAnswer] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [showAnswers, setShowAnswer] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);

  React.useEffect(() => {
    setMatchAnswers([]);
    setCheckExercise([]);
    setFailedMatchAnswer([]);
    setCurrentAudio(ex.record ? ex.record : null);
    setShowAnswer(false);
    setIsCheck(false);
  }, [ex]);

  const checkAnswer = (ex) => {
    setIsCheck(true);
    setCheckExercise((prevState) => [...prevState, ex.id]);
    // lấy đáp án của câu hỏi
    const answers = ex.questions.map((item) => ({ id: item.id, answer: item.answer }));
    // tạo mới mảng đáp án đúng, khớp với user answers
    const correctAnswers = answers.map((answer) => {
      let answerData = answer.answer.split('-');
      return {
        id: answer.id,
        data: answerData.map((data, index) => ({ index: index, answer: data })),
      };
    });
    // lấy những câu có đáp án đúng
    const results = [];
    for (const item2 of correctAnswers) {
      for (const item1 of matchAnswers) {
        if (item1.id === item2.id) {
          const matchingElements = item1.data.filter((data1) =>
            item2.data.some(
              (data2) => data1.index === data2.index && data1.answer === data2.answer,
            ),
          );
          results.push({ id: item1.id, data: matchingElements });
        }
      }
    }
    // lấy những câu có đáp án sai
    const failAnswers = correctAnswers.map((item) => ({
      ...item,
      data: item.data.filter(
        (data) =>
          !results.some(
            (resultItem) =>
              resultItem.id === item.id &&
              resultItem.data.some(
                (resultData) =>
                  resultData.index === data.index && resultData.answer === data.answer,
              ),
          ),
      ),
    }));
    setFailedMatchAnswer((prevState) => {
      return [...prevState, ...failAnswers];
    });
  };
  const handleMatchAnswer = (e, questionId, index, reAnswer) => {
    setMatchAnswers((prevState) => {
      if (prevState.length <= 0) {
        return [
          {
            id: questionId,
            data: [
              {
                index: index,
                answer: (reAnswer + e.target.value).toLowerCase(),
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
                answer: (reAnswer + e.target.value).toLowerCase(),
              };
            } else {
              answerData.push({
                index: index,
                answer: (reAnswer + e.target.value).toLowerCase(),
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
                answer: (reAnswer + e.target.value).toLowerCase(),
              },
            ],
          });
        }
        return updatedAnswers;
      }
    });
  };
  return (
    <div className="match-wrapper">
      <div style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>
        *Điền vào chỗ trống để nối từ cho đúng.
      </div>
      {ex.record && <Audio exeAudio={currentAudio} />}
      {ex.questions.length > 0 &&
        ex.questions.map((question) => {
          let column1 = question.content.split('-')[0];
          let column2 = question.content.split('-')[1];
          return (
            <Box key={question.id} className="question-4-wrapper">
              <Grid container className="question-4" spacing={{ xs: 0, md: 2, lg: 6 }}>
                {ex.questions.length > 1 && (
                  <Grid item xs={12} md={2} lg={2} marginTop="3rem">
                    <Typography variant="body">{`(${question.ordinalNumber})`}</Typography>
                  </Grid>
                )}
                <Grid item xs={3} md={3} lg={3} marginTop="2rem" className="content-column-1">
                  {column1.split(',').map((item, index) => (
                    <Box key={index} marginTop="1rem">
                      <Typography variant="body">{item}</Typography>
                      <br></br>
                    </Box>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={3}
                  lg={3}
                  margin="2rem 5.6rem 0 -4rem"
                  className="content-column-2"
                >
                  {column2.split(',').map((item, index) => (
                    <Box key={index} marginTop="1rem">
                      <Typography variant="body">{item}</Typography>
                      <br></br>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={4} md={3} lg={3} marginTop="2rem" className="content-column-3">
                  {column1.split(',').map((item, index) => (
                    <Box key={index} marginTop="1rem">
                      <Typography
                        className={`question-key ${checkExercise?.length > 0 &&
                          checkExercise.includes(ex.id) &&
                          failedMatchAnswer.some(
                            (answer) =>
                              answer.id === question.id &&
                              answer.data.some((data) => data.index === index),
                          )
                          ? 'true'
                          : 'false'
                          }`}
                        variant="body"
                      >
                        {item}
                      </Typography>
                      <TextField
                        value={
                          matchAnswers?.length > 0 &&
                            matchAnswers?.find((item) => item.id === question.id)
                            ? matchAnswers.find((item) =>
                              item.data.some((data) => data.index === index),
                            )
                              ? matchAnswers.find((item) =>
                                item.data
                                  .some((data) => data.index === index)
                                  .data?.find((data) => data.index === index),
                              )?.answer
                              : ''
                            : ''
                        }
                        id="standard-basic"
                        variant="standard"
                        sx={{
                          width: '5rem',
                          marginLeft: '0.4rem',
                        }}
                        onChange={(e) => handleMatchAnswer(e, question.id, index, item)}
                      />
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Box>
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
        <div
          style={{
            marginTop: '4rem',
            marginLeft: '2rem',
          }}
        >
          {ex.exerciseType === 'Match' &&
            ex.questions.map((question) => {
              let answerList = question.answer.split('-');
              return (
                <Grid container spacing={{ xs: 0 }} key={question.id} className="answer-item">
                  {question.ordinalNumber && (
                    <Grid item xs={12} md={2} lg={2} style={{ marginTop: '1.2rem' }}>
                      <Typography
                        variant="body"
                        marginRight="0.8rem"
                      >{`(${question.ordinalNumber})`}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} md={10} lg={6} style={{ marginTop: '1.2rem' }}>
                    {answerList.map((item, index) => (
                      <Typography variant="body" marginRight="2rem" key={index}>
                        {item}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Match;
