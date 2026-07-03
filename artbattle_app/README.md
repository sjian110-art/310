# ACE CANVAS

AI 기반 실시간 미술 감상 게임. 학생들은 명화를 보고 글로 묘사하고, 서로 투표하고, 1등 감상문은 AI가 다시 그림으로 되살립니다.

- **프론트엔드**: React 18 + Vite + React Router
- **인증**: Firebase Authentication (Google 로그인)
- **데이터베이스**: Firestore (실시간 동기화)
- **파일 저장**: Firebase Storage
- **AI**: Gemini(감상 피드백) + IMAGIN API(텍스트→이미지)
- **이미지 최적화**: sharp (Vercel Serverless Function)
- **배포**: Vercel

---

## 폴더 구조

```
ace-canvas/
├── api/                      # Vercel Serverless Functions
│   ├── optimize-image.js     # sharp로 업로드 이미지 최적화
│   ├── gemini-feedback.js    # Gemini 프록시 (API 키 보호)
│   └── generate-image.js     # IMAGIN 프록시 (API 키 보호)
├── src/
│   ├── components/           # Header, Timer, ArtworkCard, SubmissionCard, VoiceInput
│   ├── contexts/AuthContext.jsx
│   ├── lib/
│   │   ├── firestore.js      # 세션/라운드/제출/투표 데이터 로직
│   │   └── ai.js             # Gemini / IMAGIN 클라이언트 직접 호출(데모용)
│   ├── pages/
│   │   ├── Home.jsx                 # 메인 화면
│   │   ├── Login.jsx                # 로그인 (메인 화면 다음 단계)
│   │   ├── HallOfFame.jsx
│   │   ├── TeacherCreate.jsx        # 명화 업로드 + 라운드 설정
│   │   ├── TeacherSession.jsx       # 접속 코드/QR, 학생 목록, 타이머
│   │   ├── TeacherResults.jsx       # 투표 순위, AI 이미지 생성
│   │   ├── StudentJoin.jsx          # 접속 코드 입력
│   │   ├── StudentGame.jsx          # 감상 작성 + AI 피드백(2라운드부터)
│   │   └── StudentVote.jsx          # 다른 학생 감상문 투표
│   ├── firebase.js
│   ├── App.jsx
│   └── main.jsx
├── firestore.rules / firestore.indexes.json / storage.rules / firebase.json
├── .env.example
└── package.json
```

## 화면 흐름 (요구사항 반영)

1. **메인 화면** → **로그인 화면**(메인 다음 단계로 배치) → 역할별 화면
2. 교사: 로그인 → 명화 업로드/라운드 설정 → 접속 코드·QR 생성 → 라운드 진행(타이머) → 투표 결과·AI 이미지 생성 → 다음 라운드
3. 학생: 접속 코드 입력(로그인 유도) → 대기 → 감상 작성(음성/손글씨 OCR 지원, 2라운드부터 AI 피드백) → 투표 → 결과 대기 → 다음 라운드
4. 공통: 명예의 전당에서 역대 우수작(원작 vs AI 재현 이미지) 열람

---

## 1단계. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com)에 접속해 **프로젝트 추가**를 클릭합니다.
2. 프로젝트 이름을 `ace-canvas`(원하는 이름)로 입력하고 Google Analytics는 선택 사항으로 둡니다.
3. 생성이 끝나면 콘솔 좌측 메뉴에서 아래 항목을 차례로 설정합니다.

### 1-1. Authentication 설정
- **빌드 > Authentication > 시작하기** 클릭
- **Sign-in method** 탭에서 **Google** 제공업체를 사용 설정
- 프로젝트 지원 이메일 입력 후 저장

### 1-2. Firestore Database 설정
- **빌드 > Firestore Database > 데이터베이스 만들기**
- 프로덕션 모드로 시작 (규칙은 아래에서 배포)
- 리전은 `asia-northeast3(서울)` 권장

### 1-3. Storage 설정
- **빌드 > Storage > 시작하기**
- 동일하게 프로덕션 모드로 생성

### 1-4. 웹 앱 등록 및 설정 값 복사
- 프로젝트 개요 옆 톱니바퀴 → **프로젝트 설정 > 일반**
- 하단 **내 앱 > 웹 앱 추가**(</> 아이콘) 클릭 후 앱 닉네임 입력
- 발급되는 `firebaseConfig` 값을 복사해 둡니다. (`.env` 작성 시 사용)

---

## 2단계. 로컬 환경 설정

```bash
# 1) 프로젝트 클론 또는 압축 해제 후 진입
cd ace-canvas

# 2) 패키지 설치
npm install

# 3) 환경변수 파일 생성
cp .env.example .env
```

`.env` 파일을 열어 아래 값을 채워 넣습니다.

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_GEMINI_API_KEY=...
VITE_IMAGIN_API_KEY=...
VITE_IMAGIN_API_URL=https://api.imagin.studio/v1/generate
```

- **Gemini API 키**: [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급
- **IMAGIN API 키**: [IMAGIN.studio](https://imagin.studio) 가입 후 대시보드에서 발급 (사용하는 텍스트→이미지 API 제공업체에 맞게 `VITE_IMAGIN_API_URL`을 조정하세요)

---

## 3단계. Firebase 보안 규칙 배포

```bash
npm install -g firebase-tools
firebase login
firebase init          # Firestore, Storage 선택, 기존 firebase.json 사용
firebase deploy --only firestore:rules,firestore:indexes,storage
```

`firestore.rules`, `storage.rules`는 로그인한 사용자만 쓰기가 가능하도록 기본 보호가 되어 있습니다. 운영 환경에서는 `sessions` 문서 수정 시 `teacherId` 일치 여부 등 추가 검증 로직을 넣는 것을 권장합니다.

---

## 4단계. 로컬 개발 서버 실행

```bash
npm run dev
```

`http://localhost:5173`에서 메인 화면을 확인합니다. 교사 계정으로 게임을 만들고, 다른 브라우저(또는 시크릿 창)에서 학생으로 접속 코드를 입력해 실시간 동기화를 테스트하세요.

---

## 5단계. Vercel 배포

### 5-1. Vercel CLI로 배포
```bash
npm install -g vercel
vercel login
vercel            # 최초 배포 (질문에 따라 프로젝트 연결)
vercel --prod     # 프로덕션 배포
```

### 5-2. 환경변수 등록
Vercel 대시보드 → 프로젝트 → **Settings > Environment Variables**에 아래 값을 등록합니다.

| 변수 | 용도 |
|---|---|
| `VITE_FIREBASE_API_KEY` 등 6종 | 프론트엔드 Firebase 초기화 |
| `VITE_GEMINI_API_KEY`, `VITE_IMAGIN_API_KEY`, `VITE_IMAGIN_API_URL` | 데모용 클라이언트 직접 호출 시 사용 |
| `GEMINI_API_KEY` | `/api/gemini-feedback` 서버리스 함수용 (키 노출 방지) |
| `IMAGIN_API_KEY`, `IMAGIN_API_URL` | `/api/generate-image` 서버리스 함수용 |

> **운영 권장 사항**: `src/lib/ai.js`는 데모 편의를 위해 브라우저에서 직접 Gemini/IMAGIN을 호출합니다. 실제 서비스에서는 `getAiFeedback`, `generateImageFromText` 내부 fetch 대상을 각각 `/api/gemini-feedback`, `/api/generate-image`로 바꿔 API 키가 클라이언트에 노출되지 않도록 하세요.

### 5-3. Firebase 인증 도메인 허용
Firebase Console → Authentication → Settings → **승인된 도메인**에 Vercel 배포 도메인(`your-app.vercel.app`)을 추가해야 Google 로그인이 정상 동작합니다.

---

## 데이터 모델 요약 (Firestore)

```
users/{uid}                          # role: 'teacher' | 'student'
sessions/{sessionId}
  ├─ code, artworkURL, totalRounds, currentRound, status, timerEndsAt
  ├─ players/{uid}                   # name, photoURL, score
  └─ rounds/{roundNumber}/submissions/{uid}
        text, votes, aiFeedback
hallOfFame/{entryId}                 # originalArtworkURL, winningText, aiGeneratedImageURL
```

## 주요 UX 기능 구현 위치

- **음성 입력 / 손글씨 OCR**: `src/components/VoiceInput.jsx` (Web Speech API + tesseract.js)
- **실시간 동기화**: `src/lib/firestore.js`의 `onSnapshot` 기반 `listenSession`, `listenPlayers`, `listenSubmissions`
- **AI 피드백(2라운드부터)**: `StudentGame.jsx`의 `canUseAiFeedback = session.currentRound >= 2`
- **이미지 최적화(sharp)**: `api/optimize-image.js` (Vercel Serverless Function)

## 다음 개선 아이디어
- 교사용 세션 소유권 검증 강화 (Firestore Rules에서 `teacherId` 체크)
- 라운드별 점수 집계 및 종합 랭킹 화면
- IMAGIN API 대신 원하는 이미지 생성 provider로 손쉽게 교체 가능하도록 `api/generate-image.js` 어댑터화
