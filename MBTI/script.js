const questions = [
  {
    text: "쉬는 시간에 나는 보통 어떻게 지내나요?",
    a: "친구들과 이야기하거나 함께 논다.",
    b: "혼자 그림을 그리거나 책을 보며 쉰다.",
    typeA: "E",
    typeB: "I"
  },
  {
    text: "모둠 활동을 할 때 나는 어떤 편인가요?",
    a: "내 생각을 먼저 말하고 친구들을 이끈다.",
    b: "친구들의 이야기를 듣고 천천히 의견을 말한다.",
    typeA: "E",
    typeB: "I"
  },
  {
    text: "새로운 친구를 만나면 나는?",
    a: "먼저 말을 걸어본다.",
    b: "상대가 다가오면 편하게 이야기한다.",
    typeA: "E",
    typeB: "I"
  },
  {
    text: "설명을 들을 때 나는 무엇이 더 좋나요?",
    a: "그림, 예시, 실제로 해보는 설명이 좋다.",
    b: "상상하거나 가능성을 생각하는 설명이 좋다.",
    typeA: "S",
    typeB: "N"
  },
  {
    text: "이야기책을 읽을 때 나는?",
    a: "이야기 속 사건과 장면을 자세히 떠올린다.",
    b: "다음에 어떤 일이 일어날지 상상한다.",
    typeA: "S",
    typeB: "N"
  },
  {
    text: "문제를 풀 때 나는?",
    a: "배운 방법대로 차근차근 푼다.",
    b: "새로운 방법을 떠올려 본다.",
    typeA: "S",
    typeB: "N"
  },
  {
    text: "친구가 실수했을 때 나는?",
    a: "무엇이 잘못됐는지 알려준다.",
    b: "친구의 마음을 먼저 생각한다.",
    typeA: "T",
    typeB: "F"
  },
  {
    text: "결정을 할 때 나는?",
    a: "가장 맞는 이유와 결과를 생각한다.",
    b: "사람들의 기분과 분위기를 생각한다.",
    typeA: "T",
    typeB: "F"
  },
  {
    text: "게임에서 규칙을 정할 때 나는?",
    a: "공평하고 정확한 규칙이 중요하다.",
    b: "모두가 즐겁게 참여하는 것이 중요하다.",
    typeA: "T",
    typeB: "F"
  },
  {
    text: "숙제를 할 때 나는?",
    a: "계획을 세우고 먼저 끝내는 편이다.",
    b: "하고 싶은 것부터 하다가 나중에 끝낸다.",
    typeA: "J",
    typeB: "P"
  },
  {
    text: "책상 정리는 어떤 편인가요?",
    a: "정리되어 있어야 마음이 편하다.",
    b: "조금 어질러져도 필요한 것은 찾을 수 있다.",
    typeA: "J",
    typeB: "P"
  },
  {
    text: "주말 계획은?",
    a: "미리 무엇을 할지 정해두고 싶다.",
    b: "그날 기분에 따라 자유롭게 정하고 싶다.",
    typeA: "J",
    typeB: "P"
  }
];

const mbtiInfo = {
  ISTJ: {
    title: "차근차근 책임왕",
    strengths: ["약속을 잘 지켜요.", "꼼꼼하게 확인하는 힘이 있어요.", "맡은 일을 끝까지 해내요."],
    weaknesses: ["갑작스러운 변화가 불편할 수 있어요.", "실수에 너무 속상해할 수 있어요."],
    study: ["공부 계획표를 만들면 좋아요.", "중요한 내용을 체크리스트로 정리해요.", "반복 연습이 큰 도움이 돼요."],
    jobs: ["선생님", "연구원", "회계사", "공무원", "기록 관리자"]
  },
  ISFJ: {
    title: "따뜻한 도우미",
    strengths: ["친구를 잘 챙겨요.", "성실하고 책임감이 있어요.", "작은 변화도 잘 알아차려요."],
    weaknesses: ["거절을 어려워할 수 있어요.", "내 마음보다 친구 마음을 먼저 생각할 수 있어요."],
    study: ["조용한 공간에서 공부하면 좋아요.", "예쁜 노트 정리가 도움이 돼요.", "친구에게 설명하며 복습해요."],
    jobs: ["간호사", "상담가", "교사", "사서", "사회복지사"]
  },
  INFJ: {
    title: "생각 깊은 조언가",
    strengths: ["친구의 마음을 잘 이해해요.", "의미 있는 일을 좋아해요.", "상상력과 집중력이 좋아요."],
    weaknesses: ["생각이 많아 피곤할 수 있어요.", "완벽하게 하려다 시작이 늦을 수 있어요."],
    study: ["공부 목표를 먼저 정해요.", "혼자 집중하는 시간이 필요해요.", "글로 생각을 정리하면 좋아요."],
    jobs: ["작가", "심리상담가", "교사", "디자이너", "기획자"]
  },
  INTJ: {
    title: "전략 세우는 탐구가",
    strengths: ["큰 그림을 잘 봐요.", "스스로 계획을 세울 수 있어요.", "어려운 문제를 깊게 생각해요."],
    weaknesses: ["친구의 감정을 놓칠 수 있어요.", "내 방식만 맞다고 생각할 수 있어요."],
    study: ["왜 그런지 원리를 이해해요.", "혼자 연구하는 시간이 좋아요.", "장기 목표를 세우면 힘이 나요."],
    jobs: ["과학자", "개발자", "건축가", "전략가", "발명가"]
  },
  ISTP: {
    title: "손재주 좋은 해결사",
    strengths: ["문제를 빠르게 파악해요.", "직접 해보며 배우는 힘이 좋아요.", "침착하게 행동해요."],
    weaknesses: ["계획 세우기를 귀찮아할 수 있어요.", "감정을 말로 표현하기 어려울 수 있어요."],
    study: ["실험과 체험 활동이 잘 맞아요.", "짧게 집중하고 쉬는 방식이 좋아요.", "문제를 직접 풀어보며 익혀요."],
    jobs: ["엔지니어", "운동선수", "정비사", "파일럿", "게임 개발자"]
  },
  ISFP: {
    title: "감성 가득 예술가",
    strengths: ["다정하고 부드러워요.", "예술 감각이 좋아요.", "친구를 편안하게 해줘요."],
    weaknesses: ["경쟁적인 분위기를 힘들어할 수 있어요.", "해야 할 일을 미룰 수 있어요."],
    study: ["그림, 색깔, 예시를 활용해요.", "편안한 분위기에서 공부해요.", "작은 목표부터 시작해요."],
    jobs: ["디자이너", "일러스트레이터", "음악가", "동물보호가", "요리사"]
  },
  INFP: {
    title: "상상력 풍부한 꿈꾸미",
    strengths: ["상상력이 풍부해요.", "친구의 마음을 잘 공감해요.", "나만의 생각과 가치가 있어요."],
    weaknesses: ["상처를 쉽게 받을 수 있어요.", "현실적인 계획이 부족할 수 있어요."],
    study: ["좋아하는 주제와 연결해 공부해요.", "일기나 마인드맵으로 정리해요.", "작은 성공 경험을 쌓아요."],
    jobs: ["작가", "영상 제작자", "상담가", "캐릭터 디자이너", "동화 작가"]
  },
  INTP: {
    title: "호기심 많은 생각왕",
    strengths: ["궁금한 것을 깊게 파고들어요.", "새로운 아이디어가 많아요.", "논리적으로 생각해요."],
    weaknesses: ["마무리를 미룰 수 있어요.", "너무 오래 생각하다 행동이 늦을 수 있어요."],
    study: ["궁금한 질문을 먼저 적어봐요.", "원리를 이해하면 오래 기억해요.", "정해진 시간 안에 끝내는 연습이 좋아요."],
    jobs: ["과학자", "프로그래머", "수학자", "발명가", "데이터 분석가"]
  },
  ESTP: {
    title: "에너지 넘치는 모험가",
    strengths: ["활동적이고 용감해요.", "친구들과 금방 친해져요.", "위기 상황에 빠르게 대처해요."],
    weaknesses: ["충동적으로 행동할 수 있어요.", "긴 설명을 지루해할 수 있어요."],
    study: ["퀴즈나 게임처럼 공부해요.", "몸을 움직이며 외우면 좋아요.", "짧은 시간 집중 공부가 잘 맞아요."],
    jobs: ["운동선수", "소방관", "방송인", "사업가", "여행 가이드"]
  },
  ESFP: {
    title: "분위기 밝히는 인기쟁이",
    strengths: ["밝고 재미있는 분위기를 만들어요.", "표현력이 좋아요.", "친구들과 잘 어울려요."],
    weaknesses: ["집중 시간이 짧을 수 있어요.", "계획보다 재미를 먼저 선택할 수 있어요."],
    study: ["친구와 함께 공부하면 좋아요.", "노래나 리듬으로 외워봐요.", "칭찬과 보상이 동기부여가 돼요."],
    jobs: ["배우", "가수", "이벤트 기획자", "유튜버", "선생님"]
  },
  ENFP: {
    title: "아이디어 폭발 탐험가",
    strengths: ["아이디어가 많아요.", "새로운 일에 도전하는 힘이 있어요.", "친구들에게 긍정 에너지를 줘요."],
    weaknesses: ["금방 다른 것에 관심이 갈 수 있어요.", "마무리 습관이 필요해요."],
    study: ["다양한 방법으로 공부해요.", "마인드맵이 잘 맞아요.", "공부 목표를 재미있는 미션으로 만들어요."],
    jobs: ["광고 기획자", "작가", "방송인", "디자이너", "창업가"]
  },
  ENTP: {
    title: "재치 있는 발명가",
    strengths: ["말솜씨와 재치가 좋아요.", "새로운 방법을 잘 찾아요.", "토론과 아이디어 내기를 좋아해요."],
    weaknesses: ["규칙을 답답해할 수 있어요.", "끝까지 해내는 연습이 필요해요."],
    study: ["친구와 질문을 주고받으며 공부해요.", "왜 그런지 토론해봐요.", "시간 제한을 두고 문제를 풀어요."],
    jobs: ["발명가", "변호사", "기획자", "개그맨", "창업가"]
  },
  ESTJ: {
    title: "똑부러지는 리더",
    strengths: ["정리와 실행력이 좋아요.", "친구들을 잘 이끌어요.", "규칙과 약속을 중요하게 생각해요."],
    weaknesses: ["내 기준이 강할 수 있어요.", "친구에게 너무 직설적으로 말할 수 있어요."],
    study: ["목표와 순서를 정하고 공부해요.", "오답노트를 꼼꼼히 써요.", "결과를 확인하며 성취감을 느껴요."],
    jobs: ["CEO", "판사", "경찰관", "관리자", "교장 선생님"]
  },
  ESFJ: {
    title: "친구 챙기는 반장",
    strengths: ["친구들과 협력하는 힘이 좋아요.", "분위기를 따뜻하게 만들어요.", "책임감 있게 행동해요."],
    weaknesses: ["칭찬이 없으면 속상할 수 있어요.", "다른 사람 눈치를 많이 볼 수 있어요."],
    study: ["친구와 함께 복습하면 좋아요.", "선생님께 질문하며 확인해요.", "공부한 내용을 말로 설명해요."],
    jobs: ["교사", "간호사", "승무원", "상담가", "행사 기획자"]
  },
  ENFJ: {
    title: "마음을 이끄는 리더",
    strengths: ["친구를 격려하는 말을 잘해요.", "함께 성장하는 것을 좋아해요.", "발표와 소통 능력이 좋아요."],
    weaknesses: ["모두를 챙기려다 지칠 수 있어요.", "비판을 크게 받아들일 수 있어요."],
    study: ["공부한 내용을 발표해봐요.", "친구를 가르치며 복습해요.", "큰 목표를 세우면 의욕이 생겨요."],
    jobs: ["교사", "상담가", "MC", "사회운동가", "마케팅 기획자"]
  },
  ENTJ: {
    title: "목표 향해 달리는 대장",
    strengths: ["목표를 정하면 열심히 해요.", "계획과 리더십이 좋아요.", "어려운 도전을 좋아해요."],
    weaknesses: ["너무 빨리 결과를 원할 수 있어요.", "친구의 속도를 기다리는 연습이 필요해요."],
    study: ["큰 목표를 작은 단계로 나눠요.", "스스로 테스트하며 실력을 확인해요.", "경쟁이나 도전 과제가 잘 맞아요."],
    jobs: ["CEO", "변호사", "프로젝트 매니저", "정치가", "기획자"]
  }
};

const form = document.querySelector("#mbtiForm");
const saveButton = document.querySelector("#saveButton");
const retryButton = document.querySelector("#retryButton");
const printButton = document.querySelector("#printButton");
const warningMessage = document.querySelector("#warningMessage");
const testPage = document.querySelector("#testPage");
const resultPage = document.querySelector("#resultPage");

function renderQuestions() {
  form.innerHTML = questions.map((question, index) => `
    <div class="rounded-3xl bg-slate-50 border border-slate-200 p-5">
      <p class="font-extrabold text-lg mb-4">
        <span class="text-purple-600">Q${index + 1}.</span> ${question.text}
      </p>
      <div class="grid md:grid-cols-2 gap-3">
        <label class="cursor-pointer rounded-2xl bg-white border border-purple-100 p-4 hover:border-purple-400 hover:bg-purple-50 transition">
          <input type="radio" name="q${index}" value="${question.typeA}" class="mr-2 accent-purple-600">
          ${question.a}
        </label>
        <label class="cursor-pointer rounded-2xl bg-white border border-purple-100 p-4 hover:border-purple-400 hover:bg-purple-50 transition">
          <input type="radio" name="q${index}" value="${question.typeB}" class="mr-2 accent-purple-600">
          ${question.b}
        </label>
      </div>
    </div>
  `).join("");
}

function calculateResult() {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (let i = 0; i < questions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);

    if (!selected) {
      return null;
    }

    scores[selected.value]++;
  }

  const mbti =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");

  return { mbti, scores };
}

function renderList(targetId, items) {
  const target = document.querySelector(targetId);
  target.innerHTML = items.map(item => `<li>${item}</li>`).join("");
}

function showResult(result) {
  const name = document.querySelector("#studentName").value.trim() || "학생";
  const grade = document.querySelector("#studentGrade").value;
  const info = mbtiInfo[result.mbti];

  document.querySelector("#resultTitle").textContent = `${name}님의 유형은 ${result.mbti}!`;
  document.querySelector("#resultSubtitle").textContent =
    `${grade ? grade + " " : ""}${info.title} 유형이에요. 재미로 보는 성향 검사이니 나를 알아가는 참고 자료로 활용해요.`;

  renderList("#strengthList", info.strengths);
  renderList("#weaknessList", info.weaknesses);
  renderList("#studyList", info.study);

  document.querySelector("#jobList").innerHTML = info.jobs.map(job => `
    <span class="px-4 py-2 rounded-full bg-white border border-yellow-200 font-bold text-slate-700">
      ${job}
    </span>
  `).join("");

  document.querySelector("#scoreBox").innerHTML = Object.entries(result.scores).map(([key, value]) => `
    <div class="rounded-2xl bg-white p-4 border border-slate-200 text-center">
      <p class="text-2xl font-extrabold text-purple-700">${key}</p>
      <p class="text-slate-600">${value}점</p>
    </div>
  `).join("");

  localStorage.setItem("elementaryMbtiResult", JSON.stringify({
    name,
    grade,
    mbti: result.mbti,
    scores: result.scores,
    savedAt: new Date().toISOString()
  }));

  testPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

saveButton.addEventListener("click", () => {
  const result = calculateResult();

  if (!result) {
    warningMessage.classList.remove("hidden");
    return;
  }

  warningMessage.classList.add("hidden");
  showResult(result);
});

retryButton.addEventListener("click", () => {
  form.reset();
  resultPage.classList.add("hidden");
  testPage.classList.remove("hidden");
  warningMessage.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

printButton.addEventListener("click", () => {
  window.print();
});

renderQuestions();
