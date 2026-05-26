<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <div class="py-16 lg:py-24 bg-muted/30 min-h-screen">
    <UContainer>
      <header class="mb-16 max-w-[75ch]">
        <UBadge
          :label="tr('Policies', 'นโยบาย')"
          variant="subtle"
          class="rounded-full px-4 py-1"
        />
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
          {{ tr('Terms & Privacy', 'ข้อกำหนดและความเป็นส่วนตัว') }}
        </h1>
        <p class="mt-6 text-lg text-muted">
          {{ tr('Transparency and trust are at the heart of our platform. Please review how we protect your data and the terms of using our services.', 'ความโปร่งใสและความไว้วางใจคือหัวใจสำคัญของแพลตฟอร์มเรา โปรดอ่านวิธีที่เราปกป้องข้อมูลของคุณและข้อกำหนดการใช้งานบริการของเรา') }}
        </p>
      </header>

      <div class="space-y-12">
        <section
          v-reveal
          class="premium-card rounded-[2.5rem] bg-white p-8 sm:p-12"
        >
          <div class="max-w-[75ch]">
            <h2 class="text-2xl font-bold text-highlighted mb-6">
              {{ tr('Terms & Conditions', 'ข้อกำหนดและเงื่อนไข') }}
            </h2>
            <div class="space-y-6 text-muted leading-relaxed">
              <p>
                {{ tr('Placeholder policy content for account use, tutor verification, communication, bookings, reviews, and platform responsibilities.', 'เนื้อหานโยบายตัวอย่างสำหรับการใช้งานบัญชี การตรวจสอบติวเตอร์ การสื่อสาร การจอง รีวิว และความรับผิดชอบของแพลตฟอร์ม') }}
              </p>
              <p>
                {{ tr('Our platform connects students with qualified tutors. By using TeachThrough, you agree to engage respectfully and provide accurate information for the safety of our community.', 'แพลตฟอร์มของเราเชื่อมต่อนักเรียนกับติวเตอร์ที่มีคุณภาพ การใช้งาน TeachThrough แสดงว่าคุณตกลงที่จะสื่อสารอย่างสุภาพและให้ข้อมูลที่ถูกต้องเพื่อความปลอดภัยของชุมชนเรา') }}
              </p>
              <ul class="list-disc pl-5 space-y-3">
                <li>{{ tr('Users must be at least 13 years old or have parental consent.', 'ผู้ใช้งานต้องมีอายุอย่างน้อย 13 ปี หรือได้รับความยินยอมจากผู้ปกครอง') }}</li>
                <li>{{ tr('Tutors are independent contractors, not employees of TeachThrough.', 'ติวเตอร์เป็นผู้รับจ้างอิสระ ไม่ใช่พนักงานของ TeachThrough') }}</li>
                <li>{{ tr('We reserve the right to moderate reviews and profiles.', 'เราขอสงวนสิทธิ์ในการดูแลรีวิวและโปรไฟล์ให้เป็นไปตามมาตรฐาน') }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          v-reveal
          class="premium-card rounded-[2.5rem] bg-white p-8 sm:p-12"
          style="--reveal-delay: 100ms"
        >
          <div class="max-w-[75ch]">
            <h2 class="text-2xl font-bold text-highlighted mb-6">
              {{ tr('Privacy Policy', 'นโยบายความเป็นส่วนตัว') }}
            </h2>
            <div class="space-y-6 text-muted leading-relaxed">
              <p>
                {{ tr('Placeholder privacy content for profile data, contact requests, authentication, notifications, payments, and analytics.', 'เนื้อหาความเป็นส่วนตัวตัวอย่างสำหรับข้อมูลโปรไฟล์ คำขอติดต่อ การยืนยันตัวตน การแจ้งเตือน การชำระเงิน และการวิเคราะห์ข้อมูล') }}
              </p>
              <p>
                {{ tr('We take your privacy seriously. Data is encrypted and used only to facilitate the tutor-finding process and improve our platform experience.', 'เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ ข้อมูลจะถูกเข้ารหัสและใช้เพื่อช่วยในการค้นหาติวเตอร์และปรับปรุงประสบการณ์การใช้งานแพลตฟอร์มเท่านั้น') }}
              </p>
              <div class="rounded-2xl bg-brand-50 p-6 text-brand-900">
                <p class="font-bold mb-2">
                  {{ tr('What we collect:', 'ข้อมูลที่เราจัดเก็บ:') }}
                </p>
                <p class="text-sm">
                  {{ tr('Contact details, educational background, teaching preferences, and technical logs for security.', 'รายละเอียดการติดต่อ ประวัติการศึกษา ความต้องการในการสอน และข้อมูลทางเทคนิคเพื่อความปลอดภัย') }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </UContainer>
  </div>
</template>
