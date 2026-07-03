import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import { listenHallOfFame } from '../lib/firestore.js';

export default function HallOfFame() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsub = listenHallOfFame(setEntries);
    return () => unsub();
  }, []);

  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '56px 24px 96px' }}>
        <div className="eyebrow">HALL OF FAME</div>
        <h1 style={{ marginTop: 10, fontSize: 34 }}>명예의 전당</h1>
        <p style={{ marginTop: 10, color: 'var(--ink-soft)', maxWidth: 560 }}>
          원작과 AI가 되살린 그림, 그리고 그 사이를 이어준 감상문을 함께 둘러보세요.
        </p>

        {entries.length === 0 ? (
          <div className="framed" style={{ marginTop: 32, textAlign: 'center', color: 'var(--ink-soft)' }}>
            아직 등록된 우수작이 없습니다. 첫 게임을 진행하고 명예의 전당의 주인공이 되어 보세요.
          </div>
        ) : (
          <div
            style={{
              marginTop: 32,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {entries.map((entry) => (
              <div key={entry.id} className="framed">
                <div style={{ display: 'flex', gap: 8 }}>
                  <img
                    src={entry.originalArtworkURL}
                    alt="원작"
                    style={{ width: '50%', height: 160, objectFit: 'cover', borderRadius: 2 }}
                  />
                  <img
                    src={entry.aiGeneratedImageURL}
                    alt="AI 재현"
                    style={{ width: '50%', height: 160, objectFit: 'cover', borderRadius: 2 }}
                  />
                </div>
                <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.55 }}>{entry.winningText}</p>
                <div className="eyebrow" style={{ marginTop: 10 }}>by {entry.studentName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
