"use client";

import { CSSProperties, useMemo, useState } from "react";

type SlangiId = "berry" | "pudding" | "potato" | "butter" | "peanut" | "soap";

type Answer = {
  text: string;
  sub: string;
  scores: Partial<Record<SlangiId, number>>;
};

type Question = {
  eyebrow: string;
  title: string;
  answers: [Answer, Answer];
};

const questions: Question[] = [
  {
    eyebrow: "친구들과 약속을 잡는데",
    title: "의견이 자꾸 엇갈린다면?",
    answers: [
      { text: "조건을 하나씩 따져서 딱 정한다", sub: "기준이 분명해야 마음이 편해", scores: { peanut: 2, soap: 1 } },
      { text: "다들 편한 쪽으로 유연하게 맞춘다", sub: "좋은 분위기가 더 중요해", scores: { pudding: 2, potato: 1 } },
    ],
  },
  {
    eyebrow: "아는 사람이 딱 한 명인 모임",
    title: "도착한 뒤 나의 모습은?",
    answers: [
      { text: "먼저 말 걸며 분위기를 띄운다", sub: "어색한 공기는 내가 철푸덕!", scores: { berry: 2, pudding: 1 } },
      { text: "조용히 살피다 내 사람을 찾는다", sub: "아무에게나 마음을 열진 않아", scores: { potato: 1, butter: 2 } },
    ],
  },
  {
    eyebrow: "친구가 힘든 일을 털어놓는다",
    title: "내 위로 방식에 가까운 것은?",
    answers: [
      { text: "감정부터 충분히 들어주고 안아준다", sub: "마음이 탱글하게 돌아올 때까지", scores: { pudding: 2, potato: 1 } },
      { text: "투덜거리면서도 필요한 건 다 챙긴다", sub: "말은 까칠해도 행동은 버터처럼", scores: { butter: 2, soap: 1 } },
    ],
  },
  {
    eyebrow: "주문한 메뉴가 살짝 다르게 나왔다",
    title: "이럴 때 나는?",
    answers: [
      { text: "정확히 무엇이 다른지 말하고 바꾼다", sub: "작은 차이도 그냥 넘기기 어려워", scores: { peanut: 2, soap: 1 } },
      { text: "먹을 만하면 그냥 즐겁게 먹는다", sub: "이 정도 변수는 말랑하게 넘겨", scores: { pudding: 1, berry: 2 } },
    ],
  },
  {
    eyebrow: "갑자기 생긴 완전한 자유시간",
    title: "가장 끌리는 오후는?",
    answers: [
      { text: "처음 보는 곳으로 즉흥 출발", sub: "재밌어 보이면 일단 철푸덕!", scores: { berry: 2, peanut: 1 } },
      { text: "좋아하는 곳에서 느긋하게 충전", sub: "익숙한 포근함이 오래가", scores: { potato: 2, butter: 1 } },
    ],
  },
  {
    eyebrow: "마감이 일주일 남았다",
    title: "나의 현실적인 작업 스타일은?",
    answers: [
      { text: "할 일을 나누고 순서대로 끝낸다", sub: "반듯하게 정리되면 속이 개운해", scores: { soap: 2, potato: 1 } },
      { text: "감이 올 때 한꺼번에 몰아친다", sub: "한 번 신나면 끝까지 간다", scores: { berry: 2, pudding: 1 } },
    ],
  },
  {
    eyebrow: "소중한 사람에게 애정을 표현할 때",
    title: "더 가까운 내 방식은?",
    answers: [
      { text: "좋아한다고 자주, 솔직하게 말한다", sub: "마음은 따뜻할 때 바로 나눠야지", scores: { pudding: 2, berry: 1 } },
      { text: "말보다 필요한 걸 조용히 해준다", sub: "티는 안 내도 다 보고 있어", scores: { butter: 2, potato: 1 } },
    ],
  },
  {
    eyebrow: "말랑이 가게에서 딱 하나를 고른다",
    title: "나도 모르게 손이 가는 촉감은?",
    answers: [
      { text: "씹히듯 오돌토돌한 크런치 촉감", sub: "복잡하고 확실한 손맛이 좋아", scores: { peanut: 2, butter: 1 } },
      { text: "매끈하고 폭신한 정돈된 촉감", sub: "깔끔하고 예측 가능한 게 좋아", scores: { soap: 2, potato: 1 } },
    ],
  },
];

const results: Record<SlangiId, {
  name: string;
  short: string;
  description: string;
  tags: string[];
  strength: string;
  match: string;
  image: string;
  color: string;
}> = {
  berry: {
    name: "딸기 철푸덕 슬랑이",
    short: "재미를 발견하면 먼저 몸부터 던지는 즉흥파",
    description: "새로운 사람과 상황 앞에서 주저하기보다 일단 철푸덕 뛰어들어요. 반응이 빠르고 표현이 솔직해서, 심심했던 분위기도 순식간에 말랑하고 즐겁게 바꾸는 타입이에요.",
    tags: ["#즉흥출발", "#분위기메이커", "#솔직한반응"],
    strength: "낯선 순간을 재밌는 사건으로 바꾸는 추진력",
    match: "차분히 중심을 잡아주는 쫀득 감자 슬랑이",
    image: "/results/strawberry-splat.png",
    color: "#f04a3f",
  },
  pudding: {
    name: "탱글 푸딩 슬랑이",
    short: "상대의 마음에 맞춰 부드럽게 흔들리는 공감파",
    description: "말보다 표정을 먼저 읽고, 날카로운 상황도 탱글하게 받아 넘겨요. 유연하다고 중심이 없는 건 아니에요. 모두가 편안해질 수 있는 온도를 누구보다 잘 찾는 타입이에요.",
    tags: ["#공감만렙", "#유연한마음", "#평화로운"],
    strength: "굳어 있는 마음을 부드럽게 풀어주는 감각",
    match: "기준을 또렷하게 세워주는 크런치 땅콩 슬랑이",
    image: "/results/jiggly-pudding.png",
    color: "#d98625",
  },
  potato: {
    name: "쫀득 감자 슬랑이",
    short: "천천히 눌려도 원래 자리로 돌아오는 안정파",
    description: "화려하게 앞에 나서기보다 자기 속도로 꾸준히 가요. 한번 마음을 연 사람과 약속은 오래 지키고, 예상 밖의 상황에서도 쉽게 흐트러지지 않는 든든한 타입이에요.",
    tags: ["#꾸준한", "#든든한", "#오래가는"],
    strength: "급할수록 주변까지 안심시키는 묵직한 안정감",
    match: "새로운 자극을 가져오는 딸기 철푸덕 슬랑이",
    image: "/results/chewy-potato.png",
    color: "#ad713a",
  },
  butter: {
    name: "크런치 버터바 슬랑이",
    short: "겉은 바삭까칠, 속은 사르르 부드러운 츤데레파",
    description: "아무에게나 다정한 척하진 않지만, 내 사람에게 필요한 건 말없이 다 챙겨요. 표현은 조금 툭툭해도 속에는 따뜻한 버터가 가득한, 알수록 부드러운 타입이에요.",
    tags: ["#겉바속촉", "#행동파다정", "#은근한츤데레"],
    strength: "빈말 없이 행동으로 믿음을 쌓는 진짜 다정함",
    match: "마음을 편하게 표현하는 탱글 푸딩 슬랑이",
    image: "/results/crunchy-butterbar.png",
    color: "#e99a13",
  },
  peanut: {
    name: "크런치 땅콩 슬랑이",
    short: "오돌토돌 작은 차이까지 놓치지 않는 기준파",
    description: "좋고 싫음의 기준이 분명하고, 애매하게 넘어가는 걸 어려워해요. 조금 까다로워 보여도 그만큼 디테일을 잘 보고 결과의 완성도를 높이는 믿음직한 감별사 타입이에요.",
    tags: ["#기준확실", "#디테일감별사", "#완성도집착"],
    strength: "남들이 지나친 작은 차이를 정확히 찾아내는 눈",
    match: "상황을 유연하게 풀어주는 탱글 푸딩 슬랑이",
    image: "/results/crunchy-peanut.png",
    color: "#c77b1c",
  },
  soap: {
    name: "폭신 비누 슬랑이",
    short: "복잡한 것도 반듯하고 개운하게 정리하는 계획파",
    description: "해야 할 일의 순서를 세우고 깔끔하게 끝냈을 때 가장 편안해요. 설명이 명확하고 약속을 잘 지켜서, 엉킨 상황 속에서도 믿고 맡길 수 있는 타입이에요.",
    tags: ["#정리요정", "#계획적인", "#맑고명확"],
    strength: "복잡한 상황에 가장 쉬운 순서를 만들어주는 힘",
    match: "딱딱한 계획에 재미를 더하는 딸기 철푸덕 슬랑이",
    image: "/results/soft-soap.png",
    color: "#68aeca",
  },
};

function AnimatedSlangi() {
  return <div className="sprite-window large" aria-hidden="true"><div className="slangi-sprite" /></div>;
}

export default function Home() {
  const emptyScores: Record<SlangiId, number> = { berry: 0, pudding: 0, potato: 0, butter: 0, peanut: 0, soap: 0 };
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<SlangiId, number>>(emptyScores);
  const [resultId, setResultId] = useState<SlangiId>("pudding");
  const [copied, setCopied] = useState(false);
  const progress = useMemo(() => ((questionIndex + 1) / questions.length) * 100, [questionIndex]);

  function start() {
    setScores({ ...emptyScores });
    setQuestionIndex(0);
    setCopied(false);
    setStage("quiz");
  }

  function choose(answer: Answer) {
    const next = { ...scores };
    for (const [id, value] of Object.entries(answer.scores)) next[id as SlangiId] += value ?? 0;
    setScores(next);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      return;
    }
    const winner = (Object.keys(next) as SlangiId[]).reduce((best, id) => next[id] > next[best] ? id : best, "berry");
    setResultId(winner);
    setStage("result");
  }

  async function shareResult() {
    const result = results[resultId];
    const shareData = { title: "나는 무슨 슬랑이일까?", text: `나는 ${result.name}! ${result.short}`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        setCopied(true);
      }
    } catch { /* Sharing can be cancelled by the user. */ }
  }

  return (
    <main className="site-shell">
      <div className="float-shape shape-one" /><div className="float-shape shape-two" />
      <header className="brand"><span className="brand-dot" /> 슬랑이 연구소 <span className="lab-id">SL-02</span></header>

      {stage === "intro" && (
        <section className="panel intro-panel">
          <div className="sticker">말랑 지수<br/><b>100%</b></div>
          <div className="hero-visual"><span className="spark spark-a">✦</span><AnimatedSlangi /><span className="spark spark-b">✦</span></div>
          <p className="kicker">8가지 상황으로 알아보는 나의 말랑 본체</p>
          <h1>나는 무슨<br/><span>슬랑이</span>일까?</h1>
          <p className="intro-copy">모양도 촉감도 성격도 전부 다른 여섯 친구!<br/>나와 꼭 닮은 유행 슬랑이를 찾아봐요.</p>
          <button className="primary-button" onClick={start}>내 슬랑이 찾기 <span>→</span></button>
          <div className="mini-note"><span>약 1분</span><i /> 결과는 가볍게 즐겨주세요</div>
        </section>
      )}

      {stage === "quiz" && (() => {
        const question = questions[questionIndex];
        return (
          <section className="panel quiz-panel" key={questionIndex}>
            <div className="progress-row"><span>SLANGI TEST</span><b>{String(questionIndex + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</b></div>
            <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
            <div className="question-number" aria-hidden="true"><span>Q</span>{questionIndex + 1}</div>
            <p className="question-eyebrow">{question.eyebrow}</p>
            <h2>{question.title}</h2>
            <div className="answer-list">
              {question.answers.map((answer, index) => (
                <button key={answer.text} onClick={() => choose(answer)} className="answer-button">
                  <span className="answer-letter">{index === 0 ? "A" : "B"}</span>
                  <span><b>{answer.text}</b><small>{answer.sub}</small></span>
                  <span className="answer-arrow">↗</span>
                </button>
              ))}
            </div>
            <button className="back-button" onClick={() => questionIndex === 0 ? setStage("intro") : setQuestionIndex((i) => i - 1)}>← 이전으로</button>
          </section>
        );
      })()}

      {stage === "result" && (() => {
        const result = results[resultId];
        return (
          <section className="panel result-panel" style={{ "--accent": result.color } as CSSProperties}>
            <p className="result-kicker">당신의 말랑 본체는...</p>
            <div className="result-visual">
              <div className="result-halo" />
              <img className="result-character" src={result.image} alt={`${result.name} 캐릭터`} />
              <span className="result-label">FOUND!</span>
            </div>
            <h2>{result.name}</h2>
            <p className="result-short">{result.short}</p>
            <div className="tag-list">{result.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <p className="result-description">{result.description}</p>
            <div className="result-details">
              <div><span>나만의 말랑 파워</span><b>{result.strength}</b></div>
              <div><span>찰떡 슬랑이</span><b>{result.match}</b></div>
            </div>
            <div className="result-actions">
              <button className="primary-button" onClick={shareResult}>{copied ? "링크 복사 완료!" : "결과 공유하기"} <span>↗</span></button>
              <button className="secondary-button" onClick={start}>다시 눌러보기 ↻</button>
            </div>
            <p className="share-note">친구는 어떤 슬랑이인지 링크를 보내 확인해보세요.</p>
          </section>
        );
      })()}

      <footer>© 2026 SLANGI LAB · 말랑한 재미를 연구합니다</footer>
    </main>
  );
}
