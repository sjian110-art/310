import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { findSessionByCode, joinSession } from '../lib/firestore.js';

export default function StudentJoin() {
  const [params] = useSearchParams();
  const [code, setCode] = useState(params.get('code') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleJoin() {
    if (code.length !== 6) {
      setError('6자리 접속 코드를 입력해 주세요.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      let currentUser = user;
      if (!currentUser) {
        currentUser = await loginWithGoogle('student');
      }
      const session = await findSessionByCode(code);
      if (!session) {
        setError('해당 코드의 게임을 찾을 수 없습니다.');
        return;
      }
      await joinSession(session.id, currentUser.uid, {
        name: currentUser.displayName,
        photoURL: currentUser.photoURL,
      });
      navigate(`/student/game/${session.id}`);
    } catch (err) {
      console.error(err);
      setError('참여에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.get('code')) setCode(params.get('code'));
  }, [params]);

  return (
    <div>
      <Header />
      <div className="container" style={{ maxWidth: 420, padding: '80px 24px' }}>
        <div className="framed" style={{ textAlign: 'center' }}>
          <div className="eyebrow">학생 참여</div>
          <h2 style={{ marginTop: 12, fontSize: 24 }}>접속 코드를 입력하세요</h2>

          <input
            className="input"
            style={{ marginTop: 22, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 24, letterSpacing: '0.15em' }}
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="123456"
          />

          {error && <p style={{ color: 'var(--sienna)', fontSize: 13, marginTop: 10 }}>{error}</p>}

          <button className="btn btn-primary" style={{ width: '100%', marginTop: 20 }} onClick={handleJoin} disabled={loading}>
            {loading ? '입장 중…' : user ? '게임 입장하기' : 'Google 로그인 후 입장하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
