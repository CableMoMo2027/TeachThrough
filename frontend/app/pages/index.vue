<script setup lang="ts">
const { tr, pick } = useAppLocale()

const subjects = computed(() => pick(
  ['Mathematics', 'English', 'Science', 'Thai', 'Coding', 'Exam Prep'],
  ['คณิตศาสตร์', 'ภาษาอังกฤษ', 'วิทยาศาสตร์', 'ภาษาไทย', 'เขียนโปรแกรม', 'เตรียมสอบ']
))

const learningCards = computed(() => [
  {
    title: tr('Verified Tutors', 'ติวเตอร์ผ่านการตรวจสอบ'),
    description: tr('Profiles include teaching background, ratings, subjects, and parent-ready details.', 'โปรไฟล์มีประวัติการสอน คะแนนรีวิว วิชาที่สอน และข้อมูลที่ผู้ปกครองใช้ตัดสินใจได้ง่าย'),
    icon: 'i-lucide-badge-check',
    accent: 'bg-primary/12 text-primary',
    active: true
  },
  {
    title: tr('Learning Goals', 'เป้าหมายการเรียน'),
    description: tr('Match tutors by subject, grade level, exam plan, learning style, and schedule.', 'จับคู่ติวเตอร์ตามวิชา ระดับชั้น แผนสอบ สไตล์การเรียน และเวลาที่สะดวก'),
    icon: 'i-lucide-graduation-cap',
    accent: 'bg-secondary/12 text-secondary',
    active: false
  },
  {
    title: tr('Parent Reviews', 'รีวิวจากผู้ปกครอง'),
    description: tr('Compare tutor quality with clear feedback, ratings, and session experience.', 'เปรียบเทียบคุณภาพติวเตอร์จากรีวิว คะแนน และประสบการณ์หลังเรียนจริง'),
    icon: 'i-lucide-star',
    accent: 'bg-amber-100 text-amber-600',
    active: false
  },
  {
    title: tr('Flexible Sessions', 'เวลาเรียนยืดหยุ่น'),
    description: tr('Choose online, offline, or hybrid lessons with availability that fits your week.', 'เลือกเรียนออนไลน์ ออนไซต์ หรือผสมผสาน พร้อมตารางเวลาที่เข้ากับชีวิตประจำสัปดาห์'),
    icon: 'i-lucide-calendar-check',
    accent: 'bg-primary/12 text-primary',
    active: false
  },
  {
    title: tr('Friendly Support', 'ดูแลง่ายทุกขั้นตอน'),
    description: tr('A calm path from search to contact, designed for busy families and learners.', 'เส้นทางจากการค้นหาถึงการติดต่อที่เรียบง่าย ออกแบบสำหรับครอบครัวและผู้เรียนที่มีเวลาจำกัด'),
    icon: 'i-lucide-messages-square',
    accent: 'bg-emerald-100 text-emerald-600',
    active: false
  }
])

const featuredTutors = [
  {
    name: 'Maya Chen',
    role: 'IB Math and SAT Tutor',
    rating: '4.98',
    price: '$28/hr',
    tags: ['Math', 'SAT', 'Online'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80'
  },
  {
    name: 'Arun Patel',
    role: 'Physics and Engineering Mentor',
    rating: '4.95',
    price: '$32/hr',
    tags: ['Physics', 'A-Level', 'Hybrid'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80'
  },
  {
    name: 'Sofia Rivera',
    role: 'English Writing Coach',
    rating: '4.97',
    price: '$24/hr',
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
  <div class="overflow-hidden bg-[#f7fcff]">
    <section class="edtech-hero border-b border-sky-100/80">
      <UContainer class="grid min-h-[700px] items-center gap-12 py-12 lg:grid-cols-[.95fr_1.05fr] lg:py-16">
        <div v-reveal>
          <UBadge
            :label="tr('Soft Blue EdTech Platform', 'แพลตฟอร์มเรียนพิเศษโทนฟ้าใช้ง่าย')"
            variant="subtle"
            icon="i-lucide-sparkles"
            class="mb-5 rounded-full bg-white/90 text-primary ring-1 ring-sky-100"
          />
          <h1 class="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {{ tr('Find the right tutor with a calm, clear learning journey.', 'ค้นหาติวเตอร์ที่ใช่ ด้วยประสบการณ์เรียนรู้ที่ชัดเจนและสบายใจ') }}
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {{ tr('Tutorly helps parents and students discover verified tutors with transparent profiles, flexible lessons, and a professional experience that feels easy from the first search.', 'Tutorly ช่วยให้ผู้ปกครองและนักเรียนค้นหาติวเตอร์ที่ผ่านการตรวจสอบ พร้อมโปรไฟล์โปร่งใส รูปแบบการเรียนยืดหยุ่น และประสบการณ์ใช้งานที่ดูมืออาชีพตั้งแต่การค้นหาครั้งแรก') }}
          </p>

          <div class="mt-8 rounded-[1.75rem] border border-sky-100 bg-white/95 p-3 shadow-[0_24px_70px_rgba(14,116,144,0.12)] backdrop-blur">
            <div class="grid gap-3 lg:grid-cols-[1.2fr_.9fr_.8fr_auto]">
              <UInput
                icon="i-lucide-search"
                :placeholder="tr('Subject, tutor name, or exam', 'วิชา ชื่อติวเตอร์ หรือข้อสอบ')"
                size="xl"
              />
              <UInput
                icon="i-lucide-map-pin"
                :placeholder="tr('Location or online', 'พื้นที่หรือออนไลน์')"
                size="xl"
              />
              <USelect
                :items="levels"
                :placeholder="tr('Level', 'ระดับชั้น')"
                size="xl"
              />
              <UButton
                to="/find-tutors"
                :label="tr('Search', 'ค้นหา')"
                icon="i-lucide-search"
                size="xl"
                class="justify-center rounded-full px-7"
              />
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-2">
            <UButton
              v-for="subject in subjects"
              :key="subject"
              :label="subject"
              color="neutral"
              variant="subtle"
              size="sm"
              class="rounded-full bg-white/80 text-slate-700 ring-1 ring-sky-100 hover:bg-sky-50"
              to="/find-tutors"
            />
          </div>
        </div>

        <div
          v-reveal="120"
          class="relative"
        >
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_24px_70px_rgba(14,116,144,0.14)]">
              <div class="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=740&q=80"
                  alt="Tutor helping a student study"
                  class="size-20 rounded-3xl object-cover"
                >
                <div>
                  <p class="text-sm text-slate-500">
                    {{ tr('Top match this week', 'ติวเตอร์ที่เหมาะที่สุดสัปดาห์นี้') }}
                  </p>
                  <p class="text-lg font-semibold text-slate-950">
                    {{ tr('Calculus for Grade 11', 'แคลคูลัสสำหรับ ม.5') }}
                  </p>
                </div>
              </div>
              <div class="mt-5 grid grid-cols-3 gap-2">
                <div class="rounded-2xl bg-sky-50 p-3 text-center">
                  <p class="text-xl font-semibold text-primary">
                    98%
                  </p>
                  <p class="text-xs text-slate-500">
                    {{ tr('match', 'ตรงใจ') }}
                  </p>
                </div>
                <div class="rounded-2xl bg-cyan-50 p-3 text-center">
                  <p class="text-xl font-semibold text-secondary">
                    4.9
                  </p>
                  <p class="text-xs text-slate-500">
                    {{ tr('rating', 'คะแนน') }}
                  </p>
                </div>
                <div class="rounded-2xl bg-amber-50 p-3 text-center">
                  <p class="text-xl font-semibold text-amber-600">
                    12
                  </p>
                  <p class="text-xs text-slate-500">
                    {{ tr('slots', 'เวลา') }}
                  </p>
                </div>
              </div>
            </div>

            <div class="grid gap-4">
              <div class="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(14,116,144,0.10)]">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-slate-500">
                      {{ tr('Verified tutors', 'ติวเตอร์ที่ตรวจสอบแล้ว') }}
                    </p>
                    <p class="text-3xl font-semibold text-slate-950">
                      1,240+
                    </p>
                  </div>
                  <div class="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <UIcon
                      name="i-lucide-shield-check"
                      class="size-6"
                    />
                  </div>
                </div>
              </div>

              <div class="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_rgba(14,116,144,0.10)]">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-slate-500">
                      {{ tr('Subjects', 'วิชาเรียน') }}
                    </p>
                    <p class="text-3xl font-semibold text-slate-950">
                      36
                    </p>
                  </div>
                  <div class="grid size-12 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                    <UIcon
                      name="i-lucide-book-open"
                      class="size-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="edtech-card-band py-14 sm:py-16">
      <UContainer>
        <div
          v-reveal
          class="mx-auto max-w-3xl text-center"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {{ tr('Learning Experience', 'ประสบการณ์การเรียน') }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
            {{ tr('A tutor marketplace that feels like a guided path.', 'แพลตฟอร์มค้นหาติวเตอร์ที่พาคุณเลือกได้อย่างเป็นขั้นตอน') }}
          </h2>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <article
            v-for="(card, index) in learningCards"
            :key="card.title"
            v-reveal="{ delay: index * 90 }"
            class="phone-card"
          >
            <div class="mx-auto h-2 w-16 rounded-full bg-slate-100" />
            <div class="mt-12 grid place-items-center">
              <div class="relative grid size-36 place-items-center rounded-full bg-sky-100/80">
                <div class="absolute inset-3 rounded-full border-2 border-dashed border-primary/50" />
                <div :class="['relative grid size-20 place-items-center rounded-3xl', card.accent]">
                  <UIcon
                    :name="card.icon"
                    class="size-10"
                  />
                </div>
              </div>
            </div>
            <h3 class="mt-10 text-center text-xl font-extrabold uppercase leading-tight text-primary">
              {{ card.title }}
            </h3>
            <p class="mx-auto mt-7 max-w-[15rem] text-center text-sm leading-6 text-slate-400">
              {{ card.description }}
            </p>
            <div class="mt-auto flex justify-center gap-2 pt-10">
              <span
                v-for="dot in 5"
                :key="dot"
                :class="[
                  'size-2 rounded-full',
                  dot === index + 1 || (index === 0 && dot === 1) ? 'bg-primary' : 'bg-slate-200'
                ]"
              />
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-16">
      <div
        v-reveal
        class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {{ tr('Featured Tutors', 'ติวเตอร์แนะนำ') }}
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-slate-950">
            {{ tr('Profiles parents can trust', 'โปรไฟล์ที่ผู้ปกครองมั่นใจได้') }}
          </h2>
        </div>
        <UButton
          to="/find-tutors"
          :label="tr('View all tutors', 'ดูติวเตอร์ทั้งหมด')"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-arrow-right"
          class="rounded-full"
        />
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-3">
        <UCard
          v-for="tutor in featuredTutors"
          :key="tutor.name"
          v-reveal
          class="overflow-hidden rounded-[1.75rem] border-sky-100 shadow-[0_18px_50px_rgba(14,116,144,0.09)]"
        >
          <img
            :src="tutor.image"
            :alt="tutor.name"
            class="mb-5 h-52 w-full rounded-[1.35rem] object-cover"
          >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-slate-950">
                {{ tutor.name }}
              </h3>
              <p class="text-sm text-slate-500">
                {{ tutor.role }}
              </p>
            </div>
            <UBadge
              :label="tutor.price"
              color="neutral"
              variant="subtle"
              class="rounded-full"
            />
          </div>
          <div class="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <UIcon
              name="i-lucide-star"
              class="size-4 text-amber-500"
            />
            <span>{{ tutor.rating }} {{ tr('rating', 'คะแนน') }}</span>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <UBadge
              v-for="tag in tutor.tags"
              :key="tag"
              :label="tag"
              color="primary"
              variant="subtle"
              class="rounded-full"
            />
          </div>
        </UCard>
      </div>
    </UContainer>

    <section class="border-y border-sky-100 bg-white/80">
      <UContainer class="grid gap-10 py-16 lg:grid-cols-[.85fr_1.15fr]">
        <div v-reveal>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {{ tr('How It Works', 'วิธีใช้งาน') }}
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-slate-950">
            {{ tr('From search to first lesson in three clear steps.', 'จากค้นหาถึงเริ่มเรียนใน 3 ขั้นตอนชัดเจน') }}
          </h2>
          <p class="mt-4 text-slate-600">
            {{ tr('The MVP keeps the journey focused: discover tutors, inspect profiles, then contact or book.', 'เวอร์ชัน MVP เน้นเส้นทางหลัก: ค้นหาติวเตอร์ ดูโปรไฟล์ แล้วติดต่อหรือจองเวลาเรียน') }}
          </p>
        </div>
        <div class="grid gap-4">
          <div
            v-for="(step, index) in steps"
            :key="step[0]"
            v-reveal="{ delay: index * 110 }"
            class="flex gap-4 rounded-[1.5rem] border border-sky-100 bg-white p-5 shadow-[0_14px_40px_rgba(14,116,144,0.08)]"
          >
            <div class="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UIcon
                :name="step[2]"
                class="size-6"
              />
            </div>
            <div>
              <h3 class="font-semibold text-slate-950">
                {{ step[0] }}
              </h3>
              <p class="mt-1 text-sm leading-6 text-slate-600">
                {{ step[1] }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-16">
      <div
        v-reveal
        class="rounded-[2rem] bg-primary p-8 text-white shadow-[0_24px_70px_rgba(2,132,199,0.22)] md:p-10"
      >
        <div class="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 class="text-3xl font-semibold">
              {{ tr('Ready to teach with Tutorly?', 'พร้อมเริ่มสอนกับ Tutorly หรือยัง?') }}
            </h2>
            <p class="mt-3 max-w-2xl text-white/80">
              {{ tr('Create a tutor profile, submit credentials, list your expertise, and start receiving student requests after verification.', 'สร้างโปรไฟล์ติวเตอร์ ส่งเอกสารแสดงคุณวุฒิ ระบุความเชี่ยวชาญ และเริ่มรับคำขอจากนักเรียนหลังผ่านการตรวจสอบ') }}
            </p>
          </div>
          <UButton
            to="/become-a-tutor"
            :label="tr('Apply as Tutor', 'สมัครเป็นติวเตอร์')"
            icon="i-lucide-badge-check"
            size="xl"
            color="neutral"
            class="rounded-full bg-white text-primary hover:bg-sky-50"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
