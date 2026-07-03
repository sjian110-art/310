import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const [params] = useSearchParams();
  const [role, setRole] = useState(params.get('role') === 'student' ? 'student' : 'teacher');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle(role);
      navigate(role === 'teacher' ? '/teacher/create' : '/student/join');
    } catch (err) {
      console.error(err);
      setError('로그인에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="container" style={{ maxWidth: 440, padding: '80px 24px' }}>
        <div className="framed" style={{ textAlign: 'center' }}>
          <div className="eyebrow">ACE CANVAS 시작하기</div>
          <h2 style={{ marginTop: 12, fontSize: 26 }}>어떤 역할로 들어갈까요?</h2>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button
              className="btn"
              style={{
                flex: 1,
                background: role === 'teacher' ? 'var(--frame)' : 'transparent',
                color: role === 'teacher' ? 'var(--wall)' : 'var(--ink)',
                border: '1px solid var(--line)',
              }}
              onClick={() => setRole('teacher')}
            >
              교사
            </button>
            <button
              className="btn"
              style={{
                flex: 1,
                background: role === 'student' ? 'var(--frame)' : 'transparent',
                color: role === 'student' ? 'var(--wall)' : 'var(--ink)',
                border: '1px solid var(--line)',
              }}
              onClick={() => setRole('student')}
            >
              학생
            </button>
          </div>

          <button
            className="btn btn-gold"
            style={{ width: '100%', marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '로그인 중…' : 'Google 계정으로 계속하기'}
          </button>

          {error && <p style={{ color: 'var(--sienna)', fontSize: 13, marginTop: 12 }}>{error}</p>}

          <p style={{ marginTop: 20, fontSize: 12.5, color: 'var(--ink-soft)' }}>
            로그인 시 개인정보 처리방침 및 이용약관에 동의하는 것으로 간주됩니다.
          </p>

          <Link to="/" style={{ display: 'inline-block', marginTop: 24, fontSize: 13, color: 'var(--ink-soft)' }}>
            ← 메인 화면으로
          </Link>
        </div>
      </div>
    </div>
  );
}
