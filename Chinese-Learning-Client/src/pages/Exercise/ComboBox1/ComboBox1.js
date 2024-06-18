import * as React from 'react';
import { useState } from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './ComboBox1.scss';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';

function ComboBox1({ ex }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(ex.record ? ex.record : null);
  const [showAnswers, setShowAnswer] = React.useState(false);

  const optionList = React.useMemo(() => {
    return ex?.questions
      ?.map((question) => question.answer?.split(','))
      .flat()
      .sort(() => Math.random() - 0.5);
  }, [ex]);

  React.useEffect(() => {
    setSelectedAnswers([]);
    setCorrectAnswer([]);
    setIsCheck(false);
    setShowAnswer(false);
    setCurrentAudio(ex.record ? ex.record : null);
  }, [ex]);

  const handleSelectAnswer = (questionId, answerItem, index) => {
    !isCheck &&
      setSelectedAnswers((prevState) => {
        if (prevState.length <= 0) {
          return [
            {
              id: questionId,
              data: [
                {
                  index: index,
                  answer: answerItem,
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
                  answer: answerItem,
                };
              } else {
                answerData.push({
                  index: index,
                  answer: answerItem,
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
                  answer: answerItem,
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
    // lấy đáp án của câu hỏi
    const answers = ex?.questions?.map((item) => ({ id: item.id, answer: item.answer }));
    // tạo mới mảng đáp án đúng, khớp với user answers
    const correctAnswers = answers?.map((answer) => {
      let answerData = answer?.answer?.split(',');
      return {
        id: answer.id,
        data: answerData?.map((data, index) => ({ index: index, answer: data })),
      };
    });

    // lấy những câu có đáp án đúng
    let results = [];
    for (const item2 of correctAnswers) {
      for (const item1 of selectedAnswers) {
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
    setCorrectAnswer(results);
  };

  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <div id="combobox1-wrapper">
        {ex.questions.length > 0 &&
          ex.questions.map((question) => {
            let wordsVsPinyin = question.content.split('/');
            let contentItems = wordsVsPinyin[0].split('_');
            if (contentItems[0] === '') contentItems = wordsVsPinyin[0].split('_').slice(1);
            return wordsVsPinyin[0].split('_')[0] === '' ? (
              <div style={{ display: 'flex', alignItems: 'center' }} key={question.id}>
                <Typography variant="body" marginRight="2rem">
                  {`(${question.ordinalNumber})`}
                </Typography>
                <Stack
                  direction="row"
                  className="question"
                  key={question.id}
                  sx={{ marginBottom: '1.2rem', width: '100%' }}
                >
                  {wordsVsPinyin[1] !== '' && (
                    <Typography className="subtitle">{`(${wordsVsPinyin[1]})`}</Typography>
                  )}
                  {contentItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <FormControl
                        className={`combo-box 
                    ${
                      isCheck
                        ? correctAnswer.some(
                            (answer) =>
                              answer.id === question.id &&
                              answer.data.some((data) => data.index === index),
                          )
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
                            selectedAnswers?.find((answer) => answer.id === question.id)
                              ? selectedAnswers.find((answer) => answer.id === question.id)?.data[
                                  index
                                ]?.answer || ''
                              : ''
                          }
                          onChange={(e) => handleSelectAnswer(question.id, e.target.value, index)}
                        >
                          {optionList.map((option, index) => {
                            const splitOption = option?.includes('(') && option?.split('(');
                            return option?.includes('(') ? (
                              <MenuItem
                                sx={{ fontSize: '1.6rem', display: 'flex' }}
                                key={index}
                                value={option}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="body">{splitOption[0]}</Typography>
                                  <Typography fontSize="1.2rem">{`(${splitOption[1]}`}</Typography>
                                </div>
                              </MenuItem>
                            ) : (
                              <MenuItem sx={{ fontSize: '1.6rem' }} key={index} value={option}>
                                {option}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>

                      <Typography variant="body" style={{}}>
                        {item}
                      </Typography>
                    </React.Fragment>
                  ))}
                  <Box marginBottom="0.8rem" marginRight="2rem" marginLeft="1.2rem">
                    {question.images !== 'no' && (
                      <img src={question.images} alt="question" className="image" />
                    )}
                  </Box>
                </Stack>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }} key={question.id}>
                <Typography variant="body" marginRight="2rem">
                  {`(${question.ordinalNumber})`}
                </Typography>
                <Stack
                  direction="row"
                  className="question"
                  key={question.id}
                  sx={{ marginBottom: '1.2rem', width: '100%' }}
                >
                  {wordsVsPinyin[1] !== '' && (
                    <Typography className="subtitle">{`(${wordsVsPinyin[1]})`}</Typography>
                  )}
                  {contentItems.map((item, index) => {
                    if (index !== contentItems.length - 1) {
                      return (
                        <React.Fragment key={index}>
                          <Typography variant="body">{item}</Typography>
                          <FormControl
                            className={`combo-box 
                          ${
                            isCheck
                              ? correctAnswer.some(
                                  (answer) =>
                                    answer.id === question.id &&
                                    answer.data.some((data) => data.index === index),
                                )
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
                                selectedAnswers?.find((answer) => answer.id === question.id)
                                  ? selectedAnswers.find((answer) => answer.id === question.id)
                                      ?.data[index]?.answer || ''
                                  : ''
                              }
                              onChange={(e) =>
                                handleSelectAnswer(question.id, e.target.value, index)
                              }
                            >
                              {optionList.map((option, index) => {
                                const splitOption = option?.includes('(') && option?.split('(');
                                return option?.includes('(') ? (
                                  <MenuItem
                                    sx={{ fontSize: '1.6rem', display: 'flex' }}
                                    key={index}
                                    value={option}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <Typography variant="body">{splitOption[0]}</Typography>
                                      <Typography fontSize="1.2rem">{`(${splitOption[1]}`}</Typography>
                                    </div>
                                  </MenuItem>
                                ) : (
                                  <MenuItem sx={{ fontSize: '1.6rem' }} key={index} value={option}>
                                    {option}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <div key={index}>
                          {/* <Typography variant="body" marginRight="2rem">
                            {`(${question.ordinalNumber})`}
                          </Typography> */}
                          <Typography variant="body">{item}</Typography>
                        </div>
                      );
                    }
                  })}
                  <Box
                    marginTop="0.8rem"
                    marginLeft="1.2rem"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {question.images !== 'no' && (
                      <img src={question.images} alt="question" height="42rem" />
                    )}
                  </Box>
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
          <Grid container style={{ marginTop: '4rem' }}>
            {ex.questions.map((question) => (
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

export default ComboBox1;
