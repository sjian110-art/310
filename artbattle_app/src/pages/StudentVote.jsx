import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import SubmissionCard from '../components/SubmissionCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { listenSession, listenSubmissions, castVote } from '../lib/firestore.js';

export default function StudentVote() {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [votedFor, setVotedFor] = useState(null);

  useEffect(() => {
    const unsub = listenSession(sessionId, setSession);
    return () => unsub();
  }, [sessionId]);

  useEffect(() => {
    if (!session?.currentRound) return;
    const unsub = listenSubmissions(sessionId, session.currentRound, setSubmissions);
    return () => unsub();
  }, [sessionId, session?.currentRound]);

  useEffect(() => {
    if (session?.status === 'result') {
      navigate(`/student/game/${sessionId}`);
    }
  }, [session?.status, sessionId, navigate]);

  if (!session) return null;

  const others = submissions.filter((s) => s.id !== user?.uid);

  async function handleVote(submissionUid) {
    if (votedFor) return;
    await castVote(sessionId, session.currentRound, submissionUid);
    setVotedFor(submissionUid);
  }

  return (
    <div>
      <Header />
      <div className="container" style={{ maxWidth: 720, padding: '40px 24px 96px' }}>
        <div className="eyebrow">라운드 {session.currentRound} · 투표</div>
        <h2 style={{ marginTop: 8, fontSize: 24 }}>가장 생생하게 묘사한 감상문에 투표하세요</h2>

        <div style={{ marginTop: 24, display: 'grid', gap: 14 }}>
          {others.map((s) => (
            <SubmissionCard
              key={s.id}
              text={s.text}
              selected={votedFor === s.id}
              onVote={votedFor ? undefined : () => handleVote(s.id)}
            />
          ))}
          {others.length === 0 && <p style={{ color: 'var(--ink-soft)' }}>투표할 다른 감상문이 아직 없습니다.</p>}
        </div>

        {votedFor && <p style={{ marginTop: 20, color: 'var(--ink-soft)', fontSize: 14 }}>투표 완료! 선생님이 결과를 공개할 때까지 기다려 주세요.</p>}
      </div>
    </div>
  );
}
