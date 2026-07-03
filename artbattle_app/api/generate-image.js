// Vercel Serverless Function
// 최다 득표 감상 텍스트를 IMAGIN API로 전달해 이미지를 생성합니다.
// API 키를 서버 쪽에 보관하기 위한 프록시입니다.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { winningText } = req.body;

  try {
    const response = await fetch(process.env.IMAGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.IMAGIN_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `유화 스타일의 명화 재해석, 다음 묘사를 바탕으로 그려줘: ${winningText}`,
        size: '1024x1024',
      }),
    });
    const data = await response.json();
    res.status(200).json({ imageUrl: data.imageUrl ?? data.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'IMAGIN 이미지 생성 실패' });
  }
}
