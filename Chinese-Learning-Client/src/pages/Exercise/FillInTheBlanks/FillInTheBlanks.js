import * as React from 'react';
import { Grid, Typography, Box, Button, TextField, Stack } from '@mui/material';
import './FillInTheBlanks.scss';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';
function FillInTheBlanks({ ex }) {
  const [fillAnswer, setFillAnswer] = React.useState([]);
  const [failedFillAnswer, setFailedFillAnswer] = React.useState([]);
  const [checkExercise, setCheckExercise] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [showAnswers, setShowAnswer] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);

  React.useEffect(() => {
    setFillAnswer([]);
    setFailedFillAnswer([]);
    setCheckExercise([]);
    setCurrentAudio(ex.record ? ex.record : null);
    setShowAnswer(false);
    setIsCheck(false)
  }, [ex]);
  const checkAnswer = (ex) => {
    setIsCheck(true);
    setCheckExercise((prevState) => [...prevState, ex.id]);
    // lấy đáp án của câu hỏi
    const answers = ex.questions.map((item) => ({ id: item.id, answer: item.answer }));
    // ghép 2 input vào 1 answer
    const matchingAnswers = fillAnswer.map((element) => {
      const dataAnswers = element.data.reduce((sum, answer) => {
        return sum + answer.answer;
      }, '');
      return { id: element.id, answer: dataAnswers };
    });
    // lấy những câu có đáp án đúng
    const results = matchingAnswers.filter((answer) =>
      answers.some((item) => item.id === answer.id && item.answer === answer.answer),
    );
    // lấy những câu có đáp án sai
    const failAnswers = answers.filter((answer) => {
      return !results.some((item) => item.id === answer.id && item.answer === answer.answer);
    });
    setFailedFillAnswer((prevState) => {
      return [...prevState, ...failAnswers];
    });
  };
  const handleFillAnswer = (e, questionId, index, reAnswer) => {
    setFillAnswer((prevState) => {
      if (prevState.length <= 0) {
        return [
          {
            id: questionId,
            data: [
              {
                index: index,
                answer: (e.target.value + reAnswer).toLowerCase(),
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
                answer: (e.target.value + reAnswer).toLowerCase(),
              };
            } else {
              answerData.push({
                index: index,
                answer: (e.target.value + reAnswer).toLowerCase(),
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
                answer: (e.target.value + reAnswer).toLowerCase(),
              },
            ],
          });
        }
        return updatedAnswers;
      }
    });
  };
  const handleFillAnswer2 = (e, questionId, index, reAnswer) => {
    setFillAnswer((prevState) => {
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
    <div className="fill-in-blanks-wrapper">
      {ex.record && <Audio exeAudio={currentAudio} />}
      <Grid container marginLeft="2.8rem" className="question-5-wrapper">
        {ex.questions.length > 0 &&
          ex.exerciseType === 'Fill in the blanks' &&
          ex.questions.map((question) => {
            let questionItems = question.content.split('_');
            if (questionItems[0] === '') {
              questionItems = question.content.split('_').slice(1);
              return (
                <Grid
                  item
                  marginTop="2rem"
                  xs={6}
                  md={6}
                  lg={6}
                  key={question.id}
                  className="question-5"
                >
                  <Typography
                    variant="body"
                    marginRight="0.8rem"
                  >{`(${question.ordinalNumber})`}</Typography>
                  {questionItems.map((item, index) => (
                    <Box
                      key={index}
                      className={`question-key ${checkExercise?.length > 0 &&
                        checkExercise.includes(ex.id) &&
                        failedFillAnswer.some((item) => item.id === question.id)
                        ? 'true'
                        : 'false'
                        }`}
                    >
                      <TextField
                        value={
                          fillAnswer?.length > 0 &&
                            fillAnswer?.find((item) => item.id === question.id)
                            ? fillAnswer.find((item) =>
                              item.data.some((data) => data.index === index),
                            )
                              ? fillAnswer.find((item) =>
                                item.data
                                  .some((data) => data.index === index)
                                  .data?.find((data) => data.index === index),
                              )?.answer
                              : ''
                            : ''
                        }
                        id="standard-basic"
                        variant="standard"
                        className="textfield"
                        sx={{
                          width: '2.8rem',
                          marginLeft: '0.4rem',
                        }}
                        onChange={(e) => handleFillAnswer(e, question.id, index, item)}
                      />
                      <Typography variant="body">{item}</Typography>
                    </Box>
                  ))}
                </Grid>
              );
            } else {
              questionItems.pop();
              return (
                <Grid
                  item
                  marginTop="2rem"
                  xs={6}
                  md={6}
                  lg={6}
                  key={question.id}
                  className="question-5"
                >
                  <Typography
                    variant="body"
                    marginRight="0.8rem"
                  >{`(${question.ordinalNumber})`}</Typography>
                  {questionItems.map((item, index) => (
                    <Box
                      key={index}
                      className={`question-key ${checkExercise?.length > 0 &&
                        checkExercise.includes(ex.id) &&
                        failedFillAnswer.some((item) => item.id === question.id)
                        ? 'true'
                        : 'false'
                        }`}
                    >
                      <Typography variant="body">{item}</Typography>
                      <TextField
                        value={
                          fillAnswer?.length > 0 &&
                            fillAnswer?.find((item) => item.id === question.id)
                            ? fillAnswer.find((item) =>
                              item.data.some((data) => data.index === index),
                            )
                              ? fillAnswer.find((item) =>
                                item.data
                                  .some((data) => data.index === index)
                                  .data?.find((data) => data.index === index),
                              )?.answer
                              : ''
                            : ''
                        }
                        id="standard-basic"
                        variant="standard"
                        className="textfield"
                        sx={{
                          width: '2.8rem',
                          marginLeft: '0.4rem',
                        }}
                        onChange={(e) => handleFillAnswer2(e, question.id, index, item)}
                      />
                    </Box>
                  ))}
                </Grid>
              );
            }
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
        <Grid container style={{ marginTop: '4rem', marginLeft: '2.8rem' }}>
          {ex.exerciseType === 'Fill in the blanks' &&
            ex.questions.map((question) => (
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
  );
}

export default FillInTheBlanks;
