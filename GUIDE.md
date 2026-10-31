# GUIDE — Resin Art And Decore website (Claude Code ke saath)

Yeh guide tumhare liye hai. Claude Code ke liye alag files hain (`MASTER_PROMPT.md`, `CLAUDE.md`, `DESIGN.md`).

## 1. Is folder me kya hai
```
resin-art-decore/
├── MASTER_PROMPT.md        <- Claude Code ko dene wala poora brief
├── CLAUDE.md               <- Claude Code har baar khud padhta hai (rules)
├── DESIGN.md               <- colors, fonts, animations, responsive rules
├── GUIDE.md                <- yeh file (tumhare liye)
├── reference/cake-crumb/   <- tumhari Cake & Crumb site ka UI code (sirf dekhne ke liye)
├── src/data/products.seed.json   <- 15 products ki list (13 me photo hai, 2 me nahi)
├── public/images/
│   ├── products/<product-name>/  <- har product ke photos (folder ka naam = product ka naam)
│   ├── marketing/                <- tumhare posters (phone number wale)
│   ├── brand/                    <- logo, favicon (Claude Code banayega)
│   ├── hero/                     <- hero ke extra photos (optional)
│   └── gallery/                  <- extra photos jo gallery me dikhane hain
├── public/videos/          <- chhote video (mp4)
└── media-originals/        <- bade original photos/videos (website par upload nahi hote)
```

## 2. Photos kahan save karni hain (sabse important)
| Kya | Kahan | Naam kaise |
| --- | --- | --- |
| Product photo | `public/images/products/<product-naam>/` | `<product-naam>-1.jpeg`, `-2.jpeg`, `-3.jpeg` |
| Naya product | naya folder banao `public/images/products/<naya-naam>/` | naam chhote letters me, space ki jagah `-` (jaise `rose-petal-heart`) |
| Gallery ki extra photo | `public/images/gallery/` | `gallery-01.jpeg`, `gallery-02.jpeg` |
| Hero ya banner photo | `public/images/hero/` | `hero-01.jpeg` |
| Logo (agar tumhara apna hai) | `public/images/brand/` | `logo.png` ya `logo.svg` |
| Video (reel / pour video) | `public/videos/` | `love-letters-pour.mp4` |
| Bade original files (4K, MOV, HEIC) | `media-originals/` | kuch bhi (website par nahi jayenge) |

Rules: naam sirf chhote letters, numbers aur `-`. Space, bade letters ya Gujarati/Hindi naam nahi.
Folder ka naam aur `products.seed.json` ka `slug` same hona chahiye, warna photo product se judegi nahi.

Photos save karne ke baad Claude Code me bolo: **"npm run images chalao aur report batao"**.
Woh photos ko chhota karke `.webp` banata hai (website tez chalti hai) aur report deta hai ki kis product ki photo missing hai.

## 3. Abhi kin products ki photos hain
- Bismillah Heart Frame, Subhanallah Plate, Four Qul Set, Calligraphy Bookmark, Quran Rehal
- LOVE Letters, MOM Letters, Personalized Photo Heart, Personalized Flower Heart
- Alphabet Keychain (3 photos), Pressed Flower Phone Case, Butterfly Heart Tray, Resin Feather (2 photos)

**Photo chahiye:** Mashallah Scalloped Plate, Teardrop Earrings (sirf collage me chhoti dikhti hain). Photo milne tak yeh website par nahi dikhenge.

Photos ke naam maine order se pehchane hain. Agar kisi folder me galat photo ho, to bas file dusre folder me daal do.

## 4. Photos ke baare me ek zaroori baat
Customer ko wahi milna chahiye jo photo me dikhta hai. Isliye product photo me **asli banaya hua item** hi lagao.
Agar koi image mockup ya render hai (jaise "Your Picture" wala heart ya poster jaisa collage), to usse product photo mat banao.
`marketing/` folder wali photos posters hain, product photo nahi. Claude Code ko bola gaya hai ki mockup ko "Design preview" likh kar dikhaye.

## 5. Kaam shuru karne ke steps
1. **Node.js (LTS)** install karo: nodejs.org
2. **Claude Code** install karo (terminal me). Setup ka sahi tareeka Anthropic ki docs me hai: docs.claude.com
3. Yeh `resin-art-decore` folder apne computer par rakho (zip extract karo).
4. Terminal me us folder me jao aur `claude` chalao.
5. Claude Code me yeh likho:
   > Read MASTER_PROMPT.md and follow it. Start with Phase 0: plan only.
6. Woh plan dega. Plan theek lage to bolo **"go"**. Har phase ke baad woh screenshots dikhayega.
7. Har phase ke baad browser me dekho (`npm run dev`). Kuch badalna ho to seedha bolo, jaise "hero me red thoda dark karo".
8. Aakhir me `OPEN_ITEMS.md` dekho. Usme woh sab hai jo tumhe dena hai.

## 6. Tumhe yeh cheezein taiyar rakhni hain
- Har product ka final **naam, category aur price** (price na ho to site "Ask price on WhatsApp" dikhayegi)
- Instagram / Facebook link
- Asli customer reviews (customer ki permission ke saath). Bina reviews ke site koi review nahi dikhayegi.
- Delivery / pickup kaise hoti hai, custom order me kitne din lagte hain
- Resin ki care instructions (garmi, dhoop, safai)
- About story ki 3-4 lines (kab, kaise shuru kiya, kaun banata hai)
- Shehar / area (agar dikhana ho)
- Default WhatsApp number kaun sa ho (abhi Makbul Fatema default hai)

## 7. Colors / theme badalna ho to
`src/styles/tokens.css` kholo. Saare colors wahi ek jagah hain. Claude Code se bolo: "primary maroon ko thoda halka karo".

## 8. Website online kaise daalni hai
Sabse aasan: **Netlify ya Vercel** (free). Project GitHub par daalo, Netlify/Vercel me connect karo, woh khud build karke link dega.
Apna domain (jaise resinartdecore.com) baad me jod sakte ho. Claude Code Phase 8 me step by step batayega.
