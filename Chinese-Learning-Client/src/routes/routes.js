import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import HomeLayout from '../layouts/DefaultLayout/HomeLayout';
import SmallLayout from '../layouts/DefaultLayout/SmallLayout';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home/Home';
import Introduction from '../pages/Introduction/Introduction';
import LearningSkill from '../pages/LearningSkill/LearningSkill';
import News from '../pages/News/News';
import OnlineLearning from '../pages/OnlineLearning/OnlineLearning';
import StudyProgram from '../pages/StudyProgram/StudyProgram';
import BooksList from '../pages/BooksList/BooksList';
import BookDetail from '../pages/BookDetail/BookDetail';
// import SkillExercises from '../pages/SkillExercises/SkillExercises';

// import Exercise from '../pages/Exercise/Exercise';
import Login from '../pages/Login/Login';
import ManagePost from '../pages/ManagePost/ManagePost';
import LecturerLayout from '../layouts/LecturerLayout/LecturerLayout';
import ManageDocument from '../pages/ManageDocument/ManageDocument';
import PostRead from '../pages/ManagePost/PostRead/PostRead';
import PostCreate from '../pages/ManagePost/PostCreate/PostCreate';
import PostUpdate from '../pages/ManagePost/PostUpdate/PostUpdate';
import PostReadClient from '../pages/ManagePost/PostRead/PostReadClient';
import Exercise from '../pages/Exercise/Exercise';
import SearchMobile from '../pages/SearchMobile/SearchMoblie';
import ManageExercise from '../pages/ManageExercise/ManageExercise';
import CreateExercise from '../pages/ManageExercise/Create/CreateExercise';

const publicRoutes = [
  { path: '/', component: Home, layout: HomeLayout },
  { path: '/search', component: SearchMobile },
  { path: '/gioi-thieu', component: Introduction, layout: DefaultLayout },
  { path: '/bai-viet/:id', component: PostReadClient, layout: SmallLayout },
  // { path: '/ex', component: Choose1, layout: SmallLayout },
  { path: '/hoc-truc-tuyen', component: OnlineLearning, layout: DefaultLayout },
  // { path: '/ky-nang', component: LearningSkill, layout: DefaultLayout },
  { path: '/lien-he', component: Contact, layout: DefaultLayout },

  { path: '/dang-nhap', component: Login, layout: SmallLayout },

  { path: '/nghe/so-cap', component: BooksList, layout: SmallLayout },
  { path: '/nghe/so-cap/:bookId', component: BookDetail, layout: SmallLayout },
  // { path: '/nghe/so-cap/threshold/exercise', component: Exercise, layout: SmallLayout },
  {
    path: '/nghe/so-cap/:bookId/:topicId/:partId',
    component: Exercise,
    layout: SmallLayout,
  },
];

const privateRoutes = [
  { path: '/quan-ly-bai-viet', component: ManagePost, layout: LecturerLayout },
  { path: '/quan-ly-bai-viet/tao', component: PostCreate, layout: LecturerLayout },
  { path: '/quan-ly-bai-viet/:id', component: PostRead, layout: LecturerLayout },
  { path: '/quan-ly-bai-viet/:id/chinh-sua', component: PostUpdate, layout: LecturerLayout },
  { path: '/quan-ly-tai-lieu', component: ManageDocument, layout: LecturerLayout },
  { path: '/quan-ly-bai-tap', component: ManageExercise, layout: LecturerLayout },
  { path: '/quan-ly-bai-tap/tao', component: CreateExercise, layout: LecturerLayout },
];

export { publicRoutes, privateRoutes };
