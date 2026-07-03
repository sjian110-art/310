export default function SubmissionCard({ text, votes, selected, onVote, showVotes, rank }) {
  return (
    <div
      className="framed"
      onClick={onVote}
      style={{
        cursor: onVote ? 'pointer' : 'default',
        borderColor: selected ? 'var(--gold)' : 'var(--line)',
        boxShadow: selected ? '0 0 0 2px var(--gold)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minHeight: 140,
      }}
    >
      {rank && (
        <span className="eyebrow" style={{ color: 'var(--gold)' }}>
          {rank}위
        </span>
      )}
      <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, flex: 1 }}>{text}</p>
      {showVotes && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-soft)' }}>
          득표 {votes ?? 0}표
        </div>
      )}
    </div>
  );
}
