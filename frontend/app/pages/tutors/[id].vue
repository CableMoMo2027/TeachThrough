<script setup lang="ts">
const route = useRoute()
const { tr, pick } = useAppLocale()

const mouseX = ref(50)
const mouseY = ref(50)

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY, currentTarget } = e
  const { left, top, width, height } = (currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = ((clientX - left) / width) * 100
  mouseY.value = ((clientY - top) / height) * 100
}

const tutor = computed(() => ({
  name: route.params.id === 'arun-patel' ? 'Arun Patel' : route.params.id === 'sofia-rivera' ? 'Sofia Rivera' : 'Maya Chen',
  title: tr('Certified tutor for international curricula and exam preparation', 'ติวเตอร์รับรองสำหรับหลักสูตรนานาชาติและการเตรียมสอบ'),
  rating: '4.98',
  reviews: '154',
  price: '$28',
  location: tr('Bangkok / Online', 'กรุงเทพ / ออนไลน์'),
  sessions: tr('420 lessons', 'สอนแล้ว 420 ครั้ง'),
  response: tr('Replies in 5 mins', 'ตอบกลับใน 5 นาที'),
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  subjects: pick(['Mathematics', 'SAT', 'IB', 'Algebra', 'Calculus'], ['คณิตศาสตร์', 'SAT', 'IB', 'พีชคณิต', 'แคลคูลัส']),
  about: tr('8 years of tutoring students across international and local school programs. Lessons are structured around diagnostic review, focused practice, and weekly progress notes for parents.', 'มีประสบการณ์สอน 8 ปี ทั้งหลักสูตรนานาชาติและหลักสูตรไทย บทเรียนออกแบบจากการประเมินพื้นฐาน ฝึกทำโจทย์เฉพาะจุด และสรุปพัฒนาการรายสัปดาห์ให้ผู้ปกครอง')
}))

const schedule = computed(() => pick(
  ['Mon 18:00', 'Wed 19:30', 'Sat 10:00', 'Sun 14:00'],
  ['จันทร์ 18:00', 'พุธ 19:30', 'เสาร์ 10:00', 'อาทิตย์ 14:00']
))
</script>

<template>
  <div class="min-h-screen bg-bg-muted/30 pb-20 pt-10">
    <UContainer>
      <div class="grid gap-10 lg:grid-cols-[1fr_380px]">
        <!-- Main Content -->
        <main class="space-y-8">
          <!-- Profile Header Card -->
          <section
            v-reveal
            class="premium-card light-aware-card overflow-hidden rounded-[2.5rem] bg-white"
            :style="{ '--mouse-x': `${mouseX}%`, '--mouse-y': `${mouseY}%` }"
            @mousemove="handleMouseMove"
          >
            <div class="grid md:grid-cols-[280px_1fr]">
              <div class="relative aspect-square md:aspect-auto">
                <img
                  :src="tutor.image"
                  :alt="tutor.name"
                  class="size-full object-cover"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
              </div>

              <div class="flex flex-col p-8 lg:p-10">
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    :label="tr('Verified Specialist', 'ผู้เชี่ยวชาญตรวจสอบแล้ว')"
                    variant="subtle"
                    class="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-brand-600 ring-1 ring-brand-100"
                  />
                  <UBadge
                    :label="tr('Top Rated', 'คะแนนสูงสุด')"
                    variant="subtle"
                    class="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-amber-600 ring-1 ring-amber-100"
                  />
                </div>

                <h1 class="mt-6 text-4xl font-extrabold tracking-tight text-highlighted lg:text-5xl">
                  {{ tutor.name }}
                </h1>
                <p class="mt-3 text-lg font-medium leading-relaxed text-toned">
                  {{ tutor.title }}
                </p>

                <div class="mt-8 grid grid-cols-2 gap-6 border-t border-border-muted pt-8 sm:grid-cols-4">
                  <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-widest text-dimmed">
                      {{ tr('Rating', 'คะแนน') }}
                    </p>
                    <div class="flex items-center gap-1.5 font-bold text-highlighted">
                      <UIcon
                        name="i-lucide-star"
                        class="size-4 text-amber-500 fill-current"
                      />
                      <span>{{ tutor.rating }}</span>
                      <span class="text-xs font-medium text-dimmed">({{ tutor.reviews }})</span>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-widest text-dimmed">
                      {{ tr('Lessons', 'การสอน') }}
                    </p>
                    <div class="flex items-center gap-1.5 font-bold text-highlighted">
                      <UIcon
                        name="i-lucide-graduation-cap"
                        class="size-4 text-brand-500"
                      />
                      <span>{{ tutor.sessions }}</span>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-widest text-dimmed">
                      {{ tr('Location', 'สถานที่') }}
                    </p>
                    <div class="flex items-center gap-1.5 font-bold text-highlighted">
                      <UIcon
                        name="i-lucide-map-pin"
                        class="size-4 text-brand-500"
                      />
                      <span class="truncate">{{ tutor.location }}</span>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-widest text-dimmed">
                      {{ tr('Response', 'การตอบกลับ') }}
                    </p>
                    <div class="flex items-center gap-1.5 font-bold text-highlighted">
                      <UIcon
                        name="i-lucide-clock"
                        class="size-4 text-brand-500"
                      />
                      <span class="truncate">{{ tutor.response }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Expertise & Bio -->
          <div class="grid gap-8 md:grid-cols-2">
            <section
              v-reveal="{ delay: 100 }"
              class="premium-card light-aware-card rounded-[2.5rem] bg-white p-8 lg:p-10"
              :style="{ '--mouse-x': `${mouseX}%`, '--mouse-y': `${mouseY}%` }"
              @mousemove="handleMouseMove"
            >
              <h2 class="text-2xl font-extrabold tracking-tight text-highlighted">
                {{ tr('Expertise', 'ความเชี่ยวชาญ') }}
              </h2>
              <div class="mt-6 flex flex-wrap gap-2">
                <UBadge
                  v-for="subject in tutor.subjects"
                  :key="subject"
                  :label="subject"
                  variant="subtle"
                  size="md"
                  class="rounded-full bg-brand-50 px-4 py-1.5 font-bold text-brand-600 ring-1 ring-brand-100"
                />
              </div>
              <div class="mt-8 space-y-4">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="flex items-center gap-3"
                >
                  <div class="grid size-6 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <UIcon
                      name="i-lucide-check"
                      class="size-3.5"
                    />
                  </div>
                  <span class="text-sm font-medium text-toned">{{ tr('Advanced curriculum mastery', 'เชี่ยวชาญหลักสูตรระดับสูง') }}</span>
                </div>
              </div>
            </section>

            <section
              v-reveal="{ delay: 200 }"
              class="premium-card light-aware-card rounded-[2.5rem] bg-white p-8 lg:p-10"
              :style="{ '--mouse-x': `${mouseX}%`, '--mouse-y': `${mouseY}%` }"
              @mousemove="handleMouseMove"
            >
              <h2 class="text-2xl font-extrabold tracking-tight text-highlighted">
                {{ tr('About Me', 'เกี่ยวกับฉัน') }}
              </h2>
              <p class="mt-6 text-base font-medium leading-relaxed text-muted">
                {{ tutor.about }}
              </p>
              <UButton
                :label="tr('Read more', 'อ่านเพิ่มเติม')"
                variant="link"
                color="neutral"
                class="mt-4 p-0 font-bold text-brand-600"
              />
            </section>
          </div>

          <!-- Reviews Section -->
          <section
            v-reveal="{ delay: 300 }"
            class="premium-card rounded-[2.5rem] bg-white p-8 lg:p-10"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-extrabold tracking-tight text-highlighted">
                {{ tr('Student Feedback', 'รีวิวจากนักเรียน') }}
              </h2>
              <UButton
                :label="tr('View All', 'ดูทั้งหมด')"
                variant="ghost"
                color="neutral"
                class="rounded-full font-bold"
              />
            </div>

            <div class="mt-8 grid gap-6">
              <div
                v-for="i in 2"
                :key="i"
                class="rounded-[2rem] bg-bg-muted/40 p-6 ring-1 ring-border-muted transition-all hover:bg-white hover:shadow-premium"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-accent-100 ring-2 ring-white" />
                    <div>
                      <p class="text-sm font-bold text-highlighted">
                        Phawin R.
                      </p>
                      <p class="text-[11px] font-medium text-dimmed">
                        Grade 11 Student
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-0.5 text-amber-500">
                    <UIcon
                      v-for="s in 5"
                      :key="s"
                      name="i-lucide-star"
                      class="size-3.5 fill-current"
                    />
                  </div>
                </div>
                <p class="mt-4 text-sm font-medium leading-relaxed text-toned">
                  {{ tr('Clear explanations, consistent homework, and a calm teaching style. My daughter improved her confidence within a month.', 'อธิบายชัดเจน มีการบ้านต่อเนื่อง และสอนใจเย็น ลูกสาวมั่นใจขึ้นภายในหนึ่งเดือน') }}
                </p>
              </div>
            </div>
          </section>
        </main>

        <!-- Sidebar / Booking Card -->
        <aside class="space-y-6">
          <section
            v-reveal="{ delay: 400 }"
            class="glass-premium sticky top-24 rounded-[2.5rem] p-8 shadow-premium-xl lg:p-10"
          >
            <div class="flex items-end justify-between">
              <p class="text-sm font-black uppercase tracking-widest text-dimmed">
                {{ tr('Starting at', 'เริ่มต้น') }}
              </p>
              <div class="text-right">
                <p class="text-4xl font-black text-brand-600">
                  {{ tutor.price }}<span class="text-lg font-medium text-dimmed">/hr</span>
                </p>
              </div>
            </div>

            <div class="mt-10 space-y-6">
              <div>
                <h3 class="text-xs font-black uppercase tracking-widest text-dimmed">
                  {{ tr('Availability', 'ตารางเวลา') }}
                </h3>
                <div class="mt-4 grid grid-cols-2 gap-2">
                  <button
                    v-for="slot in schedule"
                    :key="slot"
                    class="rounded-2xl border border-border-muted bg-white/50 px-3 py-2.5 text-[11px] font-bold text-toned transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 active:scale-95"
                  >
                    {{ slot }}
                  </button>
                </div>
              </div>

              <div class="space-y-3">
                <UButton
                  :label="tr('Reserve a Session', 'จองเวลาเรียน')"
                  size="xl"
                  block
                  class="rounded-full font-bold shadow-premium-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                />
                <UButton
                  :label="tr('Message Tutor', 'ติดต่อสอบถาม')"
                  variant="outline"
                  color="neutral"
                  size="xl"
                  block
                  class="rounded-full font-bold border-border-muted text-toned hover:bg-white/40"
                />
              </div>

              <p class="text-center text-[11px] font-medium text-dimmed">
                {{ tr('Free 15-min consultation available', 'มีช่วงปรึกษาฟรี 15 นาที') }}
              </p>
            </div>

            <div class="mt-8 rounded-2xl bg-brand-50/50 p-4 text-center ring-1 ring-brand-100/50">
              <div class="flex items-center justify-center gap-2 text-brand-700">
                <UIcon
                  name="i-lucide-shield-check"
                  class="size-4"
                />
                <span class="text-[11px] font-black uppercase tracking-widest">{{ tr('Secure payment', 'ชำระเงินปลอดภัย') }}</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
