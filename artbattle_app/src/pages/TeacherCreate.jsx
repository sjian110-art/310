import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '../components/Header.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { storage } from '../firebase.js';
import { createSession } from '../lib/firestore.js';

export default function TeacherCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [rounds, setRounds] = useState(3);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleCreate() {
    if (!file || !title) {
      setError('작품 이미지와 제목을 입력해 주세요.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      // 1) /api/optimize-image 로 이미지 최적화(sharp) 후 업로드하는 것을 권장합니다.
      //    로컬 데모에서는 원본을 그대로 Storage에 업로드합니다.
      const storageRef = ref(storage, `artworks/${user.uid}-${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const artworkURL = await getDownloadURL(storageRef);

      const { id } = await createSession({
        teacherId: user.uid,
        artworkURL,
        artworkTitle: title,
        artworkArtist: artist,
        totalRounds: Number(rounds),
      });

      navigate(`/teacher/session/${id}`);
    } catch (err) {
      console.error(err);
      setError('세션 생성에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="container" style={{ maxWidth: 640, padding: '56px 24px 96px' }}>
        <div className="eyebrow">교사 · 새 게임 만들기</div>
        <h1 style={{ marginTop: 10, fontSize: 30 }}>감상할 작품을 준비해 주세요</h1>

        <div className="framed" style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>명화 이미지</label>
            <div
              style={{
                marginTop: 8,
                border: '1px dashed var(--line)',
                borderRadius: 4,
                padding: preview ? 0 : 32,
                textAlign: 'center',
                overflow: 'hidden',
              }}
            >
              {preview ? (
                <img src={preview} alt="미리보기" style={{ width: '100%', maxHeight: 320, objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--ink-soft)', fontSize: 14 }}>이미지를 선택해 주세요</span>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleFile} style={{ marginTop: 10 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>작품 제목</label>
            <input className="input" style={{ marginTop: 6 }} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 별이 빛나는 밤" />
          </div>

          <div>
            <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>작가 (선택)</label>
            <input className="input" style={{ marginTop: 6 }} value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="예: 빈센트 반 고흐" />
          </div>

          <div>
            <label style={{ fontSize: 13, color: 'var(--ink-soft)' }}>진행 라운드 수</label>
            <input
              type="number"
              min={1}
              max={10}
              className="input"
              style={{ marginTop: 6, width: 120 }}
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
            />
          </div>

          {error && <p style={{ color: 'var(--sienna)', fontSize: 13 }}>{error}</p>}

          <button className="btn btn-primary" onClick={handleCreate} disabled={uploading}>
            {uploading ? '만드는 중…' : '게임 세션 만들기'}
          </button>
        </div>
      </div>
    </div>
  );
}
