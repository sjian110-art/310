import { useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

// 음성 인식(Web Speech API) + 손글씨 사진 OCR(tesseract.js)로
// 텍스트 입력을 돕는 보조 도구 모음
export default function VoiceInput({ onText }) {
  const [listening, setListening] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  function toggleVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(' ');
      onText(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setOcrLoading(true);
    try {
      const worker = await createWorker('kor');
      const {
        data: { text },
      } = await worker.recognize(file);
      onText(text.trim());
      await worker.terminate();
    } catch (err) {
      console.error(err);
      alert('손글씨 인식에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setOcrLoading(false);
      e.target.value = '';
    }
  }

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ padding: '8px 14px', fontSize: 13 }}
        onClick={toggleVoice}
      >
        {listening ? '● 듣는 중… 그만하기' : '🎙 음성으로 말하기'}
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        style={{ padding: '8px 14px', fontSize: 13 }}
        onClick={() => fileInputRef.current?.click()}
        disabled={ocrLoading}
      >
        {ocrLoading ? '인식 중…' : '✍️ 손글씨 사진 인식'}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  );
}
