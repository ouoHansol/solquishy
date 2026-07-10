"use client";

import { CSSProperties, useMemo, useState } from "react";

type SlangiId = "berry" | "pudding" | "potato" | "butter" | "peanut" | "soap" | "cabbage" | "carrot" | "pepper" | "cucumber" | "towel" | "cheese";

type Answer = {
  text: string;
  sub: string;
  scores: Partial<Record<SlangiId, number>>;
};

type Question = {
  eyebrow: string;
  title: string;
  answers: Answer[];
};

const legacyQuestions: Question[] = [
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

const questions: Question[] = [
  {
    eyebrow: "친구들과 약속을 잡는데",
    title: "의견이 자꾸 엇갈린다면?",
    answers: [
      { text: "조건을 하나씩 따져 딱 정한다", sub: "기준이 분명해야 마음이 편해", scores: { peanut: 2, soap: 1 } },
      { text: "다들 편한 쪽으로 유연하게 맞춘다", sub: "좋은 분위기가 더 중요해", scores: { pudding: 2, cucumber: 1 } },
      { text: "핵심을 정리하고 방향을 제시한다", sub: "우리 일단 이렇게 가보자", scores: { carrot: 2, pepper: 1 } },
    ],
  },
  {
    eyebrow: "아는 사람이 딱 한 명인 모임",
    title: "도착한 뒤 나의 모습은?",
    answers: [
      { text: "먼저 말 걸며 분위기를 띄운다", sub: "어색한 공기는 내가 철푸덕!", scores: { berry: 2, pepper: 1 } },
      { text: "조용히 살피다 내 사람을 찾는다", sub: "천천히 겹겹이 마음을 열어", scores: { cabbage: 2, potato: 1 } },
      { text: "말은 짧아도 필요한 건 챙긴다", sub: "티는 안 내도 다 보고 있어", scores: { butter: 2, towel: 1 } },
    ],
  },
  {
    eyebrow: "친구가 힘든 일을 털어놓는다",
    title: "내 위로 방식에 가까운 것은?",
    answers: [
      { text: "감정부터 충분히 들어주고 안아준다", sub: "마음이 탱글하게 돌아올 때까지", scores: { pudding: 2, towel: 1 } },
      { text: "해야 할 일을 정리해 해결을 돕는다", sub: "하나씩 하면 분명 괜찮아져", scores: { soap: 2, carrot: 1 } },
      { text: "다른 각도에서 가볍게 보게 해준다", sub: "일단 숨부터 시원하게 쉬자", scores: { cucumber: 2, cheese: 1 } },
    ],
  },
  {
    eyebrow: "주문한 메뉴가 살짝 다르게 나왔다",
    title: "이럴 때 나는?",
    answers: [
      { text: "무엇이 다른지 정확히 말하고 바꾼다", sub: "작은 차이도 그냥 넘기기 어려워", scores: { peanut: 2, soap: 1 } },
      { text: "먹을 만하면 그냥 편하게 먹는다", sub: "이 정도 변수는 쿨하게 넘겨", scores: { cucumber: 2, pudding: 1 } },
      { text: "이 상황도 재밌는 이야기로 만든다", sub: "예상 밖이라서 오히려 좋아", scores: { cheese: 2, berry: 1 } },
    ],
  },
  {
    eyebrow: "갑자기 생긴 완전한 자유시간",
    title: "가장 끌리는 오후는?",
    answers: [
      { text: "처음 보는 곳으로 즉흥 출발", sub: "재밌어 보이면 일단 철푸덕!", scores: { berry: 2, cheese: 1 } },
      { text: "좋아하는 곳에서 느긋하게 충전", sub: "익숙한 포근함이 오래가", scores: { potato: 2, towel: 1 } },
      { text: "미뤄둔 개인 목표에 몰입", sub: "한 방향으로 쭉쭉 가는 날", scores: { carrot: 2, cabbage: 1 } },
    ],
  },
  {
    eyebrow: "마감이 일주일 남았다",
    title: "나의 현실적인 작업 스타일은?",
    answers: [
      { text: "할 일을 나누고 순서대로 끝낸다", sub: "반듯하게 정리되면 개운해", scores: { soap: 2, carrot: 1 } },
      { text: "작은 부분까지 계속 다듬는다", sub: "이왕이면 제대로 완성하고 싶어", scores: { peanut: 2, cabbage: 1 } },
      { text: "감이 올 때 한꺼번에 몰아친다", sub: "한 번 불붙으면 탱탱하게 직진", scores: { pepper: 2, berry: 1 } },
    ],
  },
  {
    eyebrow: "소중한 사람에게 애정을 표현할 때",
    title: "더 가까운 내 방식은?",
    answers: [
      { text: "좋아한다고 자주 솔직하게 말한다", sub: "따뜻할 때 바로 나눠야지", scores: { pudding: 2, berry: 1 } },
      { text: "말보다 필요한 걸 조용히 해준다", sub: "표현은 서툴러도 행동은 부드럽게", scores: { butter: 2, towel: 1 } },
      { text: "엉뚱한 선물이나 농담으로 표현한다", sub: "우리만 아는 재미가 좋아", scores: { cheese: 2, cucumber: 1 } },
    ],
  },
  {
    eyebrow: "말랑이 가게에서 딱 하나를 고른다",
    title: "나도 모르게 손이 가는 촉감은?",
    answers: [
      { text: "씹히듯 오돌토돌한 크런치 촉감", sub: "복잡하고 확실한 손맛", scores: { peanut: 2, butter: 1 } },
      { text: "매끈하고 폭신한 정돈된 촉감", sub: "깔끔하고 예측 가능한 게 좋아", scores: { soap: 2, potato: 1 } },
      { text: "겹치고 뚫린 독특한 촉감", sub: "평범하지 않을수록 궁금해", scores: { cabbage: 2, cheese: 1 } },
    ],
  },
  {
    eyebrow: "갑자기 예상 못 한 문제가 생겼다",
    title: "가장 먼저 나오는 반응은?",
    answers: [
      { text: "내가 앞장서서 상황을 잡는다", sub: "당황할 시간에 일단 움직여", scores: { pepper: 2, carrot: 1 } },
      { text: "숨을 고르고 차분하게 버틴다", sub: "급할수록 쿨하고 쫀득하게", scores: { cucumber: 2, potato: 1 } },
      { text: "주변 사람이 괜찮은지 먼저 본다", sub: "문제보다 사람 마음이 먼저야", scores: { towel: 2, pudding: 1 } },
    ],
  },
  {
    eyebrow: "누군가 내 방식에 피드백을 줬다",
    title: "그 말을 받아들이는 과정은?",
    answers: [
      { text: "맞는 말인지 기준부터 따져본다", sub: "납득되면 확실하게 고칠게", scores: { butter: 2, peanut: 1 } },
      { text: "혼자 여러 겹으로 곱씹어본다", sub: "천천히 내 생각과 맞춰봐", scores: { cabbage: 2, cucumber: 1 } },
      { text: "좋은 부분은 바로 행동에 옮긴다", sub: "방향이 보이면 쭉쭉 실행", scores: { carrot: 2, pepper: 1 } },
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
  cabbage: {
    name: "겹겹 배추 슬랑이",
    short: "바로 답하기보다 여러 겹으로 깊이 생각하는 신중파",
    description: "겉으로는 조용해 보여도 안에서는 생각이 여러 겹 자라고 있어요. 사람과 상황을 충분히 살핀 뒤 마음을 열고, 한번 내린 결정에는 쉽게 흔들리지 않는 깊은 타입이에요.",
    tags: ["#깊은생각", "#신중한", "#속이알찬"],
    strength: "복잡한 상황의 안쪽까지 차분히 들여다보는 통찰력",
    match: "생각을 행동으로 밀어주는 쭉쭉 당근 슬랑이",
    image: "/results/layered-cabbage.png",
    color: "#88a83f",
  },
  carrot: {
    name: "쭉쭉 당근 슬랑이",
    short: "목표가 보이면 한 방향으로 곧게 뻗는 실행파",
    description: "해야 할 일이 분명해지면 망설임 없이 움직여요. 작은 성취를 차곡차곡 쌓고, 계획을 실제 결과로 바꾸는 데 강한 꾸준한 직진 타입이에요.",
    tags: ["#목표직진", "#실행력갑", "#성취하는"],
    strength: "막연한 계획을 오늘의 행동으로 바꾸는 추진력",
    match: "속도를 조절해주는 쿨링 오이 슬랑이",
    image: "/results/stretchy-carrot.png",
    color: "#ef7d19",
  },
  pepper: {
    name: "탱탱 피망 슬랑이",
    short: "필요할 때 앞에 나서 분위기를 잡는 당찬 리더파",
    description: "갑작스러운 상황에서도 주눅 들기보다 먼저 방향을 만들어요. 자기 의견을 또렷하게 말하면서도 사람들을 함께 움직이게 하는 탱탱한 자신감의 타입이에요.",
    tags: ["#당찬리더", "#자신감", "#먼저움직임"],
    strength: "흔들리는 순간에 모두가 따라갈 중심을 만드는 힘",
    match: "섬세한 부분을 채워주는 포슬 타월 슬랑이",
    image: "/results/bouncy-pepper.png",
    color: "#e84335",
  },
  cucumber: {
    name: "쿨링 오이 슬랑이",
    short: "뜨거운 상황에서도 시원한 여유를 지키는 침착파",
    description: "감정에 휩쓸리기보다 한발 물러서 상황을 바라봐요. 복잡한 갈등도 가볍게 환기하고, 주변까지 편안하게 만드는 맑고 쿨한 타입이에요.",
    tags: ["#쿨한여유", "#침착한", "#갈등중재"],
    strength: "과열된 분위기의 온도를 단숨에 낮추는 평정심",
    match: "따뜻한 온도를 보태는 크런치 버터바 슬랑이",
    image: "/results/cool-cucumber.png",
    color: "#70a831",
  },
  towel: {
    name: "포슬 타월 슬랑이",
    short: "작은 불편까지 먼저 알아채고 감싸주는 돌봄파",
    description: "사람의 표정과 필요한 것을 세심하게 살펴요. 생색내기보다 자연스럽게 챙기고, 지친 사람이 편히 기대어 쉴 자리를 만들어주는 포근한 타입이에요.",
    tags: ["#세심한돌봄", "#포근한", "#먼저챙김"],
    strength: "말하지 않은 불편까지 부드럽게 닦아주는 배려",
    match: "힘 있게 앞장서는 탱탱 피망 슬랑이",
    image: "/results/fluffy-towel.png",
    color: "#d98d79",
  },
  cheese: {
    name: "구멍송송 치즈 슬랑이",
    short: "빈틈에서도 엉뚱한 가능성을 발견하는 창의파",
    description: "남들이 당연하게 보는 것도 다른 각도에서 뒤집어봐요. 예상 밖의 농담과 아이디어로 새로운 길을 만들고, 평범한 하루에 구멍송송 재미를 내는 타입이에요.",
    tags: ["#엉뚱창의", "#아이디어뱅크", "#재미발견"],
    strength: "빈틈을 실패가 아니라 새로운 입구로 보는 상상력",
    match: "아이디어를 정리해주는 폭신 비누 슬랑이",
    image: "/results/holey-cheese.png",
    color: "#e6aa19",
  },
};

function AnimatedSlangi() {
  return <div className="sprite-window large" aria-hidden="true"><div className="slangi-sprite" /></div>;
}

export default function Home() {
  const emptyScores: Record<SlangiId, number> = { berry: 0, pudding: 0, potato: 0, butter: 0, peanut: 0, soap: 0, cabbage: 0, carrot: 0, pepper: 0, cucumber: 0, towel: 0, cheese: 0 };
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
          <p className="kicker">10가지 상황으로 알아보는 나의 말랑 본체</p>
          <h1>나는 무슨<br/><span>슬랑이</span>일까?</h1>
          <p className="intro-copy">모양도 촉감도 성격도 전부 다른 열두 친구!<br/>나와 꼭 닮은 유행 슬랑이를 찾아봐요.</p>
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
                  <span className="answer-letter">{["A", "B", "C"][index]}</span>
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
