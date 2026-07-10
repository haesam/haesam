# 나다운타운 (NADAUNTOWN) — design brief

## Design read
나답게 일하는 사람들(프리랜서, 사이드프로젝트 빌더, 크리에이터)을 위한 커뮤니티 홈페이지.
"도시는 곧 사람" — 멤버 한 명 한 명이 건물이 되고, 커뮤니티가 스카이라인이 된다.

## Concept spine
**The city under construction.** 사이트 경험 전체를 '입주 → 구역 탐방 → 주민 현황 → 입주 신청'이라는 도시 동선으로 설계. 히어로는 새 도시가 건설되는 3D 영상.

## Delivery tier
`cinema` — Lenis 스무스 스크롤 + GSAP ScrollTrigger.
스크롤 스크럽 히어로 줌, 매니페스토 라인 점등, 3D 틸트 카드, 카운트업, 커서 글로우, 마그네틱 버튼.

## Locked palette
- Ground: `#0B0E14` (잉크 네이비, 순검정 금지) / surface `#10141D`
- Ink: `#F2EFE8` (웜 오프화이트)
- Muted: `#8B8F98`
- Accent (딱 하나): `#FFA02E` 건설 크레인 앰버

## Type
- 한글/본문: Pretendard Variable (로컬 번들)
- 라틴/숫자: Space Grotesk Variable (로컬 번들)

## Generated assets (Higgsfield)
| 용도 | 모델 | job id |
|---|---|---|
| 히어로 배경 영상 (도시 건설 10s 루프, 16:9) | kling3_0_turbo | 6c9e454f-4656-42a4-a123-66fe45a4369f |
| 히어로 포스터 (영상 로딩 전 폴백) | nano_banana_2 | c4db65a8-fa9b-447e-bdda-58642281ac74 |
| 창작구 아이소메트릭 디오라마 | nano_banana_2 | 16e1f420-692d-4c28-8aae-d22b1304e80e |
| 개발구 아이소메트릭 디오라마 | nano_banana_2 | 3ae8a2bf-df34-480c-9d5e-6839e7f5ac7d |
| 기록구 아이소메트릭 디오라마 | nano_banana_2 | 90ba210e-b234-4999-864c-f4a81bb5acf1 |
