import * as React from 'react';
import { Typography, Grid, Box, Stack } from '@mui/material';
import './ChooseMultiple.scss';
import { useState } from 'react';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';

function ChooseMultiple({ ex }) {
  const [isCheck, setIsCheck] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [failedAnswer, setFailedAnswer] = useState([]);
  const [rightAnswer, setRightAnswer] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(ex.record ? ex.record : null);
  const [showAnswers, setShowAnswer] = React.useState(false);

  React.useEffect(() => {
    setSelectedAnswers([]);
    setFailedAnswer([]);
    setRightAnswer([]);
    setIsCheck(false);
    setShowAnswer(false);
    setCurrentAudio(ex.record ? ex.record : null);
  }, [ex]);

  const handleSelecting = (questionId) => {
    if (!isCheck) {
      const itemIndex = selectedAnswers.findIndex((item) => item === questionId);
      if (itemIndex > -1) {
        const answersList = selectedAnswers.filter((item, index) => index !== itemIndex);
        setSelectedAnswers(answersList);
      } else {
        const answersList = [...selectedAnswers];
        answersList.push(questionId);
        setSelectedAnswers(answersList);
      }
    }
  };

  const handleCheckAnswer = () => {
    setIsCheck(true);
    // danh sách id các question true
    const correctAnswers = ex.questions
      .filter((question) => question.answer === 'true')
      .map((item) => item.id);
    // dap an nguoi dung tra loi dung
    const results = selectedAnswers.filter((item) =>
      correctAnswers.some((answer) => answer === item),
    );
    setRightAnswer(results);
    // dap an sai
    const failedAnswers = selectedAnswers.filter((answer) => !results.includes(answer));
    setFailedAnswer((prev) => [...prev, ...failedAnswers]);
  };

  return (
    <div id="choose-multiple-wrapper">
      {ex.record && <Audio exeAudio={currentAudio} />}
      <Box sx={{ padding: '2rem' }}>
        <Grid container>
          {ex.questions?.map((item) => {
            let contentList = item.content.split('(');
            return (
              <Grid
                item
                key={item.id}
                xs={11.4}
                md={5.6}
                lg={5.6}
                onClick={() => handleSelecting(item.id)}
                style={{
                  cursor: isCheck ? 'context-menu' : 'pointer',
                  '&:active': { transform: isCheck ? 'scale(1)' : 'scale(0.95)' },
                }}
                className={`word-item ${isCheck && failedAnswer.some((answer) => item.id === answer)
                  ? 'false'
                  : rightAnswer.some((answer) => item.id === answer)
                    ? 'true'
                    : ''
                  }`}
              >
                {/* <input
                  className={`checkbox`}
                  type="checkbox"
                  disabled={isCheck}
                  checked={selectedAnswers.includes(item.id)}
                  onChange={() => handleSelectAnswer(item.id)}
                /> */}
                {!!selectedAnswers.includes(item.id) && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="checkbox">
                      <p style={{ fontSize: '2.4rem' }}>✔</p>
                    </div>
                  </div>
                )}
                <Box className="text-wrapper">
                  <Typography variant="body" className="pinyin">
                    {`(${contentList[1]}`}
                  </Typography>
                  <br></br>
                  <Typography variant="body" className="text">
                    {contentList[0]}
                  </Typography>
                  {contentList[2] ? (
                    <div>
                      <Typography variant="body" className="meaning">
                        {contentList[2]}
                      </Typography>
                    </div>
                  ) : null}
                </Box>
                {item.images !== 'no' && (
                  <Box className="image-wrapper">
                    <img src={item.images} alt="question" className="image" />
                  </Box>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>

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
          {ex.questions
            .filter((item) => item.answer === 'true')
            .map((question) => (
              <Grid
                item
                xs={6}
                md={6}
                lg={6}
                key={question.id}
                style={{
                  marginTop: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body">{question.content.split('(')[0]}</Typography>
                <img
                  src={question.images}
                  alt="question"
                  style={{ maxWidth: '6rem', maxHeight: '6rem', marginLeft: '2rem' }}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}

export default ChooseMultiple;
