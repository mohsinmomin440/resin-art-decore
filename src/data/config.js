/**
 * config.js — business facts. Numbers live ONLY here.
 * Empty social fields mean "do not render the icon".
 */

// Public production URL — used for canonical / Open Graph / sitemap (not for asset paths).
export const SITE_URL = 'https://resinartanddecore.com'

export const BUSINESS = {
  name: 'Aman Resin Art And Decore',
  tagline: 'Handmade resin gifts',
  area: 'Kakoshi, Sidhpur, Patan District, Gujarat',
  city: 'Kakoshi',
  state: 'Gujarat',
  pincode: '384290',
  address: {
    full: 'C/o Hasan Rahim Shelia, 1st floor, Dindrolya vas, near jafri co-op credit society, Kakoshi, Tal. Sidhpur, Patan District, Gujarat - 384290',
    street: 'C/o Hasan Rahim Shelia, 1st floor, Dindrolya vas, near jafri co-op credit society',
    locality: 'Kakoshi, Tal. Sidhpur',
    district: 'Patan',
    city: 'Kakoshi',
    state: 'Gujarat',
    pincode: '384290',
    country: 'India',
  },
  email: 'resinartanddecore@gmail.com',
}

// Two WhatsApp contacts. `default: true` is the one NumberChooser opens first.
export const CONTACTS = [
  {
    id: 'makbul',
    label: 'Makbul Fatema',
    phone: '919428213440',
    display: '+91 94282 13440',
    default: true,
  },
  {
    id: 'asim',
    label: 'Asim',
    phone: '919377308250',
    display: '+91 93773 08250',
    default: false,
  },
]

export const SOCIAL = {
  instagram: 'https://www.instagram.com/m_ahesan.official?utm_source=qr&exln=aHp3eTAyM292cDQ1',
  instagramHandle: 'm_ahesan.official',
  facebook: '', // set to a handle or URL to show the icon
}