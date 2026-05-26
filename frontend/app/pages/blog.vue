<script setup lang="ts">
const { tr } = useAppLocale()

const posts = computed(() => [
  [tr('How to choose a math tutor', 'วิธีเลือกติวเตอร์คณิตศาสตร์'), tr('A practical checklist for comparing teaching style, curriculum fit, and progress tracking.', 'เช็กลิสต์ง่าย ๆ สำหรับเปรียบเทียบสไตล์การสอน ความเหมาะสมกับหลักสูตร และการติดตามพัฒนาการ')],
  [tr('Preparing for exam season', 'เตรียมตัวช่วงสอบ'), tr('Build a weekly study rhythm with focused tutoring sessions and independent practice.', 'วางจังหวะอ่านหนังสือรายสัปดาห์ด้วยคาบติวที่มีเป้าหมายและการฝึกด้วยตัวเอง')],
  [tr('Online vs offline lessons', 'เรียนออนไลน์หรือออนไซต์ดี'), tr('How to decide which format works best for your learner and schedule.', 'วิธีเลือกรูปแบบการเรียนที่เหมาะกับผู้เรียนและตารางเวลาของครอบครัว')]
])
</script>

<template>
  <div class="py-16 lg:py-24">
    <UContainer>
      <header class="mb-16">
        <UBadge
          :label="tr('Learning Resources', 'แหล่งเรียนรู้')"
          variant="subtle"
          class="rounded-full px-4 py-1"
        />
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl lg:text-6xl">
          {{ tr('Blog & Resources', 'บล็อกและแหล่งเรียนรู้') }}
        </h1>
        <p class="mt-6 max-w-[75ch] text-lg text-muted sm:text-xl">
          {{ tr('Expert advice on choosing tutors, exam preparation, and effective learning strategies for students and parents.', 'คำแนะนำจากผู้เชี่ยวชาญในการเลือกติวเตอร์ การเตรียมสอบ และกลยุทธ์การเรียนที่มีประสิทธิภาพสำหรับนักเรียนและผู้ปกครอง') }}
        </p>
      </header>

      <!-- Featured Post -->
      <div v-reveal class="mb-20 overflow-hidden rounded-[2.5rem] bg-white shadow-premium-lg ring-1 ring-slate-200 transition-all hover:shadow-premium-xl lg:flex">
        <div class="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
            class="h-full w-full object-cover lg:h-[500px]"
            alt="Featured post"
          >
        </div>
        <div class="flex flex-col justify-center p-8 sm:p-12 lg:w-1/2">
          <UBadge
            label="Featured"
            variant="soft"
            color="tertiary"
            class="mb-6 w-fit rounded-full"
          />
          <h2 class="text-3xl font-bold text-highlighted sm:text-4xl">
            {{ tr('The Future of Personalized Learning', 'อนาคตของการเรียนรู้แบบส่วนบุคคล') }}
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-muted">
            {{ tr('Discover how one-on-one tutoring is evolving with new digital tools and cognitive science to help students reach their full potential faster than ever.', 'ค้นพบว่าการสอนแบบตัวต่อตัวกำลังพัฒนาไปอย่างไรด้วยเครื่องมือดิจิทัลใหม่ๆ และวิทยาศาสตร์การเรียนรู้ เพื่อช่วยให้นักเรียนเข้าถึงศักยภาพสูงสุดได้เร็วกว่าที่เคย') }}
          </p>
          <div class="mt-10">
            <UButton
              :label="tr('Read featured story', 'อ่านเรื่องราวเด่น')"
              size="xl"
              class="rounded-full shadow-premium-md"
            />
          </div>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(post, index) in posts"
          :key="post[0]"
          v-reveal
          class="premium-card group flex flex-col overflow-hidden rounded-[2rem] bg-white transition-all hover:-translate-y-1"
          :style="`--reveal-delay: ${index * 100}ms`"
        >
          <div class="aspect-[16/10] overflow-hidden">
            <img
              :src="`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80&sig=${index}`"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Post thumbnail"
            >
          </div>
          <div class="flex flex-1 flex-col p-8">
            <h3 class="text-2xl font-bold text-highlighted group-hover:text-brand-600 transition-colors">
              {{ post[0] }}
            </h3>
            <p class="mt-4 flex-1 leading-relaxed text-muted">
              {{ post[1] }}
            </p>
            <div class="mt-8 flex items-center text-sm font-semibold text-brand-500">
              <span>{{ tr('Read guide', 'อ่านคู่มือ') }}</span>
              <UIcon name="i-lucide-arrow-right" class="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </article>
      </div>
    </UContainer>
  </div>
</template>
