# 클로드(Claude) × 힉스필드(Higgsfield)로 웹사이트 만들기 가이드북

> 원본 콘텐츠: [Higgsfield App Builder x Fable 5 — @drcintas](https://higgsfield.ai/s/higgsfield-app-builder-x-fable-5-drcintas-mkeypq)
> 영상 속 사례: 가구 스튜디오 포트폴리오 사이트 **"ATELIER NORD"** 를 프롬프트 한 줄로 제작

---

## 1부. 영상 내용 한글 번역

### 영상 나레이션 전문 (번역)

> **"이 앱 전체가 프롬프트 하나로 시작됐습니다.**
> 그 이후의 모든 과정은 대화 안에서 이루어졌어요.
> 저는 원하는 것을 설명했고, 클로드(Claude)가 기획과 코딩을 처리했으며,
> 힉스필드(Higgsfield)가 그것을 실제로 작동하는 제품으로 만들어 줬습니다.
> 실시간으로 미리보기를 할 수 있고, 채팅으로 계속 개선할 수 있으며,
> 심지어 같은 작업 공간을 벗어나지 않고 모든 이미지와 영상까지 생성할 수 있습니다.
> 솔직히, 지금 시점에서 제품을 만드는 가장 쉬운 방법이라고 느껴집니다.
> 그리고 이 플랫폼에서 만들어진 최고의 앱들에게 **총 10만 달러($100,000)** 를 상금으로 주고 있어요."

### 영상 속 화면 흐름 (장면별 정리)

| 순서 | 화면 내용 |
|------|-----------|
| 1 | "Claude launches apps with one prompt" (클로드가 프롬프트 하나로 앱을 출시하다) 타이틀과 함께 완성된 ATELIER NORD 사이트 공개 |
| 2 | **Higgsfield MCP × Claude Fable 5** 조합 소개 |
| 3 | 힉스필드 "Ask Supercomputer" 입력창에 프롬프트 한 줄 입력: `Build a portfolio app using Higgsfield MCP for "ATELIER NORD"` (모델: Fable 5 · High) |
| 4 | 클로드가 기획 문서 `app/design-brief.md` 작성 — 디자인 방향, 컨셉, 컬러 팔레트, 폰트 지정 |
| 5 | 클로드가 힉스필드로 이미지 생성 요청 — 목재·스틸·석회암·울 소재의 매크로 사진, 인테리어 사진, 인물 사진, 아이콘 세트, 배경 텍스처 등 8종을 큐(Queue)에 넣고 자동 생성 |
| 6 | 배경 영상 생성 — "이 의자가 조립되는 영상을 만들어 랜딩 페이지 배경으로 무한 재생" |
| 7 | **Preview(미리보기)** 와 **Design mode(디자인 모드)** 로 완성된 사이트를 실시간 확인 |
| 8 | 두 번째 사례: 피트니스 사이트 "Build muscle. Build discipline." (8주 운동 프로그램 판매 페이지) |
| 9 | **App Contest** 안내 — 상금 $100,000, "Submit an app" 버튼, 수상 후보 예시로 CoverLab(음악 커버 아트 스튜디오), LayerLab(AI 레이어 분해) 소개 |

---

## 2부. 따라하기 가이드: 프롬프트 한 줄로 웹사이트 만들기

### 준비물

1. **힉스필드 계정** — [higgsfield.ai](https://higgsfield.ai) 가입 (이미지/영상 생성에 크레딧이 소모되므로 크레딧 잔액 확인)
2. **Higgsfield App Builder** — 힉스필드 안의 "Ask Supercomputer" 채팅 화면이 작업 공간입니다
3. **모델 선택** — 입력창 하단에서 **Claude Fable 5** 선택 (추론 강도는 `High` 권장)

> 💡 **Higgsfield MCP란?** 클로드가 힉스필드의 이미지·영상 생성 기능을 직접 호출할 수 있게 연결해 주는 다리(프로토콜)입니다. 덕분에 코딩하는 AI와 디자인 소스를 만드는 AI가 한 대화 안에서 함께 일합니다. 힉스필드 웹사이트뿐 아니라 클로드 앱/Claude Code에 Higgsfield MCP를 연결해서 사용할 수도 있습니다.

### STEP 1. 프롬프트 한 줄 입력

Ask Supercomputer 입력창에 만들고 싶은 것을 한 문장으로 적습니다.

영상에서 실제 사용된 프롬프트:

```
Build a portfolio app using Higgsfield MCP for "ATELIER NORD"
```
(한글 뜻: "ATELIER NORD"를 위한 포트폴리오 앱을 Higgsfield MCP를 사용해서 만들어 줘)

**프롬프트 작성 팁**
- `무엇을(사이트 종류) + 누구를 위해(브랜드/이름) + Higgsfield MCP 사용` 구조면 충분합니다
- 예시 응용:
  - `Build a landing page using Higgsfield MCP for my coffee brand "달빛로스터리"`
  - `Build a fitness program sales page using Higgsfield MCP — bold, dark, energetic`
- 톤/분위기 키워드(미니멀, 시네마틱, 다크 등)를 덧붙이면 결과 방향을 잡아줄 수 있습니다

### STEP 2. 클로드의 기획 — 디자인 브리프 자동 작성

프롬프트를 보내면 클로드가 코딩 전에 먼저 **기획 문서(design-brief.md)** 를 작성합니다. 영상에 나온 실제 브리프 내용:

- **Design read (디자인 해석)**: "건축가, 인테리어 디자이너, 개인 고객을 위한…" — 타깃 정의
- **Concept spine (컨셉 축)**: "The object in the round(사방에서 보는 오브제)" — 사이트 전체를 관통하는 컨셉
- **Delivery tier (구현 수준)**: `cinema` — Lenis + GSAP 라이브러리로 스크롤에 반응하는 시네마틱 히어로 연출
- **Locked palette (고정 팔레트)**: 배경(북유럽 석회암 톤), 잉크 컬러(#1B1C1A, 순검정 #000 금지), 보조 텍스트(#6F6F68), 포인트 컬러 딱 하나(#2743C7 울트라마린)
- **폰트**: 클린 그로테스크 계열 + 치수·스펙 표기는 JetBrains Mono

> 이 단계에서 사용자가 할 일은 없습니다. 다만 브리프가 마음에 안 들면 채팅으로 "포인트 컬러를 초록으로 바꿔줘"처럼 바로 수정 요청하면 됩니다.

### STEP 3. 코딩 — 파일 자동 생성

클로드가 브리프대로 코드를 작성합니다. 영상에서는 약 2분 만에 **17개 파일**을 작성했고, 진행 상황이 "Working for 2m 16s · Write file" 형태로 실시간 표시됩니다.

### STEP 4. 이미지 생성 — 디자인 소스도 대화 안에서

클로드가 사이트에 필요한 이미지를 스스로 목록화하고 힉스필드로 생성합니다. 영상에 나온 실제 이미지 프롬프트 8종 (그대로 참고용으로 활용 가능):

1. `Extreme macro photograph of pale ash wood grain, fine...` — 밝은 물푸레나무 결의 초근접 사진
2. `Extreme macro photograph of brushed stainless steel` — 헤어라인 스테인리스 스틸 초근접 사진
3. `Extreme macro photograph of pale limestone surface` — 밝은 석회암 표면 초근접 사진
4. `Extreme macro photograph of ultramarine blue wool` — 울트라마린 블루 울(양모) 초근접 사진
5. `Clean professional interior photograph, no text, no...` — 텍스트 없는 깔끔한 인테리어 전문 사진
6. `Editorial portrait photograph, no text, no watermark: two...` — 에디토리얼 인물 사진
7. `Icon set sheet: six minimal line glyphs in one consistent...` — 일관된 스타일의 미니멀 라인 아이콘 6종 세트
8. `Subtle plaster texture... very light cool grey limestone plaster #DDDBD5, faint mineral veining, extremely subtle, almost flat, no text, no watermark, wide format` — 배경용 은은한 석회 플라스터 텍스처

**이미지 프롬프트에서 배울 점**
- `no text, no watermark` 를 붙여 웹에 바로 쓸 수 있는 깨끗한 이미지를 받습니다
- 브리프의 팔레트 HEX 값(#DDDBD5 등)을 이미지 프롬프트에도 넣어 사이트와 이미지 색을 통일합니다
- 소재(materials) 매크로 사진은 브랜드 사이트의 고급스러움을 만드는 단골 소스입니다

### STEP 5. 영상 생성 — 움직이는 히어로 배경

정지 이미지에서 한 단계 더 나아가, 랜딩 페이지 배경 영상까지 만들 수 있습니다. 영상에서 사용된 실제 요청(HeroTurntable):

```
Create a video of this chair assembling and use it as landing page
background and it keep playing on landing page.
```
(한글 뜻: 이 의자가 조립되는 영상을 만들어서 랜딩 페이지 배경으로 쓰고, 계속 반복 재생되게 해 줘)

결과: "쿠션, 목재 셸, 다리가 분해도(exploded view)처럼 떠 있다가 완성된 의자로 조립되고, 다시 부드럽게 분해되는 10초 무한 루프" — 랜딩 페이지의 대표(히어로) 이미지와 이어지도록 같은 사진을 기준으로 생성했습니다.

### STEP 6. 실시간 미리보기 & 채팅으로 개선

- 상단 **Preview** 버튼으로 완성된 사이트를 즉시 확인
- **Design mode** 를 켜면 화면을 보면서 요소를 지정해 수정 가능
- 마음에 안 드는 부분은 채팅으로 계속 지시: "히어로 문구를 더 짧게", "모바일에서 여백을 줄여줘" 등
- 필요한 이미지/영상이 더 생기면 그 자리에서 추가 생성 — **작업 공간을 떠날 필요가 없습니다**

### STEP 7. 공개 & 앱 콘테스트 참여 (선택)

- 완성된 앱은 힉스필드에서 바로 게시(publish)하고 링크로 공유할 수 있습니다
- 힉스필드는 플랫폼에서 만들어진 최고의 앱에 **총 상금 $100,000** 를 걸고 **App Contest** 를 진행 중 — "Submit an app" 버튼으로 제출
- 콘테스트 페이지 문구: "or build it in Claude via Higgsfield MCP" — 힉스필드 웹이 아닌 클로드에서 MCP로 만들어 제출해도 됩니다
- 실제 출품작 예시: **CoverLab**(음악 커버 아트 스튜디오, 147 크레딧), **LayerLab**(AI 레이어 분해, 83 크레딧)

---

## 3부. 핵심 요약

1. **입력은 프롬프트 한 줄** — 나머지 기획·코딩·디자인 소스 제작은 클로드와 힉스필드가 분담
2. **역할 분담**: Claude(Fable 5) = 기획 + 코딩 / Higgsfield = 이미지·영상 생성 + 실행/배포, 둘을 잇는 것이 **MCP**
3. **좋은 결과의 비결은 브리프** — 팔레트·폰트·컨셉을 먼저 고정하고, 이미지 프롬프트에도 같은 색을 쓰게 해 통일감 유지
4. **반복 개선은 채팅으로** — 미리보기를 보며 대화로 다듬기
5. **웹에 쓸 이미지는 `no text, no watermark`** 를 습관처럼 붙이기
6. 잘 만들었다면 **$100,000 앱 콘테스트**에 도전

---

*이 가이드북은 @drcintas의 Higgsfield App Builder × Claude Fable 5 시연 영상(26초)의 나레이션과 화면을 분석해 한글로 번역·정리한 것입니다.*
