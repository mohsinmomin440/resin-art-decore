/**
 * occasions.js — horizontal rail on Home. Only occasions we actually have
 * products for; an occasion with nothing to show is not a filter.
 */

export const OCCASIONS = [
  { id: 'birthday', name: 'Birthday', icon: 'Cake' },
  { id: 'wedding', name: 'Wedding', icon: 'Ring' },
  { id: 'anniversary', name: 'Anniversary', icon: 'Rose' },
  { id: 'valentine', name: "Valentine's", icon: 'Heart' },
  { id: 'housewarming', name: 'Housewarming', icon: 'Home' },
  { id: 'new-baby', name: 'New Baby', icon: 'Baby' },
  { id: 'graduation', name: 'Graduation', icon: 'Graduation' },
  { id: 'farewell', name: 'Farewell', icon: 'Farewell' },
  { id: 'ramadan', name: 'Ramadan', icon: 'CrescentStar' },
  { id: 'eid', name: 'Eid', icon: 'Lantern' },
  { id: 'diwali', name: 'Diwali', icon: 'Diya' },
  { id: 'rakhi', name: 'Rakhi', icon: 'Rakhi' },
  { id: 'mothers-day', name: "Mother's Day", icon: 'Bouquet' },
  { id: 'fathers-day', name: "Father's Day", icon: 'Tie' },
  { id: 'friendship', name: 'Friendship', icon: 'Handshake' },
  { id: 'just-because', name: 'Just Because', icon: 'Gift' },
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
