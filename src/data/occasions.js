/**
 * occasions.js — horizontal rail on Home. Only occasions we actually have
 * products for; an occasion with nothing to show is not a filter.
 */

export const OCCASIONS = [
  { id: 'birthday', name: 'Birthday', emoji: '🎂' },
  { id: 'wedding', name: 'Wedding', emoji: '💍' },
  { id: 'anniversary', name: 'Anniversary', emoji: '🌹' },
  { id: 'valentine', name: "Valentine's", emoji: '❤️' },
  { id: 'housewarming', name: 'Housewarming', emoji: '🏡' },
  { id: 'new-baby', name: 'New Baby', emoji: '👶' },
  { id: 'graduation', name: 'Graduation', emoji: '🎓' },
  { id: 'farewell', name: 'Farewell', emoji: '👋' },
  { id: 'ramadan', name: 'Ramadan', emoji: '🌙' },
  { id: 'eid', name: 'Eid', emoji: '🌙' },
  { id: 'diwali', name: 'Diwali', emoji: '🪔' },
  { id: 'rakhi', name: 'Rakhi', emoji: '🧵' },
  { id: 'mothers-day', name: "Mother's Day", emoji: '💐' },
  { id: 'fathers-day', name: "Father's Day", emoji: '👔' },
  { id: 'friendship', name: 'Friendship', emoji: '🤝' },
  { id: 'just-because', name: 'Just Because', emoji: '🎁' },
]

// Map occasion → the categories a gift for it would plausibly come from.
export const OCCASION_CATEGORIES = {
  birthday: ['Love & Gifts', 'Keychains', 'Décor & Accessories'],
  wedding: ['Love & Gifts', 'Islamic Décor', 'Décor & Accessories'],
  anniversary: ['Love & Gifts', 'Islamic Décor'],
  'valentine': ['Love & Gifts', 'Keychains'],
  housewarming: ['Décor & Accessories', 'Islamic Décor'],
  'new-baby': ['Décor & Accessories', 'Keychains'],
  graduation: ['Keychains', 'Décor & Accessories'],
  farewell: ['Décor & Accessories', 'Keychains'],
  ramadan: ['Islamic Décor'],
  eid: ['Islamic Décor'],
  diwali: ['Islamic Décor', 'Décor & Accessories'],
  rakhi: ['Keychains', 'Décor & Accessories'],
  'mothers-day': ['Love & Gifts', 'Keychains'],
  'fathers-day': ['Décor & Accessories', 'Keychains'],
  friendship: ['Keychains', 'Love & Gifts'],
  'just-because': ['Love & Gifts', 'Décor & Accessories'],
}