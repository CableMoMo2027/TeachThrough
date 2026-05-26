# TeachThrough - Premium Tutor Finding Platform

เว็บสำหรับค้นหาและเลือกติวเตอร์ระดับพรีเมียม สร้างด้วย Nuxt.js และ Nuxt UI ภายใต้คอนเซปต์ "Cinematic Narrative & Intelligent Clarity" (Overdrive Edition) เพื่อสร้างประสบการณ์การใช้งานระดับ World-class

## ⚡ Overdrive UI Experience

โปรเจกต์นี้ได้รับการอัปเกรดดีไซน์ในระดับสูงสุด โดยเน้นความประณีต (Crafted & Detailed) ในทุกจุดสัมผัส:

- **Cinematic Narratives**: ใช้แอนิเมชันระดับภาพยนตร์ด้วย GSAP Parallax และ Character Reveals (Blur-to-Clear)
- **Intelligent Clarity**: ระบบ Glassmorphism 2.0 พร้อมเอฟเฟกต์ "แสงตามเมาส์" (Light-aware cards) บนวัสดุโปร่งแสงพรีเมียม
- **Apple-inspired Layout**: การจัดวางพื้นที่ว่าง (Spaciousness) ที่ลงตัว และ Typographic Hierarchy ที่ชัดเจน
- **Seamless Navigation**: เปิดใช้งาน View Transitions API เพื่อการสลับหน้าเว็บที่ลื่นไหลไร้รอยต่อ
- **Sophisticated Depth**: ระบบเงาแบบหลายชั้น (Premium Layered Shadows) และการใช้สีระบบ OKLCH ทั่วทั้งโปรเจกต์

## 🚀 Key Features & Components

- **BlurText**: แอนิเมชันคลี่ตัวอักษรจากเบลอไปสู่ความคมชัด สำหรับหัวข้อหลัก
- **CountUp**: ระบบตัวเลขสถิติที่ "มีชีวิต" วิ่งขึ้นอย่างนุ่มนวลเมื่อเลื่อนมาถึง
- **FadeContent**: แอนิเมชันทางเข้า (Entrance) ของเนื้อหาที่รองรับการเยื้องจังหวะ (Stagger)
- **SplitText**: แอนิเมชันตัวอักษรแบบ 3D สำหรับเมนูนำทางและระบบเปลี่ยนภาษา
- **Stable Brand Identity**: โลโก้ "TeachThrough" ถูกล็อคให้นิ่งสนิทและเป็นภาษาอังกฤษพรีเมียมเสมอ (v-once)
- **Tutor Registration (Full-view)**: ฟอร์มสมัครติวเตอร์แบบยาว จัดกลุ่มข้อมูล 5 ขั้นตอน (01-05) พร้อมระบบ Scroll ทั่วทั้งหน้า
- **Find Tutors**: ระบบกรองข้อมูลที่ทันสมัย พร้อมการ์ดติวเตอร์ที่มี Micro-interactions ขั้นสูง

## 🛠 Tech Stack

- **Nuxt 4 / Vue 3**: Framework ประสิทธิภาพสูงรุ่นล่าสุด
- **Nuxt UI**: พื้นฐาน UI Component ที่ยืดหยุ่นและเป็นมาตรฐาน
- **GSAP (GreenSock)**: ขุมพลังเบื้องหลังแอนิเมชันระดับมืออาชีพ (ScrollTrigger, Parallax)
- **Tailwind CSS**: การจัดการสไตล์แบบ Utility-first
- **TypeScript**: ระบบ Type ที่แข็งแกร่ง (พร้อม Custom GSAP Definitions)
- **View Transitions API**: มาตรฐานใหม่สำหรับการเปลี่ยนหน้าเว็บที่ลื่นไหล

## 📂 Project Structure

```text
tutor-finding/
└── frontend/
    ├── app/
    │   ├── assets/
    │   │   ├── animations/     # แอนิเมชันขั้นสูง (ShinyText, etc.)
    │   │   └── css/            # main.css พร้อมตัวแปร Premium Shadows/OKLCH
    │   ├── components/         # BlurText, CountUp, FadeContent, SplitText, etc.
    │   ├── pages/              # 14 หน้าเพจหลักที่ได้รับการขัดเกลาทุกเม็ด
    │   ├── plugins/            # Centralized GSAP Plugin
    │   └── app.vue             # Header/Navbar ดีไซน์พรีเมียม
    ├── gsap.d.ts               # Custom TypeScript declarations สำหรับ GSAP
    ├── nuxt.config.ts          # การตั้งค่า View Transitions & Transpile
    └── package.json
```

## 🏁 Getting Started

เข้าไปที่ frontend ก่อนรันคำสั่งทุกครั้ง

```powershell
cd frontend
```

ติดตั้ง dependencies

```powershell
npm install
```

รัน development server

```powershell
npm run dev
```

## 📜 Available Scripts

- `npm run dev`: เปิด Nuxt development server
- `npm run build`: Build สำหรับ production
- `npm run preview`: Preview production build
- `npm run lint`: ตรวจสอบความถูกต้องของโค้ด
- `npm run typecheck`: ตรวจสอบ TypeScript (Zero errors implementation)

---
*Elevating Education through Impeccable Design.*
