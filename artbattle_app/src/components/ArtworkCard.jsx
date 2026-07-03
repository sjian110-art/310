export default function ArtworkCard({ src, title, artist, size = 'large' }) {
  const height = size === 'large' ? 420 : 220;
  return (
    <div className="framed" style={{ padding: 14 }}>
      <div
        style={{
          height,
          background: `#eee url(${src}) center/cover no-repeat`,
          borderRadius: 2,
        }}
      />
      {(title || artist) && (
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          {title && <div style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>{title}</div>}
          {artist && <div className="eyebrow" style={{ marginTop: 4 }}>{artist}</div>}
        </div>
      )}
    </div>
  );
}
