# OPEN ITEMS — Aman Resin Art And Decore

Yeh list un cheezon ki hai jo website ko 100% live launch karne ke liye business owner ko provide karni hain. Code aur structure poori tarah se tayyar hai aur build pass ho raha hai.

---

### 1. Business Info & Social Links (`src/data/config.js`)
- [x] **Area / City (`BUSINESS.area`):** Kakoshi, Sidhpur, Patan District, Gujarat (Pincode: 384290).
- [x] **Email (`BUSINESS.email`):** `resinartanddecore@gmail.com`.
- [x] **Studio Address (`BUSINESS.address`):** C/o Hasan Rahim shelia, 1st floor, Dindrolya vas, near jafri co-op credit society, Kakoshi, Tal. Sidhpur, Patan District, Gujarat - 384290.
- [x] **Instagram (`SOCIAL.instagram`):** `https://www.instagram.com/m_ahesan.official?utm_source=qr&exln=aHp3eTAyM292cDQ1` (@m_ahesan.official).
- [ ] **Facebook (`SOCIAL.facebook`):** Optional - apna Facebook page link daalein.

---

### 2. Product Prices (`src/data/products.js`)
Abhi saare products me price `null` hai aur site par `"Ask price on WhatsApp"` dikhta hai.
- [ ] Har product ka actual selling price (INR) confirm karke `price: 499` jaisa set karein:
  - `bismillah-heart-frame`
  - `subhanallah-plate`
  - `four-qul-set`
  - `calligraphy-bookmark`
  - `quran-rehal`
  - `love-letters`
  - `mom-letters`
  - `personalized-photo-heart`
  - `personalized-flower-heart`
  - `alphabet-keychain`
  - `pressed-flower-phone-case`
  - `butterfly-heart-tray`
  - `resin-feather`

---

### 3. Missing Product Photos
Yeh 2 products catalog me hain lekin photo na hone ki wajah se shop se hidden hain (jab tak real photo na mile):
- [ ] **Mashallah Scalloped Plate:** Photo chahiye `public/images/products/mashallah-scalloped-plate/` me.
- [ ] **Teardrop Earrings:** Photo chahiye `public/images/products/teardrop-earrings/` me.

Photo add karne ke baad `npm run images` chalayein.

---

### 4. About Us Story (`src/pages/About.jsx`)
- [x] **Studio Story Confirmed:** Kakoshi, Patan District, Gujarat atelier journey, hand-poured process, and floral keepsake preservation details live.

---

### 5. FAQ Confirmations (`src/data/faq.js`)
- [x] **Custom Order Timeline:** Confirmed (Standard pieces: 3–5 days; Bridal varmala preservation: 7–10 days).
- [x] **Delivery / Shipping:** Confirmed (Pan-India courier delivery; Local studio pickup in Kakoshi, Gujarat).
- [x] **Payment terms:** Confirmed (50% UPI advance to pour; balance on HD photo preview approval before courier dispatch).
- [x] **Care instructions:** Confirmed (Microfiber cloth clean, avoid high heat/harsh direct sun and harsh chemicals).
- [x] **Gift packaging & bundles:** Confirmed (Luxury presentation, satin ribbon & complimentary personalized greeting card).

---

### 6. Real Customer Reviews (`src/data/reviews.js`)
- [ ] Jaise hi WhatsApp par customers se feedback aur photo milein, unke reviews `src/data/reviews.js` me add kar sakte hain. Tab tak site par *"Received your resin piece? Share on WhatsApp"* card dikhta hai.

---

### 7. Process Videos (Optional) (`public/videos/`)
- [ ] Agar resin pour ya finish karte waqt ke 10-15 second ke short clips (mp4) hain, toh `public/videos/` me daal sakte hain process reel ke liye.
