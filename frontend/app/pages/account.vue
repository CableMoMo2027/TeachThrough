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
  <div class="bg-muted/30 min-h-screen py-16 lg:py-24">
    <UContainer>
      <header class="mb-12 max-w-[75ch]">
        <UBadge
          :label="tr('Dashboard / Account', 'แดชบอร์ด / บัญชี')"
          variant="subtle"
          class="rounded-full px-4 py-1"
        />
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
          {{ tr('My Account', 'บัญชีของฉัน') }}
        </h1>
        <p class="mt-4 text-lg text-muted">
          {{ tr('Manage your preferences, view your saved tutors, and keep track of your learning journey.', 'จัดการการตั้งค่า ดูติวเตอร์ที่บันทึกไว้ และติดตามเส้นทางการเรียนรู้ของคุณ') }}
        </p>
      </header>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="(item, index) in items"
          :key="item[0]"
          v-reveal
          :to="'#'"
          class="premium-card group relative overflow-hidden rounded-[2rem] bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-premium-xl"
          :style="`--reveal-delay: ${index * 50}ms`"
        >
          <div class="flex flex-col h-full">
            <div class="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
              <UIcon
                :name="item[2]"
                class="size-6"
              />
            </div>
            <h2 class="text-xl font-bold text-highlighted group-hover:text-brand-600 transition-colors">
              {{ item[0] }}
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ item[1] }}
            </p>

            <div class="mt-8 flex items-center text-sm font-semibold text-brand-500 opacity-0 transition-all group-hover:opacity-100">
              <span>{{ tr('Manage', 'จัดการ') }}</span>
              <UIcon
                name="i-lucide-chevron-right"
                class="ml-1 size-4"
              />
            </div>
          </div>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
