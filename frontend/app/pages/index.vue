<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { tr, pick } = useAppLocale()

const mouseX = ref(50)
const mouseY = ref(50)

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY, currentTarget } = e
  const { left, top, width, height } = (currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = ((clientX - left) / width) * 100
  mouseY.value = ((clientY - top) / height) * 100
}

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)

    // Hero Parallax
    gsap.to('.hero-parallax-1', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.edtech-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    gsap.to('.hero-parallax-2', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.edtech-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  }
})

const subjects = computed(() => pick(
  ['Mathematics', 'English', 'Science', 'Thai', 'Coding', 'Exam Prep'],
  ['คณิตศาสตร์', 'ภาษาอังกฤษ', 'วิทยาศาสตร์', 'ภาษาไทย', 'เขียนโปรแกรม', 'เตรียมสอบ']
))

const learningCards = computed(() => [
  {
    title: tr('Verified Tutors', 'ติวเตอร์ผ่านการตรวจสอบ'),
    description: tr('Profiles include teaching background, ratings, subjects, and parent-ready details.', 'โปรไฟล์มีประวัติการสอน คะแนนรีวิว วิชาที่สอน และข้อมูลที่ผู้ปกครองใช้ตัดสินใจได้ง่าย'),
    icon: 'i-lucide-badge-check',
    accent: 'bg-brand-50 text-brand-600',
    active: true
  },
  {
    title: tr('Learning Goals', 'เป้าหมายการเรียน'),
    description: tr('Match tutors by subject, grade level, exam plan, learning style, and schedule.', 'จับคู่ติวเตอร์ตามวิชา ระดับชั้น แผนสอบ สไตล์การเรียน และเวลาที่สะดวก'),
    icon: 'i-lucide-graduation-cap',
    accent: 'bg-accent-50 text-accent-600',
    active: false
  },
  {
    title: tr('Parent Reviews', 'รีวิวจากผู้ปกครอง'),
    description: tr('Compare tutor quality with clear feedback, ratings, and session experience.', 'เปรียบเทียบคุณภาพติวเตอร์จากรีวิว คะแนน และประสบการณ์หลังเรียนจริง'),
    icon: 'i-lucide-star',
    accent: 'bg-amber-50 text-amber-600',
    active: false
  },
  {
    title: tr('Flexible Sessions', 'เวลาเรียนยืดหยุ่น'),
    description: tr('Choose online, offline, or hybrid lessons with availability that fits your week.', 'เลือกเรียนออนไลน์ ออนไซต์ หรือผสมผสาน พร้อมตารางเวลาที่เข้ากับชีวิตประจำสัปดาห์'),
    icon: 'i-lucide-calendar-check',
    accent: 'bg-trust-50 text-trust-600',
    active: false
  },
  {
    title: tr('Friendly Support', 'ดูแลง่ายทุกขั้นตอน'),
    description: tr('A calm path from search to contact, designed for busy families and learners.', 'เส้นทางจากการค้นหาถึงการติดต่อที่เรียบง่าย ออกแบบสำหรับครอบครัวและผู้เรียนที่มีเวลาจำกัด'),
    icon: 'i-lucide-messages-square',
    accent: 'bg-emerald-50 text-emerald-600',
    active: false
  }
])

const featuredTutors = [
  {
    name: 'Maya Chen',
    role: 'IB Math and SAT Tutor',
    rating: '4.98',
    price: '$28',
    tags: ['Math', 'SAT', 'Online'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80'
  },
  {
    name: 'Arun Patel',
    role: 'Physics and Engineering Mentor',
    rating: '4.95',
    price: '$32',
    tags: ['Physics', 'A-Level', 'Hybrid'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80'
  },
  {
    name: 'Sofia Rivera',
    role: 'English Writing Coach',
    rating: '4.97',
    price: '$24',
    tags: ['English', 'IELTS', 'Online'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=480&q=80'
  }
]

const levels = computed(() => pick(
  ['Primary', 'Middle School', 'High School', 'University'],
  ['ประถม', 'มัธยมต้น', 'มัธยมปลาย', 'มหาวิทยาลัย']
))

const steps = computed(() => [
  [tr('Search', 'ค้นหา'), tr('Filter tutors by subject, level, location, budget, and teaching format.', 'กรองติวเตอร์ตามวิชา ระดับชั้น พื้นที่ งบประมาณ และรูปแบบการสอน'), 'i-lucide-search'],
  [tr('Compare', 'เปรียบเทียบ'), tr('Review profiles, credentials, experience, schedules, and parent feedback.', 'ดูโปรไฟล์ คุณวุฒิ ประสบการณ์ ตารางเวลา และรีวิวจากผู้ปกครอง'), 'i-lucide-list-checks'],
  [tr('Connect', 'ติดต่อ'), tr('Send a request, book a session, or message the tutor directly.', 'ส่งคำขอ จองเวลาเรียน หรือติดต่อครูโดยตรงได้ทันที'), 'i-lucide-send']
])
</script>

<template>
  <div class="overflow-hidden bg-bg">
    <!-- Hero Section -->
    <section
      class="edtech-hero relative overflow-hidden border-b border-default pb-20 pt-16 lg:pb-32 lg:pt-24"
      :style="{ '--mouse-x': `${mouseX}%`, '--mouse-y': `${mouseY}%` }"
      @mousemove="handleMouseMove"
    >
      <UContainer class="relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="flex flex-col items-start">
          <UBadge
            v-reveal
            :label="tr('Premium EdTech Experience', 'ประสบการณ์เรียนรู้ระดับพรีเมียม')"
            variant="subtle"
            size="md"
            icon="i-lucide-sparkles"
            class="mb-8 rounded-full bg-white/80 px-4 py-1.5 font-bold text-brand-600 shadow-premium-sm ring-1 ring-brand-100"
          />
          <h1
            v-reveal
            class="text-balance text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl lg:text-6xl lg:leading-[1.15]"
          >
            <BlurText
              :text="tr('The art of finding', 'ศิลปะแห่งการค้นหา')"
              :delay="0.1"
              :animate-on-scroll="false"
            />
            <br>
            <BlurText
              :text="tr('the perfect tutor.', 'ติวเตอร์ที่สมบูรณ์แบบ')"
              class-name="text-brand-600"
              :delay="0.3"
              :animate-on-scroll="false"
            />
          </h1>
          <p
            v-reveal="{ delay: 500 }"
            class="mt-8 max-w-xl text-lg font-medium leading-relaxed text-muted sm:text-xl"
          >
            {{ tr('Tutorly redefines private education with a calm, transparent, and professional journey tailored for exceptional results.', 'Tutorly นิยามการเรียนพิเศษใหม่ ด้วยเส้นทางที่เรียบง่าย โปร่งใส และเป็นมืออาชีพ เพื่อผลลัพธ์ที่ยอดเยี่ยม') }}
          </p>

          <!-- Floating Search Bar - Glassmorphism 2.0 -->
          <div
            v-reveal="{ delay: 700 }"
            class="glass-premium mt-12 w-full max-w-3xl rounded-[2.5rem] p-4 shadow-premium-xl transition-all duration-700 hover:shadow-2xl hover:scale-[1.01]"
          >
            <div class="grid gap-3 lg:grid-cols-[1.4fr_1fr_0.8fr_auto]">
              <UInput
                icon="i-lucide-search"
                class="premium-input"
                :placeholder="tr('What do you want to learn?', 'คุณต้องการเรียนอะไร?')"
                size="xl"
              />
              <UInput
                icon="i-lucide-map-pin"
                class="premium-input"
                :placeholder="tr('Location or online', 'พื้นที่หรือออนไลน์')"
                size="xl"
              />
              <USelect
                class="premium-input"
                :items="levels"
                :placeholder="tr('Level', 'ระดับชั้น')"
                size="xl"
              />
              <UButton
                to="/find-tutors"
                :label="tr('Find Tutors', 'ค้นหาติวเตอร์')"
                size="xl"
                class="justify-center rounded-full px-8 font-bold shadow-premium hover:scale-[1.05] active:scale-[0.95] transition-transform"
              />
            </div>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <span class="text-xs font-bold uppercase tracking-widest text-dimmed">{{ tr('Popular', 'ยอดนิยม') }}:</span>
            <UButton
              v-for="subject in subjects"
              :key="subject"
              :label="subject"
              color="neutral"
              variant="subtle"
              size="sm"
              class="rounded-full bg-white/60 font-semibold text-toned ring-1 ring-border-muted transition-all hover:bg-brand-50 hover:text-brand-600 hover:ring-brand-100"
              to="/find-tutors"
            />
          </div>
        </div>

        <!-- Visual Hero Elements - Parallax Layers -->
        <div
          v-reveal="{ delay: 800 }"
          class="relative hidden lg:block"
        >
          <div class="relative grid gap-6 sm:grid-cols-2">
            <div class="premium-card hero-parallax-1 light-aware-card translate-y-8 rounded-[2.5rem] bg-white p-6 shadow-premium-xl">
              <div class="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=740&q=80"
                  alt="Tutor"
                  class="size-20 rounded-[1.5rem] object-cover ring-4 ring-brand-50"
                >
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider text-dimmed">
                    {{ tr('Top Match', 'แนะนำสัปดาห์นี้') }}
                  </p>
                  <p class="text-xl font-bold text-highlighted">
                    Calculus BC
                  </p>
                </div>
              </div>
              <div class="mt-6 grid grid-cols-3 gap-2 text-center">
                <div class="rounded-xl bg-brand-50 p-2.5 ring-1 ring-brand-100">
                  <p class="text-xl font-black text-brand-600">
                    <CountUp
                      :to="98"
                      suffix="%"
                    />
                  </p>
                  <p class="text-[9px] font-bold uppercase tracking-widest text-brand-400">
                    Match
                  </p>
                </div>
                <div class="rounded-xl bg-accent-50 p-2.5 ring-1 ring-accent-100">
                  <p class="text-xl font-black text-accent-600">
                    <CountUp
                      :to="4.9"
                      :precision="1"
                    />
                  </p>
                  <p class="text-[9px] font-bold uppercase tracking-widest text-accent-400">
                    Rating
                  </p>
                </div>
                <div class="rounded-xl bg-amber-50 p-2.5 ring-1 ring-amber-100">
                  <p class="text-xl font-black text-amber-600">
                    <CountUp :to="12" />
                  </p>
                  <p class="text-[9px] font-bold uppercase tracking-widest text-amber-400">
                    Slots
                  </p>
                </div>
              </div>
            </div>

            <div class="grid gap-6 hero-parallax-2">
              <div class="premium-card light-aware-card rounded-[2.5rem] bg-white p-6 shadow-premium-lg transition-all hover:scale-[1.03]">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-dimmed">
                      Verified Tutors
                    </p>
                    <p class="text-3xl font-black text-highlighted">
                      <CountUp
                        :to="1240"
                        suffix="+"
                      />
                    </p>
                  </div>
                  <div class="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <UIcon
                      name="i-lucide-shield-check"
                      class="size-7"
                    />
                  </div>
                </div>
              </div>

              <div class="premium-card light-aware-card rounded-[2.5rem] bg-white p-6 shadow-premium-lg transition-all hover:scale-[1.03]">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-dimmed">
                      Subject Mastery
                    </p>
                    <p class="text-3xl font-black text-highlighted">
                      <CountUp :to="36" />
                    </p>
                  </div>
                  <div class="grid size-14 place-items-center rounded-2xl bg-trust-50 text-trust-600 ring-1 ring-trust-100">
                    <UIcon
                      name="i-lucide-book-open"
                      class="size-7"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Blurs -->
          <div class="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-brand-200/20 blur-[100px]" />
          <div class="absolute -bottom-20 -left-20 -z-10 size-64 rounded-full bg-accent-200/20 blur-[100px]" />
        </div>
      </UContainer>
    </section>

    <!-- Experience Section -->
    <section class="edtech-card-band border-b border-default bg-gradient-to-b from-bg to-white py-24 lg:py-32">
      <UContainer>
        <div class="mx-auto max-w-3xl text-center">
          <UBadge
            v-reveal
            label="Ecosystem"
            variant="subtle"
            class="mb-6 rounded-full bg-brand-50 px-3 font-black uppercase tracking-widest text-brand-600"
          />
          <h2 class="text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl">
            <BlurText
              :text="tr('A marketplace crafted for clarity.', 'ตลาดวิชาที่ออกแบบมาเพื่อความชัดเจน')"
              :delay="0.1"
            />
          </h2>
          <p
            v-reveal="{ delay: 400 }"
            class="mt-6 text-lg font-medium text-muted"
          >
            {{ tr('Every interaction is thoughtfully designed to remove friction from your learning path.', 'ทุกการสัมผัสถูกคิดมาอย่างดี เพื่อลดอุปสรรคในเส้นทางการเรียนรู้ของคุณ') }}
          </p>
        </div>

        <div class="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
          <article
            v-for="(card, index) in learningCards"
            :key="card.title"
            v-reveal="{ delay: index * 100 + 500 }"
            class="phone-card light-aware-card !min-h-[30rem] transition-all duration-500 hover:scale-[1.02]"
            :style="{ '--mouse-x': `${mouseX}%`, '--mouse-y': `${mouseY}%` }"
            @mousemove="handleMouseMove"
          >
            <div class="mx-auto h-1.5 w-12 rounded-full bg-slate-100" />
            <div class="mt-12 grid place-items-center">
              <div class="relative grid size-32 place-items-center rounded-full bg-white shadow-premium ring-1 ring-border-muted">
                <div class="absolute inset-2.5 rounded-full border border-dashed border-brand-200/60" />
                <div :class="['relative grid size-16 place-items-center rounded-3xl shadow-sm', card.accent]">
                  <UIcon
                    :name="card.icon"
                    class="size-8"
                  />
                </div>
              </div>
            </div>
            <h3 class="mt-10 px-4 text-center text-lg font-black uppercase tracking-tight text-highlighted">
              {{ card.title }}
            </h3>
            <p class="mt-6 px-4 text-center text-sm font-medium leading-relaxed text-muted">
              {{ card.description }}
            </p>
            <div class="mt-auto flex justify-center gap-1.5 pt-10">
              <span
                v-for="dot in 5"
                :key="dot"
                :class="[
                  'size-1.5 rounded-full transition-all duration-300',
                  dot === index + 1 ? 'w-4 bg-brand-500' : 'bg-slate-200'
                ]"
              />
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- Featured Tutors -->
    <section class="border-b border-default bg-gradient-to-b from-white to-bg-muted/30 py-24 lg:py-32">
      <UContainer>
        <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div class="max-w-2xl">
            <UBadge
              v-reveal
              label="Curation"
              variant="subtle"
              class="mb-4 rounded-full bg-accent-50 px-3 font-black uppercase tracking-widest text-accent-600"
            />
            <h2 class="text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl">
              <BlurText
                :text="tr('Profiles built on trust.', 'โปรไฟล์ที่สร้างจากความไว้วางใจ')"
                :delay="0.1"
              />
            </h2>
            <p
              v-reveal="{ delay: 400 }"
              class="mt-4 text-lg font-medium text-muted"
            >
              {{ tr('Discover verified mentors with proven track records of student success.', 'พบกับที่ปรึกษาที่ผ่านการตรวจสอบ พร้อมประวัติความสำเร็จของนักเรียนที่พิสูจน์ได้') }}
            </p>
          </div>
          <UButton
            v-reveal="{ delay: 600 }"
            to="/find-tutors"
            :label="tr('Explore All Tutors', 'สำรวจติวเตอร์ทั้งหมด')"
            size="xl"
            variant="outline"
            trailing-icon="i-lucide-arrow-right"
            class="rounded-full font-bold shadow-premium-sm hover:bg-white transition-all hover:scale-105"
          />
        </div>

        <div class="mt-16 grid gap-8 lg:grid-cols-3">
          <NuxtLink
            v-for="(tutor, index) in featuredTutors"
            :key="tutor.name"
            v-reveal="{ delay: index * 100 + 700 }"
            :to="`/tutors/${tutor.name.toLowerCase().replace(' ', '-')}`"
            class="premium-card glass-premium group relative flex flex-col overflow-hidden rounded-[2.5rem] p-4"
          >
            <div class="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <img
                :src="tutor.image"
                :alt="tutor.name"
                class="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div class="absolute bottom-4 left-4">
                <UBadge
                  :label="`${tutor.price}/hr`"
                  class="rounded-full bg-white/95 px-3 py-1 font-black text-brand-600 shadow-premium backdrop-blur"
                />
              </div>
            </div>

            <div class="flex flex-1 flex-col p-6 pt-5">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-highlighted group-hover:text-brand-600 transition-colors">
                  {{ tutor.name }}
                </h3>
                <div class="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <UIcon
                    name="i-lucide-star"
                    class="size-4 fill-current"
                  />
                  <span>{{ tutor.rating }}</span>
                </div>
              </div>
              <p class="mt-1 text-base font-medium text-muted">
                {{ tutor.role }}
              </p>

              <div class="mt-6 flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in tutor.tags"
                  :key="tag"
                  :label="tag"
                  variant="subtle"
                  class="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-600 ring-1 ring-brand-100"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- How It Works -->
    <section class="border-b border-default bg-gradient-to-b from-bg-muted/30 to-white py-24 lg:py-32">
      <UContainer class="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div class="flex flex-col items-start justify-center">
          <UBadge
            v-reveal
            label="The Process"
            variant="subtle"
            class="mb-6 rounded-full bg-trust-50 px-3 font-black uppercase tracking-widest text-trust-600"
          />
          <h2 class="text-4xl font-extrabold tracking-tight text-highlighted sm:text-5xl">
            <BlurText
              :text="tr('Three steps to mastery.', '3 ขั้นตอนสู่ความเป็นเลิศ')"
              :delay="0.1"
            />
          </h2>
          <p
            v-reveal="{ delay: 400 }"
            class="mt-6 text-lg font-medium leading-relaxed text-muted"
          >
            {{ tr('We’ve simplified the tutor search into a streamlined, stress-free experience for parents and students alike.', 'เราทำให้การค้นหาติวเตอร์เป็นเรื่องง่าย ไม่ยุ่งยาก ทั้งสำหรับผู้ปกครองและนักเรียน') }}
          </p>
          <UButton
            v-reveal="{ delay: 600 }"
            to="/find-tutors"
            :label="tr('Get Started Now', 'เริ่มใช้งานตอนนี้')"
            size="xl"
            class="mt-10 rounded-full px-10 font-bold shadow-premium transition-all hover:scale-105"
          />
        </div>

        <div class="grid gap-6">
          <div
            v-for="(step, index) in steps"
            :key="step[0]"
            v-reveal="{ delay: index * 100 + 800 }"
            class="premium-card group flex items-start gap-6 rounded-[2.5rem] bg-bg-muted/40 p-8 shadow-premium-md transition-all hover:bg-white hover:shadow-premium-xl"
          >
            <div class="grid size-16 shrink-0 place-items-center rounded-[1.25rem] bg-white text-brand-600 shadow-premium-sm ring-1 ring-border-muted transition-transform group-hover:scale-110">
              <UIcon
                :name="step[2]"
                class="size-8"
              />
            </div>
            <div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-black text-brand-400">0{{ index + 1 }}</span>
                <h3 class="text-2xl font-extrabold tracking-tight text-highlighted">
                  {{ step[0] }}
                </h3>
              </div>
              <p class="mt-3 text-base font-medium leading-relaxed text-muted">
                {{ step[1] }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-b from-white to-bg-muted/10">
      <UContainer class="py-20 lg:py-24">
        <div
          class="glass-premium relative overflow-hidden rounded-[2.5rem] px-8 py-12 text-center shadow-premium-xl lg:p-16"
        >
          <!-- Vibrant Decorative Orbs -->
          <div class="absolute -left-20 -top-20 size-72 rounded-full bg-brand-400/20 blur-[80px]" />
          <div class="absolute -bottom-20 -right-20 size-72 rounded-full bg-accent-400/20 blur-[80px]" />

          <FadeContent
            :blur="true"
            :duration="1.2"
            :stagger="0.15"
            :y="40"
            class="relative z-10 flex flex-col items-center"
          >
            <UBadge
              label="Elite Educators"
              variant="subtle"
              class="mb-6 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-600 ring-1 ring-brand-100"
            />
            <h2 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl lg:text-5xl">
              <BlurText
                :text="tr('Join our elite circle of tutors.', 'เข้าร่วมกลุ่มติวเตอร์ระดับหัวกะทิของเรา')"
                :delay="0.1"
              />
            </h2>
            <p class="mt-6 max-w-2xl text-base font-medium leading-relaxed text-muted lg:text-lg">
              {{ tr('Are you an exceptional educator? Build your professional presence and connect with students who value expertise.', 'คุณเป็นครูที่ยอดเยี่ยมใช่ไหม? สร้างโปรไฟล์มืออาชีพและเชื่อมต่อกับนักเรียนที่ให้ความสำคัญกับความเชี่ยวชาญ') }}
            </p>
            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center w-full">
              <UButton
                to="/become-a-tutor"
                :label="tr('Apply as Tutor', 'สมัครเป็นติวเตอร์')"
                size="lg"
                class="rounded-full px-10 py-5 text-base font-black shadow-premium-md transition-all hover:scale-105 active:scale-95"
              />
              <UButton
                to="/find-tutors"
                :label="tr('Search Tutors', 'ค้นหาติวเตอร์')"
                size="lg"
                variant="outline"
                color="neutral"
                class="rounded-full border-brand-200 px-10 py-5 text-base font-bold text-brand-600 shadow-premium-sm transition-all hover:bg-brand-50 hover:scale-105 active:scale-95"
              />
            </div>
          </FadeContent>
        </div>
      </UContainer>
    </section>
  </div>
</template>
