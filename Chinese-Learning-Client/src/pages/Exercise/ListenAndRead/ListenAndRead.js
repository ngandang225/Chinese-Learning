import { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import './ListenAndRead.scss';
import Audio from '../../../components/Audio/Audio';
function ListenAndRead({ ex }) {
  const [currentAudio, setCurrentAudio] = useState(ex.record ? ex.record : null);

  useEffect(() => {
    setCurrentAudio(ex.record ? ex.record : null);
  }, [ex]);
  return (
    <div className="listen-and-read-wrapper">
      {ex.record && <Audio exeAudio={currentAudio} />}
      {/* Listen and read - 1 */}
      {ex.questions?.length > 0 &&
        ex.exerciseType === 'Listen and read - 1' &&
        ex.questions.map((question) => {
          let questionContents = question.content.split(',');
          return (
            <Box marginTop="1.2rem" key={question.id} className="question-1-wrapper">
              <Grid container className="question-1" spacing={{ xs: 1, md: 2, lg: 3 }}>
                <Grid item xs={1.5} md={2} lg={2}>
                  {ex.id !== 50 ? `(${question.ordinalNumber})` : question.ordinalNumber}
                </Grid>
                {questionContents.map((item, index) => (
                  <Grid item xs={2.5} md={2} lg={2} key={index}>
                    {item}
                  </Grid>
                ))}
              </Grid>
              <br></br>
            </Box>
          );
        })}
      {/* Listen and read - 2 */}
      {ex.questions?.length > 0 && ex.exerciseType === 'Listen and read - 2' && (
        <Box marginTop="1.2rem" className="question-wrapper">
          <Grid container className="question" spacing={{ xs: 2, md: 2, lg: 2 }}>
            {ex.questions.map((question) => (
              <Grid item xs={6} md={4} lg={4} key={question.id}>
                <Typography
                  variant="body"
                  marginRight="2.4rem"
                >{`(${question.ordinalNumber})`}</Typography>
                <Typography variant="body">{question.content}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {/* Listen and read - 3 */}
      {ex.questions?.length > 0 &&
        ex.exerciseType === 'Listen and read' &&
        ex.questions.map((question) => {
          let questionContents = question.content.split(',');
          const contentCount = questionContents.length;
          return (
            <Box marginTop="1.2rem" key={question.id} className="long-read-question-wrapper">
              <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
                <Grid item xs={contentCount >= 3 ? 1 : 2} md={2} lg={2}>
                  {`(${question.ordinalNumber})`}
                </Grid>
                {questionContents.map((item, index) => (
                  <Grid item xs={contentCount === 3 ? 3.6 : 5} md={3} lg={3} key={index}>
                    {item}
                  </Grid>
                ))}
              </Grid>
              <br></br>
            </Box>
          );
        })}
      {/* Listen and read - 4 */}
      {ex.questions?.length > 0 &&
        ex.exerciseType === 'Listen and read - 4' &&
        ex.questions.map((question) => {
          let questionContents = question.content.split(',');
          return (
            <Box marginTop="1.2rem" key={question.id} marginRight="-2rem">
              <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
                <Grid item xs={1.3} md={1.5} lg={1.5}>
                  {`(${question.ordinalNumber})`}
                </Grid>
                {questionContents.map((item, index) => {
                  let chinese = item.slice(0, 2);
                  let english = item.slice(2, item.length);
                  return (
                    <Grid item xs={2.4} md={2.6} lg={2.6} key={index}>
                      <Typography variant="body">{chinese}</Typography>
                      <br></br>
                      <Typography variant="body">{english}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
              <br></br>
            </Box>
          );
        })}
      {/* Listen and read - 5 */}
      {ex.questions?.length > 0 &&
        ex.exerciseType === 'Listen and read - 5' &&
        ex.questions.map((question) => {
          let questionContents = question.content.split(',');
          return (
            <Box marginTop="1.2rem" key={question.id} marginRight="-2rem">
              <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
                {questionContents.map((item, index) => (
                  <Grid item xs={3} md={3} lg={3} key={index}>
                    {item}
                  </Grid>
                ))}
              </Grid>
              <br></br>
            </Box>
          );
        })}
      {/* Listen and read - 6 */}
      {ex.questions?.length > 0 &&
        ex.exerciseType === 'Listen and read - 6' &&
        ex.questions.map((question) => {
          let questionContents = question.content.split(',');
          return (
            <Box marginTop="1.2rem" key={question.id} marginRight="-2rem">
              <Typography
                variant="h4"
                sx={{ textAlign: 'center', marginBottom: '1.6rem' }}
              >{`(${question.ordinalNumber})`}</Typography>
              <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
                {questionContents.map((item, index) => (
                  <Grid item xs={6} md={4} lg={3} key={index}>
                    {item}
                  </Grid>
                ))}
              </Grid>
              <br></br>
            </Box>
          );
        })}
      {/* Listen and read - 7 */}
      <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
        {ex.questions?.length > 0 &&
          ex.exerciseType === 'Listen and read - 7' &&
          ex.questions.map((question) => {
            let questionContents = question.content.split(',');
            return (
              <Grid item xs={6} md={6} lg={6} key={question.id} marginTop="2rem" textAlign="center">
                <Typography fontSize="2rem">{`(${question.ordinalNumber})`}</Typography>
                {questionContents.map((item, index) => (
                  <Box marginTop="1.6rem">
                    <Typography variant="body" key={index}>
                      {item}
                    </Typography>
                    <br></br>
                  </Box>
                ))}
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default ListenAndRead;
