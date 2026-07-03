import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ borderBottom: '1px solid var(--line)' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="display" style={{ fontSize: 22, color: 'var(--frame)' }}>
            ACE
          </span>
          <span className="eyebrow">CANVAS</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 14 }}>
          <Link to="/hall-of-fame" style={{ textDecoration: 'none', color: 'var(--ink-soft)' }}>
            명예의 전당
          </Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  style={{ width: 28, height: 28, borderRadius: '50%' }}
                />
              )}
              <button className="btn btn-secondary" style={{ padding: '6px 14px' }} onClick={logout}>
                로그아웃
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-secondary" style={{ padding: '6px 14px' }}>
                로그인
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
