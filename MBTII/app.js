const questions = [
  { axis: 'EI', title: '쉬는 시간에 나는 보통 어떻게 지내나요?', a: { text: '친구들과 이야기하거나 같이 놀아요.', type: 'E' }, b: { text: '조용히 그림을 그리거나 혼자 쉬어요.', type: 'I' } },
  { axis: 'SN', title: '새로운 놀이를 배울 때 나는?', a: { text: '선생님 설명을 차근차근 따라 해요.', type: 'S' }, b: { text: '나만의 방법을 상상해서 해보고 싶어요.', type: 'N' } },
  { axis: 'TF', title: '친구가 속상해할 때 나는?', a: { text: '왜 그런 일이 생겼는지 해결 방법을 생각해요.', type: 'T' }, b: { text: '먼저 괜찮은지 물어보고 마음을 달래줘요.', type: 'F' } },
  { axis: 'JP', title: '숙제를 할 때 나는?', a: { text: '계획을 세우고 먼저 끝내야 마음이 편해요.', type: 'J' }, b: { text: '하고 싶은 것부터 하다가 마지막에 집중해요.', type: 'P' } },
  { axis: 'EI', title: '발표 시간이 오면 나는?', a: { text: '조금 떨려도 앞에서 말하는 게 재밌어요.', type: 'E' }, b: { text: '미리 많이 연습해야 마음이 놓여요.', type: 'I' } },
  { axis: 'SN', title: '과학 실험을 할 때 나는?', a: { text: '순서와 관찰 결과를 꼼꼼히 적어요.', type: 'S' }, b: { text: '이걸 다르게 하면 어떻게 될지 상상해요.', type: 'N' } },
  { axis: 'TF', title: '모둠 활동에서 의견이 다를 때 나는?', a: { text: '가장 맞는 이유를 찾아서 정해요.', type: 'T' }, b: { text: '모두의 기분이 상하지 않게 말해요.', type: 'F' } },
  { axis: 'JP', title: '책상 정리는 어떤 편인가요?', a: { text: '필요한 물건이 정해진 자리에 있어요.', type: 'J' }, b: { text: '조금 어질러져도 내가 찾을 수 있으면 괜찮아요.', type: 'P' } },
  { axis: 'EI', title: '새 친구를 만나면 나는?', a: { text: '먼저 말을 걸어보고 싶어요.', type: 'E' }, b: { text: '상대가 먼저 말해주면 편해요.', type: 'I' } },
  { axis: 'SN', title: '이야기책을 읽을 때 나는?', a: { text: '등장인물과 사건을 정확히 기억해요.', type: 'S' }, b: { text: '다음 이야기가 어떻게 될지 상상해요.', type: 'N' } },
  { axis: 'TF', title: '칭찬을 받을 때 더 좋은 말은?', a: { text: '정말 잘했어! 결과가 훌륭해.', type: 'T' }, b: { text: '열심히 했구나! 네 마음이 느껴져.', type: 'F' } },
  { axis: 'JP', title: '주말 계획은?', a: { text: '무엇을 할지 미리 정해두고 싶어요.', type: 'J' }, b: { text: '그날 기분에 따라 정하고 싶어요.', type: 'P' } }
];

const descriptions = {
  ISTJ: ['꼼꼼한 기록 박사', '차분하고 책임감 있게 약속을 지키는 친구예요.'],
  ISFJ: ['따뜻한 도우미 연구원', '친구를 잘 챙기고 조용히 힘이 되어주는 친구예요.'],
  INFJ: ['상상 깊은 마음 탐험가', '생각이 깊고 다른 사람의 마음을 잘 살피는 친구예요.'],
  INTJ: ['전략을 세우는 발명가', '큰 그림을 생각하고 똑똑하게 계획하는 친구예요.'],
  ISTP: ['문제 해결 장인', '직접 해보며 배우고 차분하게 해결하는 친구예요.'],
  ISFP: ['감성 가득 예술가', '다정하고 자유롭게 자기만의 색을 보여주는 친구예요.'],
  INFP: ['꿈꾸는 이야기 작가', '상상력이 풍부하고 마음이 따뜻한 친구예요.'],
  INTP: ['호기심 많은 과학자', '왜 그런지 궁금해하고 새로운 생각을 잘하는 친구예요.'],
  ESTP: ['도전하는 에너지 실험가', '활동적이고 순간 판단이 빠른 친구예요.'],
  ESFP: ['분위기 반짝 스타', '즐겁고 밝은 에너지로 주변을 웃게 해요.'],
  ENFP: ['아이디어 폭발 탐험가', '새로운 생각과 즐거운 상상을 많이 하는 친구예요.'],
  ENTP: ['질문 많은 토론 발명가', '궁금한 걸 묻고 새로운 방법을 찾아내는 친구예요.'],
  ESTJ: ['든든한 리더 반장', '규칙과 목표를 잘 챙기고 친구들을 이끄는 친구예요.'],
  ESFJ: ['친절한 교실 매니저', '분위기를 살피고 모두가 편하도록 돕는 친구예요.'],
  ENFJ: ['응원하는 리더 코치', '친구의 장점을 발견하고 응원해주는 친구예요.'],
  ENTJ: ['목표 달성 지휘관', '목표를 정하면 힘 있게 밀고 나가는 친구예요.']
};

const commonInfo = {
  strengths: {
    E: '발표, 모둠 활동, 친구 사귀기에 강해요.', I: '집중, 관찰, 깊이 생각하기에 강해요.',
    S: '꼼꼼한 기록과 정확한 설명을 잘해요.', N: '상상력과 새로운 아이디어가 풍부해요.',
    T: '문제를 분석하고 해결 방법을 찾는 힘이 좋아요.', F: '친구의 마음을 이해하고 배려하는 힘이 좋아요.',
    J: '계획을 세우고 끝까지 해내는 힘이 좋아요.', P: '상황에 맞게 바꾸고 즐겁게 도전하는 힘이 좋아요.'
  },
  weaknesses: {
    E: '가끔 너무 빨리 말해서 친구 말을 놓칠 수 있어요.', I: '좋은 생각이 있어도 말하지 않고 지나갈 수 있어요.',
    S: '새로운 방식이 처음에는 낯설 수 있어요.', N: '상상하다가 중요한 순서를 놓칠 수 있어요.',
    T: '정답을 찾다가 친구 마음을 놓칠 수 있어요.', F: '친구 마음을 신경 쓰다 내 생각을 못 말할 수 있어요.',
    J: '계획이 바뀌면 당황할 수 있어요.', P: '재밌는 일을 먼저 하다가 시간이 부족할 수 있어요.'
  }
};

const studyTips = {
  E: '친구에게 설명하면서 외우면 기억이 오래가요.', I: '조용한 곳에서 혼자 정리한 뒤 말해보면 좋아요.',
  S: '예시, 그림, 표로 정리하면 이해가 빨라요.', N: '마인드맵과 상상 질문으로 공부하면 좋아요.',
  T: '왜 그런지 이유를 찾고 문제 풀이 순서를 만들어요.', F: '이야기나 감정과 연결해서 배우면 잘 기억해요.',
  J: '작은 계획표를 만들고 체크하면서 공부해요.', P: '짧은 시간 집중하고 쉬는 시간을 넣어 공부해요.'
};

const jobs = {
  ISTJ: '기록 연구원, 회계사, 도서관 사서, 데이터 분석가', ISFJ: '간호사, 선생님, 상담사, 동물 보호사',
  INFJ: '작가, 심리상담사, 기획자, 환경운동가', INTJ: '과학자, 건축가, 게임 기획자, 로봇 개발자',
  ISTP: '엔지니어, 정비사, 파일럿, 실험 기술자', ISFP: '일러스트레이터, 디자이너, 플로리스트, 사진가',
  INFP: '동화 작가, 웹툰 작가, 음악가, 심리상담사', INTP: '발명가, 프로그래머, 천문학자, 연구원',
  ESTP: '운동선수, 경찰관, 응급구조사, 콘텐츠 크리에이터', ESFP: '배우, 댄서, 방송인, 이벤트 기획자',
  ENFP: '광고 기획자, 유튜버, 작가, 여행 기획자', ENTP: '창업가, 변호사, 발명가, 토론 진행자',
  ESTJ: 'CEO, 관리자, 판사, 프로젝트 매니저', ESFJ: '교사, 승무원, 사회복지사, 행사 진행자',
  ENFJ: '교사, 코치, 상담가, 아나운서', ENTJ: '기업가, 감독, 전략가, 리더십 코치'
};

let current = 0;
let answers = Array(questions.length).fill(null);
let name = '';

const $ = (id) => document.getElementById(id);

$('startBtn').addEventListener('click', () => {
  name = $('studentName').value.trim() || '친구';
  $('startPage').classList.add('hidden');
  $('quizPage').classList.remove('hidden');
  renderQuestion();
});

$('prevBtn').addEventListener('click', () => {
  if (current > 0) { current--; renderQuestion(); }
});

$('nextBtn').addEventListener('click', () => {
  if (!answers[current]) return;
  if (current === questions.length - 1) showResult();
  else { current++; renderQuestion(); }
});

$('restartBtn').addEventListener('click', () => location.reload());
$('printBtn').addEventListener('click', () => window.print());

function renderQuestion() {
  const q = questions[current];
  $('progressText').textContent = `${current + 1} / ${questions.length}`;
  $('progressBar').style.width = `${((current + 1) / questions.length) * 100}%`;
  $('questionBadge').textContent = `QUESTION ${String(current + 1).padStart(2, '0')} · ${q.axis} 실험`;
  $('questionTitle').textContent = q.title;
  $('prevBtn').disabled = current === 0;
  $('nextBtn').disabled = !answers[current];
  $('nextBtn').textContent = current === questions.length - 1 ? '저장하기' : '다음';

  $('optionsBox').innerHTML = ['a', 'b'].map(key => {
    const selected = answers[current] === q[key].type;
    return `
      <button class="optionBtn text-left rounded-3xl border ${selected ? 'border-sky-300 bg-sky-400/25' : 'border-sky-300/20 bg-white/5 hover:bg-sky-400/10'} p-5 transition" data-type="${q[key].type}">
        <span class="block text-sky-200 font-black mb-2">${key.toUpperCase()} 선택</span>
        <span class="text-lg md:text-xl font-bold">${q[key].text}</span>
      </button>`;
  }).join('');

  document.querySelectorAll('.optionBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      answers[current] = btn.dataset.type;
      renderQuestion();
    });
  });
}

function showResult() {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach(type => counts[type]++);
  const mbti = `${counts.E >= counts.I ? 'E' : 'I'}${counts.S >= counts.N ? 'S' : 'N'}${counts.T >= counts.F ? 'T' : 'F'}${counts.J >= counts.P ? 'J' : 'P'}`;
  const [nickname, summary] = descriptions[mbti];
  const letters = mbti.split('');

  $('quizPage').classList.add('hidden');
  $('resultPage').classList.remove('hidden');
  $('resultTitle').textContent = `${name}의 유형은 ${mbti}!`;
  $('resultSub').textContent = `${nickname} · ${summary}`;

  const cards = [
    { icon: '💎', title: '성격의 강점', body: letters.map(l => commonInfo.strengths[l]).join(' ') },
    { icon: '🌧️', title: '조심하면 좋은 점', body: letters.map(l => commonInfo.weaknesses[l]).join(' ') },
    { icon: '📘', title: '잘 맞는 학습 방법', body: letters.map(l => studyTips[l]).join(' ') },
    { icon: '🚀', title: '추천 직업', body: jobs[mbti] }
  ];

  $('resultCards').innerHTML = cards.map(card => `
    <div class="rounded-[1.8rem] bg-slate-900/75 border border-sky-300/20 p-6">
      <div class="text-4xl mb-4">${card.icon}</div>
      <h3 class="text-2xl font-black text-sky-200">${card.title}</h3>
      <p class="text-slate-300 leading-7 mt-3">${card.body}</p>
    </div>
  `).join('');
}
