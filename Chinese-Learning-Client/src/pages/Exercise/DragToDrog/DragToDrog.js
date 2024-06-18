import * as React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import './DragToDrog.scss';
import Audio from '../../../components/Audio/Audio';
import answerServices from '../../../services/answerServices';
import StyledButton from '../../../components/StyledButton/StyledButton';

function DragToDrog({ ex }) {
  const [isCheck, setIsCheck] = React.useState(false);
  const [answerList, setAnswerList] = React.useState([]);
  const [failedAnswer, setFailedAnswer] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [optionList, setOptionList] = React.useState([]);
  const [showAnswers, setShowAnswer] = React.useState(false);

  React.useEffect(() => {
    setAnswerList([]);
    setFailedAnswer([]);
    setIsCheck(false);
    setShowAnswer(false);
    setCurrentAudio(ex.record ? ex.record : null);
    setQuestionWithAnswer(null);
    answerServices
      .getByExerciseId(ex.id)
      .then((data) =>
        setOptionList(
          data.map((item, index) => {
            const label = String.fromCharCode(65 + index);
            return {
              label: label,
              ...item,
            };
          }),
        ),
      )
      .catch((err) => console.log(err));
  }, [ex]);

  const [questionWithAnswer, setQuestionWithAnswer] = React.useState();

  const GetExerciseWithAnswer = () => {
    const questionList = [...ex.questions];
    const questionsWithAnswer = questionList.map((ques) => {
      const foundItem = optionList.find((item) => item.questionId === ques.id);
      return {
        ...ques,
        answer: foundItem ? foundItem.content : '', // Use the content of the found item or an empty string if not found
        label: foundItem ? foundItem.label : '',
      };
    });
    setQuestionWithAnswer(questionsWithAnswer);
  };

  React.useEffect(() => {
    if (optionList.length > 0) {
      GetExerciseWithAnswer();
    }
  }, [optionList]);

  const handleCheckAnswer = () => {
    setIsCheck(true);

    const result = [];

    for (const item of optionList) {
      const existingItem = result.find((element) => element.content === item.content);
      if (existingItem) {
        if (item.questionId) {
          existingItem.questionId.push(item.questionId);
        }
      } else {
        const newItem = {
          content: item.content,
          questionId: item.questionId ? [item.questionId] : [],
        };
        result.push(newItem);
      }
    }

    const answerData = answerList?.map((item) => {
      return {
        ...item,
        questionItemId: result.find((data) => data.content === item.answer).questionId,
      };
    });

    // lọc những answer sai
    const failedAnswers = answerData.filter(
      (answer) => !answer.questionItemId.includes(parseInt(answer.id)),
    );

    // lọc những answer null answer
    const nullAnswers = ex.questions.filter(
      (item) => !answerList.some((answer) => parseInt(answer.id) === item.id),
    );
    setFailedAnswer([...failedAnswers, ...nullAnswers]);
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
    ev.dataTransfer.setData('data', ev.target.dataset.option);
    ev.dataTransfer.setData('questionId', ev.target.dataset.questionId);
  };

  const drop = (ev) => {
    ev.preventDefault();
    var id = ev.dataTransfer.getData('text');
    var data = ev.dataTransfer.getData('data');
    var dataQuesId = ev.dataTransfer.getData('questionId');
    var target = ev.target;
    var questionId = target.dataset.questionId;
    // var questionIndex = target.dataset.questionIndex;
    var optionList = target.dataset.optionList;

    if (target.getElementsByClassName('box').length === 0 && target.className !== 'option-item') {
      if (!answerList.some((answer) => answer.id === questionId)) {
        target.appendChild(document.getElementById(id));
        setAnswerList((preState) => {
          const arrDelete = preState.filter((answer) => answer.itemId !== id);
          preState = arrDelete;
          return [
            ...preState,
            {
              id: questionId ? questionId : optionList ? optionList : 'full',
              itemId: id,
              questionItemId: parseInt(dataQuesId),
              answer: data,
            },
          ];
        });
      }
    }
  };

  const touchStart = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.setAttribute('data-draggable-id', ev.target.id);
    ev.target.setAttribute('data-draggable-data', ev.target.dataset.option);
    ev.target.setAttribute('data-draggable-questionId', ev.target.dataset.questionId);

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
    const draggableData = ev.target.getAttribute('data-draggable-data');
    const draggableQuestionId = ev.target.getAttribute('data-draggable-questionId');

    const questionId = target.dataset.questionId;
    const optionList = target.dataset.optionList;
    if (
      (target.className.includes('box') || target.className.includes('option-list')) &&
      target.getElementsByClassName('box').length === 0
    ) {
      if (!answerList.some((answer) => answer.id === questionId)) {
        target.appendChild(document.getElementById(draggableId));
        setAnswerList((preState) => {
          const arrDelete = preState.filter((answer) => answer.itemId !== draggableId);
          preState = arrDelete;
          return [
            ...preState,
            {
              id: questionId ? questionId : optionList ? optionList : 'full',
              itemId: draggableId,
              questionItemId: parseInt(draggableQuestionId),
              answer: draggableData,
            },
          ];
        });
      }
    }
  };

  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <div id="drag-to-drop-wrapper">
        <div
          direction="row"
          onDrop={(event) => drop(event)}
          data-option-list="options"
          onDragOver={(event) => allowDrop(event)}
          className="option-list"
        >
          {optionList?.map((item, index) => (
            <div key={item.id} className="option-item-wrapper">
              <div
                id={`${item.id}`}
                draggable={!isCheck}
                data-question-id={item.questionId}
                data-option={item.content}
                onDragStart={(event) => drag(event)}
                onTouchStart={(event) => touchStart(event)}
                onTouchMove={(event) => touchMove(event)}
                onTouchEnd={(event) => touchEnd(event)}
                key={index}
                className="option-item"
              >
                {item.label + '. ' + item.content}
              </div>
            </div>
          ))}
        </div>
        {ex?.questions?.length > 0 &&
          ex?.questions?.map((question, index) => {
            let flag = 0;
            let contentList = question.content.split('/');
            if (contentList.length === 2) flag = 1;
            return (
              <Stack direction="row" className="question" key={question.id}>
                <Typography variant="body" marginRight="2rem">
                  {`(${question.ordinalNumber})`}
                </Typography>
                <Box>
                  {contentList.map((content, index) => {
                    let contentItems = content.split('_');
                    return contentItems[0] === '' ? (
                      <Box
                        className="question-content"
                        key={index}
                        sx={{
                          width: index === 1 ? '100%' : 'contents',
                          marginTop: index === 1 && '1.2rem',
                        }}
                      >
                        {contentItems.slice(1)?.map((item, i) => (
                          <div key={i} style={{ display: 'contents' }} className="main-content">
                            <div
                              onDrop={(event) => drop(event)}
                              data-question-id={question.id}
                              data-question-index={i}
                              onDragOver={(event) => allowDrop(event)}
                              className={`box 
                              ${
                                isCheck
                                  ? failedAnswer.some(
                                      (answer) => parseInt(answer.id) === parseInt(question.id),
                                    )
                                    ? 'false'
                                    : 'true'
                                  : ''
                              }`}
                            ></div>
                            <Typography variant="body" style={{ lineHeight: '3.2rem' }}>
                              {flag === 1 ? (index === 0 ? 'A: ' : 'B: ') : '' + item}
                            </Typography>
                          </div>
                        ))}

                        <Box marginRight="2rem" marginBottom="-0.6rem">
                          {question.images !== 'no' && (
                            <img
                              src={question.images}
                              alt="question"
                              draggable="false"
                              className="image"
                            />
                          )}
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        className="question-content"
                        key={index}
                        sx={{
                          width: index === 1 ? '100%' : 'contents',
                          marginTop: index === 1 && '1.2rem',
                        }}
                      >
                        {contentItems?.map((item, i) => {
                          if (i !== contentItems.length - 1)
                            return (
                              <div key={i} style={{ display: 'contents' }}>
                                <Typography variant="body" style={{ lineHeight: '3.2rem' }}>
                                  {(flag === 1 ? (index === 0 ? 'A: ' : 'B: ') : '') + item}
                                </Typography>
                                <div
                                  onDrop={(event) => drop(event)}
                                  data-question-id={question.id}
                                  data-question-index={i}
                                  onDragOver={(event) => allowDrop(event)}
                                  className={`box 
                              ${
                                isCheck
                                  ? failedAnswer.some(
                                      (answer) => parseInt(answer.id) === parseInt(question.id),
                                    )
                                    ? 'false'
                                    : 'true'
                                  : ''
                              }`}
                                ></div>
                              </div>
                            );
                          else
                            return (
                              <Typography variant="body" key={i} style={{ lineHeight: '3.2rem' }}>
                                {(contentItems.length === 1 ? (index === 0 ? 'A: ' : 'B: ') : '') +
                                  item}
                              </Typography>
                            );
                        })}

                        <Box marginRight="2rem" marginBottom="-0.6rem">
                          {question.images !== 'no' && (
                            <img
                              src={question.images}
                              alt="question"
                              draggable="false"
                              className="image"
                            />
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Stack>
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
          <Grid
            container
            style={{ marginTop: '4rem', marginLeft: '2.8rem' }}
            className="answer-wrapper"
          >
            {questionWithAnswer.map((question) => (
              <Grid item xs={6} md={6} lg={6} key={question.id} style={{ marginTop: '1.2rem' }}>
                <Typography
                  variant="body"
                  marginRight="2rem"
                >{`(${question.ordinalNumber})`}</Typography>
                <Typography variant="body">{question.label + '. ' + question.answer}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

export default DragToDrog;
