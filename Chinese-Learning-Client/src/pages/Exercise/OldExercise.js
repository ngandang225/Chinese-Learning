import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Checkbox,
  FormGroup,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useParams, useLocation } from 'react-router-dom';
import './Exercise.scss';
import exerciseServices from '../../services/exerciseServices';
import questionServices from '../../services/questionServices';
import skillServices from '../../services/skillServices';
import DragToDrog from './DragToDrog/DragToDrog';
import Choose1 from './Choose1/Choose1';
import ChooseImage from './ChooseImage/ChooseImage';
import ComboBox1 from './ComboBox1/ComboBox1';
import TrueFalse from './TrueFalse/TrueFalse';
import FillInBlanksConversation from './FillInBlanksConversation/FillInBlanksConversation';
import partServices from '../../services/partServices';
import FillInTones from './FillInTones/FillInTones';
import NewWords from './NewWords/NewWords';
import ChooseMultiple from './ChooseMultiple/ChooseMultiple';
import ListenAndRead from './ListenAndRead/ListenAndRead';

function Exercise() {
  // const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sId = searchParams.get('sId');
  const pId = searchParams.get('pId');

  const [exercises, setExercises] = React.useState([]);
  const [skillName, setSkillName] = React.useState(null);
  const [audio, setAudio] = React.useState(null);
  const [chooseAnswers, setChooseAnswers] = React.useState([]);
  const [failedAnswer, setFailedAnswer] = React.useState([]);
  const [matchAnswers, setMatchAnswers] = React.useState([]);
  const [failedMatchAnswer, setFailedMatchAnswer] = React.useState([]);
  const [fillAnswer, setFillAnswer] = React.useState([]);
  const [failedFillAnswer, setFailedFillAnswer] = React.useState([]);
  const [fillNumberAnswer, setFillNumberAnswer] = React.useState([]);
  const [failedFillNumberAnswer, setFailedFillNumberAnswer] = React.useState([]);
  const [sameAnswer, setSameAnswer] = React.useState([]);
  const [failedSameAnswer, setFailedSameAnswer] = React.useState([]);
  const [tonesAnswer, setTonesAnwer] = React.useState([]);
  const [failedFillTonesAnswer, setFailedFillTonesAnswer] = React.useState([]);

  const [checkExercise, setCheckExercise] = React.useState([]);

  React.useEffect(() => {
    if (pId) {
      partServices
        .getById(pId)
        .then((data) => {
          setAudio(data.record);
          setSkillName(data.name);
        })
        .catch((err) => console.log(err));

      exerciseServices
        .getByPartId(pId)
        .then(async (data) => {
          const exercises = await Promise.all(
            data.map(async (exercise) => {
              try {
                const questions = await questionServices.getByExerciseId(exercise.id);
                return {
                  ...exercise,
                  questions: questions,
                };
              } catch (err) {
                console.log(err);
              }
            }),
          );
          setExercises(exercises);
        })
        .catch((err) => console.log(err));
    } else {
      skillServices
        .getById(sId)
        .then((data) => {
          setAudio(data.record);
          setSkillName(data.name);
        })
        .catch((err) => console.log(err));
      exerciseServices
        .getBySkillId(sId)
        .then(async (data) => {
          const exercises = await Promise.all(
            data.map(async (exercise) => {
              try {
                const questions = await questionServices.getByExerciseId(exercise.id);
                return {
                  ...exercise,
                  questions: questions,
                };
              } catch (err) {
                console.log(err);
              }
            }),
          );
          setExercises(exercises);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const checkAnswer = (ex) => {
    setCheckExercise((prevState) => [...prevState, ex.id]);
    if (ex.exerciseType === 'Choose') {
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
    } else if (ex.exerciseType === 'Same or not') {
      for (let question in ex.questions) {
        for (let ans in sameAnswer) {
          if (question.id === parseInt(ans)) {
          }
        }
      }
      const correctAnswers = ex.questions.filter((ques) => ques.answer === 'same');
      // lấy những câu đã trả lời đúng
      const results = sameAnswer.filter((id) =>
        correctAnswers.some((item) => item.id === parseInt(id)),
      );
      // lấy những câu đã trả lời sai
      const failAnswers = sameAnswer.filter((item) => !results.includes(item));
      // lấy những câu không trả lời
      const nullAnswers = ex.questions
        .filter(
          (question) =>
            !sameAnswer.some((id) => parseInt(id) === question.id) && question.answer !== 'not',
        )
        .map((question) => question.id.toString());

      setFailedSameAnswer((prevState) => {
        return [...prevState, ...failAnswers, ...nullAnswers];
      });
    } else if (ex.exerciseType === 'Match') {
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
    } else if (ex.exerciseType === 'Fill in the blanks') {
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
    } else if (ex.exerciseType === 'Fill in number') {
      // lấy đáp án của câu hỏi
      const answers = ex.questions.map((item) => ({ id: item.id, answer: item.answer }));
      // ghép 2 input vào 1 answer
      const matchingAnswers = fillNumberAnswer.map((element) => {
        const dataLength = element.data.length;
        const dataAnswers = element.data.reduce((sum, answer, index) => {
          if (index !== dataLength - 1) return sum + answer.answer + ',';
          return sum + answer.answer;
        }, '');
        return { id: element.id, answer: dataAnswers };
      });
      // sắp xếp answer trong matchingAnswers tăng dần
      matchingAnswers.forEach((item) => {
        const sortedAnswerArray = item.answer
          .split(',')
          .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
        item.answer = sortedAnswerArray.join(',');
      });
      // lấy những câu có đáp án đúng
      const results = matchingAnswers.filter((answer) =>
        answers.some((item) => item.id === answer.id && item.answer === answer.answer),
      );
      // lấy những câu có đáp án sai
      const failAnswers = answers.filter((answer) => {
        return !results.some((item) => item.id === answer.id && item.answer === answer.answer);
      });
      setFailedFillNumberAnswer((prevState) => {
        return [...prevState, ...failAnswers];
      });
    } else if (ex.exerciseType === 'Fill in tones') {
      const imagesList = ex.questions.map((item, index) => {
        return {
          id: index + 1,
          image: item.images,
          answer: item.answer,
        };
      });
      // lấy đáp án fill in tones
      const exerciseAnswer = ex.questions.map((ques, index) => {
        const item = imagesList[index];
        return {
          imageId: item.id,
          questionId: ques.id,
          answer: item.answer,
        };
      });
      // xử lý câu trả lời của người dùng
      const removeItself = tonesAnswer.filter((item) => item.questionId !== 'itself');
      const result = removeItself.reduce((acc, item) => {
        const existingIndex = acc.findIndex((el) => el.imageId === item.imageId);
        if (existingIndex !== -1) {
          // Replace the existing item with the current one if same imageId is found
          acc[existingIndex] = item;
        } else {
          // If imageId is not found, add the current item to the result list
          acc.push(item);
        }
        return acc;
      }, []);
      // lấy những câu trả lời đúng
      const correct = result.filter((answer) =>
        exerciseAnswer.some(
          (item) =>
            item.questionId === parseInt(answer.questionId, 10) && item.answer === answer.answer,
        ),
      );
      // lấy những câu có đáp án sai
      const failAnswers = exerciseAnswer.filter((item) => {
        return !correct.some((answer) => item.questionId === parseInt(answer.questionId, 10));
      });
      setFailedFillTonesAnswer(failAnswers);
    }
  };
  const handleDeleteExAnswers = (ex) => {
    if (ex.exerciseType === 'Choose') {
      const questions = ex.questions.map((item) => item);
      const sliceAnswer = chooseAnswers.filter(
        (answer) => !questions.some((item) => item.id === answer.id),
      );
      setChooseAnswers(sliceAnswer);
    }
    if (ex.exerciseType === 'Same or not') {
      const sliceAnswer = sameAnswer.filter(
        (sameId) => !ex.questions.some((item) => item.id === parseInt(sameId)),
      );
      setSameAnswer(sliceAnswer);
    } else if (ex.exerciseType === 'Match') {
      const questions = ex.questions.map((item) => item);

      const sliceAnswer = matchAnswers.filter(
        (answer) => !questions.some((item) => item.id === answer.id),
      );
      setMatchAnswers(sliceAnswer);
    } else if (ex.exerciseType === 'Fill in the blanks') {
      const questions = ex.questions.map((item) => item);

      const sliceAnswer = fillAnswer.filter(
        (answer) => !questions.some((item) => item.id === answer.id),
      );
      setFillAnswer(sliceAnswer);
    } else if (ex.exerciseType === 'Fill in number') {
      const questions = ex.questions.map((item) => item);
      const sliceAnswer = fillNumberAnswer.filter(
        (answer) => !questions.some((item) => item.id === answer.id),
      );
      setFillNumberAnswer(sliceAnswer);
    }
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

  return (
    <div id="exercise-wrapper">
      <Link to={'/nghe/so-cap/threshold'} className="back-link">
        VỀ TRANG CHỦ ĐỀ
      </Link>
      <Box className="exercise-container">
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#ffeb3b',
            height: '5.2rem',
            paddingLeft: '1.6rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="body" color="#000" fontWeight="bold">
            {skillName}
          </Typography>
        </Box>
        <Box className="body">
          <Stack className="exercise-list">
            {exercises.length > 0 &&
              exercises.map((ex, index) => (
                <a
                  key={ex.id}
                  href={`#exercise-item-${index}`}
                  style={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    textDecoration: 'none',
                  }}
                >
                  <Box className={`exercise-item ${index % 2 === 0 ? 'odd' : 'even'}`}>
                    <CheckCircleOutlineIcon className="exercise-icon" />
                    <Typography variant="body">{`Exercise ${ex.ordinalNumber}`}</Typography>
                  </Box>
                </a>
              ))}
          </Stack>
          <Divider orientation="vertical" className="divider" />
          <Box className="exercise-content">
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              position="relative"
              className="audio-wrapper"
            >
              {audio && (
                <audio controls style={{ width: '80%' }} className="audio">
                  <source src={audio} type="audio/mpeg"></source>
                </audio>
              )}
            </Box>
            <Box>
              {exercises.length > 0 &&
                exercises.map((ex, index) => (
                  <Box className="exercise-content-item" key={ex.id} id={`exercise-item-${index}`}>
                    {ex.exerciseType !== 'Fill in words' && (
                      <Box>
                        <Stack
                          direction="row"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="end"
                          marginBottom="-1.6rem"
                        >
                          <Typography
                            variant="body"
                            fontWeight="bold"
                            sx={{ textDecoration: 'underline' }}
                          >
                            {`Exercise ${ex.ordinalNumber}`}
                          </Typography>
                          {!ex.exerciseType.includes('Listen and read') && (
                            <Stack direction="row">
                              {!ex.exerciseType.includes('Fill in tones') && (
                                <Button
                                  variant="outlined"
                                  sx={{
                                    marginRight: '2rem',
                                    fontSize: '1.2rem',
                                    borderColor: '#f57f17',
                                    color: '#f57f17',
                                    '&:hover': {
                                      borderColor: '#f57f17',
                                      backgroundColor: '#fffde7',
                                    },
                                  }}
                                  onClick={() => handleDeleteExAnswers(ex)}
                                  disabled={checkExercise.includes(ex.id)}
                                >
                                  Xóa
                                </Button>
                              )}
                              <Button
                                variant="contained"
                                sx={{
                                  fontSize: '1.2rem',
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
                              </Button>
                            </Stack>
                          )}
                        </Stack>
                        <br></br>
                        <Typography variant="body">{ex.description}</Typography>
                      </Box>
                    )}
                    {/* Listen and read */}
                    {ex.exerciseType.includes('Listen and read') && <ListenAndRead ex={ex} />}
                    {/* Choose */}
                    <div style={{ marginTop: '2.8rem' }}>
                      {ex.questions.length > 0 &&
                        ex.exerciseType === 'Choose' &&
                        ex.questions.map((question) => {
                          let questionContents = question.content.split(',');
                          return (
                            <Box
                              marginTop="1.2rem"
                              key={question.id}
                              className="question-3-wrapper"
                            >
                              <Grid
                                container
                                className="question-3"
                                spacing={{ xs: 1, md: 2, lg: 1 }}
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <Grid item xs={2} md={2} lg={2}>
                                  {`(${question.ordinalNumber})`}
                                </Grid>
                                <Grid item xs={10} md={8} lg={8}>
                                  <RadioGroup
                                    row
                                    onChange={(e) => handleChooseAnswers(e, question.id)}
                                    value={
                                      chooseAnswers.length > 0 &&
                                      chooseAnswers.find((item) => item.id === question.id)
                                        ? chooseAnswers.find((item) => item.id === question.id)
                                            .answer
                                        : ''
                                    }
                                  >
                                    <Grid container>
                                      {questionContents.map((item, index) => (
                                        <Grid item xs={4} md={4} lg={4} key={index}>
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
                                                className={`question-key ${
                                                  checkExercise?.length > 0 &&
                                                  checkExercise.includes(ex.id) &&
                                                  failedAnswer.some(
                                                    (answer) =>
                                                      answer.id === question.id &&
                                                      question.answer === item,
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
                    {/* Match */}
                    {ex.questions.length > 0 &&
                      ex.exerciseType === 'Match' &&
                      ex.questions.map((question) => {
                        let column1 = question.content.split('-')[0];
                        let column2 = question.content.split('-')[1];
                        return (
                          <Box key={question.id} className="question-4-wrapper">
                            <Grid
                              container
                              className="question-4"
                              spacing={{ xs: 0, md: 2, lg: 6 }}
                            >
                              {ex.questions.length > 1 && (
                                <Grid item xs={12} md={2} lg={2} marginTop="3rem">
                                  <Typography variant="body">{`(${question.ordinalNumber})`}</Typography>
                                </Grid>
                              )}
                              <Grid
                                item
                                xs={3}
                                md={3}
                                lg={3}
                                marginTop="2rem"
                                className="content-column-1"
                              >
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
                              <Grid
                                item
                                xs={4}
                                md={3}
                                lg={3}
                                marginTop="2rem"
                                className="content-column-3"
                              >
                                {column1.split(',').map((item, index) => (
                                  <Box key={index} marginTop="1rem">
                                    <Typography
                                      className={`question-key ${
                                        checkExercise?.length > 0 &&
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
                                      onChange={(e) =>
                                        handleMatchAnswer(e, question.id, index, item)
                                      }
                                    />
                                  </Box>
                                ))}
                              </Grid>
                            </Grid>
                          </Box>
                        );
                      })}

                    {/* Fill in the blanks */}
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
                                    className={`question-key ${
                                      checkExercise?.length > 0 &&
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
                                      onChange={(e) =>
                                        handleFillAnswer(e, question.id, index, item)
                                      }
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
                                    className={`question-key ${
                                      checkExercise?.length > 0 &&
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
                                      onChange={(e) =>
                                        handleFillAnswer2(e, question.id, index, item)
                                      }
                                    />
                                  </Box>
                                ))}
                              </Grid>
                            );
                          }
                        })}
                    </Grid>

                    {/* Fill in words */}
                    {/* {ex.questions.length > 0 &&
                      ex.excerciseType === 'Match' && */}
                    {/* {questionsList.map((question) => {
                      return (
                        <Grid
                          container
                          key={question._id}
                          className="question-6-wrapper"
                          spacing={{ xs: 0, md: 2, lg: 6 }}
                        >
                          {question.content.map((contentItem, index) => (
                            <Grid
                              item
                              key={index}
                              xs={2}
                              md={2}
                              lg={2}
                              marginTop="2rem"
                              className=""
                            >
                              <Stack direction="column">
                                <Typography variant="body">{contentItem.pinyin}</Typography>
                                <Typography variant="body" fontSize="2rem" marginTop="0.4rem">
                                  {contentItem.word}
                                </Typography>
                              </Stack>
                            </Grid>
                          ))}
                          {question.answer.map((index) => (
                            <Grid
                              item
                              key={index}
                              xs={2}
                              md={2}
                              lg={2}
                              marginTop="2rem"
                              className=""
                            >
                              <Stack direction="column">
                                <TextField
                                  id="standard-basic"
                                  variant="standard"
                                  className="textfield"
                                  sx={{
                                    marginLeft: '0.4rem',
                                    width: '3.2rem',
                                  }}
                                />
                                <TextField
                                  id="standard-basic"
                                  variant="standard"
                                  className="textfield-word"
                                  sx={{
                                    width: '4rem',
                                    marginTop: '0.4rem',
                                  }}
                                />
                              </Stack>
                            </Grid>
                          ))}
                        </Grid>
                      );
                    })} */}

                    {/* Fill in number */}
                    <Grid
                      container
                      className="question-7-wrapper"
                      spacing={{ xs: 1, md: 2, lg: 2 }}
                    >
                      {ex.questions.length > 0 &&
                        ex.exerciseType === 'Fill in number' &&
                        ex.questions.map((question) => {
                          let answersList = question.answer.split(',');
                          return (
                            <Grid item key={question.id} xs={3} md={3} lg={3}>
                              <Stack direction="column">
                                <Box
                                  // variant="h4"
                                  // marginLeft="2.4rem"
                                  className={`question-key ${
                                    checkExercise?.length > 0 &&
                                    checkExercise.includes(ex.id) &&
                                    failedFillNumberAnswer.some((item) => item.id === question.id)
                                      ? 'false'
                                      : 'true'
                                  }`}
                                >
                                  <img
                                    draggable={false}
                                    src={question.images}
                                    alt="column"
                                    width="64rem"
                                  />
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
                                    className="textfield-word"
                                    sx={{
                                      marginLeft: '0.8rem',
                                      maxWidth: '6rem',
                                      marginTop: '0.4rem',
                                    }}
                                    onChange={(e) => handleFillNumberAnswer(e, question.id, index)}
                                  />
                                ))}
                              </Stack>
                            </Grid>
                          );
                        })}
                    </Grid>

                    {/* Fill in tones */}
                    {ex.questions.length > 0 && ex.exerciseType === 'Fill in tones' && (
                      <FillInTones
                        ex={ex}
                        setTonesAnwer={setTonesAnwer}
                        failedFillTonesAnswer={failedFillTonesAnswer}
                        checkExercise={checkExercise}
                      />
                    )}

                    {/* Same or not */}
                    <Grid
                      container
                      className="exercise-same-or-not"
                      spacing={{ xs: 0, md: 2, lg: 3 }}
                    >
                      {ex.questions.length > 0 &&
                        ex.exerciseType === 'Same or not' &&
                        ex.questions.map((question) => {
                          return (
                            <Grid
                              item
                              xs={6}
                              md={6}
                              lg={6}
                              key={question.id}
                              className="same-or-not-question"
                            >
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
                                    : 'true'
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
                    {/* <Grid container marginLeft="2.8rem">
                      {ex.questions.length > 0 &&
                        console.log(ex.exerciseType) &&
                        ex.exerciseType === 'Same or not' &&
                        ex.questions.map((question, index) => {
                          console.log('questions', question);
                          return (
                            // <Grid
                            //   item
                            //   marginTop="2rem"
                            //   xs={6}
                            //   md={6}
                            //   lg={6}
                            //   key={question.id}
                            //   className="question-5"
                            // >
                            //   <Typography
                            //     variant="body"
                            //     marginRight="0.8rem"
                            //   >{`(${question.ordinalNumber})`}</Typography>

                            //   <Box
                            //     className={`question-key ${
                            //       checkExercise?.length > 0 &&
                            //       checkExercise.includes(ex.id) &&
                            //       failedFillAnswer.some((item) => item.id === question.id)
                            //         ? 'true'
                            //         : 'false'
                            //     }`}
                            //   >
                            //     <TextField
                            //       value={
                            //         fillAnswer?.length > 0 &&
                            //         fillAnswer?.find((item) => item.id === question.id)
                            //           ? fillAnswer.find((item) =>
                            //               item.data.some((data) => data.index === index),
                            //             )
                            //             ? fillAnswer.find((item) =>
                            //                 item.data
                            //                   .some((data) => data.index === index)
                            //                   .data?.find((data) => data.index === index),
                            //               )?.answer
                            //             : ''
                            //           : ''
                            //       }
                            //       id="standard-basic"
                            //       variant="standard"
                            //       className="textfield"
                            //       sx={{
                            //         width: '2.8rem',
                            //         marginLeft: '0.4rem',
                            //       }}
                            //       // onChange={(e) => handleFillAnswer(e, question.id, index)}
                            //     />
                            //     <Typography variant="body">{question.content}</Typography>
                            //   </Box>
                            // </Grid>
                            <>{question.content}</>
                          );
                        })}
                    </Grid> */}

                    {/* <DragToDrog /> */}
                    {/* <Choose1 /> */}
                    {/* <ChooseImage /> */}
                    {/* <ComboBox1 /> */}
                    {/* <TrueFalse /> */}
                    {/* <FillInBlanksConversation /> */}
                    {/* <ChooseMultiple /> */}
                    {/* {ex.exerciseType === 'NewWords' && <NewWords ex={ex} />} */}

                    {/* Answer */}
                    {ex.questions.length > 0 &&
                      ex.exerciseType !== 'Listen and read' &&
                      checkExercise?.length > 0 &&
                      checkExercise.includes(ex.id) && (
                        <Stack
                          direction="row"
                          marginTop="2rem"
                          padding="0.8rem 2.4rem"
                          borderRadius="1rem"
                          flexWrap="wrap"
                          lineHeight="2.8rem"
                          className="answer-wrapper"
                          sx={{
                            border: '1px solid #fdd835',
                          }}
                        >
                          <Grid container>
                            {ex.exerciseType === 'Choose' &&
                              ex.questions.map((question) => (
                                <Grid
                                  item
                                  xs={4}
                                  md={2}
                                  lg={2}
                                  key={question.id}
                                  className="answer-item"
                                >
                                  {question.ordinalNumber && (
                                    <Typography
                                      variant="body"
                                      marginRight="0.8rem"
                                    >{`(${question.ordinalNumber})`}</Typography>
                                  )}
                                  <Typography variant="body">{question.answer}</Typography>
                                </Grid>
                              ))}
                          </Grid>
                          {ex.exerciseType === 'Match' &&
                            ex.questions.map((question) => {
                              let answerList = question.answer.split('-');
                              return (
                                <Grid
                                  container
                                  spacing={{ xs: 0 }}
                                  key={question.id}
                                  className="answer-item"
                                >
                                  {question.ordinalNumber && (
                                    <Grid item xs={12} md={2} lg={2}>
                                      <Typography
                                        variant="body"
                                        marginRight="0.8rem"
                                      >{`(${question.ordinalNumber})`}</Typography>
                                    </Grid>
                                  )}
                                  <Grid item xs={12} md={10} lg={6}>
                                    {answerList.map((item, index) => (
                                      <Typography variant="body" marginRight="2rem" key={index}>
                                        {item}
                                      </Typography>
                                    ))}
                                  </Grid>
                                </Grid>
                              );
                            })}
                          <Grid container className="answer-item">
                            {ex.exerciseType === 'Fill in the blanks' &&
                              ex.questions.map((question) => (
                                <Grid item xs={6} md={6} lg={6} key={question.id}>
                                  <Typography
                                    variant="body"
                                    marginRight="2rem"
                                  >{`(${question.ordinalNumber})`}</Typography>
                                  <Typography variant="body">{question.answer}</Typography>
                                </Grid>
                              ))}
                          </Grid>
                          <Grid container className="answer-item">
                            {ex.exerciseType === 'Fill in number' &&
                              ex.questions.map((question) => (
                                <Grid
                                  item
                                  xs={6}
                                  md={6}
                                  lg={6}
                                  key={question.id}
                                  display="flex"
                                  alignItems="center"
                                  marginBottom="0.8rem"
                                >
                                  <img src={question.images} alt="column" width="64rem" />
                                  <Typography variant="body" marginLeft="1.2rem">
                                    {question.answer}
                                  </Typography>
                                </Grid>
                              ))}
                          </Grid>
                          {ex.exerciseType === 'Same or not' && (
                            <Grid container className="answer-item">
                              <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
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
                          <Grid container className="answer-item">
                            {ex.exerciseType === 'Fill in tones' &&
                              ex.questions.map((question) => (
                                <Grid
                                  item
                                  xs={6}
                                  md={6}
                                  lg={6}
                                  key={question.id}
                                  display="flex"
                                  alignItems="center"
                                  marginBottom="0.8rem"
                                >
                                  <Typography
                                    variant="body"
                                    marginRight="2rem"
                                  >{`(${question.ordinalNumber})`}</Typography>
                                  <img src={question.images} alt="column" width="64rem" />
                                </Grid>
                              ))}
                          </Grid>
                        </Stack>
                      )}
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Exercise;
