// Data model for the Apple Korea homepage tile grid.
// Each tile mirrors Apple's marketing-tile format: an eyebrow (product name),
// a headline, an optional subheadline, two CTA links, a theme (light/dark),
// a real Apple CDN image URL and a matching gradient used as a graceful
// fallback if the remote image is unavailable.

export type TileSize = 'full' | 'half'
export type TileTheme = 'light' | 'dark'

export interface Cta {
  label: string
  href: string
}

export interface Tile {
  id: string
  size: TileSize
  theme: TileTheme
  eyebrow?: string
  eyebrowLogo?: boolean // render eyebrow as a large wordmark (e.g. iPhone)
  headline: string
  subheadline?: string
  ctas: Cta[]
  image: string // real Apple CDN url
  imageAlt: string
  gradient: string // CSS background fallback
  // horizontal position of the image within the tile
  imagePosition?: 'center' | 'bottom' | 'top'
}

export const tiles: Tile[] = [
  {
    id: 'iphone-16-pro',
    size: 'full',
    theme: 'dark',
    eyebrow: 'iPhone 16 Pro',
    headline: 'Hello, Apple Intelligence.',
    subheadline: '티타늄 디자인. 카메라 컨트롤. 놀랍도록 강력한 성능.',
    ctas: [
      { label: '더 알아보기', href: 'https://www.apple.com/kr/iphone-16-pro/' },
      { label: '구입하기', href: 'https://www.apple.com/kr/shop/buy-iphone/iphone-16-pro' },
    ],
    image:
      'https://www.apple.com/v/home/bx/images/heroes/iphone-16-pro/hero_iphone16pro_avail__ekmm7uhfj12i_xlarge.jpg',
    imageAlt: 'iPhone 16 Pro',
    gradient: 'radial-gradient(120% 90% at 50% 8%, #4a4a4c 0%, #2a2a2c 45%, #050506 100%)',
    imagePosition: 'bottom',
  },
  {
    id: 'iphone-16',
    size: 'full',
    theme: 'light',
    eyebrow: 'iPhone 16',
    headline: 'Apple Intelligence를 위해 탄생하다.',
    subheadline: '눈부신 컬러. 카메라 컨트롤. A18 칩.',
    ctas: [
      { label: '더 알아보기', href: 'https://www.apple.com/kr/iphone-16/' },
      { label: '구입하기', href: 'https://www.apple.com/kr/shop/buy-iphone/iphone-16' },
    ],
    image:
      'https://www.apple.com/v/home/bx/images/heroes/iphone-16/hero_iphone16_avail__fnp0j3ez3aqq_xlarge.jpg',
    imageAlt: 'iPhone 16',
    gradient: 'linear-gradient(180deg, #f5f5f7 0%, #e7edf5 55%, #d9e4f2 100%)',
    imagePosition: 'bottom',
  },
  {
    id: 'apple-intelligence',
    size: 'full',
    theme: 'light',
    eyebrow: 'Apple Intelligence',
    headline: '개인정보를 보호하는 강력한 개인용 인공지능.',
    subheadline: 'iPhone, iPad, Mac를 위한 지능.',
    ctas: [{ label: '더 알아보기', href: 'https://www.apple.com/kr/apple-intelligence/' }],
    image:
      'https://www.apple.com/v/home/bx/images/heroes/apple-intelligence/hero_apple_intelligence__dvsvsl6ur6qm_xlarge.jpg',
    imageAlt: 'Apple Intelligence',
    gradient:
      'conic-gradient(from 210deg at 50% 60%, #ff5f6d, #ffc371, #6a82fb, #a044ff, #ff5f6d)',
    imagePosition: 'center',
  },
  {
    id: 'macbook-air',
    size: 'half',
    theme: 'light',
    eyebrow: 'MacBook Air',
    headline: '가볍고. 강력하게.',
    subheadline: 'M4 칩 탑재.',
    ctas: [
      { label: '더 알아보기', href: 'https://www.apple.com/kr/macbook-air/' },
      { label: '구입하기', href: 'https://www.apple.com/kr/shop/buy-mac/macbook-air' },
    ],
    image:
      'https://www.apple.com/v/home/bx/images/promos/macbook-air/promo_macbook_air__c8k4l0q9d9uu_xlarge.jpg',
    imageAlt: 'MacBook Air',
    gradient: 'linear-gradient(180deg, #ffffff 0%, #eef1f6 60%, #dbe3ee 100%)',
    imagePosition: 'bottom',
  },
  {
    id: 'apple-watch-series-10',
    size: 'half',
    theme: 'dark',
    eyebrow: 'Apple Watch Series 10',
    headline: '얇다. 강렬하다.',
    ctas: [
      { label: '더 알아보기', href: 'https://www.apple.com/kr/apple-watch-series-10/' },
      { label: '구입하기', href: 'https://www.apple.com/kr/shop/buy-watch/apple-watch' },
    ],
    image:
      'https://www.apple.com/v/home/bx/images/promos/apple-watch-series-10/promo_watch_s10__b7hb1sq2r0qq_xlarge.jpg',
    imageAlt: 'Apple Watch Series 10',
    gradient: 'radial-gradient(100% 90% at 50% 20%, #2c2c2e 0%, #161618 60%, #000 100%)',
    imagePosition: 'center',
  },
  {
    id: 'ipad-pro',
    size: 'half',
    theme: 'dark',
    eyebrow: 'iPad Pro',
    headline: '믿기 힘든 얇기. 믿기 힘든 성능.',
    subheadline: 'M4 칩 탑재.',
    ctas: [
      { label: '더 알아보기', href: 'https://www.apple.com/kr/ipad-pro/' },
      { label: '구입하기', href: 'https://www.apple.com/kr/shop/buy-ipad/ipad-pro' },
    ],
    image:
      'https://www.apple.com/v/home/bx/images/promos/ipad-pro/promo_ipadpro__f5s1sf0e6mq6_xlarge.jpg',
    imageAlt: 'iPad Pro',
    gradient: 'radial-gradient(110% 90% at 50% 15%, #3a3a3c 0%, #1c1c1e 55%, #000 100%)',
    imagePosition: 'center',
  },
  {
    id: 'airpods-pro-2',
    size: 'half',
    theme: 'light',
    eyebrow: 'AirPods Pro 2',
    headline: '세계 최초, 임상적 청력 도움 기능.',
    ctas: [
      { label: '더 알아보기', href: 'https://www.apple.com/kr/airpods-pro/' },
      { label: '구입하기', href: 'https://www.apple.com/kr/shop/buy-airpods/airpods-pro-2' },
    ],
    image:
      'https://www.apple.com/v/home/bx/images/promos/airpods-pro-2/promo_airpods_pro2__dvp3f0lj9wq6_xlarge.jpg',
    imageAlt: 'AirPods Pro 2',
    gradient: 'linear-gradient(180deg, #fbfbfd 0%, #eef1f5 100%)',
    imagePosition: 'center',
  },
  {
    id: 'trade-in',
    size: 'half',
    theme: 'light',
    eyebrow: 'Apple Trade In',
    headline: '기존 기기를 새 iPhone 구입에 사용하세요.',
    ctas: [{ label: '더 알아보기', href: 'https://www.apple.com/kr/shop/trade-in' }],
    image:
      'https://www.apple.com/v/home/bx/images/promos/trade-in/promo_tradein__ff0v3o0iq0qq_xlarge.jpg',
    imageAlt: 'Apple Trade In',
    gradient: 'linear-gradient(180deg, #ffffff 0%, #eaf2ea 100%)',
    imagePosition: 'center',
  },
]
