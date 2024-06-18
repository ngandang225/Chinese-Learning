import * as React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import './FillInBlanksConversation.scss';
import { useState } from 'react';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';

function FillInBlanksConversation({ ex }) {
  const [fillAnswer, setFillAnswer] = useState([]);
  const [failedAnswer, setFailedAnswer] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(ex.record ? ex.record : null);
  const [showAnswers, setShowAnswer] = React.useState(false);

  React.useEffect(() => {
    setFillAnswer([]);
    setFailedAnswer([]);
    setIsCheck(false);
    setShowAnswer(false);
    setCurrentAudio(ex.record ? ex.record : null);
  }, [ex]);

  const handleFillAnswer = (e, questionId, index) => {
    setFillAnswer((prevState) => {
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

  const handleCheckAnswer = () => {
    setIsCheck(true);
    const answers = ex.questions.map((item) => ({ id: item.id, answer: item.answer }));
    // nối answer
    const matchingAnswers = fillAnswer.map((element) => {
      const dataAnswers = element.data.reduce((sum, answer, index) => {
        return index !== element.data.length - 1 ? sum + answer.answer + ',' : sum + answer.answer;
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
    setFailedAnswer((prevState) => {
      return [...prevState, ...failAnswers];
    });
  };

  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <div id="fill-in-blanks-conversation-wrapper">
        {ex.questions.map((question) => {
          let wordsVsPinyin = question.content.split('/');
          let contentItems = wordsVsPinyin[0].split('_');
          if (contentItems[0] === '') contentItems = wordsVsPinyin[0].split('_').slice(1);

          if (question.id % 2 !== 0) {
            return (
              <Stack direction="row" key={question.id} className="content-wrapper">
                <img src={question.images} alt="question" className="character" />
                {wordsVsPinyin[0].split('_')[0] === '' ? (
                  <div className={`chat-box ${question.id % 2 !== 0 ? 'odd' : 'even'}`}>
                    <Typography className="subtitle">{`(${wordsVsPinyin[1]})`}</Typography>
                    {contentItems.map((item, index) => (
                      <Box key={index} className="content-item">
                        <input
                          type="text"
                          className={`input ${isCheck
                            ? failedAnswer.some((item) => item.id === question.id)
                              ? 'false'
                              : 'true'
                            : ''
                            }`}
                          onChange={(e) => handleFillAnswer(e, question.id, index)}
                        />
                        <Typography variant="body" sx={{ zIndex: 10, position: 'relative' }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </div>
                ) : (
                  <div className={`chat-box ${question.id % 2 !== 0 ? 'odd' : 'even'}`}>
                    <Typography className="subtitle">{`(${wordsVsPinyin[1]})`}</Typography>
                    {contentItems.map((item, index) => {
                      if (index !== contentItems.length - 1)
                        return (
                          <Box key={index} className="content-item">
                            <Typography variant="body" sx={{ zIndex: 10, position: 'relative' }}>
                              {item}
                            </Typography>
                            <input
                              type="text"
                              className={`input ${isCheck
                                ? failedAnswer.some((item) => item.id === question.id)
                                  ? 'false'
                                  : 'true'
                                : ''
                                }`}
                              onChange={(e) => handleFillAnswer(e, question.id, index)}
                            />
                          </Box>
                        );
                      else {
                        return (
                          <Box key={index} className="content-item">
                            <Typography variant="body" sx={{ zIndex: 10, position: 'relative' }}>
                              {item}
                            </Typography>
                          </Box>
                        );
                      }
                    })}
                  </div>
                )}
              </Stack>
            );
          } else {
            return (
              <Stack direction="row" key={question.id} className="content-wrapper">
                {wordsVsPinyin[0].split('_')[0] === '' ? (
                  <div className={`chat-box ${question.id % 2 !== 0 ? 'odd' : 'even'}`}>
                    <Typography className="subtitle">{`(${wordsVsPinyin[1]})`}</Typography>
                    {contentItems.map((item, index) => (
                      <Box key={index} className="content-item">
                        <input
                          type="text"
                          className={`input ${isCheck
                            ? failedAnswer.some((item) => item.id === question.id)
                              ? 'false'
                              : 'true'
                            : ''
                            }`}
                          onChange={(e) => handleFillAnswer(e, question.id, index)}
                        />
                        <Typography variant="body" sx={{ zIndex: 10, position: 'relative' }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </div>
                ) : (
                  <div className={`chat-box ${question.id % 2 !== 0 ? 'odd' : 'even'}`}>
                    <Typography className="subtitle">{`(${wordsVsPinyin[1]})`}</Typography>
                    {contentItems.map((item, index) => {
                      if (index !== contentItems.length - 1)
                        return (
                          <Box key={index} className="content-item">
                            <Typography variant="body" sx={{ zIndex: 10, position: 'relative' }}>
                              {item}
                            </Typography>
                            <input
                              type="text"
                              className={`input ${isCheck
                                ? failedAnswer.some((item) => item.id === question.id)
                                  ? 'false'
                                  : 'true'
                                : ''
                                }`}
                              onChange={(e) => handleFillAnswer(e, question.id, index)}
                            />
                          </Box>
                        );
                      else {
                        return (
                          <Box key={index} className="content-item">
                            <Typography variant="body" sx={{ zIndex: 10, position: 'relative' }}>
                              {item}
                            </Typography>
                          </Box>
                        );
                      }
                    })}
                  </div>
                )}
                <img src={question.images} alt="question" className="character" />
              </Stack>
            );
          }
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
          <Grid container style={{ marginTop: '4rem', marginLeft: '2.8rem' }}>
            {ex.questions.map((question, index) => (
              <Grid item xs={6} md={6} lg={6} key={question.id} style={{ marginTop: '1.2rem' }}>
                <img
                  src={question.images}
                  alt="question"
                  style={{ maxWidth: '4rem', maxHeight: '4rem', marginLeft: '2rem' }}
                />
                <Typography variant="body" marginRight="2rem" fontSize="1.4rem">
                  {index % 2 === 0 ? '妈妈' : '小雨'}:
                </Typography>
                <Typography variant="body" fontSize="2rem">
                  {question.answer}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

export default FillInBlanksConversation;
