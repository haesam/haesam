import { useState, useRef } from "react";

const FRAMEWORKS = [
  { id: "heros-journey", icon: "🌀", name: "영웅의 여정", flow: "문제 → 투쟁 → 돌파구 → 변화" },
  { id: "man-in-hole", icon: "〰️", name: "구덩이 속 인간", flow: "안전지대 → 계기 → 위기 → 회복 → 더 나은 상태" },
  { id: "breakthrough", icon: "⚡", name: "브레이크스루", flow: "문제 → 깨달음 → 해결 → 결과" },
  { id: "challenge-victory", icon: "🏆", name: "도전에서 승리로", flow: "의심 → 투쟁 → 전환점 → 변화" },
  { id: "transformation", icon: "🦋", name: "변화 스냅샷", flow: "이전 → 최저점 → 전환점 → 이후" },
  { id: "mistake-fix", icon: "🔧", name: "실수와 수정", flow: "고백 → 결과 → 깨달음 → 결말" },
  { id: "open-loop", icon: "🔄", name: "오픈 루프", flow: "훅 질문 → 긴장감 고조 → 반전 공개" },
  { id: "three-act", icon: "🎭", name: "3막 구조", flow: "설정 → 대결 → 해결" },
  { id: "cliffhanger", icon: "🪝", name: "클리프행어 기법", flow: "긴장감 → 고조 → 미해결 훅 → 해소" },
  { id: "before-after", icon: "✨", name: "비포 & 애프터", flow: "이전 상태 → 전환 순간 → 이후 상태" },
  { id: "problem-solution", icon: "💡", name: "문제 → 해결책", flow: "고통 → 실패 시도 → 해결책 → 결과" },
  { id: "contrarian", icon: "🔥", name: "반전 시각", flow: "통념 → 도전 → 증거 → 새로운 관점" },
];

const PLATFORMS = [
  { id: "youtube", icon: "▶", name: "유튜브 롱폼", words: "800~2000단어", desc: "챕터 포함 풀 내러티브 스크립트" },
  { id: "instagram", icon: "◉", name: "인스타그램 릴스", words: "100~250단어", desc: "훅 우선, 빠른 템포의 펀치라인 스크립트" },
  { id: "linkedin", icon: "🎠", name: "인스타그램 캐러셀", words: "최대 10슬라이드", desc: "저장·공유를 유도하는 슬라이드별 포맷" },
];

const LEVELS = ["쉬움", "보통", "표준", "심화"];
const LEVEL_DESC = ["초등 수준", "중학 수준", "고등 수준", "전문가 수준"];
const LENGTHS = ["짧게", "보통", "길게"];

const FRAMEWORK_SIGNALS = [
  {
    id: "heros-journey",
    reason: "성장 과정과 변화의 여정이 담긴 콘텐츠에 가장 잘 맞아요.",
    keywords: ["성장","여정","도전","극복","변화했","달라졌","바뀌었","시작했","해냈","힘들었","포기","다시","결국","지금은","되었다","됐다","성공","실패하고","다시 일어"],
  },
  {
    id: "man-in-hole",
    reason: "위기에서 회복하는 드라마틱한 구조가 이 원고에 딱 맞아요.",
    keywords: ["위기","바닥","최악","무너","힘든 시간","절망","망했","잃었","그때","그 순간","다행히","다시 살아","회복","벗어","극복","살아남"],
  },
  {
    id: "breakthrough",
    reason: "깨달음과 인사이트 중심의 원고에 효과적인 구조예요.",
    keywords: ["깨달","알게 됐","발견했","알았다","이제야","사실은","진짜","비밀","몰랐","알고 보니","팁","방법","핵심","이유","왜","해결","해답"],
  },
  {
    id: "challenge-victory",
    reason: "목표 달성 과정을 보여주는 원고에 강력한 구조예요.",
    keywords: ["목표","도전했","시도","노력","결과","성과","달성","이겼","완성","해냈","훈련","준비","경쟁","대회","프로젝트","업무"],
  },
  {
    id: "transformation",
    reason: "Before/After 변화가 뚜렷한 원고에 임팩트 있게 작동해요.",
    keywords: ["전에는","예전에","과거에","그때는","지금은","이제는","달라진","변했","완전히","180도","몰라볼","체중","살","외모","습관","루틴","생활"],
  },
  {
    id: "mistake-fix",
    reason: "실수나 실패에서 교훈을 얻는 원고에 신뢰감을 줘요.",
    keywords: ["실수","잘못","후회","반성","그때 왜","왜 그랬","배웠","교훈","다시는","조심","실패","틀렸","오해했","착각","고쳤","수정"],
  },
  {
    id: "open-loop",
    reason: "궁금증을 자아내는 질문형 원고에 강한 훅을 만들어줘요.",
    keywords: ["왜","어떻게","비밀","사실","알고 있나요","알고 있었나요","충격","믿기 어렵","놀라운","이게 가능해","진짜로","실제로","혹시","궁금","의문","진실"],
  },
  {
    id: "three-act",
    reason: "명확한 기승전결 구조가 필요한 원고에 안정적으로 작동해요.",
    keywords: ["이야기","스토리","사건","경험","있었는데","그러다가","결국","그래서","마지막으로","처음에","중간에","끝에"],
  },
  {
    id: "cliffhanger",
    reason: "시리즈물이나 다음 편을 기대하게 만드는 원고에 효과적이에요.",
    keywords: ["시리즈","파트","1편","2편","계속","다음","다음에","뒤에서","더 있어","놀라운 결말","반전","충격적인","믿을 수 없는","끝이 아니"],
  },
  {
    id: "before-after",
    reason: "비교를 통해 변화의 임팩트를 극대화할 수 있는 원고예요.",
    keywords: ["비교","전후","이전","이후","vs","바꿨더니","했더니","결과는","효과","개선","향상","더 나아진","줄었","늘었","달성"],
  },
  {
    id: "problem-solution",
    reason: "문제를 정의하고 해결책을 제시하는 교육형 원고에 딱 맞아요.",
    keywords: ["문제","고민","어려움","불편","해결","방법","솔루션","팁","방식","전략","이렇게 하면","따라하면","적용","실천","추천","리뷰","사용"],
  },
  {
    id: "contrarian",
    reason: "통념을 뒤집는 관점이 담긴 원고에 강한 차별화를 만들어줘요.",
    keywords: ["사실은","오해","착각","아니다","틀렸다","다르다","반대로","역설","意外","의외로","놀랍게도","실제로는","통념","상식","뒤집","잘못 알","모르는"],
  },
];

interface SuggestionResult {
  id: string;
  reason: string;
  confident: boolean;
  runnerUp?: string | null;
}

function suggestFramework(text: string): SuggestionResult | null {
  if (!text || text.trim().length < 10) return null;
  const lower = text;
  const scores = FRAMEWORK_SIGNALS.map((fw) => {
    const score = fw.keywords.reduce((acc, kw) => {
      const matches = (lower.match(new RegExp(kw, "g")) || []).length;
      return acc + matches;
    }, 0);
    return { id: fw.id, score, reason: fw.reason };
  });
  scores.sort((a, b) => b.score - a.score);
  if (scores[0].score === 0) {
    return { id: "heros-journey", reason: "원고에서 뚜렷한 패턴을 찾기 어려워 가장 범용적인 프레임워크를 추천해요.", confident: false };
  }
  return { id: scores[0].id, reason: scores[0].reason, confident: true, runnerUp: scores[1].score > 0 ? scores[1].id : null };
}

interface BuildPromptParams {
  rawScript: string;
  platform: string;
  framework: string;
  level: string;
  length: string;
  voiceover: boolean;
  chapters: boolean;
}

function buildPrompt({ rawScript, platform, framework, level, length, voiceover, chapters }: BuildPromptParams): string {
  const fw = FRAMEWORKS.find((f) => f.id === framework)!;
  const gradeMap: Record<string, string> = {
    "쉬움": "초등학생도 이해할 수 있는 쉬운 단어와 짧은 문장",
    "보통": "중학생 수준의 자연스러운 문체",
    "표준": "고등학생~성인 수준의 일반적인 문체",
    "심화": "전문가 수준의 깊이 있는 어휘와 논리",
  };
  const wordMap: Record<string, Record<string, string>> = {
    youtube: { "짧게": "약 800단어", "보통": "약 1200~1500단어", "길게": "약 1800~2000단어" },
    instagram: { "짧게": "약 100단어 (30초 내외)", "보통": "약 175단어 (45~60초)", "길게": "약 250단어 (60~90초)" },
    linkedin: { "짧게": "3~5슬라이드", "보통": "6~8슬라이드", "길게": "10슬라이드" },
  };

  const platformDetail =
    platform === "youtube"
      ? `- 플랫폼: 유튜브 롱폼 영상 스크립트
- 분량: ${wordMap.youtube[length]}
- 구성: 훅 → 본론(챕터 구조) → 결론 + CTA${chapters ? "\n- 챕터별 타임스탬프(예: 0:00 인트로, 1:30 본론1...)도 함께 작성해줘" : ""}`
      : platform === "instagram"
      ? `- 플랫폼: 인스타그램 릴스 스크립트
- 분량: ${wordMap.instagram[length]}
- 구성: 강렬한 훅(첫 3초) → 빠른 전개 → CTA
- 톤: 빠른 템포, 짧은 문장, 구어체`
      : `- 플랫폼: 인스타그램 캐러셀 (슬라이드 포스트)
- 분량: ${wordMap.linkedin[length]}
- 구성: 각 슬라이드를 번호와 함께 [슬라이드 1], [슬라이드 2] 형식으로 작성
- 슬라이드마다 헤드라인 1줄 + 본문 3~5줄
- 마지막 슬라이드는 저장·공유·팔로우를 유도하는 CTA
- 톤: 시각적으로 임팩트 있게, 각 슬라이드는 단독으로도 읽힐 수 있도록`;

  const voiceoverLine = voiceover
    ? "\n- 스크립트 곳곳에 [보이스오버 톤: ...], [화면 전환: ...], [B롤 제안: ...] 형식으로 딜리버리 노트와 비주얼 큐를 삽입해줘"
    : "";

  const frameworkList = FRAMEWORKS.map((f) => `  - ${f.name}: ${f.flow}`).join("\n");

  return `당신은 크리에이터를 위한 전문 스크립트 작가입니다.
아래 두 단계를 순서대로 실행해주세요.

━━━━━━━━━━━━━━━━━━━━━━━━
[STEP 1] 프레임워크 분석 (스크립트 작성 전 먼저 출력)
━━━━━━━━━━━━━━━━━━━━━━━━

내 원고를 읽고, 아래 12가지 프레임워크 중 가장 잘 맞는 것을 골라줘.
내가 선택한 프레임워크(${fw.name})와도 비교해서 솔직하게 알려줘.

사용 가능한 프레임워크:
${frameworkList}

아래 형식으로 출력해줘:

▶ 추천 프레임워크: [이름]
▶ 추천 이유: [이 원고의 어떤 특성 때문인지 2~3문장]
▶ 내가 선택한 "${fw.name}"과 비교: [동일하면 "선택 잘 하셨어요" / 다르면 차이점과 어느 쪽이 왜 더 나은지]

━━━━━━━━━━━━━━━━━━━━━━━━
[STEP 2] 스크립트 작성
━━━━━━━━━━━━━━━━━━━━━━━━

조건:
${platformDetail}

- 스토리텔링 프레임워크: ${fw.name} (${fw.flow})
- 글쓰기 수준: ${level} → ${gradeMap[level]}
- 내 목소리와 개성을 살려서 써줘. 원고를 대체하지 말고 구조를 잡아줘${voiceoverLine}

출력 형식:
1. 제목 후보 3가지 (가장 좋은 것에 ★ 표시)
2. 훅 후보 2~3가지 (가장 좋은 것에 ★ 표시)
3. 본문 스크립트 (${fw.name} 구조 적용)
4. 콜 투 액션(CTA)

━━━━━━━━━━━━━━━━━━━━━━━━
[내 원고 / 아이디어]
━━━━━━━━━━━━━━━━━━━━━━━━

${rawScript.trim()}`;
}

export default function StorytellingGenerator() {
  const [rawScript, setRawScript] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [framework, setFramework] = useState("heros-journey");
  const [level, setLevel] = useState("표준");
  const [length, setLength] = useState("보통");
  const [voiceover, setVoiceover] = useState(false);
  const [chapters, setChapters] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  function handleAutoSuggest() {
    if (!rawScript.trim()) return;
    const result = suggestFramework(rawScript);
    if (result) {
      setSuggestion(result);
      setFramework(result.id);
    }
  }

  function handleGenerate() {
    const result = buildPrompt({ rawScript, platform, framework, level, length, voiceover, chapters });
    setPrompt(result);
    setTimeout(() => promptRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function handleCopy() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const fw = FRAMEWORKS.find((f) => f.id === framework)!;
  const canGenerate = rawScript.trim().length > 0;

  const c = {
    label: { color: "#555", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, display: "block", marginBottom: "8px" },
    card: { background: "#1a1a1a", border: "1px solid #252525", borderRadius: "10px" },
    seg: (on: boolean) => ({ background: on ? "#1e1000" : "transparent", border: "none", color: on ? "#f0c040" : "#555", borderRadius: "7px", padding: "9px 4px", fontSize: "12px", cursor: "pointer", fontWeight: on ? 700 : 400, transition: "all 0.2s" } as React.CSSProperties),
  };

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#fff", fontFamily: "'Apple SD Gothic Neo', -apple-system, sans-serif" }}>

      {/* 헤더 */}
      <div style={{ borderBottom: "1px solid #1e1e1e", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0f0f0f", zIndex: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "16px", letterSpacing: "0.02em" }}>스토리텔링 생성기</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#555", fontSize: "11px" }}>주식회사 삶일운동</span>
            <span style={{ color: "#333", fontSize: "11px" }}>·</span>
            <a href="https://www.instagram.com/31brand" target="_blank" rel="noopener noreferrer"
              style={{ color: "#c0392b", fontSize: "11px", textDecoration: "none", fontWeight: 600 }}>@31brand</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* 안내 */}
        <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "10px", padding: "14px 18px", marginBottom: "28px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "18px" }}>💡</span>
          <div style={{ fontSize: "13px", color: "#888", lineHeight: 1.7 }}>
            아이디어와 설정을 입력하면 <strong style={{ color: "#ccc" }}>ChatGPT·Claude·Gemini 등에 바로 붙여넣을 수 있는 프롬프트</strong>를 만들어드려요.<br />
            복사 후 원하는 AI에 붙여넣기 하면 끝!
          </div>
        </div>

        {/* 원고 입력 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={c.label}>내 원고 / 아이디어</label>
          <textarea
            value={rawScript}
            onChange={(e) => setRawScript(e.target.value)}
            placeholder="메모, 불릿 포인트, 거친 아이디어 모두 OK. 완성도 걱정 없이 그냥 쏟아내세요..."
            style={{ width: "100%", minHeight: "160px", background: "#1a1a1a", border: "1px solid #252525", borderRadius: "10px", color: "#ddd", fontSize: "14px", padding: "14px 16px", resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box", lineHeight: 1.8 }}
          />
          <div style={{ textAlign: "right", color: "#333", fontSize: "11px", marginTop: "4px" }}>
            {rawScript.length}자
          </div>

          {/* 자동 추천 버튼 */}
          <button
            onClick={handleAutoSuggest}
            disabled={rawScript.trim().length < 10}
            style={{ marginTop: "10px", width: "100%", background: "#141414", border: "1px solid #2a2a2a", color: rawScript.trim().length < 10 ? "#333" : "#aaa", borderRadius: "8px", padding: "11px", fontSize: "13px", cursor: rawScript.trim().length < 10 ? "default" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <span>✦</span> 베스트 프레임워크 자동 추천
          </button>

          {/* 추천 결과 배너 */}
          {suggestion && (
            <div style={{ marginTop: "10px", background: "#0d1a0d", border: "1px solid #27ae6055", borderRadius: "10px", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ color: "#27ae60", fontSize: "12px", fontWeight: 700 }}>
                  {suggestion.confident ? "✦ 추천 프레임워크" : "✦ 기본 추천"}
                </span>
                <span style={{ background: "#27ae6022", color: "#27ae60", fontSize: "11px", borderRadius: "4px", padding: "1px 7px", fontWeight: 700 }}>
                  {FRAMEWORKS.find((f) => f.id === suggestion.id)?.icon} {FRAMEWORKS.find((f) => f.id === suggestion.id)?.name}
                </span>
                {suggestion.runnerUp && (
                  <span style={{ color: "#555", fontSize: "11px" }}>
                    2위: {FRAMEWORKS.find((f) => f.id === suggestion.runnerUp)?.name}
                  </span>
                )}
              </div>
              <div style={{ color: "#7dcea0", fontSize: "13px", lineHeight: 1.6 }}>
                {suggestion.reason}
              </div>
              <div style={{ marginTop: "8px", color: "#3a5a3a", fontSize: "11px" }}>
                프레임워크가 자동 선택됐어요. 아래에서 직접 바꿀 수도 있어요.
              </div>
            </div>
          )}
        </div>

        {/* 플랫폼 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={c.label}>플랫폼</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {PLATFORMS.map((p) => (
              <button key={p.id} onClick={() => setPlatform(p.id)}
                style={{ background: platform === p.id ? "#1e1000" : "#1a1a1a", border: `1px solid ${platform === p.id ? "#c0392b" : "#252525"}`, borderRadius: "10px", padding: "14px 10px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                <div style={{ fontSize: "20px", marginBottom: "6px" }}>{p.icon}</div>
                <div style={{ color: platform === p.id ? "#f0c040" : "#aaa", fontSize: "12px", fontWeight: 700, marginBottom: "2px" }}>{p.name}</div>
                <div style={{ color: "#444", fontSize: "10px" }}>{p.words}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 프레임워크 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={c.label}>스토리텔링 프레임워크</label>
          <div style={{ ...c.card, overflow: "hidden" }}>
            {FRAMEWORKS.map((f, i) => (
              <div key={f.id} onClick={() => setFramework(f.id)}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 16px", borderBottom: i < FRAMEWORKS.length - 1 ? "1px solid #1e1e1e" : "none", cursor: "pointer", background: framework === f.id ? "#1e1000" : "transparent", transition: "background 0.15s" }}>
                <span style={{ fontSize: "16px", minWidth: "22px" }}>{f.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: framework === f.id ? "#fff" : "#bbb", fontSize: "13px", fontWeight: framework === f.id ? 700 : 400 }}>{f.name}</div>
                  <div style={{ color: "#3a3a3a", fontSize: "11px", marginTop: "2px" }}>{f.flow}</div>
                </div>
                {framework === f.id && <span style={{ color: "#c0392b" }}>✦</span>}
              </div>
            ))}
          </div>
        </div>

        {/* 글쓰기 수준 */}
        <div style={{ marginBottom: "16px" }}>
          <label style={c.label}>글쓰기 수준</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "4px", ...c.card, padding: "4px" }}>
            {LEVELS.map((l, i) => (
              <button key={l} onClick={() => setLevel(l)} style={c.seg(level === l)}>
                {l}
                <div style={{ color: "#2a2a2a", fontSize: "10px", marginTop: "2px" }}>{LEVEL_DESC[i]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 스크립트 길이 */}
        <div style={{ marginBottom: "16px" }}>
          <label style={c.label}>스크립트 길이</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "4px", ...c.card, padding: "4px" }}>
            {LENGTHS.map((l) => (
              <button key={l} onClick={() => setLength(l)} style={{ ...c.seg(length === l), padding: "10px 4px", fontSize: "13px" }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* 추가 옵션 */}
        <div style={{ marginBottom: "28px", ...c.card, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e1e" }}>
            <span style={{ color: "#444", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>추가 옵션</span>
          </div>
          {[
            { label: "보이스오버 딜리버리 노트 + 비주얼 큐 포함", val: voiceover, set: setVoiceover, disabled: false, note: "" },
            { label: "챕터 브레이크다운 포함", val: chapters, set: setChapters, disabled: platform !== "youtube", note: platform !== "youtube" ? "(유튜브 전용)" : "" },
          ].map((opt, i) => (
            <div key={i} onClick={() => !opt.disabled && opt.set(!opt.val)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", borderBottom: i === 0 ? "1px solid #1e1e1e" : "none", cursor: opt.disabled ? "default" : "pointer", opacity: opt.disabled ? 0.3 : 1 }}>
              <span style={{ color: "#888", fontSize: "13px" }}>{opt.label} <span style={{ color: "#444" }}>{opt.note}</span></span>
              <div style={{ width: "38px", height: "22px", borderRadius: "11px", background: opt.val ? "#c0392b" : "#2a2a2a", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#fff", position: "absolute", top: "2px", left: opt.val ? "18px" : "2px", transition: "left 0.2s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          style={{ width: "100%", background: canGenerate ? "linear-gradient(135deg, #c0392b, #96281b)" : "#1e1e1e", border: "none", color: canGenerate ? "#fff" : "#444", borderRadius: "12px", padding: "17px", fontSize: "15px", fontWeight: 800, cursor: canGenerate ? "pointer" : "default", letterSpacing: "0.04em", boxShadow: canGenerate ? "0 4px 20px rgba(192,57,43,0.3)" : "none", transition: "all 0.2s" }}>
          ✦ 프롬프트 생성하기
        </button>

        {/* 결과 프롬프트 */}
        {prompt && (
          <div ref={promptRef} style={{ marginTop: "36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div>
                <div style={{ color: "#c0392b", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "2px" }}>✦ 프롬프트 완성</div>
                <div style={{ color: "#444", fontSize: "12px" }}>
                  {PLATFORMS.find((p) => p.id === platform)?.name} · {fw?.name} · {level} · {length}
                </div>
              </div>
              <button
                onClick={handleCopy}
                style={{ background: copied ? "#1e4a1e" : "#1e1e1e", border: `1px solid ${copied ? "#27ae60" : "#333"}`, color: copied ? "#27ae60" : "#aaa", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer", fontWeight: 600, transition: "all 0.2s", whiteSpace: "nowrap" }}>
                {copied ? "✓ 복사됨!" : "📋 복사하기"}
              </button>
            </div>

            <div style={{ ...c.card, padding: "20px 22px", fontSize: "13px", lineHeight: 2, color: "#ccc", whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: "520px", overflowY: "auto" }}>
              {prompt}
            </div>

            <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { name: "ChatGPT", url: "https://chat.openai.com", color: "#10a37f" },
                { name: "Claude", url: "https://claude.ai", color: "#c0392b" },
                { name: "Gemini", url: "https://gemini.google.com", color: "#4285f4" },
              ].map((ai) => (
                <a key={ai.name} href={ai.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: "#1a1a1a", border: `1px solid ${ai.color}44`, color: ai.color, borderRadius: "8px", padding: "8px 14px", fontSize: "12px", textDecoration: "none", fontWeight: 600, transition: "all 0.2s" }}>
                  → {ai.name}에서 열기
                </a>
              ))}
            </div>

            <button onClick={() => { setPrompt(""); setRawScript(""); setSuggestion(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ marginTop: "12px", width: "100%", background: "transparent", border: "1px solid #252525", color: "#444", borderRadius: "10px", padding: "12px", fontSize: "13px", cursor: "pointer" }}>
              ↑ 새로 만들기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
