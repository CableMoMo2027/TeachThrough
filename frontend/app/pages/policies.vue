<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <UContainer class="py-12">
    <UBadge
      :label="tr('Policies', 'นโยบาย')"
      variant="subtle"
    />
    <h1 class="mt-4 text-4xl font-semibold tracking-tight text-highlighted">
      {{ tr('Terms & Privacy', 'ข้อกำหนดและความเป็นส่วนตัว') }}
    </h1>
    <div class="mt-8 grid gap-5">
      <UCard v-reveal>
        <h2 class="text-2xl font-semibold text-highlighted">
          {{ tr('Terms & Conditions', 'ข้อกำหนดและเงื่อนไข') }}
        </h2>
        <p class="mt-3 leading-7 text-muted">
          {{ tr('Placeholder policy content for account use, tutor verification, communication, bookings, reviews, and platform responsibilities.', 'เนื้อหานโยบายตัวอย่างสำหรับการใช้งานบัญชี การตรวจสอบติวเตอร์ การสื่อสาร การจอง รีวิว และความรับผิดชอบของแพลตฟอร์ม') }}
        </p>
      </UCard>
      <UCard v-reveal>
        <h2 class="text-2xl font-semibold text-highlighted">
          {{ tr('Privacy Policy', 'นโยบายความเป็นส่วนตัว') }}
        </h2>
        <p class="mt-3 leading-7 text-muted">
          {{ tr('Placeholder privacy content for profile data, contact requests, authentication, notifications, payments, and analytics.', 'เนื้อหาความเป็นส่วนตัวตัวอย่างสำหรับข้อมูลโปรไฟล์ คำขอติดต่อ การยืนยันตัวตน การแจ้งเตือน การชำระเงิน และการวิเคราะห์ข้อมูล') }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
