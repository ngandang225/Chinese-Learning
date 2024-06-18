import * as React from 'react';
import { Typography, Grid, Stack, Button, Box } from '@mui/material';
import './FillInTones.scss';
import Audio from '../../../components/Audio/Audio';
import StyledButton from '../../../components/StyledButton/StyledButton';
function FillInTones({ ex }) {
  const [tonesAnswer, setTonesAnwer] = React.useState([]);
  const [failedFillTonesAnswer, setFailedFillTonesAnswer] = React.useState([]);
  const [checkExercise, setCheckExercise] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [isCheck, setIsCheck] = React.useState(false);
  const [showAnswers, setShowAnswer] = React.useState(false);

  React.useEffect(() => {
    setTonesAnwer([]);
    setFailedFillTonesAnswer([]);
    setCheckExercise([]);
    setCurrentAudio(ex.record ? ex.record : null);
    setIsCheck(false);
    setShowAnswer(false);
  }, [ex]);
  const imagesList = ex.questions.map((item, index) => {
    return {
      id: index + 1,
      image: item.images,
      answer: item.answer,
    };
  });
  const order = [2, 4, 1, 5, 3, 8, 6, 7];
  var optionList = order.map((orderId) => {
    const item = imagesList.find((imageItem) => imageItem.id === orderId);
    return { ...item };
  });
  const allowDrop = (ev) => {
    ev.preventDefault();
  };
  const drag = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
  };
  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    var target = ev.target;
    var questionId = target.dataset.questionId;
    var optionList = target.dataset.optionList;

    if (
      (target.className.includes('box') && target.childNodes.length === 0) ||
      target.className.includes('option-list')
    ) {
      const elementToAppend = document.getElementById(data);
      if (elementToAppend && elementToAppend !== target && !target.contains(elementToAppend))
        target.appendChild(document.getElementById(data));
      setTonesAnwer((preState) => [
        ...preState,
        {
          imageId: data,
          questionId: questionId ? questionId : optionList ? optionList : 'full',
          answer: imagesList.find((item) => item.id === parseInt(data, 10)).answer,
        },
      ]);
    }
  };

  const touchStart = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const touch = ev.touches[0];
    ev.target.style.left = touch.clientX + 'px';
    ev.target.style.top = touch.clientY + 'px';
    ev.target.setAttribute('data-draggable-id', ev.target.id);
    ev.target.addEventListener('touchmove', touchMove, { passive: false });
  };

  const touchMove = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  const touchEnd = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const touch = ev.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    const draggableId = ev.target.getAttribute('data-draggable-id');
    const questionId = target.dataset.questionId;
    const optionList = target.dataset.optionList;

    if (
      (target.className.includes('box') && target.childNodes.length === 0) ||
      target.className.includes('option-list')
    ) {
      const elementToAppend = document.getElementById(draggableId);
      if (elementToAppend && elementToAppend !== target && !target.contains(elementToAppend))
        target.appendChild(elementToAppend);
      setTonesAnwer((preState) => [
        ...preState,
        {
          imageId: draggableId,
          questionId: questionId ? questionId : optionList ? optionList : 'full',
          answer: imagesList.find((item) => item.id === parseInt(draggableId, 10)).answer,
        },
      ]);
    }
  };

  const checkAnswer = (ex) => {
    setIsCheck(true);
    setCheckExercise((prevState) => [...prevState, ex.id]);
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
  };

  return (
    <div id="fill-in-tones-wrapper">
      {ex.record && <Audio exeAudio={currentAudio} />}
      <div
        direction="row"
        onDrop={(event) => drop(event)}
        onDragOver={(event) => allowDrop(event)}
        className="option-list"
        data-option-list="options"
      >
        {optionList.map((item, index) => (
          <div key={index} className="option-item-wrapper">
            <img
              className="option-item"
              onDrop={(event) => drop(event)}
              onDragOver={(event) => allowDrop(event)}
              id={item.id}
              draggable={!isCheck}
              onDragStart={(event) => drag(event)}
              onTouchStart={(event) => touchStart(event)}
              onTouchMove={(event) => touchMove(event)}
              onTouchEnd={(event) => touchEnd(event)}
              src={item.image}
              alt="option"
              width="80rem"
              height="42rem"
              style={{ border: 'border: 1px solid #fbc02d', display: 'block' }}
            />
          </div>
        ))}
      </div>
      <Grid container spacing={{ xs: 0, md: 2, lg: 0 }}>
        {ex.questions.map((question) => (
          <Grid item xs={3} md={3} lg={3} key={question.id} className="question">
            <Typography
              variant="body"
              marginRight="0.8rem"
            >{`(${question.ordinalNumber})`}</Typography>
            <div
              onDrop={(event) => drop(event)}
              onDragOver={(event) => allowDrop(event)}
              data-question-id={question.id}
              className={`box ${checkExercise?.length > 0 &&
                checkExercise.includes(ex.id) &&
                failedFillTonesAnswer.some((answer) => answer.questionId === question.id)
                ? 'false'
                : ''
                }`}
            ></div>
          </Grid>
        ))}
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
          {ex.exerciseType === 'Fill in tones' &&
            ex.questions.map((question) => (
              <Grid
                item
                xs={6}
                md={6}
                lg={6}
                style={{ display: 'flex', justifyContent: 'center', marginTop: '1.2rem' }}
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
      )}
    </div>
  );
}

export default FillInTones;
