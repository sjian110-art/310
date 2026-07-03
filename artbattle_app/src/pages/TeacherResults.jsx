import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import SubmissionCard from '../components/SubmissionCard.jsx';
import { listenSession, listenSubmissions, showResult, addToHallOfFame } from '../lib/firestore.js';
import { generateImageFromText } from '../lib/ai.js';

export default function TeacherResults() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [aiImage, setAiImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub1 = listenSession(sessionId, (s) => {
      setSession(s);
      showResult(sessionId);
    });
    return () => unsub1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    if (!session?.currentRound) return;
    const unsub2 = listenSubmissions(sessionId, session.currentRound, setSubmissions);
    return () => unsub2();
  }, [sessionId, session?.currentRound]);

  const ranked = [...submissions].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
  const winner = ranked[0];

  async function handleGenerate() {
    if (!winner) return;
    setGenerating(true);
    setError('');
    try {
      const imageUrl = await generateImageFromText(winner.text);
      setAiImage(imageUrl);
      await addToHallOfFame({
        sessionId,
        originalArtworkURL: session.artworkURL,
        winningText: winner.text,
        aiGeneratedImageURL: imageUrl,
        studentName: winner.id, // 실제 구현에서는 players 컬렉션과 조인해 이름을 표시하세요.
      });
    } catch (err) {
      console.error(err);
      setError('이미지 생성에 실패했습니다. IMAGIN API 키 설정을 확인해 주세요.');
    } finally {
      setGenerating(false);
    }
  }

  if (!session) return null;

  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '48px 24px 96px' }}>
        <div className="eyebrow">라운드 {session.currentRound} 투표 결과</div>
        <h1 style={{ marginTop: 8, fontSize: 28 }}>{session.artworkTitle}</h1>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {ranked.map((s, i) => (
            <SubmissionCard key={s.id} text={s.text} votes={s.votes} showVotes rank={i + 1} />
          ))}
          {ranked.length === 0 && (
            <p style={{ color: 'var(--ink-soft)' }}>제출된 감상문이 없습니다.</p>
          )}
        </div>

        {winner && (
          <div className="framed" style={{ marginTop: 40 }}>
            <div className="eyebrow" style={{ color: 'var(--gold)' }}>1위 감상문을 AI 그림으로 되살리기</div>
            <p style={{ marginTop: 10, fontSize: 15 }}>{winner.text}</p>

            {!aiImage ? (
              <button className="btn btn-gold" style={{ marginTop: 16 }} onClick={handleGenerate} disabled={generating}>
                {generating ? '이미지 생성 중…' : 'AI 이미지 생성하기'}
              </button>
            ) : (
              <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div className="eyebrow">원작</div>
                  <img src={session.artworkURL} alt="원작" style={{ width: '100%', borderRadius: 4, marginTop: 8 }} />
                </div>
                <div>
                  <div className="eyebrow" style={{ color: 'var(--gold)' }}>AI가 되살린 그림</div>
                  <img src={aiImage} alt="AI 재현" style={{ width: '100%', borderRadius: 4, marginTop: 8 }} />
                </div>
              </div>
            )}
            {error && <p style={{ color: 'var(--sienna)', fontSize: 13, marginTop: 10 }}>{error}</p>}
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          <Link to={`/teacher/session/${sessionId}`}>
            <button className="btn btn-secondary">세션으로 돌아가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
