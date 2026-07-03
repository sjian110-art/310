// Vercel Serverless Function
// 교사가 업로드한 명화 이미지를 sharp로 리사이즈/압축한 뒤
// Firebase Storage에 업로드하기 좋은 버퍼를 반환합니다.
//
// 프론트에서: FormData로 이미지를 이 엔드포인트(/api/optimize-image)에 POST하면
// 최적화된 JPEG(webp) 바이너리를 응답으로 돌려줍니다.
// 이후 클라이언트는 그 결과를 Firebase Storage에 업로드합니다.

import sharp from 'sharp';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { files } = await parseForm(req);
    const file = files.image;
    const inputBuffer = fs.readFileSync(file.filepath);

    const optimized = await sharp(inputBuffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();

    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(optimized);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '이미지 최적화 중 오류가 발생했습니다.' });
  }
}

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
