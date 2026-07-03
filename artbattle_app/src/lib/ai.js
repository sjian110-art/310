// Gemini(AI 피드백) & IMAGIN(텍스트->이미지) 연동
// 주의: 브라우저에 API 키를 노출하지 않으려면 실제 배포 시 이 호출을
// Vercel Serverless Function(/api/gemini-feedback, /api/generate-image)으로
// 옮기는 것을 권장합니다. (api/ 폴더 예시 포함, README 참고)

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const IMAGIN_API_KEY = import.meta.env.VITE_IMAGIN_API_KEY;
const IMAGIN_API_URL = import.meta.env.VITE_IMAGIN_API_URL;

/**
 * 학생의 감상 텍스트에 대해 Gemini로 구체화 피드백을 생성합니다.
 * @param {string} artworkImageUrl - 작품 이미지 URL
 * @param {string} studentText - 학생이 작성한 감상 텍스트
 * @returns {Promise<string>} 피드백 문장
 */
export async function getAiFeedback(artworkImageUrl, studentText) {
  const prompt = `당신은 초·중등 미술 감상 수업을 돕는 다정하고 통찰력 있는 미술 교사입니다.
다음은 학생이 명화를 보고 작성한 감상문입니다: "${studentText}"

이 감상문을 더 구체적이고 감각적으로 발전시킬 수 있도록,
1) 잘 표현한 부분 한 가지를 짧게 칭찬하고
2) 색채, 구도, 인물의 표정/동작, 분위기 중 놓친 부분을 콕 집어 질문 형태로 제안해 주세요.
전체 3문장 이내, 한국어로, 학생 눈높이에 맞게 답하세요.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              { inline_data: { mime_type: 'image/jpeg', data: await fetchAsBase64(artworkImageUrl) } },
            ],
          },
        ],
      }),
    }
  );

  if (!res.ok) throw new Error('Gemini 피드백 생성 실패');
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '피드백을 불러오지 못했습니다.';
}

/**
 * 학생의 최다 득표 감상 텍스트를 IMAGIN API로 이미지화합니다.
 * @param {string} winningText
 * @returns {Promise<string>} 생성된 이미지 URL
 */
export async function generateImageFromText(winningText) {
  const res = await fetch(IMAGIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${IMAGIN_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `유화 스타일의 명화 재해석, 다음 묘사를 바탕으로 그려줘: ${winningText}`,
      size: '1024x1024',
    }),
  });
  if (!res.ok) throw new Error('이미지 생성 실패');
  const data = await res.json();
  return data.imageUrl ?? data.url;
}

async function fetchAsBase64(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
