import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

export default function Home() {
  return (
    <div>
      <Header />

      <section className="container" style={{ padding: '96px 24px 64px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          실시간 미술 감상 게임
        </div>
        <h1
          className="display"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.12, maxWidth: 760, margin: '0 auto' }}
        >
          <span className="brush-underline">
            눈으로 보고
            <svg viewBox="0 0 200 10" preserveAspectRatio="none">
              <path d="M2 6 C 40 2, 80 9, 120 5 S 180 2, 198 6" stroke="var(--gold)" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          , 글로 다시 그리는<br />
          미술 감상 게임
        </h1>
        <p style={{ marginTop: 24, fontSize: 17, color: 'var(--ink-soft)', maxWidth: 560, marginInline: 'auto' }}>
          작품을 감상하고, 글로 묘사하고, 친구들과 투표하고, AI가 그 글을 다시 그림으로 되살립니다.
          내 감상이 얼마나 구체적이었는지 눈으로 확인해 보세요.
        </p>

        <div style={{ marginTop: 40, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login?role=teacher">
            <button className="btn btn-primary">교사로 게임 시작하기</button>
          </Link>
          <Link to="/student/join">
            <button className="btn btn-gold">학생으로 참여하기</button>
          </Link>
        </div>
      </section>

      <section className="container" style={{ padding: '48px 24px 96px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {[
            { step: '감상', desc: '제시된 명화를 자세히 관찰하고 글로 묘사해요.' },
            { step: '투표', desc: '가장 생생하고 구체적인 감상문에 투표해요.' },
            { step: '재현', desc: '1등 감상문을 AI가 그림으로 되살려 원작과 비교해요.' },
            { step: '피드백', desc: '다음 라운드부터 AI가 감상을 더 깊게 만들도록 도와줘요.' },
          ].map((item) => (
            <div key={item.step} className="framed">
              <div className="eyebrow" style={{ color: 'var(--frame)' }}>{item.step}</div>
              <p style={{ marginTop: 10, fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <Link to="/hall-of-fame" style={{ fontSize: 14, textDecoration: 'underline', color: 'var(--frame)' }}>
            지난 우수 감상작, 명예의 전당에서 둘러보기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
