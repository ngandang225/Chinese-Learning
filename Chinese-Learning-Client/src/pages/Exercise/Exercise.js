import React from 'react';
import { Box, Tooltip, Button, Divider, Stack, Typography, IconButton } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import skillServices from '../../services/skillServices';
import './Exercise.scss';
import Choose1 from './Choose1/Choose1';
import ChooseImage from './ChooseImage/ChooseImage';
import ComboBox1 from './ComboBox1/ComboBox1';
import TrueFalse from './TrueFalse/TrueFalse';
import DragToDrog from './DragToDrog/DragToDrog';
import FillInBlanksConversation from './FillInBlanksConversation/FillInBlanksConversation';
import NewWords from './NewWords/NewWords';
import ChooseMultiple from './ChooseMultiple/ChooseMultiple';
import ListenAndRead from './ListenAndRead/ListenAndRead';
import Choose from './Choose/Choose';
import Match from './Match/Match';
import FillInTheBlanks from './FillInTheBlanks/FillInTheBlanks';
import FillInNumber from './FillInNumber/FillInNumber';
import FillInTones from './FillInTones/FillInTones';
import SameOrNot from './SameOrNot/SameOrNot';
import TrueFalse2 from './TrueFalse2/TrueFalse2';
import TrueFalse3 from './TrueFalse3/TrueFalse3';
import Skill from '../BookDetail/Skill';
import partServices from '../../services/partServices';
import topicServices from '../../services/topicServices';
import exerciseServices from '../../services/exerciseServices';
import questionServices from '../../services/questionServices';
import bookServices from '../../services/bookServices';
import ComboBox2 from './ComboBox2/ComboBox2';
import ComboBox3 from './ComboBox3/ComboBox3';
import ComboBox4 from './ComboBox4/ComboBox4';
import Choose2 from './Choose2/Choose2';
import Group from './Group/Group';
import slugUrl from '../../utils/slugUrl';
import { BarLoader } from 'react-spinners';

function Exercise() {
  const navigate = useNavigate();
  let { bookId } = useParams();
  let splitBookId = bookId.split('-');
  splitBookId = splitBookId[splitBookId.length - 1].split('b');
  bookId = splitBookId[splitBookId.length - 1];

  let { topicId } = useParams();
  let splitTopicId = topicId.split('-');
  splitTopicId = splitTopicId[splitTopicId.length - 1].split('t');
  topicId = splitTopicId[splitTopicId.length - 1];

  let { partId } = useParams();
  let splitId = partId.split('-');
  splitId = splitId[splitId.length - 1].split('p');
  partId = splitId[splitId.length - 1];

  const [currentPart, setCurrentPart] = React.useState(null);
  const [parts, setParts] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [book, setBook] = React.useState(null);
  const [topics, setTopics] = React.useState([]);
  const [currentTopic, setCurrentTopic] = React.useState('');
  const [exercises, setExercises] = React.useState([]);
  const [currentExercise, setCurrentExercise] = React.useState(exercises?.[0] || null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await bookServices.getById(bookId);
        setBook({ ...bookData, slug: slugUrl(bookData.name) });

        const topics = await topicServices.getByBookId(bookId);
        setTopics(topics.map((item) => ({ ...item, slug: slugUrl(item.name) })));

        const topicData = await topicServices.getById(topicId);
        setCurrentTopic({ ...topicData, slug: slugUrl(topicData.name) });

        let partList = await Promise.all(
          topics.map(async (item) => {
            const part = await partServices.getByTopicId(item.id);
            return part;
          }),
        );
        partList = partList.flat().map((item) => ({ ...item, slug: slugUrl(item.name) }));
        setParts(partList);

        const partData = await partServices.getById(partId);
        setCurrentPart(partData);

        const skillsData = await skillServices.getByPartId(partId);
        setSkills(skillsData);

        const exercisesData = await exerciseServices.getByPartId(partId);
        const exercises = await Promise.all(
          exercisesData.map(async (exercise) => {
            try {
              const questions = await questionServices.getByExerciseId(exercise.id);
              return {
                ...exercise,
                questions,
              };
            } catch (err) {
              console.log(err);
            }
          }),
        );
        setExercises(exercises);
        setCurrentExercise(exercises[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [bookId, topicId, partId]);

  const handleNextPart = () => {
    if (parseInt(partId) !== parts[parts?.length - 1]?.id) {
      setCurrentExercise(null);
      const currentIndex = parts.findIndex((item) => item.id === currentPart.id);
      const topicId = parts.find((part) => part?.id === parseInt(partId) + 1).topicId;
      const nextTopic = topics.find((item) => item.id === topicId);
      navigate(
        `/nghe/so-cap/${book?.slug}-b${book.id}/${nextTopic?.slug}-t${topicId}/${
          parts[currentIndex + 1]?.slug
        }-p${parseInt(partId) + 1}`,
      );
    }
  };
  const handlePreviousPart = () => {
    if (parseInt(partId) !== parts?.[0]?.id) {
      setCurrentExercise(null);
      const currentIndex = parts.findIndex((item) => item.id === currentPart.id);
      const topicId = parts.find((part) => part?.id === parseInt(partId) - 1).topicId;
      const nextTopic = topics.find((item) => item.id === topicId);
      navigate(
        `/nghe/so-cap/${book?.slug}-b${book.id}/${nextTopic?.slug}-t${topicId}/${
          parts[currentIndex + 1]?.slug
        }-p${parseInt(partId) - 1}`,
      );
    }
  };

  return (
    <div id="lesson-exercise-wrapper">
      <Link to={`/nghe/so-cap/${book?.slug}-b${book?.id}`} className="back-link">
        VỀ TRANG CHỦ ĐỀ
      </Link>
      <Box className="lesson-exercise-container">
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#ffeb3b',
            minHeight: '3.2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="part-name"
        >
          {/* Previous */}
          <IconButton
            variant="text"
            sx={{
              fontSize: '1.2rem',
              color: '#000',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#fff59d',
              },
            }}
            disabled={parseInt(partId) === parts?.[0]?.id}
            onClick={handlePreviousPart}
          >
            <ArrowBackOutlinedIcon fontSize="large" />
          </IconButton>

          {/* Breadcrumbs */}
          {/* <div className="breadcrumb-container" style={{ display: 'flex' }}> */}
          <div
            className="breadcrumb"
            // separator={false}
            // aria-label="breadcrumb"
            sx={{ fontSize: '1.4rem' }}
          >
            <Tooltip title={book?.name.split(',').join(' - ')} placement="top">
              <Box className="book-link" marginRight="0.7rem">
                <Link
                  key="1"
                  style={{ color: '#000', textDecoration: 'none' }}
                  to={`/nghe/so-cap/${book?.slug}-b${book?.id}`}
                >
                  {book?.name.split(',').join(' - ')}
                </Link>
              </Box>
            </Tooltip>
            <Tooltip title={currentTopic?.name} placement="top">
              <Box className="topic-link" marginRight="0.7rem">
                <Link
                  key="2"
                  style={{ color: '#000', textDecoration: 'none' }}
                  to={`/nghe/so-cap/${book?.slug}-b${book?.id}?t=${topicId}`}
                >
                  {currentTopic?.name}
                </Link>
              </Box>
            </Tooltip>
            <Tooltip title={currentPart?.name} placement="top">
              <Box className="part-link">
                <Link
                  key="3"
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    cursor: 'auto',
                  }}
                >
                  {currentPart?.name}
                </Link>
              </Box>
            </Tooltip>
          </div>
          {/* </div> */}

          {/* Next */}
          <IconButton
            variant="text"
            sx={{
              fontSize: '1.2rem',
              color: '#000',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#fff59d',
              },
            }}
            disabled={parseInt(partId) === parts[parts?.length - 1]?.id}
            onClick={handleNextPart}
          >
            <ArrowForwardOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box className="body">
          <Stack className="lesson-exercise-list">
            {/* Skill */}
            <Box className="skill-list">
              {skills?.length > 0 ? (
                skills.map(
                  (skill, index) =>
                    !skill.deleted && (
                      <Skill
                        index={index}
                        key={skill?.id}
                        skill={skill}
                        setExercise={setCurrentExercise}
                        currentExercise={currentExercise}
                      />
                    ),
                )
              ) : (
                <Box
                  className="exercise-list"
                  sx={{
                    direction: 'row',
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    padding: '1.2rem 1.2rem 0 1.2rem',
                  }}
                >
                  {exercises?.length > 0 &&
                    exercises.map(
                      (ex, index) =>
                        ex.id !== 53 && (
                          <Button
                            key={ex.id}
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
                              marginLeft: '0.4rem',
                            }}
                            onClick={() => setCurrentExercise(ex)}
                            className={`exercise-item ${currentExercise === ex ? 'selected' : ''}`}
                          >
                            {/* Số thự tự bài tập thuộc part cột trái */}
                            {ex.ordinalNumber}
                          </Button>
                        ),
                    )}
                </Box>
              )}
            </Box>
          </Stack>
          <Divider orientation="vertical" className="divider" />

          <Box className="lesson-exercise-content">
            {!!currentExercise && currentExercise.id !== 53 ? (
              <Box sx={{ marginBottom: '1.2rem' }}>
                {/* <Box className="exercise-number"> */}
                <div style={{ marginBottom: '-0.8rem' }}>
                  <Typography variant="body" fontWeight="bold" sx={{ textDecoration: 'underline' }}>
                    {currentExercise?.ordinalNumber.includes('Text') ||
                    currentExercise?.ordinalNumber.includes('第')
                      ? currentExercise.ordinalNumber
                      : `Exercise ${currentExercise.ordinalNumber}`}
                  </Typography>
                </div>
                {/* </Box> */}
                <br></br>
                <Typography variant="body">{currentExercise?.description}</Typography>
              </Box>
            ) : (
              // <Typography variant="body" fontWeight="bold">
              //   {`Bạn chưa chọn bài tập nào`}
              // </Typography>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BarLoader color="#ffeb3b" width={200} speedMultiplier={1.5} />
                <Typography sx={{ fontSize: '1.4rem', mt: '1.2rem' }} color="rgba(0, 0, 0, 0.7)">
                  Loading...
                </Typography>
              </div>
            )}

            {!!currentExercise && (
              <Box sx={{ marginBottom: '3.2rem' }}>
                {currentExercise?.exerciseType.includes('Listen and read') ? (
                  <ListenAndRead ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Match' ? (
                  <Match ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Choose' ? (
                  <Choose ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Fill in the blanks' ? (
                  <FillInTheBlanks ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Fill in tones' ? (
                  <FillInTones ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Fill in number' ? (
                  <FillInNumber ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Same or not' ? (
                  <SameOrNot ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Choose1' ? (
                  <Choose1 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Choose2' ? (
                  <Choose2 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'ChooseImage' ? (
                  <ChooseImage ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'ComboBox1' ? (
                  <ComboBox1 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'ComboBox2' ? (
                  <ComboBox2 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'ComboBox3' ? (
                  <ComboBox3 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'ComboBox4' ? (
                  <ComboBox4 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'TrueFalse' ? (
                  <TrueFalse ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'TrueFalse2' ? (
                  <TrueFalse2 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'TrueFalse3' ? (
                  <TrueFalse3 ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'DragToDrog' ? (
                  <DragToDrog ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Group' ? (
                  <Group ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'FillInBlanksConversation' ? (
                  <FillInBlanksConversation ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'NewWords' ? (
                  <NewWords ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'ChooseMultiple' ? (
                  <ChooseMultiple ex={currentExercise} />
                ) : currentExercise?.exerciseType === 'Combobox2' ? (
                  <ComboBox2 ex={currentExercise} />
                ) : exercises?.length === 0 ? (
                  'Phần này không có bài tập nào bạn nhé!'
                ) : (
                  ''
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Exercise;
