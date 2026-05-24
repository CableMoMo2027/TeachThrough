<script setup lang="ts">
const { tr } = useAppLocale()

const items = computed(() => [
  [tr('Saved Tutors', 'ติวเตอร์ที่บันทึกไว้'), tr('12 tutors saved for comparison', 'บันทึกติวเตอร์ 12 คนไว้เปรียบเทียบ'), 'i-lucide-heart'],
  [tr('Booking History', 'ประวัติการจอง'), tr('Upcoming and completed sessions', 'คาบเรียนที่กำลังจะถึงและเรียนจบแล้ว'), 'i-lucide-calendar-days'],
  [tr('Messages', 'ข้อความ'), tr('Tutor conversations and requests', 'บทสนทนาและคำขอติดต่อกับติวเตอร์'), 'i-lucide-message-circle'],
  [tr('Payment Methods', 'วิธีชำระเงิน'), tr('Cards and receipts', 'บัตรและใบเสร็จ'), 'i-lucide-credit-card'],
  [tr('Notifications', 'การแจ้งเตือน'), tr('Booking, review, and tutor updates', 'อัปเดตการจอง รีวิว และติวเตอร์'), 'i-lucide-bell'],
  [tr('Settings', 'ตั้งค่า'), tr('Profile, password, and preferences', 'โปรไฟล์ รหัสผ่าน และการตั้งค่า'), 'i-lucide-settings']
])
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-8">
      <UBadge
        :label="tr('Dashboard / Account', 'แดชบอร์ด / บัญชี')"
        variant="subtle"
      />
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-highlighted">
        {{ tr('My Account', 'บัญชีของฉัน') }}
      </h1>
      <p class="mt-3 text-muted">
        {{ tr('A student dashboard shell for saved tutors, bookings, messages, notifications, payments, and settings.', 'หน้าแดชบอร์ดนักเรียนสำหรับติวเตอร์ที่บันทึก การจอง ข้อความ การแจ้งเตือน การชำระเงิน และการตั้งค่า') }}
      </p>
    </div>

    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <UCard
        v-for="item in items"
        :key="item[0]"
        v-reveal
      >
        <UIcon
          :name="item[2]"
          class="size-7 text-primary"
        />
        <h2 class="mt-4 text-xl font-semibold text-highlighted">
          {{ item[0] }}
        </h2>
        <p class="mt-2 text-muted">
          {{ item[1] }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
