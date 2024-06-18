import * as React from 'react';
import { Box, Stack, Button, Grid } from '@mui/material';
import './Group.scss';
import Audio from '../../../components/Audio/Audio';
import answerServices from '../../../services/answerServices';
import StyledButton from '../../../components/StyledButton/StyledButton';

function Group({ ex }) {
  const [isCheck, setIsCheck] = React.useState(false);
  const [answerList, setAnswerList] = React.useState([]);
  const [failedAnswer, setFailedAnswer] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState(ex.record ? ex.record : null);
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    setAnswerList([]);
    setFailedAnswer([]);
    setIsCheck(false);
    setCurrentAudio(ex.record ? ex.record : null);
    answerServices
      .getByExerciseId(ex.id)
      .then((data) =>
        setAnswers(
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

  const handleCheckAnswer = () => {
    setIsCheck(true);
    // const transformedArray = [];

    const result = [];

    for (const item of answers) {
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

    const answerData = answerList.map((item) => {
      return {
        ...item,
        data: item.data.map((ans) => {
          const temp = result.find((data) => data.content === ans.answer);
          return {
            ...ans,
            questionItemId: [...temp.questionId],
          };
        }),
      };
    });

    // Lọc những đáp án sai
    const failedAnswers = answerData.map((answer) => ({
      ...answer,
      data: answer.data.filter(
        (item) => !item.questionItemId.some((data) => data === parseInt(answer.id)),
      ),
    }));
    setFailedAnswer(failedAnswers);
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
    var questionIndex = target.dataset.index;
    var questionId = target.dataset.questionId;
    var optionList = target.dataset.optionList;
    if (target.getElementsByClassName('box')?.length === 0 && target.className !== 'option-item') {
      target.appendChild(document.getElementById(id));
    }

    setAnswerList((prevState) => {
      if (prevState?.length <= 0) {
        return [
          {
            id: questionId ? questionId : optionList ? optionList : 'full',
            data: [
              {
                itemId: id,
                questionItemId: dataQuesId,
                index: questionIndex,
                answer: data,
              },
            ],
          },
        ];
      } else {
        // delete data cũ trong answerlist
        const arrDelete = prevState.map((answer) => ({
          ...answer,
          data: answer.data.filter((item) => item.itemId !== id),
        }));
        prevState = arrDelete;

        let updatedAnswers = prevState.map((answer) => {
          if (answer.id === questionId) {
            let answerData = answer.data;
            const indexExisted = answerData.findIndex((item) => item.index === questionIndex);
            if (indexExisted !== -1) {
              answerData[indexExisted] = {
                itemId: id,
                questionItemId: dataQuesId,
                index: questionIndex,
                answer: data,
              };
            } else {
              answerData.push({
                itemId: id,
                questionItemId: dataQuesId,
                index: questionIndex,
                answer: data,
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
                itemId: id,
                questionItemId: dataQuesId,
                index: questionIndex,
                answer: data,
              },
            ],
          });
        }
        return updatedAnswers;
      }
    });
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

    var questionIndex = target.dataset.index;
    const questionId = target.dataset.questionId;
    const optionList = target.dataset.optionList;
    if (target.className !== 'option-item') {
      target.appendChild(document.getElementById(draggableId));
      setAnswerList((prevState) => {
        if (prevState?.length <= 0) {
          return [
            {
              id: questionId ? questionId : optionList ? optionList : 'full',
              data: [
                {
                  itemId: draggableId,
                  questionItemId: draggableQuestionId,
                  index: questionIndex,
                  answer: draggableData,
                },
              ],
            },
          ];
        } else {
          // delete data cũ trong answerlist
          const arrDelete = prevState.map((answer) => ({
            ...answer,
            data: answer.data.filter((item) => item.itemId !== draggableId),
          }));
          prevState = arrDelete;

          let updatedAnswers = prevState.map((answer) => {
            if (answer.id === questionId) {
              let answerData = answer.data;
              const indexExisted = answerData.findIndex((item) => item.index === questionIndex);
              if (indexExisted !== -1) {
                answerData[indexExisted] = {
                  itemId: draggableId,
                  questionItemId: draggableQuestionId,
                  index: questionIndex,
                  answer: draggableData,
                };
              } else {
                answerData.push({
                  itemId: draggableId,
                  questionItemId: draggableQuestionId,
                  index: questionIndex,
                  answer: draggableData,
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
                  itemId: draggableId,
                  questionItemId: draggableQuestionId,
                  index: questionIndex,
                  answer: draggableData,
                },
              ],
            });
          }
          return updatedAnswers;
        }
      });
    }
  };

  const numRows = Math.ceil(answers?.length / 4);
  // Create an array to represent rows
  const rows = Array.from({ length: numRows }, (_, index) =>
    answers.slice(index * 4, (index + 1) * 4),
  );

  return (
    <>
      {ex.record && <Audio exeAudio={currentAudio} />}
      <Grid container sx={{ p: 4, justifyContent: 'center' }} className="content-container">
        <div id="group-wrapper">
          <div style={{ backgroundColor: '#C7FFD2', padding: '2rem' }}>
            <table
              className="option-list-table"
              style={{
                borderCollapse: 'collapse',
                width: '100%',
              }}
            >
              <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <tbody>
                {/* Map through the rows and create table rows */}
                {rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((item) => (
                      <td
                        key={item.id}
                        style={{
                          border: '2px dashed #000',
                          backgroundColor: '#fff',
                        }}
                      >
                        <div
                          onDrop={(event) => drop(event)}
                          data-option-list="options"
                          onDragOver={(event) => allowDrop(event)}
                          style={{
                            paddingTop: '100%', // Set the height as a percentage of the width
                            position: 'relative',
                          }}
                        >
                          <div
                            id={`item-${item.id}`}
                            data-question-id={item.questionId}
                            draggable={!isCheck}
                            data-option={item.content}
                            onDragStart={(event) => drag(event)}
                            onTouchStart={(event) => touchStart(event)}
                            onTouchMove={(event) => touchMove(event)}
                            onTouchEnd={(event) => touchEnd(event)}
                            className="option-item"
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              right: '0',
                              bottom: '0',
                              fontSize: '3.2rem',
                              padding: '1rem',
                              textAlign: 'center',
                              backgroundColor: 'inherit',
                            }}
                          >
                            {item.label + '. ' + item.content}
                          </div>
                        </div>
                      </td>
                    ))}

                    {row?.length < 4 &&
                      Array.from({ length: 4 - row?.length }).map((_, emptyCellIndex) => (
                        <td
                          key={row?.length + emptyCellIndex}
                          // style={{ border: '2px dashed #000' }}
                        ></td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Render 2 table to drop */}
            <Grid container spacing={2} marginTop={1}>
              {ex.questions.map((question, index) => {
                let i = 0;
                const rowNumber = Math.floor(answers?.length / 4);
                const rows = Array.from({ length: rowNumber }, (_, index) =>
                  answers.slice(index * 2, (index + 1) * 2),
                );
                return (
                  <Grid item xs={6} md={6} key={index}>
                    <table
                      className={`option-list-table`}
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        border: '1px #000 solid',
                        backgroundColor: '#fff',
                      }}
                    >
                      <colgroup>
                        <col style={{ width: '50%' }} />
                        <col style={{ width: '50%' }} />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th
                            style={{
                              backgroundColor: 'inherit',
                              padding: '1rem 0',
                            }}
                            colSpan="2"
                          >
                            {question.content}
                          </th>
                        </tr>
                        {rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((item) => {
                              i++;
                              return (
                                <td
                                  key={item.id}
                                  style={{
                                    border: '1px solid #000',
                                    backgroundColor: '#fff',
                                  }}
                                >
                                  <div
                                    style={{
                                      paddingTop: '100%',
                                      position: ' relative',
                                    }}
                                  >
                                    <div
                                      className={`box
                                      ${
                                        isCheck
                                          ? failedAnswer.some(
                                              (answer) =>
                                                parseInt(answer.id) === parseInt(question.id) &&
                                                answer.data.find(
                                                  (item) => parseInt(item.index) === i,
                                                ),
                                            )
                                            ? 'false'
                                            : 'true'
                                          : ''
                                      }
                                      `}
                                      id={question.id}
                                      data-index={i}
                                      onDrop={(event) => drop(event)}
                                      data-question-id={question.id}
                                      onDragOver={(event) => allowDrop(event)}
                                      style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        right: '0',
                                        bottom: '0',
                                        padding: '1rem',
                                        textAlign: 'center',
                                      }}
                                    ></div>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                );
              })}
              <Grid item xs={6} md={6}></Grid>
            </Grid>
          </div>
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
          </Stack>
        </div>
      </Grid>
    </>
  );
}

export default Group;
