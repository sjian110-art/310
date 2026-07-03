// Vercel Serverless Function
// 프론트엔드가 Gemini API 키를 직접 들고 있지 않도록 감싸는 프록시입니다.
// 운영 배포 시 src/lib/ai.js 의 getAiFeedback 호출을 이 엔드포인트로 바꾸는 것을 권장합니다.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { artworkImageBase64, studentText } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `당신은 초·중등 미술 감상 수업을 돕는 다정하고 통찰력 있는 미술 교사입니다.
다음은 학생이 명화를 보고 작성한 감상문입니다: "${studentText}"

1) 잘 표현한 부분 한 가지를 짧게 칭찬하고
2) 색채, 구도, 인물의 표정/동작, 분위기 중 놓친 부분을 콕 집어 질문 형태로 제안해 주세요.
전체 3문장 이내, 한국어로 답하세요.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                ...(artworkImageBase64
                  ? [{ inline_data: { mime_type: 'image/jpeg', data: artworkImageBase64 } }]
                  : []),
              ],
            },
          ],
        }),
      }
    );
    const data = await response.json();
    const feedback = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    res.status(200).json({ feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gemini 호출 실패' });
  }
}
