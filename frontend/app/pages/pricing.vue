<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <UContainer class="py-12">
    <UBadge
      :label="tr('Pricing / Fees', 'ราคา / ค่าธรรมเนียม')"
      variant="subtle"
    />
    <h1 class="mt-4 text-4xl font-semibold tracking-tight text-highlighted">
      {{ tr('Simple, transparent platform fees.', 'ค่าธรรมเนียมแพลตฟอร์มที่เรียบง่ายและโปร่งใส') }}
    </h1>
    <div class="mt-8 grid gap-5 md:grid-cols-2">
      <UCard v-reveal>
        <h2 class="text-2xl font-semibold text-highlighted">
          {{ tr('Students & Parents', 'นักเรียนและผู้ปกครอง') }}
        </h2>
        <p class="mt-3 text-muted">
          {{ tr('Browse tutor profiles for free. Booking and payment fees can be enabled in Phase 2.', 'ค้นหาและดูโปรไฟล์ติวเตอร์ได้ฟรี ค่าธรรมเนียมการจองและชำระเงินสามารถเปิดใช้งานใน Phase 2') }}
        </p>
      </UCard>
      <UCard v-reveal>
        <h2 class="text-2xl font-semibold text-highlighted">
          {{ tr('Tutors', 'ติวเตอร์') }}
        </h2>
        <p class="mt-3 text-muted">
          {{ tr('Publish a verified profile. Commission or subscription models can be configured later.', 'เผยแพร่โปรไฟล์ที่ผ่านการตรวจสอบ โดยสามารถตั้งค่าคอมมิชชันหรือแพ็กเกจสมาชิกได้ภายหลัง') }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
