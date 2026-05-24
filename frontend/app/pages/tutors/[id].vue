<script setup lang="ts">
const route = useRoute()
const { tr, pick } = useAppLocale()

const tutor = computed(() => ({
  name: route.params.id === 'arun-patel' ? 'Arun Patel' : route.params.id === 'sofia-rivera' ? 'Sofia Rivera' : 'Maya Chen',
  title: tr('Certified tutor for international curricula and exam preparation', 'ติวเตอร์รับรองสำหรับหลักสูตรนานาชาติและการเตรียมสอบ'),
  rating: '4.98',
  price: '$28/hr',
  location: tr('Bangkok / Online', 'กรุงเทพ / ออนไลน์'),
  sessions: tr('420 completed lessons', 'สอนจบแล้ว 420 คาบ'),
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  subjects: pick(['Mathematics', 'SAT', 'IB', 'Algebra', 'Calculus'], ['คณิตศาสตร์', 'SAT', 'IB', 'พีชคณิต', 'แคลคูลัส'])
}))

const schedule = computed(() => pick(
  ['Mon 18:00', 'Wed 19:30', 'Sat 10:00', 'Sun 14:00'],
  ['จันทร์ 18:00', 'พุธ 19:30', 'เสาร์ 10:00', 'อาทิตย์ 14:00']
))
</script>

<template>
  <UContainer class="py-10">
    <div class="grid gap-8 lg:grid-cols-[1fr_360px]">
      <main>
        <div class="grid gap-6 rounded-lg border border-default bg-elevated p-5 md:grid-cols-[220px_1fr]">
          <img
            :src="tutor.image"
            :alt="tutor.name"
            class="h-72 w-full rounded-lg object-cover md:h-full"
          >
          <div>
            <div class="flex flex-wrap gap-2">
              <UBadge
                :label="tr('Verified Tutor', 'ติวเตอร์ตรวจสอบแล้ว')"
                color="success"
                variant="subtle"
              />
              <UBadge
                :label="tr('Background checked', 'ตรวจสอบประวัติแล้ว')"
                color="neutral"
                variant="subtle"
              />
            </div>
            <h1 class="mt-4 text-4xl font-semibold tracking-tight text-highlighted">
              {{ tutor.name }}
            </h1>
            <p class="mt-2 text-lg text-muted">
              {{ tutor.title }}
            </p>
            <div class="mt-5 grid gap-3 text-sm text-muted sm:grid-cols-3">
              <span class="inline-flex items-center gap-2"><UIcon
                name="i-lucide-star"
                class="text-amber-500"
              />{{ tutor.rating }} {{ tr('rating', 'คะแนน') }}</span>
              <span class="inline-flex items-center gap-2"><UIcon name="i-lucide-map-pin" />{{ tutor.location }}</span>
              <span class="inline-flex items-center gap-2"><UIcon name="i-lucide-book-open" />{{ tutor.sessions }}</span>
            </div>
            <div class="mt-5 flex flex-wrap gap-2">
              <UBadge
                v-for="subject in tutor.subjects"
                :key="subject"
                :label="subject"
                color="primary"
                variant="subtle"
              />
            </div>
          </div>
        </div>

        <div class="mt-8 grid gap-6">
          <UCard v-reveal>
            <h2 class="text-2xl font-semibold text-highlighted">
              {{ tr('Experience', 'ประสบการณ์') }}
            </h2>
            <p class="mt-3 leading-7 text-muted">
              {{ tr('8 years of tutoring students across international and local school programs. Lessons are structured around diagnostic review, focused practice, and weekly progress notes for parents.', 'มีประสบการณ์สอน 8 ปี ทั้งหลักสูตรนานาชาติและหลักสูตรไทย บทเรียนออกแบบจากการประเมินพื้นฐาน ฝึกทำโจทย์เฉพาะจุด และสรุปพัฒนาการรายสัปดาห์ให้ผู้ปกครอง') }}
            </p>
          </UCard>

          <UCard v-reveal>
            <h2 class="text-2xl font-semibold text-highlighted">
              {{ tr('Reviews & Ratings', 'รีวิวและคะแนน') }}
            </h2>
            <div class="mt-5 grid gap-4">
              <div class="rounded-lg bg-muted p-4">
                <div class="flex items-center gap-2 text-amber-500">
                  <UIcon
                    v-for="star in 5"
                    :key="star"
                    name="i-lucide-star"
                    class="size-4"
                  />
                </div>
                <p class="mt-3 text-toned">
                  {{ tr('Clear explanations, consistent homework, and a calm teaching style. My daughter improved her confidence within a month.', 'อธิบายชัดเจน มีการบ้านต่อเนื่อง และสอนใจเย็น ลูกสาวมั่นใจขึ้นภายในหนึ่งเดือน') }}
                </p>
                <p class="mt-2 text-sm font-medium text-highlighted">
                  {{ tr('Parent of Grade 10 student', 'ผู้ปกครองของนักเรียน ม.4') }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </main>

      <aside class="h-fit rounded-lg border border-default bg-elevated p-5 shadow-sm">
        <p class="text-sm text-dimmed">
          {{ tr('Starting from', 'เริ่มต้น') }}
        </p>
        <p class="mt-1 text-3xl font-semibold text-highlighted">
          {{ tutor.price }}
        </p>
        <USeparator class="my-5" />
        <h3 class="font-semibold text-highlighted">
          {{ tr('Available Schedule', 'ตารางเวลาที่ว่าง') }}
        </h3>
        <div class="mt-4 grid grid-cols-2 gap-2">
          <UButton
            v-for="slot in schedule"
            :key="slot"
            :label="slot"
            color="neutral"
            variant="subtle"
          />
        </div>
        <div class="mt-5 grid gap-3">
          <UButton
            :label="tr('Book Session', 'จองเวลาเรียน')"
            icon="i-lucide-calendar-check"
            block
            size="lg"
          />
          <UButton
            :label="tr('Contact Tutor', 'ติดต่อครู')"
            icon="i-lucide-message-circle"
            color="neutral"
            variant="outline"
            block
            size="lg"
          />
        </div>
      </aside>
    </div>
  </UContainer>
</template>
