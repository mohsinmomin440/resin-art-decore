# OPEN ITEMS — Resin Art And Decore

Yeh list un cheezon ki hai jo website ko 100% live launch karne ke liye business owner ko provide karni hain. Code aur structure poori tarah se tayyar hai aur build pass ho raha hai.

---

### 1. Business Info & Social Links (`src/data/config.js`)
- [ ] **Area / City (`BUSINESS.area`):** Abhi `[CITY/AREA]` likha hai. Apna shehar/area name daalna hai (e.g. Ahmedabad, Mumbai, etc.).
- [ ] **Email (`BUSINESS.email`):** Agar email par queries chahiye toh add karein, warna blank chhod sakte hain (khud-ba-khud icon hide ho jayega).
- [ ] **Instagram (`SOCIAL.instagram`):** Apna Instagram profile link daalein (e.g., `https://instagram.com/yourhandle`).
- [ ] **Facebook (`SOCIAL.facebook`):** Apna Facebook page link daalein.

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
- [ ] `[ABOUT STORY]` placeholder ko owner ki real 3-4 lines ki kahani se replace karein (workshop kab shuru hui, resin art ka shauk kaise laga).

---

### 5. FAQ Confirmations (`src/data/faq.js`)
- [ ] **Custom Order Timeline:** Ek piece banne me kitne din lagte hain (cure time 24-48 ghante + design).
- [ ] **Delivery / Shipping:** Local pickup ya courier shipping charges / delivery time.
- [ ] **Payment terms:** Advance kitna percent liya jata hai (e.g. 50% advance via UPI).
- [ ] **Care instructions:** Resin ko direct dhoop ya extreme heat se bachane ke instructions.

---

### 6. Real Customer Reviews (`src/data/reviews.js`)
- [ ] Jaise hi WhatsApp par customers se feedback aur photo milein, unke reviews `src/data/reviews.js` me add kar sakte hain. Tab tak site par *"Received your resin piece? Share on WhatsApp"* card dikhta hai.

---

### 7. Process Videos (Optional) (`public/videos/`)
- [ ] Agar resin pour ya finish karte waqt ke 10-15 second ke short clips (mp4) hain, toh `public/videos/` me daal sakte hain process reel ke liye.
