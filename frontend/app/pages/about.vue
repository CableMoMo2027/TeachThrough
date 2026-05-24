<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <UContainer class="py-12">
    <div class="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
      <div>
        <UBadge
          :label="tr('About Us', 'เกี่ยวกับเรา')"
          variant="subtle"
        />
        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-highlighted">
          {{ tr('A calmer way to choose the right tutor.', 'วิธีเลือกติวเตอร์ที่ใช่ได้ง่ายและสบายใจกว่าเดิม') }}
        </h1>
        <p class="mt-5 text-lg leading-8 text-muted">
          {{ tr('Tutorly is designed for parents and learners who need trusted tutor information in one place: credentials, teaching style, reviews, price, format, and schedule.', 'Tutorly ออกแบบมาสำหรับผู้ปกครองและผู้เรียนที่ต้องการข้อมูลติวเตอร์ที่เชื่อถือได้ในที่เดียว ทั้งคุณวุฒิ สไตล์การสอน รีวิว ราคา รูปแบบการเรียน และตารางเวลา') }}
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
        :alt="tr('Students studying together', 'นักเรียนกำลังเรียนด้วยกัน')"
        class="h-96 w-full rounded-lg object-cover"
      >
    </div>

    <div class="mt-14 grid gap-5 md:grid-cols-3">
      <UCard v-reveal>
        <UIcon
          name="i-lucide-target"
          class="size-7 text-primary"
        />
        <h2 class="mt-4 text-xl font-semibold text-highlighted">
          {{ tr('Mission', 'พันธกิจ') }}
        </h2>
        <p class="mt-2 text-muted">
          {{ tr('Make tutor discovery transparent, efficient, and less stressful for families.', 'ทำให้การค้นหาติวเตอร์โปร่งใส รวดเร็ว และลดความกังวลสำหรับครอบครัว') }}
        </p>
      </UCard>
      <UCard v-reveal>
        <UIcon
          name="i-lucide-eye"
          class="size-7 text-primary"
        />
        <h2 class="mt-4 text-xl font-semibold text-highlighted">
          {{ tr('Vision', 'วิสัยทัศน์') }}
        </h2>
        <p class="mt-2 text-muted">
          {{ tr('Help every student access the right support at the right moment.', 'ช่วยให้นักเรียนทุกคนเข้าถึงการสนับสนุนที่เหมาะสมในเวลาที่ต้องการ') }}
        </p>
      </UCard>
      <UCard v-reveal>
        <UIcon
          name="i-lucide-shield-check"
          class="size-7 text-primary"
        />
        <h2 class="mt-4 text-xl font-semibold text-highlighted">
          {{ tr('Trust', 'ความน่าเชื่อถือ') }}
        </h2>
        <p class="mt-2 text-muted">
          {{ tr('Verified profiles, moderated reviews, and clear communication workflows.', 'โปรไฟล์ที่ผ่านการตรวจสอบ รีวิวที่ดูแลคุณภาพ และขั้นตอนการสื่อสารที่ชัดเจน') }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
