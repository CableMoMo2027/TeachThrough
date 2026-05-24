# Tutor Finding Platform

เว็บสำหรับค้นหาและเลือกติวเตอร์ สร้างด้วย Nuxt.js และ Nuxt UI โดยออกแบบให้เป็นแพลตฟอร์มที่ผู้ปกครอง นักเรียน และผู้สนใจสามารถค้นหาครูที่เหมาะกับวิชา ระดับชั้น ราคา รูปแบบการเรียน และโปรไฟล์ของผู้สอนได้

## Overview

โปรเจคนี้เป็น frontend สำหรับแพลตฟอร์มหาติวเตอร์ มีหน้า landing page, ระบบค้นหาติวเตอร์, หน้าโปรไฟล์ติวเตอร์, สมัครสมาชิก, สมัครเป็นติวเตอร์, หน้า account, contact, blog, pricing และ policies พร้อม UI โทนสีขาว ดูสะอาด ใช้งานง่าย และรองรับมือถือ

## Tech Stack

- Nuxt.js 4
- Nuxt UI
- Vue 3
- TypeScript
- Tailwind CSS
- GSAP สำหรับ animation
- ESLint

## Features

- หน้า Home พร้อม search bar, featured tutors, categories, testimonials และ CTA
- หน้า Find Tutors พร้อมรายการติวเตอร์และ filter
- หน้า Tutor Detail สำหรับดูข้อมูลติวเตอร์
- หน้า Sign In, Sign Up และ Forgot Password
- หน้า Sign Up รองรับ Parent, Student และ Tutor Registration
- ฟอร์มสมัคร Tutor พร้อมข้อมูลประสบการณ์ วิชาที่สอน ราคา รูปแบบการสอน และ upload file
- หน้า Become a Tutor
- หน้า Account
- หน้า Contact, About, Blog, Pricing และ Policies
- Route background สำหรับหน้า auth ด้วย Card Swap animation
- Scroll reveal animation เมื่อเลื่อนถึงข้อมูล
- Responsive layout สำหรับ desktop, tablet และ mobile

## Project Structure

```text
tutor-finding/
└── frontend/
    ├── app/
    │   ├── assets/
    │   │   ├── animations/
    │   │   └── css/
    │   ├── components/
    │   ├── pages/
    │   │   └── auth/
    │   ├── plugins/
    │   ├── app.config.ts
    │   └── app.vue
    ├── public/
    ├── nuxt.config.ts
    └── package.json
```

## Getting Started

เข้าไปที่ frontend ก่อนรันคำสั่งทุกครั้ง

```powershell
cd C:\Users\Cable\Documents\code\tutor-finding\frontend
```

ติดตั้ง dependencies

```powershell
npm install
```

รัน development server

```powershell
npm run dev
```

จากนั้นเปิดเว็บตาม URL ที่แสดงใน terminal เช่น

```text
http://localhost:3000
```

## Available Scripts

รันจากโฟลเดอร์ `frontend`

```powershell
npm run dev
```

เปิด Nuxt development server

```powershell
npm run build
```

build โปรเจคสำหรับ production

```powershell
npm run preview
```

preview production build

```powershell
npm run lint
```

ตรวจ lint

```powershell
npm run typecheck
```

ตรวจ TypeScript และ Nuxt types

## Main Routes

- `/` หน้าแรก
- `/find-tutors` ค้นหาติวเตอร์
- `/tutors/:id` รายละเอียดติวเตอร์
- `/become-a-tutor` สมัครเป็นติวเตอร์
- `/auth/sign-in` เข้าสู่ระบบ
- `/auth/sign-up` สมัครสมาชิก
- `/auth/forgot-password` ลืมรหัสผ่าน
- `/account` บัญชีผู้ใช้
- `/about` เกี่ยวกับเรา
- `/contact` ติดต่อเรา
- `/blog` บทความและแหล่งเรียนรู้
- `/pricing` ราคาและค่าธรรมเนียม
- `/policies` เงื่อนไขและนโยบาย

## Development Notes

- ใช้ `app/app.config.ts` สำหรับตั้งค่า theme ของ Nuxt UI
- ใช้ `app/assets/css/main.css` สำหรับ global style, responsive behavior และ animation
- ใช้ `app/plugins/reveal.ts` สำหรับ directive `v-reveal`
- ใช้ `app/components/Card_Swap.vue` และ `app/components/AuthRouteBackground.vue` สำหรับพื้นหลังหน้า auth
- หน้า auth ใช้ parent route `app/pages/auth.vue` เพื่อให้ Sign In และ Sign Up ใช้พื้นหลังเดียวกัน และเปลี่ยนเฉพาะกรอบฟอร์ม

## MVP Scope

Phase 1 ของโปรเจคนี้เน้น:

- Authentication UI
- Tutor Listing
- Tutor Profile
- Tutor Registration
- Contact Form

Phase ถัดไปสามารถต่อยอดเป็น booking system, reviews, chat, payment, video lessons และ AI tutor matching ได้
