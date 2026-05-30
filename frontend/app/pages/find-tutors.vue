<script setup lang="ts">
const { tr, pick } = useAppLocale()

const mouseX = ref(50)
const mouseY = ref(50)

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY, currentTarget } = e
  const { left, top, width, height } = (currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = ((clientX - left) / width) * 100
  mouseY.value = ((clientY - top) / height) * 100
}

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
    price: '$28',
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
    price: '$32',
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
    price: '$24',
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
    price: '$18',
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
    price: '$26',
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
    price: '$30',
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
  <div class="min-h-screen bg-[#f8fbff] pb-20">
    <UContainer class="py-12">
      <!-- Apple-style Header -->
      <header class="mb-12 text-center sm:text-left">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div class="space-y-1">
            <UBadge
              :label="tr('Marketplace', 'ตลาดวิชา')"
              variant="subtle"
              size="sm"
              class="rounded-full bg-primary/10 px-3 font-bold text-primary"
            />
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {{ tr('Find Tutors', 'ค้นหาติวเตอร์') }}
            </h1>
          </div>
          <UButton
            to="/become-a-tutor"
            :label="tr('Become a Tutor', 'สมัครเป็นติวเตอร์')"
            size="xl"
            variant="solid"
            class="mt-4 rounded-full shadow-premium-md hover:shadow-premium-lg sm:mt-0"
          />
        </div>
        <p class="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
          {{ tr('Exceptional education starting with the perfect match.', 'จุดเริ่มต้นของการเรียนรู้ที่ดี คือการเจอติวเตอร์ที่ใช่') }}
        </p>
      </header>

      <!-- Premium Sticky Filter Bar - Glassmorphism 2.0 -->
      <section
        v-reveal
        class="glass-premium sticky top-[calc(var(--ui-header-height)+1rem)] z-30 mb-12 rounded-[2rem] p-5 shadow-premium-lg transition-all duration-500 hover:shadow-premium-xl"
      >
        <div class="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto]">
          <UFormField :label="tr('Learning goal', 'Learning goal')">
            <UInput
              icon="i-lucide-search"
              class="premium-input"
              :placeholder="tr('What do you want to learn?', 'คุณต้องการเรียนอะไร?')"
              size="xl"
            />
          </UFormField>
          <UFormField :label="tr('Subject', 'Subject')">
            <USelect
              class="premium-input"
              :items="subjectItems"
              :placeholder="tr('Select subject', 'Select subject')"
              size="xl"
            />
          </UFormField>
          <UFormField :label="tr('Level', 'Level')">
            <USelect
              class="premium-input"
              :items="gradeItems"
              :placeholder="tr('Select level', 'Select level')"
              size="xl"
            />
          </UFormField>
          <UFormField :label="tr('Mode', 'Mode')">
            <USelect
              class="premium-input"
              :items="formatItems"
              :placeholder="tr('Select mode', 'Select mode')"
              size="xl"
            />
          </UFormField>
          <UFormField :label="tr('Rating', 'Rating')">
            <USelect
              class="premium-input"
              :items="ratingItems"
              :placeholder="tr('Select rating', 'Select rating')"
              size="xl"
            />
          </UFormField>
          <UButton
            :label="tr('Search', 'ค้นหา')"
            size="xl"
            class="self-end justify-center rounded-full px-8 font-bold shadow-premium hover:scale-105"
          />
        </div>

        <div class="mt-5 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
          <span class="shrink-0 text-xs font-bold uppercase tracking-widest text-slate-400">{{ tr('Filters', 'ตัวกรอง') }}:</span>
          <UButton
            v-for="filter in quickFilters"
            :key="filter[0]"
            :label="filter[0]"
            :icon="filter[1]"
            color="neutral"
            variant="subtle"
            size="sm"
            class="shrink-0 rounded-full bg-white/50 font-semibold text-slate-600 ring-1 ring-slate-100 transition-all hover:bg-white hover:text-primary"
          />
        </div>
      </section>

      <div class="mb-6 flex items-end justify-between px-2">
        <div>
          <h3 class="text-xl font-bold text-slate-900">
            {{ tr('Available Tutors', 'ติวเตอร์ที่พร้อมสอน') }}
          </h3>
          <p class="text-sm font-medium text-slate-400">
            {{ tr('425 verified mentors found', 'พบติวเตอร์ที่ผ่านการตรวจสอบ 425 คน') }}
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span>Sort by</span>
          <UIcon name="i-lucide-chevron-down" />
        </div>
      </div>

      <!-- Tutor Grid -->
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        <NuxtLink
          v-for="tutor in tutors"
          :key="tutor.id"
          v-reveal
          :to="`/tutors/${tutor.id}`"
          class="premium-card light-aware-card group relative flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-slate-100 transition-all duration-500"
          :style="{ '--mouse-x': `${mouseX}%`, '--mouse-y': `${mouseY}%` }"
          @mousemove="handleMouseMove"
        >
          <!-- Cover & Price -->
          <div class="relative aspect-[4/3.2] overflow-hidden">
            <img
              :src="tutor.cover"
              :alt="tutor.title"
              class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <!-- Quick Badge -->
            <div class="absolute left-4 top-4 flex items-center gap-2">
              <div class="flex h-8 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-900 shadow-premium backdrop-blur">
                <UIcon
                  name="i-lucide-map-pin"
                  class="size-3.5 text-primary"
                />
                {{ tutor.location }}
              </div>
            </div>

            <!-- Floating Price -->
            <div class="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <div class="rounded-2xl bg-white p-3 shadow-premium-lg">
                <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ tr('Starts at', 'เริ่มต้น') }}</p>
                <p class="text-xl font-black text-primary">{{ tutor.price }}<span class="text-xs font-medium text-slate-400">/hr</span></p>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-6 pt-5">
            <div class="mb-4 flex items-center justify-between relative z-10">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <img
                    :src="tutor.avatar"
                    :alt="tutor.name"
                    class="size-10 rounded-full object-cover ring-2 ring-white shadow-premium"
                  >
                  <div class="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {{ tutor.name }}
                  </h4>
                  <p class="text-[11px] font-medium text-slate-400">
                    {{ tutor.response }}
                  </p>
                </div>
              </div>
              <UButton
                icon="i-lucide-heart"
                color="neutral"
                variant="ghost"
                size="sm"
                class="rounded-full hover:bg-rose-50 hover:text-rose-500"
                @click.prevent
              />
            </div>

            <h2 class="mb-3 line-clamp-2 min-h-[3rem] text-lg font-bold leading-tight text-slate-900 group-hover:text-slate-800 relative z-10">
              {{ tutor.title }}
            </h2>

            <!-- Stats Bar -->
            <div class="mb-5 flex items-center gap-4 border-y border-slate-50 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 relative z-10">
              <div class="flex items-center gap-1.5">
                <UIcon
                  name="i-lucide-star"
                  class="size-3.5 text-amber-500"
                />
                <span class="text-slate-900">{{ tutor.rating }}</span>
                <span>({{ tutor.reviews }})</span>
              </div>
              <div class="size-1 rounded-full bg-slate-200" />
              <div class="flex items-center gap-1.5">
                <UIcon
                  name="i-lucide-graduation-cap"
                  class="size-3.5 text-primary"
                />
                <span>{{ tutor.lessons }}</span>
              </div>
            </div>

            <div class="mt-auto flex flex-wrap gap-2 relative z-10">
              <UBadge
                v-for="subject in tutor.subjects"
                :key="subject"
                :label="subject"
                variant="subtle"
                class="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-sky-100"
              />
            </div>
          </div>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
