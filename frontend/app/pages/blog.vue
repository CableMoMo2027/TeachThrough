<script setup lang="ts">
const { tr } = useAppLocale()

const posts = computed(() => [
  [tr('How to choose a math tutor', 'วิธีเลือกติวเตอร์คณิตศาสตร์'), tr('A practical checklist for comparing teaching style, curriculum fit, and progress tracking.', 'เช็กลิสต์ง่าย ๆ สำหรับเปรียบเทียบสไตล์การสอน ความเหมาะสมกับหลักสูตร และการติดตามพัฒนาการ')],
  [tr('Preparing for exam season', 'เตรียมตัวช่วงสอบ'), tr('Build a weekly study rhythm with focused tutoring sessions and independent practice.', 'วางจังหวะอ่านหนังสือรายสัปดาห์ด้วยคาบติวที่มีเป้าหมายและการฝึกด้วยตัวเอง')],
  [tr('Online vs offline lessons', 'เรียนออนไลน์หรือออนไซต์ดี'), tr('How to decide which format works best for your learner and schedule.', 'วิธีเลือกรูปแบบการเรียนที่เหมาะกับผู้เรียนและตารางเวลาของครอบครัว')]
])
</script>

<template>
  <UContainer class="py-12">
    <UBadge
      :label="tr('Learning Resources', 'แหล่งเรียนรู้')"
      variant="subtle"
    />
    <h1 class="mt-4 text-4xl font-semibold tracking-tight text-highlighted">
      {{ tr('Blog / Learning Resources', 'บล็อก / แหล่งเรียนรู้') }}
    </h1>
    <div class="mt-8 grid gap-5 md:grid-cols-3">
      <UCard
        v-for="post in posts"
        :key="post[0]"
        v-reveal
      >
        <h2 class="text-xl font-semibold text-highlighted">
          {{ post[0] }}
        </h2>
        <p class="mt-3 text-muted">
          {{ post[1] }}
        </p>
        <UButton
          :label="tr('Read guide', 'อ่านคู่มือ')"
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-arrow-right"
          class="mt-4"
        />
      </UCard>
    </div>
  </UContainer>
</template>
