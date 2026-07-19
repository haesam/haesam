export interface LeadPayload {
  email: string
  name?: string
}

// 스티비 구독 폼 연동:
// 스티비 > 주소록 > 구독 폼/페이지 > "구독 폼 HTML"에서 form action URL을 복사해
// .env의 VITE_STIBEE_SUBSCRIBE_URL에 넣으면 즉시 스티비 주소록으로 수집된다.
// 예) VITE_STIBEE_SUBSCRIBE_URL=https://stibee.com/api/v1.0/lists/XXXXX/public/subscribers
// 미설정 시 로컬 개발용으로 localStorage('leads')에 쌓인다.
const STIBEE_URL = import.meta.env.VITE_STIBEE_SUBSCRIBE_URL as string | undefined

function captureUtm() {
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
  }
}

export async function submitLead({ email, name }: LeadPayload): Promise<void> {
  const utm = captureUtm()

  if (!STIBEE_URL) {
    const leads = JSON.parse(localStorage.getItem('leads') ?? '[]')
    leads.push({ email, name, ...utm, submittedAt: new Date().toISOString() })
    localStorage.setItem('leads', JSON.stringify(leads))
    await new Promise((resolve) => setTimeout(resolve, 700))
    return
  }

  const body = new FormData()
  body.append('email', email)
  if (name) body.append('name', name)
  // 스티비 주소록에 같은 이름의 사용자 정의 필드를 만들어두면 함께 저장된다.
  body.append('utm_source', utm.utm_source)
  body.append('utm_medium', utm.utm_medium)
  body.append('utm_campaign', utm.utm_campaign)

  // 스티비 구독 폼 엔드포인트는 CORS 응답 헤더를 주지 않으므로 no-cors로 전송한다.
  // (응답을 읽을 수 없지만 제출 자체는 정상 처리된다)
  await fetch(STIBEE_URL, { method: 'POST', body, mode: 'no-cors' })
}
