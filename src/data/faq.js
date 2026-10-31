/**
 * faq.js — accordion questions. Answers marked [TO CONFIRM] are placeholders
 * the owner must fill; until then they render as honest "pending" text.
 */

export const FAQ_SECTIONS = [
  {
    id: 'ordering',
    title: 'Ordering',
    questions: [
      {
        q: 'How do I place an order?',
        a: '[TO CONFIRM] — how to order. Typically: pick a product, tap Order on WhatsApp, and we confirm the details and the date.',
      },
      {
        q: 'What information do I need to send?',
        a: 'Product name, your name or initials, chosen colors, the occasion, and any note. We pre-fill the product name in the WhatsApp message for you.',
      },
      {
        q: 'Can I order more than one item in a single message?',
        a: 'Yes — use the Saved list. Add every product you want, then "Send my list on WhatsApp" sends one message with all of them numbered.',
      },
    ],
  },
  {
    id: 'custom',
    title: 'Custom & Personalised',
    questions: [
      {
        q: 'Can I add my name or initials to a piece?',
        a: 'Many pieces can — Bismillah Heart Frame, Subhanallah Plate, Quran Rehal, LOVE/MOM Letters, Alphabet Keychains and the two photo/flower hearts all say so in their descriptions. Say the name or initials when you order.',
      },
      {
        q: 'Can I send a photo to put inside a piece?',
        a: 'The Personalized Photo Heart is made to hold your picture. Send the photo on WhatsApp with your order and we will confirm what size and finish we can use.',
      },
      {
        q: 'How long does a custom piece take?',
        a: '[TO CONFIRM] — how long a custom piece takes. Ask on WhatsApp with your date and we will tell you what is possible.',
      },
      {
        q: 'Can I choose the colors?',
        a: 'Many pieces come in several colors — Alphabet Keychains especially. Say your colors when you order and we will confirm what is available.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping & Pickup',
    questions: [
      {
        q: 'Where do you deliver?',
        a: '[TO CONFIRM] — which areas you deliver to, and whether pickup is available.',
      },
      {
        q: 'How much does delivery cost?',
        a: '[TO CONFIRM] — delivery charges. We will tell you the total on WhatsApp before you confirm.',
      },
      {
        q: 'Can I pick up my order myself?',
        a: '[TO CONFIRM] — whether self-pickup is available and where.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    questions: [
      {
        q: 'How do I pay?',
        a: '[TO CONFIRM] — payment methods. We will agree the payment with you on WhatsApp.',
      },
      {
        q: 'Do I pay before or after I get the piece?',
        a: '[TO CONFIRM] — whether payment is in advance or on delivery/pickup.',
      },
    ],
  },
  {
    id: 'care',
    title: 'Caring for Resin',
    questions: [
      {
        q: 'How do I look after a resin piece?',
        a: '[TO CONFIRM] — care instructions: how to clean it, what to keep away from (heat, direct sunlight), and how to store it.',
      },
      {
        q: 'Can resin go in the dishwasher or near a stove?',
        a: 'Resin softens in high heat. Keep pieces out of dishwashers, ovens, and direct sun on a hot day. Ask us on WhatsApp for the full care note for your piece.',
      },
      {
        q: 'What if my piece arrives damaged?',
        a: 'Message us on WhatsApp straight away, with a photo if you can. We will sort it out — do not throw the packaging away.',
      },
    ],
  },
  {
    id: 'gifts',
    title: 'Gifts & Occasions',
    questions: [
      {
        q: 'What makes a good resin gift?',
        a: 'A piece with the recipient\'s name, initials, or a photo turns a decorative object into something personal. Islamic calligraphy pieces, LOVE/MOM Letters, and the photo heart are the most-ordered gifts.',
      },
      {
        q: 'Can you gift-wrap an order?',
        a: '[TO CONFIRM] — whether gift wrapping is available.',
      },
      {
        q: 'Do you make gift sets?',
        a: '[TO CONFIRM] — whether gift sets or bundles are available. Add several pieces to your Saved list and send it as one message.',
      },
    ],
  },
]