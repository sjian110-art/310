import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Timer from '../components/Timer.jsx';
import ArtworkCard from '../components/ArtworkCard.jsx';
import VoiceInput from '../components/VoiceInput.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { listenSession, submitDescription, saveAiFeedback } from '../lib/firestore.js';
import { getAiFeedback } from '../lib/ai.js';

export default function StudentGame() {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    const unsub = listenSession(sessionId, setSession);
    return () => unsub();
  }, [sessionId]);

  useEffect(() => {
    if (session?.status === 'voting') {
      navigate(`/student/vote/${sessionId}`);
    }
    if (session?.status === 'playing') {
      setSubmitted(false);
      setText('');
      setFeedback('');
    }
  }, [session?.status, session?.currentRound, sessionId, navigate]);

  if (!session || !user) {
    return (
      <div>
        <Header />
        <div className="container" style={{ padding: 80, textAlign: 'center', color: 'var(--ink-soft)' }}>불러오는 중…</div>
      </div>
    );
  }

  async function handleSubmit() {
    if (!text.trim()) return;
    await submitDescription(sessionId, session.currentRound, user.uid, text.trim());
    setSubmitted(true);
  }

  async function handleFeedback() {
    setFeedbackLoading(true);
    try {
      const result = await getAiFeedback(session.artworkURL, text);
      setFeedback(result);
      await saveAiFeedback(sessionId, session.currentRound, user.uid, result);
    } catch (err) {
      console.error(err);
      setFeedback('피드백을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setFeedbackLoading(false);
    }
  }

  if (session.status === 'lobby') {
    return (
      <div>
        <Header />
        <div className="container" style={{ padding: 80, textAlign: 'center' }}>
          <div className="eyebrow">대기 중</div>
          <h2 style={{ marginTop: 12 }}>선생님이 라운드를 시작하면 자동으로 시작됩니다</h2>
        </div>
      </div>
    );
  }

  const canUseAiFeedback = session.currentRound >= 2;

  return (
    <div>
      <Header />
      <div className="container" style={{ maxWidth: 720, padding: '40px 24px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="eyebrow">라운드 {session.currentRound} / {session.totalRounds}</div>
          {session.timerEndsAt && <Timer endsAt={session.timerEndsAt} />}
        </div>

        <div style={{ marginTop: 18 }}>
          <ArtworkCard src={session.artworkURL} title={null} artist={null} />
        </div>

        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>이 작품을 최대한 구체적으로 묘사해 보세요</label>
          <textarea
            className="input"
            style={{ marginTop: 8, minHeight: 140, resize: 'vertical' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="예: 짙은 파란 밤하늘에 소용돌이치는 노란 별빛이…"
            disabled={submitted}
          />
          <div style={{ marginTop: 10 }}>
            <VoiceInput onText={(t) => setText((prev) => (prev ? prev + ' ' + t : t))} />
          </div>
        </div>

        {canUseAiFeedback && !submitted && (
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-secondary" onClick={handleFeedback} disabled={!text.trim() || feedbackLoading}>
              {feedbackLoading ? 'AI가 읽는 중…' : '💡 AI에게 감상 힌트 받기'}
            </button>
            {feedback && (
              <div className="framed" style={{ marginTop: 14, background: '#fbf6ea' }}>
                <div className="eyebrow" style={{ color: 'var(--gold)' }}>AI 피드백</div>
                <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>{feedback}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          {submitted ? (
            <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>제출 완료! 다른 학생들을 기다리는 중입니다.</p>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit} disabled={!text.trim()}>
              감상문 제출하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
