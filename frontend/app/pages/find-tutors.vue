<script setup lang="ts">
const { tr, pick } = useAppLocale()

const quickFilters = computed(() => [
  [tr('Top rated', 'คะแนนสูง'), 'i-lucide-star'],
  [tr('Available today', 'ว่างวันนี้'), 'i-lucide-calendar-check'],
  [tr('Online lessons', 'เรียนออนไลน์'), 'i-lucide-video'],
  [tr('Verified only', 'ผ่านการตรวจสอบ'), 'i-lucide-badge-check']
])

const subjectItems = computed(() => pick(
  ['All subjects', 'Mathematics', 'English', 'Science', 'Thai', 'Coding'],
  ['ทุกวิชา', 'คณิตศาสตร์', 'ภาษาอังกฤษ', 'วิทยาศาสตร์', 'ภาษาไทย', 'เขียนโปรแกรม']
))

const gradeItems = computed(() => pick(
  ['Any grade', 'Primary', 'Middle School', 'High School', 'University'],
  ['ทุกระดับชั้น', 'ประถม', 'มัธยมต้น', 'มัธยมปลาย', 'มหาวิทยาลัย']
))

const formatItems = computed(() => pick(
  ['Any format', 'Online', 'Offline', 'Hybrid'],
  ['ทุกรูปแบบ', 'ออนไลน์', 'ออนไซต์', 'ผสมผสาน']
))

const ratingItems = ['Any rating', '4.5+', '4.8+', '4.9+']

const tutors = computed(() => [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    title: tr('IB Math, SAT, and international school exam preparation', 'คณิตศาสตร์ IB, SAT และเตรียมสอบโรงเรียนนานาชาติ'),
    location: tr('Bangkok / Online', 'กรุงเทพ / ออนไลน์'),
    price: '$28/hr',
    rating: '4.98',
    reviews: '1.5K',
    lessons: tr('420 lessons', 'สอนแล้ว 420 ครั้ง'),
    response: tr('Replies in 1 min', 'ตอบกลับใน 1 นาที'),
    subjects: [tr('Specialist', 'ผู้เชี่ยวชาญ'), tr('Fast reply', 'ตอบไว')],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'arun-patel',
    name: 'Arun Patel',
    title: tr('Physics mentor for A-Level, engineering, and problem solving', 'ติวฟิสิกส์ A-Level วิศวกรรม และการแก้โจทย์'),
    location: tr('Online', 'ออนไลน์'),
    price: '$32/hr',
    rating: '4.95',
    reviews: '908',
    lessons: tr('315 lessons', 'สอนแล้ว 315 ครั้ง'),
    response: tr('Replies in 3 hrs', 'ตอบกลับใน 3 ชั่วโมง'),
    subjects: [tr('Verified', 'ตรวจสอบแล้ว'), tr('Top rated', 'คะแนนสูง')],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'sofia-rivera',
    name: 'Sofia Rivera',
    title: tr('English writing coach for IELTS, essays, and interview prep', 'โค้ชเขียนภาษาอังกฤษ IELTS เรียงความ และเตรียมสัมภาษณ์'),
    location: tr('Chiang Mai / Online', 'เชียงใหม่ / ออนไลน์'),
    price: '$24/hr',
    rating: '4.97',
    reviews: '1.1K',
    lessons: tr('510 lessons', 'สอนแล้ว 510 ครั้ง'),
    response: tr('Replies in 10 mins', 'ตอบกลับใน 10 นาที'),
    subjects: [tr('Specialist', 'ผู้เชี่ยวชาญ'), tr('Popular', 'ยอดนิยม')],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'narin-kasem',
    name: 'Narin Kasem',
    title: tr('Thai language and primary school reading foundation', 'ภาษาไทยและพื้นฐานการอ่านระดับประถม'),
    location: tr('Bangkok', 'กรุงเทพ'),
    price: '$18/hr',
    rating: '4.91',
    reviews: '620',
    lessons: tr('280 lessons', 'สอนแล้ว 280 ครั้ง'),
    response: tr('Replies in 37 mins', 'ตอบกลับใน 37 นาที'),
    subjects: [tr('Parent choice', 'ผู้ปกครองเลือก'), tr('Offline', 'ออนไซต์')],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'lena-park',
    name: 'Lena Park',
    title: tr('Coding tutor for Scratch, Python, and beginner web projects', 'ติวเขียนโปรแกรม Scratch, Python และเว็บเบื้องต้น'),
    location: tr('Online', 'ออนไลน์'),
    price: '$26/hr',
    rating: '4.96',
    reviews: '740',
    lessons: tr('360 lessons', 'สอนแล้ว 360 ครั้ง'),
    response: tr('Replies in 7 mins', 'ตอบกลับใน 7 นาที'),
    subjects: [tr('Coding', 'เขียนโปรแกรม'), tr('Fast reply', 'ตอบไว')],
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'daniel-wong',
    name: 'Daniel Wong',
    title: tr('Chemistry and biology tutor for high school exam confidence', 'ติวเคมีและชีววิทยาเพื่อความมั่นใจก่อนสอบมัธยมปลาย'),
    location: tr('Bangkok / Hybrid', 'กรุงเทพ / ผสมผสาน'),
    price: '$30/hr',
    rating: '4.93',
    reviews: '512',
    lessons: tr('245 lessons', 'สอนแล้ว 245 ครั้ง'),
    response: tr('Replies in 1 hr', 'ตอบกลับใน 1 ชั่วโมง'),
    subjects: [tr('Science', 'วิทยาศาสตร์'), tr('Verified', 'ตรวจสอบแล้ว')],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=900&q=80'
  }
])
</script>

<template>
  <div class="min-h-screen bg-[#f7fcff]">
    <UContainer class="py-8">
      <div class="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <UBadge
            :label="tr('Tutor Directory', 'รายชื่อติวเตอร์')"
            variant="subtle"
            class="rounded-full bg-white text-primary ring-1 ring-sky-100"
          />
          <h1 class="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            {{ tr('Find Tutors', 'ค้นหาติวเตอร์') }}
          </h1>
          <p class="mt-3 max-w-2xl text-slate-600">
            {{ tr('Browse tutor profiles like a marketplace. Compare expertise, response time, ratings, lessons, and starting price.', 'เลือกดูโปรไฟล์ติวเตอร์แบบ marketplace เปรียบเทียบความเชี่ยวชาญ เวลาตอบกลับ คะแนน จำนวนคาบเรียน และราคาเริ่มต้น') }}
          </p>
        </div>
        <UButton
          to="/become-a-tutor"
          :label="tr('Apply as Tutor', 'สมัครเป็นติวเตอร์')"
          icon="i-lucide-user-plus"
          color="neutral"
          variant="outline"
          class="bg-white"
        />
      </div>

      <section
        v-reveal
        class="sticky top-[calc(var(--ui-header-height)+0.75rem)] z-20 mb-8 rounded-[1.5rem] border border-sky-100 bg-white/95 p-4 shadow-[0_18px_50px_rgba(14,116,144,0.10)] backdrop-blur"
      >
        <div class="grid gap-3 xl:grid-cols-[1.2fr_.8fr_.8fr_.8fr_.75fr_auto]">
          <UInput
            icon="i-lucide-search"
            :placeholder="tr('Search tutors', 'ค้นหาติวเตอร์')"
            size="lg"
          />
          <USelect
            :items="subjectItems"
            :placeholder="tr('Subject', 'วิชา')"
            size="lg"
          />
          <USelect
            :items="gradeItems"
            :placeholder="tr('Grade level', 'ระดับชั้น')"
            size="lg"
          />
          <USelect
            :items="formatItems"
            :placeholder="tr('Format', 'รูปแบบ')"
            size="lg"
          />
          <USelect
            :items="ratingItems"
            :placeholder="tr('Rating', 'คะแนน')"
            size="lg"
          />
          <UButton
            :label="tr('Filter', 'กรอง')"
            icon="i-lucide-sliders-horizontal"
            size="lg"
            class="justify-center px-6"
          />
        </div>

        <div class="mt-3 flex gap-2 overflow-x-auto pb-1">
          <UButton
            v-for="filter in quickFilters"
            :key="filter[0]"
            :label="filter[0]"
            :icon="filter[1]"
            color="neutral"
            variant="subtle"
            size="sm"
            class="shrink-0 bg-sky-50 text-slate-700 ring-1 ring-sky-100"
          />
        </div>
      </section>

      <div class="mb-4 flex items-center justify-between gap-3 text-sm text-slate-700">
        <p>{{ tr('Found 425 tutors', 'พบติวเตอร์ 425 คน') }}</p>
        <p>{{ tr('Page 1 of 11', 'หน้า 1 จาก 11') }}</p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <NuxtLink
          v-for="tutor in tutors"
          :key="tutor.id"
          v-reveal
          :to="`/tutors/${tutor.id}`"
          class="group overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(14,116,144,0.14)]"
        >
          <div class="flex items-center gap-3 p-3">
            <img
              :src="tutor.avatar"
              :alt="tutor.name"
              class="size-9 rounded-full object-cover"
            >
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-slate-950">
                {{ tutor.name }}
              </p>
              <p class="text-xs text-slate-500">
                {{ tutor.response }}
              </p>
            </div>
          </div>

          <div class="relative aspect-[4/2.7] overflow-hidden bg-sky-50">
            <img
              :src="tutor.cover"
              :alt="tutor.title"
              class="size-full object-cover transition duration-500 group-hover:scale-105"
            >
            <div class="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-primary shadow-sm">
              {{ tutor.location }}
            </div>
          </div>

          <div class="grid min-h-52 gap-3 p-3">
            <h2 class="line-clamp-2 text-base font-semibold leading-6 text-slate-950">
              {{ tutor.title }}
            </h2>

            <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{{ tutor.lessons }}</span>
              <span class="text-slate-300">|</span>
              <span class="inline-flex items-center gap-1">
                <UIcon
                  name="i-lucide-star"
                  class="size-4 text-amber-500"
                />
                {{ tutor.rating }} ({{ tutor.reviews }})
              </span>
            </div>

            <div class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="subject in tutor.subjects"
                :key="subject"
                :label="subject"
                color="primary"
                variant="subtle"
                class="rounded-md"
              />
            </div>

            <div class="mt-auto flex items-end justify-between gap-3 pt-3">
              <UButton
                :label="tr('Save', 'บันทึก')"
                icon="i-lucide-heart"
                color="neutral"
                variant="ghost"
                size="sm"
                class="rounded-md"
                @click.prevent
              />
              <div class="text-right">
                <p class="text-xs text-slate-500">
                  {{ tr('Starts at', 'เริ่มต้น') }}
                </p>
                <p class="text-lg font-bold text-primary">
                  {{ tutor.price }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
