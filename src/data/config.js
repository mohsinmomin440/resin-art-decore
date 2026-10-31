/**
 * config.js — business facts. Numbers live ONLY here.
 * Empty social fields mean "do not render the icon".
 */

export const BUSINESS = {
  name: 'Resin Art And Decore',
  tagline: 'Handmade resin gifts',
  // [CITY/AREA] — pending owner confirmation. Used in About / Contact / footer.
  area: '[CITY/AREA]',
  email: '', // leave empty to hide the email link
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
  instagram: '', // set to a handle or URL to show the icon
  facebook: '', // set to a handle or URL to show the icon
}