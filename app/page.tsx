"use client";

import { CSSProperties, useMemo, useState } from "react";

type SlangiId = "berry" | "peach" | "potato" | "butter" | "peanut" | "soap";

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
    eyebrow: "친구 모임에 도착했는데",
    title: "아는 사람이 딱 한 명뿐이라면?",
    answers: [
      { text: "일단 옆 사람에게 먼저 말 건다", sub: "어색함은 내가 녹여버리지", scores: { berry: 2, soap: 1 } },
      { text: "분위기를 보다가 자연스럽게 낀다", sub: "말랑하게 타이밍을 기다려", scores: { peach: 2, potato: 1 } },
    ],
  },
  {
    eyebrow: "갑자기 생긴 완전한 자유시간",
    title: "오늘 오후를 보내는 방식은?",
    answers: [
      { text: "처음 가는 곳으로 즉흥 출발", sub: "재밌어 보이면 일단 고!", scores: { berry: 1, peanut: 2 } },
      { text: "좋아하는 곳에서 푹 충전", sub: "익숙한 포근함이 최고야", scores: { butter: 2, potato: 1 } },
    ],
  },
  {
    eyebrow: "친구가 속상한 일을 털어놓는다",
    title: "내가 가장 먼저 하는 말은?",
    answers: [
      { text: "헉, 진짜 마음 많이 아팠겠다", sub: "감정부터 꼭 안아주기", scores: { peach: 2, butter: 1 } },
      { text: "우리 하나씩 해결해보자", sub: "차분히 출구부터 찾기", scores: { soap: 2, peanut: 1 } },
    ],
  },
  {
    eyebrow: "마감이 일주일 남았다",
    title: "나의 현실적인 작업 스타일은?",
    answers: [
      { text: "오늘 할 만큼 미리 나눠둔다", sub: "매일 조금씩, 단단하게", scores: { soap: 2, potato: 1 } },
      { text: "영감 올 때 집중해서 끝낸다", sub: "한 번 불붙으면 초고속", scores: { berry: 1, peanut: 2 } },
    ],
  },
  {
    eyebrow: "단체 채팅방이 조용하다",
    title: "나도 모르게 하는 행동은?",
    answers: [
      { text: "웃긴 짤 하나 툭 던진다", sub: "심심한 공기는 못 참지", scores: { berry: 2, peanut: 1 } },
      { text: "친구들 메시지에 다정하게 답한다", sub: "조용해도 온도는 따뜻하게", scores: { peach: 1, butter: 2 } },
    ],
  },
  {
    eyebrow: "말랑이 가게에 들어갔다",
    title: "가장 먼저 손이 가는 장난감은?",
    answers: [
      { text: "처음 보는 신기한 모양", sub: "이 촉감은 대체 뭐지?", scores: { peanut: 2, berry: 1 } },
      { text: "보기만 해도 편안한 모양", sub: "손에 착 감기는 게 좋아", scores: { butter: 2, potato: 1 } },
    ],
  },
  {
    eyebrow: "의견이 살짝 엇갈렸다",
    title: "대화를 풀어가는 쪽은?",
    answers: [
      { text: "서로 기분부터 부드럽게 푼다", sub: "마음이 풀려야 말도 통해", scores: { peach: 2, butter: 1 } },
      { text: "사실을 정리해서 오해를 푼다", sub: "차근차근 보면 답이 보여", scores: { soap: 2, potato: 1 } },
    ],
  },
  {
    eyebrow: "누군가 나를 칭찬한다면",
    title: "더 듣고 싶은 한마디는?",
    answers: [
      { text: "너랑 있으면 진짜 재밌어!", sub: "주변을 통통 튀게 만드는 사람", scores: { berry: 2, peanut: 1 } },
      { text: "너라서 마음 놓을 수 있어", sub: "곁에 오래 두고 싶은 사람", scores: { potato: 2, soap: 1 } },
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
  filter: string;
  color: string;
}> = {
  berry: {
    name: "딸기콕 슬랑이",
    short: "분위기를 톡! 깨우는 에너지 말랑이",
    description: "재미의 냄새를 기막히게 맡고 사람들 사이에 생기를 불어넣어요. 솔직하고 반응이 빠르며, 좋아하는 것 앞에서는 누구보다 반짝이는 타입이에요.",
    tags: ["#통통튀는", "#분위기메이커", "#솔직한"],
    strength: "사람들의 긴장을 순식간에 녹이는 힘",
    match: "포근하게 받아주는 버터포옹 슬랑이",
    filter: "saturate(1.15)", color: "#ff5f78",
  },
  peach: {
    name: "복숭아푸딩 슬랑이",
    short: "마음을 먼저 알아채는 다정 말랑이",
    description: "말보다 표정을 먼저 읽고, 모두가 편안한 온도를 만들어요. 부드러워 보여도 소중한 사람을 지킬 때는 생각보다 단단한 중심이 있답니다.",
    tags: ["#공감요정", "#평화주의", "#은근단단"],
    strength: "상대가 말하지 않은 마음까지 알아보는 힘",
    match: "깔끔하게 길을 잡는 비누반듯 슬랑이",
    filter: "hue-rotate(328deg) saturate(.82) brightness(1.08)", color: "#ff9bb1",
  },
  potato: {
    name: "감자포근 슬랑이",
    short: "천천히 오래가는 든든 말랑이",
    description: "낯선 곳에서는 잠깐 관찰하지만, 한번 마음을 열면 오래 곁을 지켜요. 과장 없이 꾸준하고 편안해서 주변 사람들이 자꾸 기대게 되는 타입이에요.",
    tags: ["#꾸준한", "#편안한", "#진국인"],
    strength: "급할수록 중심을 잡아주는 묵직한 안정감",
    match: "새로운 자극을 나눠주는 땅콩탐험 슬랑이",
    filter: "sepia(.72) saturate(.72) hue-rotate(350deg) brightness(.98)", color: "#b8895b",
  },
  butter: {
    name: "버터포옹 슬랑이",
    short: "곁에 있으면 스르르 풀리는 휴식 말랑이",
    description: "사소한 취향과 작은 약속을 잘 기억해요. 말수보다 행동으로 애정을 보여주며, 좋아하는 사람에게는 아낌없이 포근함을 나눠주는 타입이에요.",
    tags: ["#포근한", "#취향부자", "#행동파다정"],
    strength: "평범한 하루를 안심되는 하루로 바꾸는 힘",
    match: "웃음을 가득 가져오는 딸기콕 슬랑이",
    filter: "sepia(.5) saturate(1.5) hue-rotate(5deg) brightness(1.12)", color: "#f3b82e",
  },
  peanut: {
    name: "땅콩탐험 슬랑이",
    short: "궁금한 건 직접 눌러보는 호기심 말랑이",
    description: "새로운 아이디어와 엉뚱한 연결을 좋아해요. 궁금증이 생기면 직접 확인해야 직성이 풀리고, 남들이 지나친 재미를 발견하는 능력이 있어요.",
    tags: ["#호기심천국", "#아이디어뱅크", "#즉흥탐험"],
    strength: "평범한 것에서 새로운 가능성을 찾는 시선",
    match: "든든한 베이스가 되어주는 감자포근 슬랑이",
    filter: "sepia(.9) saturate(1.25) hue-rotate(337deg) brightness(.9)", color: "#9e674b",
  },
  soap: {
    name: "비누반듯 슬랑이",
    short: "복잡한 것도 맑게 정리하는 개운 말랑이",
    description: "해야 할 일과 중요한 마음을 차분히 구분해요. 믿을 수 있는 기준이 있고 설명도 명확해서, 함께 있으면 복잡했던 상황이 반듯해지는 타입이에요.",
    tags: ["#정리요정", "#믿음직한", "#차분명료"],
    strength: "엉킨 상황에 가장 쉬운 길을 내는 힘",
    match: "부드러운 여백을 더해주는 복숭아푸딩 슬랑이",
    filter: "hue-rotate(120deg) saturate(.78) brightness(1.08)", color: "#63b9c5",
  },
};

function Slangi({ filter, size = "large" }: { filter?: string; size?: "large" | "small" }) {
  return (
    <div className={`sprite-window ${size}`} aria-hidden="true">
      <div className="slangi-sprite" style={{ "--sprite-filter": filter ?? "none" } as CSSProperties} />
    </div>
  );
}

export default function Home() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<SlangiId, number>>({ berry: 0, peach: 0, potato: 0, butter: 0, peanut: 0, soap: 0 });
  const [resultId, setResultId] = useState<SlangiId>("peach");
  const [copied, setCopied] = useState(false);

  const progress = useMemo(() => ((questionIndex + 1) / questions.length) * 100, [questionIndex]);

  function start() {
    setScores({ berry: 0, peach: 0, potato: 0, butter: 0, peanut: 0, soap: 0 });
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
      <div className="float-shape shape-one" />
      <div className="float-shape shape-two" />
      <header className="brand"><span className="brand-dot" /> 슬랑이 연구소 <span className="lab-id">SL-01</span></header>

      {stage === "intro" && (
        <section className="panel intro-panel">
          <div className="sticker sticker-left">말랑 지수<br/><b>100%</b></div>
          <div className="hero-visual"><span className="spark spark-a">✦</span><Slangi /><span className="spark spark-b">✦</span></div>
          <p className="kicker">8가지 상황으로 알아보는 나의 말랑 본체</p>
          <h1>나는 무슨<br/><span>슬랑이</span>일까?</h1>
          <p className="intro-copy">눌리면 모양은 변해도 매력은 그대로!<br/>내 성격과 꼭 닮은 말랑이 친구를 찾아봐요.</p>
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
            <div className="question-sprite"><Slangi size="small" /></div>
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
            <div className="result-visual"><div className="result-halo" /><Slangi filter={result.filter} /><span className="result-label">FOUND!</span></div>
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
