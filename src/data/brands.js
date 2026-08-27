// Brand metadata. Static config — used by the navbar, footer, and brand pages.
export const brands = [
  {
    id: 'ca',
    name: 'CA Sports',
    type: 'Sports',
    logo: '/img/CA-Page/CAlogo.png',
    banner: '/img/Discount-Banners/CA-Banner.jpg',
  },
  {
    id: 'adidas',
    name: 'Adidas',
    type: 'Sports',
    logo: '/img/Adidas-Page/adidaslogo1.png',
    banner: '/img/Discount-Banners/adidas-banner.jpg',
  },
  {
    id: 'spalding',
    name: 'Spalding',
    type: 'Sports',
    logo: null,
    banner: '/img/Discount-Banners/spalding-banner.jpg',
  },
  {
    id: 'nike',
    name: 'Nike',
    type: 'Clothes',
    logo: '/img/Nike-Page/nike.jpg',
    banner: '/img/Discount-Banners/nikebanner.jpg',
  },
  {
    id: 'reebok',
    name: 'Reebok',
    type: 'Clothes',
    logo: null,
    banner: '/img/Discount-Banners/reebokbanner.jpg',
  },
  {
    id: 'puma',
    name: 'Puma',
    type: 'Clothes',
    logo: '/img/Puma-Page/logo.png',
    banner: '/img/Discount-Banners/pumabanner.jpg',
  },
]

export function getBrand(id) {
  return brands.find((b) => b.id === id) ?? null
}
