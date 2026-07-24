// Global navigation + footer link data for the Apple Korea clone.

export interface NavItem {
  label: string
  href: string
}

export const globalNav: NavItem[] = [
  { label: 'Store', href: 'https://www.apple.com/kr/store' },
  { label: 'Mac', href: 'https://www.apple.com/kr/mac/' },
  { label: 'iPad', href: 'https://www.apple.com/kr/ipad/' },
  { label: 'iPhone', href: 'https://www.apple.com/kr/iphone/' },
  { label: 'Watch', href: 'https://www.apple.com/kr/watch/' },
  { label: 'AirPods', href: 'https://www.apple.com/kr/airpods/' },
  { label: 'TV 및 홈', href: 'https://www.apple.com/kr/tv-home/' },
  { label: '엔터테인먼트', href: 'https://www.apple.com/kr/entertainment/' },
  { label: '액세서리', href: 'https://www.apple.com/kr/shop/accessories/all' },
  { label: '고객지원', href: 'https://support.apple.com/ko-kr' },
]

export interface FooterColumn {
  title: string
  links: NavItem[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: '쇼핑 및 알아보기',
    links: [
      { label: 'Store', href: 'https://www.apple.com/kr/store' },
      { label: 'Mac', href: 'https://www.apple.com/kr/mac/' },
      { label: 'iPad', href: 'https://www.apple.com/kr/ipad/' },
      { label: 'iPhone', href: 'https://www.apple.com/kr/iphone/' },
      { label: 'Watch', href: 'https://www.apple.com/kr/watch/' },
      { label: 'AirPods', href: 'https://www.apple.com/kr/airpods/' },
      { label: 'TV 및 홈', href: 'https://www.apple.com/kr/tv-home/' },
      { label: 'AirTag', href: 'https://www.apple.com/kr/airtag/' },
      { label: '액세서리', href: 'https://www.apple.com/kr/shop/accessories/all' },
      { label: '기프트 카드', href: 'https://www.apple.com/kr/shop/gift-cards' },
    ],
  },
  {
    title: 'Apple 지갑',
    links: [
      { label: '지갑', href: 'https://www.apple.com/kr/wallet/' },
      { label: 'Apple Pay', href: 'https://www.apple.com/kr/apple-pay/' },
    ],
  },
  {
    title: '계정',
    links: [
      { label: 'Apple 계정 관리', href: 'https://account.apple.com/' },
      { label: 'Apple Store 계정', href: 'https://www.apple.com/kr/shop/account/home' },
      { label: 'iCloud.com', href: 'https://www.icloud.com/' },
    ],
  },
  {
    title: 'Apple을 위한 서비스',
    links: [
      { label: 'Apple 및 비즈니스', href: 'https://www.apple.com/kr/business/' },
      { label: '비즈니스 스토어에서 쇼핑', href: 'https://www.apple.com/kr/retail/business/' },
      { label: 'Apple 및 교육', href: 'https://www.apple.com/kr/education/' },
      { label: '대학생을 위한 쇼핑', href: 'https://www.apple.com/kr-edu/store' },
    ],
  },
  {
    title: 'Apple 가치',
    links: [
      { label: '손쉬운 사용', href: 'https://www.apple.com/kr/accessibility/' },
      { label: '환경', href: 'https://www.apple.com/kr/environment/' },
      { label: '개인정보 보호', href: 'https://www.apple.com/kr/privacy/' },
      { label: '공급업체의 책임', href: 'https://www.apple.com/kr/supplier-responsibility/' },
    ],
  },
  {
    title: 'Apple 소개',
    links: [
      { label: 'Apple 뉴스룸', href: 'https://www.apple.com/kr/newsroom/' },
      { label: 'Apple 리더십', href: 'https://www.apple.com/kr/leadership/' },
      { label: '채용 정보', href: 'https://www.apple.com/kr/careers/kr/' },
      { label: '투자자', href: 'https://investor.apple.com/' },
      { label: '윤리 및 규정 준수', href: 'https://www.apple.com/kr/compliance/' },
      { label: '이벤트', href: 'https://www.apple.com/kr/apple-events/' },
      { label: 'Apple에 문의하기', href: 'https://www.apple.com/kr/contact/' },
    ],
  },
]

export const footerLegalLinks: NavItem[] = [
  { label: '개인정보 보호정책', href: 'https://www.apple.com/legal/privacy/kr/' },
  { label: '이용약관', href: 'https://www.apple.com/legal/internet-services/terms/site.html' },
  { label: '판매 및 환불', href: 'https://www.apple.com/kr/shop/browse/open/salespolicies' },
  { label: '법적 고지 사항', href: 'https://www.apple.com/kr/legal/' },
  { label: '사이트 맵', href: 'https://www.apple.com/kr/sitemap/' },
]
