<script setup lang="ts">
const { tr, pick } = useAppLocale()

const topicItems = computed(() => pick(
  ['I am a parent/student', 'I am a tutor', 'Partnership', 'Support'],
  ['ฉันเป็นผู้ปกครอง/นักเรียน', 'ฉันเป็นติวเตอร์', 'พาร์ตเนอร์', 'ฝ่ายสนับสนุน']
))
</script>

<template>
  <UContainer class="py-12">
    <div class="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <UBadge
          :label="tr('Support', 'ฝ่ายสนับสนุน')"
          variant="subtle"
        />
        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-highlighted">
          {{ tr('Contact Us', 'ติดต่อเรา') }}
        </h1>
        <p class="mt-4 text-lg leading-8 text-muted">
          {{ tr('Questions about tutor verification, booking, pricing, or parent support? Send a message and the team will follow up.', 'มีคำถามเกี่ยวกับการตรวจสอบติวเตอร์ การจอง ราคา หรือการช่วยเหลือผู้ปกครอง? ส่งข้อความมาได้ ทีมงานจะติดต่อกลับ') }}
        </p>
        <div class="mt-8 grid gap-4">
          <div class="flex gap-3">
            <UIcon
              name="i-lucide-mail"
              class="size-5 text-primary"
            />
            <span class="text-toned">support@tutorly.test</span>
          </div>
          <div class="flex gap-3">
            <UIcon
              name="i-lucide-clock"
              class="size-5 text-primary"
            />
            <span class="text-toned">{{ tr('Mon-Fri, 9:00-18:00', 'จันทร์-ศุกร์ 9:00-18:00') }}</span>
          </div>
          <div class="flex gap-3">
            <UIcon
              name="i-lucide-message-circle"
              class="size-5 text-primary"
            />
            <span class="text-toned">{{ tr('Facebook, Instagram, and Line support ready', 'รองรับการติดต่อผ่าน Facebook, Instagram และ Line') }}</span>
          </div>
        </div>
      </div>

      <UCard v-reveal>
        <template #header>
          <h2 class="text-2xl font-semibold text-highlighted">
            {{ tr('Contact Form', 'แบบฟอร์มติดต่อ') }}
          </h2>
        </template>
        <div class="grid gap-4">
          <UInput :placeholder="tr('Full name', 'ชื่อ-นามสกุล')" />
          <UInput
            icon="i-lucide-mail"
            :placeholder="tr('Email address', 'อีเมล')"
          />
          <USelect
            :items="topicItems"
            :placeholder="tr('Topic', 'หัวข้อ')"
          />
          <UTextarea
            :placeholder="tr('How can we help?', 'ให้เราช่วยเรื่องอะไร?')"
            :rows="6"
          />
          <UButton
            :label="tr('Send Message', 'ส่งข้อความ')"
            icon="i-lucide-send"
            size="lg"
          />
        </div>
      </UCard>
    </div>

    <div class="mt-12 rounded-lg border border-default bg-muted p-6">
      <h2 class="text-2xl font-semibold text-highlighted">
        {{ tr('FAQ', 'คำถามที่พบบ่อย') }}
      </h2>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <p class="font-medium text-highlighted">
            {{ tr('Are tutors verified?', 'ติวเตอร์ผ่านการตรวจสอบไหม?') }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ tr('Tutor profiles are reviewed before appearing in search.', 'โปรไฟล์ติวเตอร์จะถูกตรวจสอบก่อนแสดงในหน้าค้นหา') }}
          </p>
        </div>
        <div>
          <p class="font-medium text-highlighted">
            {{ tr('Can sessions be online?', 'เรียนออนไลน์ได้ไหม?') }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ tr('Tutors can offer online, offline, or hybrid lessons.', 'ติวเตอร์สามารถเปิดสอนออนไลน์ ออนไซต์ หรือแบบผสมผสานได้') }}
          </p>
        </div>
        <div>
          <p class="font-medium text-highlighted">
            {{ tr('Is booking included?', 'มีระบบจองแล้วหรือยัง?') }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ tr('Booking is planned for Phase 2. The MVP focuses on contact requests.', 'ระบบจองอยู่ในแผน Phase 2 โดย MVP นี้เน้นการส่งคำขอติดต่อก่อน') }}
          </p>
        </div>
      </div>
    </div>
  </UContainer>
</template>
