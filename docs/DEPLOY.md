# Vercel 배포 가이드 (모바일에서도 가능)

유미 코치 랜딩페이지(`claude/personal-brand-coach-page-pam2dc` 브랜치)를 Vercel에 배포하는 순서.

## 1. 프로젝트 연결 (최초 1회)

1. https://vercel.com 접속 → **Sign Up / Log In** → **Continue with GitHub**
2. **Add New… → Project** → `haesam/haesam` 리포지토리 **Import**
3. Framework Preset이 **Vite**로 자동 감지되는지 확인 (Build: `npm run build`, Output: `dist`)
4. **Deploy** 클릭

## 2. 프로덕션 브랜치 지정 (중요)

리포지토리의 기본 브랜치는 예전 포트폴리오라서, 랜딩페이지 브랜치를 프로덕션으로 지정해야 한다.

1. 프로젝트 → **Settings → Git → Production Branch**
2. `claude/personal-brand-coach-page-pam2dc` 입력 → Save
3. **Deployments** 탭에서 해당 브랜치의 최신 배포를 열거나 **Redeploy**

> 또는 기본 브랜치를 바꾸지 않고, Deployments 목록에서
> `claude/personal-brand-coach-page-pam2dc` 브랜치의 **Preview 배포 URL**을 열어도
> 동일한 결과물을 볼 수 있다 (브랜치에 푸시될 때마다 자동 갱신).

## 3. 배포 후 확인 사항

- 히어로 배경에 마인드풀니스 **영상**이 재생되는지 (영상이 뜨기 전/실패 시엔 밤 숲 캔버스 장면이 보임)
- 모바일에서 이메일 입력폼 높이가 정상인지
- 폼 제출 → "신청 완료!" 상태 전환 확인

## 4. 스티비 연동 (DB 수집 활성화)

배포만으로는 제출 데이터가 브라우저에만 저장된다. 실제 수집하려면:

1. 스티비 → 주소록 → **구독 폼/페이지 → 구독 폼 HTML**에서 form action URL 복사
   (형태: `https://stibee.com/api/v1.0/lists/XXXXX/public/subscribers`)
2. Vercel 프로젝트 → **Settings → Environment Variables**에 추가:
   - Name: `VITE_STIBEE_SUBSCRIBE_URL`
   - Value: 복사한 URL
3. **Redeploy** — 이후 모든 제출이 스티비 주소록으로 들어간다.

## 5. (선택) 코치 프로필 이미지 로컬화

현재 코치 사진은 외부 생성 이미지 URL을 참조한다. 영구 보존하려면 해당 이미지를
`public/images/coach-yumi.jpg`로 저장해 커밋하면 로컬 파일이 우선 사용된다.
(이미지 URL은 `src/components/coach/AboutCoach.tsx`의 `COACH_PHOTO_FALLBACK` 참고)
