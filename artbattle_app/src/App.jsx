import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import HallOfFame from './pages/HallOfFame.jsx';
import TeacherCreate from './pages/TeacherCreate.jsx';
import TeacherSession from './pages/TeacherSession.jsx';
import TeacherResults from './pages/TeacherResults.jsx';
import StudentJoin from './pages/StudentJoin.jsx';
import StudentGame from './pages/StudentGame.jsx';
import StudentVote from './pages/StudentVote.jsx';

export default function App() {
  return (
    <Routes>
      {/* 메인 화면이 항상 첫 진입점, 로그인은 그 다음 단계 */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/hall-of-fame" element={<HallOfFame />} />

      <Route path="/teacher/create" element={<TeacherCreate />} />
      <Route path="/teacher/session/:sessionId" element={<TeacherSession />} />
      <Route path="/teacher/results/:sessionId" element={<TeacherResults />} />

      <Route path="/student/join" element={<StudentJoin />} />
      <Route path="/student/game/:sessionId" element={<StudentGame />} />
      <Route path="/student/vote/:sessionId" element={<StudentVote />} />
    </Routes>
  );
}
