import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header.jsx';
import Timer from '../components/Timer.jsx';
import ArtworkCard from '../components/ArtworkCard.jsx';
import {
  listenSession,
  listenPlayers,
  startRound,
  openVoting,
} from '../lib/firestore.js';

export default function TeacherSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsub1 = listenSession(sessionId, setSession);
    const unsub2 = listenPlayers(sessionId, setPlayers);
    return () => {
      unsub1();
      unsub2();
    };
  }, [sessionId]);

  if (!session) {
    return (
      <div>
        <Header />
        <div className="container" style={{ padding: 80, textAlign: 'center', color: 'var(--ink-soft)' }}>
          세션을 불러오는 중…
        </div>
      </div>
    );
  }

  const joinURL = `${window.location.origin}/student/join?code=${session.code}`;
  const nextRound = session.currentRound + 1;

  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '48px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
          <div>
            <div className="eyebrow">
              라운드 {session.currentRound || 0} / {session.totalRounds} · 상태: {statusLabel(session.status)}
            </div>
            <h1 style={{ marginTop: 8, fontSize: 26 }}>{session.artworkTitle}</h1>

            <div style={{ marginTop: 20 }}>
              <ArtworkCard src={session.artworkURL} title={null} artist={session.artworkArtist} />
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              {session.status === 'playing' && session.timerEndsAt && (
                <Timer endsAt={session.timerEndsAt} onExpire={() => openVoting(sessionId)} />
              )}

              {(session.status === 'lobby' || session.status === 'result') && nextRound <= session.totalRounds && (
                <button className="btn btn-primary" onClick={() => startRound(sessionId, nextRound)}>
                  라운드 {nextRound} 시작하기
                </button>
              )}

              {session.status === 'playing' && (
                <button className="btn btn-secondary" onClick={() => openVoting(sessionId)}>
                  지금 투표 시작하기
                </button>
              )}

              {session.status === 'voting' && (
                <button className="btn btn-gold" onClick={() => navigate(`/teacher/results/${sessionId}`)}>
                  투표 결과 확인하기
                </button>
              )}

              {session.status === 'result' && nextRound > session.totalRounds && (
                <span style={{ color: 'var(--ink-soft)', fontSize: 14 }}>모든 라운드가 종료되었습니다 🎉</span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="framed" style={{ textAlign: 'center' }}>
              <div className="eyebrow">접속 코드</div>
              <div className="code-chip" style={{ marginTop: 10 }}>{session.code}</div>
              <div style={{ marginTop: 16, background: '#fff', display: 'inline-block', padding: 10 }}>
                <QRCodeSVG value={joinURL} size={140} />
              </div>
              <p style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-soft)', wordBreak: 'break-all' }}>{joinURL}</p>
            </div>

            <div className="framed">
              <div className="eyebrow">참여 학생 ({players.length})</div>
              <ul style={{ marginTop: 12, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
                {players.length === 0 && (
                  <li style={{ fontSize: 13, color: 'var(--ink-soft)' }}>아직 참여한 학생이 없습니다.</li>
                )}
                {players.map((p) => (
                  <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                    {p.photoURL && <img src={p.photoURL} alt="" style={{ width: 22, height: 22, borderRadius: '50%' }} />}
                    {p.name}
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)' }}>{p.score ?? 0}pt</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function statusLabel(status) {
  return { lobby: '대기 중', playing: '감상 진행 중', voting: '투표 중', result: '결과 확인', ended: '종료됨' }[status] ?? status;
}
