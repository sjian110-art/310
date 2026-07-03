import { useEffect, useState } from 'react';

export default function Timer({ endsAt, onExpire }) {
  const [remaining, setRemaining] = useState(Math.max(0, (endsAt ?? Date.now()) - Date.now()));

  useEffect(() => {
    if (!endsAt) return;
    const tick = setInterval(() => {
      const diff = Math.max(0, endsAt - Date.now());
      setRemaining(diff);
      if (diff <= 0) {
        clearInterval(tick);
        onExpire?.();
      }
    }, 250);
    return () => clearInterval(tick);
  }, [endsAt, onExpire]);

  const totalSeconds = Math.ceil(remaining / 1000);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  const urgent = totalSeconds <= 20;

  return (
    <div
      className="code-chip"
      style={{
        background: urgent ? 'var(--sienna)' : 'var(--frame)',
        fontSize: 26,
      }}
    >
      {mm}:{ss}
    </div>
  );
}
