import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Collapse, Typography, Button, Stack } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import separateCharacters from '../../utils/separateCharacters';
import exerciseServices from '../../services/exerciseServices';
import questionServices from '../../services/questionServices';
import '../Exercise/Exercise.scss';

function Skill({ skill, setExercise, currentExercise, index }) {
  const [openSkill, setOpenSkill] = useState(true);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    exerciseServices
      .getBySkillId(skill.id)
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
        if (index === 0 && exercises.length > 0) {
          setExercise(exercises[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const separatedSkill = separateCharacters(skill.name);

  return (
    <React.Fragment>
      <Box className="skill-list">
        <Box key={skill.id} onClick={() => setOpenSkill(!openSkill)} className="skill-item">
          {openSkill ? (
            <KeyboardArrowDownIcon className="skill-icon" />
          ) : (
            <KeyboardArrowRightIcon className="skill-icon" />
          )}
          <Box>
            <Typography variant="body" color="rgba(0, 0, 0, 0.7)">
              {separatedSkill[0]}
            </Typography>
            <br />
            <Typography sx={{ fontSize: '1.4rem' }} color="rgba(0, 0, 0, 0.7)">
              {separatedSkill[1]}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        padding="0 1.2rem 0 1.2rem"
        borderBottom="1px solid rgba(0, 0, 0, 0.2)"
      >
        {exercises.length > 0 &&
          exercises.map((ex, index) => (
            <Collapse in={openSkill} timeout="auto" unmountOnExit key={index}>
              {/* <Link
              style={{ color: 'rgba(0, 0, 0, 0.7)', textDecoration: 'none' }}
              onClick={() => setExercise(ex)}
            >
              <Box className={`exercise-item ${currentExercise === ex ? 'selected' : ''}`}>
                <BookmarkBorderIcon className="exercise-icon" />
                {/* Số thứ tự exercise bình thường
                <Typography variant="body" color="rgba(0, 0, 0, 0.7)">
                  {`Exercise bình thường ${ex.ordinalNumber}`}
                </Typography>
              </Box>
            </Link> */}
              <Button
                variant="contained"
                sx={{
                  fontSize: '1.6rem',
                  backgroundColor: '#ffeb3b',
                  color: '#000',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#fbc02d',
                  },
                  marginBottom: '1.2rem',
                  marginLeft: '0.6rem',
                }}
                onClick={() => setExercise(ex)}
                className={`exercise-item ${currentExercise?.id === ex?.id ? 'selected' : ''}`}
              >
                {/* Số thứ tự exercise bình thường */}
                {ex.ordinalNumber}
              </Button>
            </Collapse>
          ))}
      </Stack>
    </React.Fragment>
  );
}

export default Skill;
