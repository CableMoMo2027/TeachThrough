<script setup lang="ts">
import type { Ref } from 'vue'

const { tr, pick } = useAppLocale()

type TutorDocumentKey = 'additionalEducation' | 'idCard' | 'transcript' | 'portfolio'

const benefits = computed(() => [
  {
    title: tr('Elite Community', 'ชุมชนระดับแนวหน้า'),
    desc: tr('Connect with 1,200+ verified experts and ambitious students.', 'ร่วมงานกับที่ปรึกษากว่า 1,200 คน และนักเรียนที่มีความมุ่งมั่น'),
    icon: 'i-lucide-users'
  },
  {
    title: tr('Transparent Pricing', 'ราคาที่โปร่งใส'),
    desc: tr('Set your own rates and keep 100% of your earnings.', 'กำหนดราคาด้วยตัวเองและรับรายได้เต็มจำนวนโดยไม่มีค่าธรรมเนียมแฝง'),
    icon: 'i-lucide-badge-dollar-sign'
  },
  {
    title: tr('Flexible Journey', 'เส้นทางที่ยืดหยุ่น'),
    desc: tr('Teach online or offline with a schedule that fits your life.', 'เลือกสอนออนไลน์หรือออนไซต์ด้วยตารางเวลาที่คุณออกแบบเอง'),
    icon: 'i-lucide-calendar-heart'
  },
  {
    title: tr('Verified Growth', 'การเติบโตที่มีคุณภาพ'),
    desc: tr('Build trust with student reviews and professional credentials.', 'สร้างความน่าเชื่อถือด้วยรีวิวจากนักเรียนและคุณวุฒิที่ผ่านการรับรอง'),
    icon: 'i-lucide-trending-up'
  }
])

const teachingModes = computed(() => pick(
  ['Online', 'Offline', 'Online & Offline'],
  ['ออนไลน์', 'ออนไซต์', 'ออนไลน์และออนไซต์']
))
const genders = computed(() => pick(
  ['Male', 'Female', 'Prefer not to say'],
  ['ชาย', 'หญิง', 'ไม่ระบุ']
))
const provinces = computed(() => pick(
  ['Bangkok', 'Nonthaburi', 'Pathum Thani', 'Samut Prakan', 'Chiang Mai'],
  ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'เชียงใหม่']
))
const degreeOptions = computed(() => pick(
  ['High School', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree'],
  ['มัธยมศึกษา', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก']
))
const yearOptions = computed(() => pick(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated'],
  ['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4', 'จบการศึกษาแล้ว']
))
const subjectOptions = computed(() => pick(
  ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Thai', 'Social Studies'],
  ['คณิตศาสตร์', 'ภาษาอังกฤษ', 'วิทยาศาสตร์', 'ฟิสิกส์', 'เคมี', 'ชีววิทยา', 'ภาษาไทย', 'สังคมศึกษา']
))
const languageOptions = computed(() => pick(
  ['English', 'Chinese', 'Japanese', 'Korean'],
  ['ภาษาอังกฤษ', 'ภาษาจีน', 'ภาษาญี่ปุ่น', 'ภาษาเกาหลี']
))

const showForm = ref(false)
const hasAdditionalEducation = ref(false)
const selectedSubjects = ref<string[]>([])
const selectedLanguages = ref<string[]>([])
const additionalEducationFileName = ref('')
const idCardFileName = ref('')
const transcriptFileName = ref('')
const portfolioFileName = ref('')

const documentFileTargets: Record<TutorDocumentKey, Ref<string>> = {
  additionalEducation: additionalEducationFileName,
  idCard: idCardFileName,
  transcript: transcriptFileName,
  portfolio: portfolioFileName
}

const toggleFromList = (list: Ref<string[]>, value: string) => {
  list.value = list.value.includes(value)
    ? list.value.filter(item => item !== value)
    : [...list.value, value]
}

const toggleSubject = (subject: string) => {
  toggleFromList(selectedSubjects, subject)
}

const toggleLanguage = (language: string) => {
  toggleFromList(selectedLanguages, language)
}

const handleNamedFileChange = (event: Event, target: TutorDocumentKey) => {
  const input = event.target as HTMLInputElement
  documentFileTargets[target].value = input.files?.[0]?.name || ''
}
</script>

<template>
  <div class="min-h-screen bg-bg-muted/30 pb-24 pt-16">
    <UContainer>
      <!-- Landing Page Content -->
      <Transition
        name="auth-form"
        mode="out-in"
      >
        <div
          v-if="!showForm"
          class="mx-auto max-w-5xl space-y-20"
        >
          <!-- Hero Invitation -->
          <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div v-reveal>
              <UBadge
                label="Impact the Future"
                variant="subtle"
                class="mb-6 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-600 ring-1 ring-brand-100"
              />
              <h1 class="text-balance text-5xl font-black tracking-tight text-highlighted lg:text-7xl lg:leading-[1.1]">
                <BlurText
                  :text="tr('Your expertise,', 'ความเชี่ยวชาญของคุณ')"
                  :animate-on-scroll="false"
                />
                <br>
                <BlurText
                  :text="tr('their breakthrough.', 'คือความสำเร็จของเขา')"
                  class-name="text-brand-600"
                  :delay="0.3"
                  :animate-on-scroll="false"
                />
              </h1>
              <p class="mt-8 text-xl font-medium leading-relaxed text-muted lg:text-2xl">
                {{ tr('Join Thailand’s most trusted circle of elite educators. Help students reach their potential with our premium matching experience.', 'เข้าร่วมกลุ่มผู้สอนระดับแนวหน้าที่ได้รับความไว้วางใจที่สุด ช่วยให้นักเรียนบรรลุศักยภาพสูงสุดด้วยระบบการจับคู่ระดับพรีเมียมของเรา') }}
              </p>
              <div class="mt-12 flex flex-wrap gap-4">
                <UButton
                  :label="tr('Become a Tutor', 'สมัครเป็นติวเตอร์')"
                  size="xl"
                  class="rounded-full px-12 py-6 text-lg font-black shadow-premium-lg transition-all hover:scale-105 active:scale-95"
                  @click="showForm = true"
                />
                <UButton
                  to="/find-tutors"
                  :label="tr('Explore Marketplace', 'สำรวจตลาดวิชา')"
                  variant="ghost"
                  color="neutral"
                  size="xl"
                  class="rounded-full px-8 font-bold text-toned"
                />
              </div>
            </div>

            <div
              v-reveal="{ delay: 400 }"
              class="relative hidden lg:block"
            >
              <div class="premium-card overflow-hidden rounded-[3rem] bg-white p-2 shadow-premium-xl">
                <img
                  src="https://images.unsplash.com/photo-1544717297-fa15739a544a?auto=format&fit=crop&w=800&q=80"
                  alt="Tutor teaching"
                  class="aspect-[4/5] w-full rounded-[2.5rem] object-cover"
                >
              </div>
              <!-- Decorative elements -->
              <div class="absolute -bottom-10 -left-10 size-40 rounded-full bg-brand-400/20 blur-[60px]" />
              <div class="absolute -right-10 -top-10 size-40 rounded-full bg-accent-400/20 blur-[60px]" />
            </div>
          </div>

          <!-- Benefits Grid -->
          <section class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="(item, index) in benefits"
              :key="item.title"
              v-reveal="{ delay: index * 100 + 500 }"
              class="premium-card rounded-[2.5rem] bg-white p-8 shadow-premium-md transition-all hover:shadow-premium-xl hover:scale-105"
            >
              <div class="mb-6 grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <UIcon
                  :name="item.icon"
                  class="size-7"
                />
              </div>
              <h3 class="text-xl font-black tracking-tight text-highlighted">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm font-medium leading-relaxed text-muted">
                {{ item.desc }}
              </p>
            </div>
          </section>

          <!-- Quote Section -->
          <section
            v-reveal="{ delay: 800 }"
            class="glass-premium rounded-[3rem] p-10 text-center shadow-premium-lg lg:p-20"
          >
            <UIcon
              name="i-lucide-quote"
              class="size-12 text-brand-200"
            />
            <h2 class="mx-auto mt-8 max-w-3xl text-3xl font-bold leading-tight text-highlighted lg:text-4xl">
              "{{ tr('The platform makes it effortless to manage my students and focus on what I love most: teaching.', 'แพลตฟอร์มนี้ช่วยให้การจัดการนักเรียนเป็นเรื่องง่าย ทำให้ผมโฟกัสกับสิ่งที่รักที่สุดได้ นั่นคือการสอน') }}"
            </h2>
            <div class="mt-10 flex items-center justify-center gap-4">
              <div class="size-12 rounded-full bg-slate-200" />
              <div class="text-left">
                <p class="text-base font-black text-highlighted">Dr. James Wilson</p>
                <p class="text-xs font-bold uppercase tracking-widest text-dimmed">Senior Physics Mentor</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Registration Form (Hidden by default) -->
        <div
          v-else
          class="mx-auto w-full max-w-5xl space-y-12"
        >
          <header v-reveal>
            <button
              class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-primary shadow-premium-sm ring-1 ring-primary/10 transition-all hover:bg-primary hover:text-white"
              @click="showForm = false"
            >
              <UIcon
                name="i-lucide-arrow-left"
                class="size-3"
              />
              {{ tr('Back to overview', 'กลับไปหน้าภาพรวม') }}
            </button>
            <h1 class="text-4xl font-black tracking-tight text-highlighted sm:text-6xl">
              <BlurText
                :text="tr('Join the Elite Circle', 'สมัครเป็นติวเตอร์ระดับแนวหน้า')"
                :animate-on-scroll="false"
              />
            </h1>
            <p class="mt-4 max-w-2xl text-lg font-medium text-muted lg:text-xl">
              {{ tr('Please provide your professional details below. Your application will be reviewed by our curation team.', 'กรุณาระบุรายละเอียดความเป็นมืออาชีพของคุณด้านล่าง ใบสมัครจะได้รับการตรวจสอบโดยทีมงานของเรา') }}
            </p>
          </header>

          <div class="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div class="space-y-10">
              <!-- Section 1: Account -->
              <section
                v-reveal
                class="glass-premium rounded-[2.5rem] p-8 shadow-premium-lg lg:p-12"
              >
                <div class="mb-10 flex items-center gap-4">
                  <div class="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-premium-md">
                    <UIcon
                      name="i-lucide-key-round"
                      class="size-6"
                    />
                  </div>
                  <div>
                    <h2 class="text-2xl font-black text-highlighted">
                      {{ tr('Security & Access', 'ความปลอดภัยและเข้าถึง') }}
                    </h2>
                    <p class="text-sm font-medium text-muted">
                      {{ tr('Credentials to manage your professional profile.', 'ข้อมูลสำหรับการเข้าจัดการโปรไฟล์มืออาชีพของคุณ') }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div class="grid gap-2">
                    <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Email Address', 'อีเมล') }}</label>
                    <UInput
                      class="premium-input"
                      size="xl"
                      icon="i-lucide-mail"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div class="grid gap-2">
                    <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Password', 'รหัสผ่าน') }}</label>
                    <UInput
                      class="premium-input"
                      size="xl"
                      icon="i-lucide-lock"
                      type="password"
                    />
                  </div>
                  <div class="grid gap-2">
                    <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Confirm', 'ยืนยันรหัสผ่าน') }}</label>
                    <UInput
                      class="premium-input"
                      size="xl"
                      icon="i-lucide-lock-keyhole"
                      type="password"
                    />
                  </div>
                </div>
              </section>

              <!-- Section 2: Personal -->
              <section
                v-reveal
                class="glass-premium rounded-[2.5rem] p-8 shadow-premium-lg lg:p-12"
              >
                <div class="mb-10 flex items-center gap-4">
                  <div class="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-premium-md">
                    <UIcon
                      name="i-lucide-user-round"
                      class="size-6"
                    />
                  </div>
                  <div>
                    <h2 class="text-2xl font-black text-highlighted">
                      {{ tr('Personal Identity', 'ข้อมูลส่วนตัว') }}
                    </h2>
                    <p class="text-sm font-medium text-muted">
                      {{ tr('Tell us who you are and how we can reach you.', 'บอกเราว่าคุณคือใครและเราจะติดต่อคุณได้อย่างไร') }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-8">
                  <div class="grid gap-6 sm:grid-cols-4">
                    <div class="grid gap-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('First Name', 'ชื่อ') }}</label>
                      <UInput
                        class="premium-input"
                        size="xl"
                      />
                    </div>
                    <div class="grid gap-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Last Name', 'นามสกุล') }}</label>
                      <UInput
                        class="premium-input"
                        size="xl"
                      />
                    </div>
                    <div class="grid gap-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Nickname', 'ชื่อเล่น') }}</label>
                      <UInput
                        class="premium-input"
                        size="xl"
                      />
                    </div>
                    <div class="grid gap-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Gender', 'เพศ') }}</label>
                      <USelect
                        class="premium-input"
                        size="xl"
                        :items="genders"
                      />
                    </div>
                  </div>

                  <div class="grid gap-6 sm:grid-cols-3">
                    <div class="grid gap-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Birth Date', 'วันเกิด') }}</label>
                      <UInput
                        class="premium-input"
                        size="xl"
                        icon="i-lucide-calendar"
                      />
                    </div>
                    <div class="grid gap-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Mobile', 'เบอร์โทรศัพท์') }}</label>
                      <UInput
                        class="premium-input"
                        size="xl"
                        icon="i-lucide-phone"
                      />
                    </div>
                    <div class="grid gap-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Line ID', 'ไลน์ไอดี') }}</label>
                      <UInput
                        class="premium-input"
                        size="xl"
                        icon="i-lucide-message-circle"
                      />
                    </div>
                  </div>

                  <div class="grid gap-6 sm:grid-cols-12">
                    <div class="grid gap-2 sm:col-span-12">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Current Address', 'ที่อยู่') }}</label>
                      <UTextarea
                        class="premium-input"
                        :rows="2"
                      />
                    </div>
                    <div class="grid gap-2 sm:col-span-4">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Sub-district', 'แขวง/ตำบล') }}</label>
                      <UInput class="premium-input" />
                    </div>
                    <div class="grid gap-2 sm:col-span-4">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('District', 'เขต/อำเภอ') }}</label>
                      <UInput class="premium-input" />
                    </div>
                    <div class="grid gap-2 sm:col-span-4">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Province', 'จังหวัด') }}</label>
                      <USelect
                        class="premium-input"
                        :items="provinces"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <!-- Section 3: Education -->
              <section
                v-reveal
                class="glass-premium rounded-[2.5rem] p-8 shadow-premium-lg lg:p-12"
              >
                <div class="mb-10 flex items-center gap-4">
                  <div class="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-premium-md">
                    <UIcon
                      name="i-lucide-graduation-cap"
                      class="size-6"
                    />
                  </div>
                  <div>
                    <h2 class="text-2xl font-black text-highlighted">
                      {{ tr('Academic Excellence', 'ประวัติการศึกษา') }}
                    </h2>
                    <p class="text-sm font-medium text-muted">
                      {{ tr('Highlight your qualifications and educational journey.', 'ระบุวุฒิการศึกษาและประวัติการเรียนที่ผ่านมาของคุณ') }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-10">
                  <div class="grid gap-6 rounded-[2rem] bg-brand-50/40 p-6 ring-1 ring-brand-100 lg:p-8">
                    <p class="text-[11px] font-black uppercase tracking-widest text-brand-600">
                      {{ tr('High School Information', 'มัธยมศึกษา') }}
                    </p>
                    <div class="grid gap-6 sm:grid-cols-3">
                      <UInput
                        class="premium-input"
                        icon="i-lucide-school"
                        :placeholder="tr('School Name', 'โรงเรียน')"
                      />
                      <UInput
                        class="premium-input"
                        :placeholder="tr('Major', 'สายการเรียน')"
                      />
                      <UInput
                        class="premium-input"
                        type="number"
                        step="0.01"
                        :placeholder="tr('GPA', 'เกรดเฉลี่ย')"
                      />
                    </div>
                  </div>

                  <div class="grid gap-6 rounded-[2rem] bg-accent-50/40 p-6 ring-1 ring-accent-100 lg:p-8">
                    <p class="text-[11px] font-black uppercase tracking-widest text-accent-600">
                      {{ tr('University Information', 'มหาวิทยาลัย') }}
                    </p>
                    <div class="grid gap-6 sm:grid-cols-2">
                      <USelect
                        class="premium-input"
                        :items="degreeOptions"
                        :placeholder="tr('Degree', 'ระดับการศึกษา')"
                      />
                      <UInput
                        class="premium-input"
                        icon="i-lucide-building-2"
                        :placeholder="tr('University Name', 'มหาวิทยาลัย')"
                      />
                      <UInput
                        class="premium-input"
                        :placeholder="tr('Faculty', 'คณะ')"
                      />
                      <UInput
                        class="premium-input"
                        :placeholder="tr('Major', 'สาขา')"
                      />
                      <USelect
                        class="premium-input"
                        :items="yearOptions"
                        :placeholder="tr('Current Year', 'ชั้นปี')"
                      />
                      <UInput
                        class="premium-input"
                        type="number"
                        step="0.01"
                        :placeholder="tr('Current GPA', 'เกรดเฉลี่ย')"
                      />
                    </div>
                  </div>

                  <div class="rounded-[2rem] border border-default p-8 transition-all hover:bg-white/50">
                    <div class="flex items-center justify-between gap-4">
                      <div>
                        <h4 class="text-base font-bold text-highlighted">
                          {{ tr('Post-graduate or Special Certifications?', 'มีวุฒิการศึกษาระดับสูงเพิ่มเติมหรือไม่?') }}
                        </h4>
                        <p class="text-sm font-medium text-muted">
                          {{ tr('Include Master, PhD, or specific professional licenses.', 'เช่น ปริญญาโท, ปริญญาเอก หรือใบอนุญาตวิชาชีพเฉพาะทาง') }}
                        </p>
                      </div>
                      <div class="flex gap-4">
                        <UButton
                          v-for="val in [true, false]"
                          :key="val.toString()"
                          :label="val ? tr('Yes', 'ใช่') : tr('No', 'ไม่ใช่')"
                          :color="hasAdditionalEducation === val ? 'primary' : 'neutral'"
                          :variant="hasAdditionalEducation === val ? 'solid' : 'outline'"
                          class="rounded-full px-6 font-bold"
                          @click="hasAdditionalEducation = val"
                        />
                      </div>
                    </div>

                    <Transition name="auth-form">
                      <div
                        v-if="hasAdditionalEducation"
                        class="mt-8 grid gap-6"
                      >
                        <UInput
                          class="premium-input"
                          size="xl"
                          :placeholder="tr('Name of Qualification', 'ชื่อคุณวุฒิ / ใบรับรอง')"
                        />
                        <label class="grid min-h-20 cursor-pointer place-items-center rounded-[1.5rem] border-2 border-dashed border-sky-200 bg-sky-50/20 transition-all hover:border-primary/60 hover:bg-white">
                          <input
                            type="file"
                            class="sr-only"
                            @change="handleNamedFileChange($event, 'additionalEducation')"
                          >
                          <span class="flex items-center gap-3">
                            <UIcon
                              name="i-lucide-upload-cloud"
                              class="size-6 text-primary"
                            />
                            <span class="text-sm font-bold text-slate-700">{{ additionalEducationFileName || tr('Click to upload supporting evidence', 'คลิกเพื่ออัปโหลดหลักฐาน') }}</span>
                          </span>
                        </label>
                      </div>
                    </Transition>
                  </div>
                </div>
              </section>

              <!-- Section 4: Tutor Info -->
              <section
                v-reveal
                class="glass-premium rounded-[2.5rem] p-8 shadow-premium-lg lg:p-12"
              >
                <div class="mb-10 flex items-center gap-4">
                  <div class="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-premium-md">
                    <UIcon
                      name="i-lucide-presentation"
                      class="size-6"
                    />
                  </div>
                  <div>
                    <h2 class="text-2xl font-black text-highlighted">
                      {{ tr('Teaching Profile', 'โปรไฟล์การสอน') }}
                    </h2>
                    <p class="text-sm font-medium text-muted">
                      {{ tr('Define your expertise and teaching style.', 'กำหนดวิชาที่คุณเชี่ยวชาญและสไตล์การสอน') }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-10">
                  <div class="grid gap-8 lg:grid-cols-2">
                    <div class="space-y-4">
                      <p class="text-[11px] font-black uppercase tracking-widest text-dimmed">
                        {{ tr('Primary Subjects', 'วิชาที่สอน') }}
                      </p>
                      <div class="flex flex-wrap gap-2.5">
                        <button
                          v-for="subject in subjectOptions"
                          :key="subject"
                          type="button"
                          :class="[
                            'rounded-xl border px-4 py-2.5 text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.97]',
                            selectedSubjects.includes(subject)
                              ? 'border-brand-500 bg-brand-500 text-white shadow-premium'
                              : 'border-default bg-white text-toned hover:border-brand-300'
                          ]"
                          @click="toggleSubject(subject)"
                        >
                          {{ subject }}
                        </button>
                        <button class="rounded-xl border border-dashed border-primary/40 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/5">
                          + {{ tr('Other', 'อื่นๆ') }}
                        </button>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <p class="text-[11px] font-black uppercase tracking-widest text-dimmed">
                        {{ tr('Fluency in Languages', 'ภาษาต่างประเทศที่คล่องแคล่ว') }}
                      </p>
                      <div class="flex flex-wrap gap-2.5">
                        <button
                          v-for="language in languageOptions"
                          :key="language"
                          type="button"
                          :class="[
                            'rounded-xl border px-4 py-2.5 text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.97]',
                            selectedLanguages.includes(language)
                              ? 'border-accent-500 bg-accent-500 text-white shadow-premium'
                              : 'border-default bg-white text-toned hover:border-brand-300'
                          ]"
                          @click="toggleLanguage(language)"
                        >
                          {{ language }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="grid gap-6 sm:grid-cols-3">
                    <div class="grid gap-2 sm:col-span-2">
                      <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Teaching Experience', 'ประสบการณ์สอน') }}</label>
                      <UTextarea
                        class="premium-input"
                        :rows="4"
                        :placeholder="tr('Describe your history, success stories, and methodology...', 'อธิบายประวัติ ผลงานที่ผ่านมา และสไตล์การสอนของคุณ...')"
                      />
                    </div>
                    <div class="grid gap-6">
                      <div class="grid gap-2">
                        <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Expected Rate', 'ราคาต่อชั่วโมง') }}</label>
                        <UInput
                          class="premium-input"
                          size="xl"
                          icon="i-lucide-badge-dollar-sign"
                          placeholder="THB / Hour"
                        />
                      </div>
                      <div class="grid gap-2">
                        <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Format', 'รูปแบบการสอน') }}</label>
                        <USelect
                          class="premium-input"
                          size="xl"
                          :items="teachingModes"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="grid gap-2">
                    <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">{{ tr('Preferred Locations', 'สถานที่สอนที่สะดวก') }}</label>
                    <UInput
                      class="premium-input"
                      size="xl"
                      icon="i-lucide-map-pin"
                      :placeholder="tr('e.g. Siam, Online, Bangna...', 'เช่น สยาม, ออนไลน์, บางนา...')"
                    />
                  </div>
                </div>
              </section>

              <!-- Section 5: Verification -->
              <section
                v-reveal
                class="glass-premium rounded-[2.5rem] p-8 shadow-premium-lg lg:p-12"
              >
                <div class="mb-10 flex items-center gap-4">
                  <div class="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-premium-md">
                    <UIcon
                      name="i-lucide-shield-check"
                      class="size-6"
                    />
                  </div>
                  <div>
                    <h2 class="text-2xl font-black text-highlighted">
                      {{ tr('Document Verification', 'การยืนยันตัวตนและเอกสาร') }}
                    </h2>
                    <p class="text-sm font-medium text-muted">
                      {{ tr('Ensure high trust levels with verified credentials.', 'สร้างความเชื่อถือสูงสุดด้วยเอกสารที่ผ่านการรับรอง') }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-8">
                  <div class="grid gap-6 sm:grid-cols-3">
                    <label class="group grid cursor-pointer gap-4 rounded-[2rem] border-2 border-dashed border-default bg-white p-8 transition-all hover:border-brand-400 hover:bg-brand-50/30">
                      <input
                        type="file"
                        class="sr-only"
                        @change="handleNamedFileChange($event, 'idCard')"
                      >
                      <div class="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-transform group-hover:scale-110">
                        <UIcon
                          name="i-lucide-id-card"
                          class="size-7"
                        />
                      </div>
                      <div>
                        <p class="text-base font-black text-highlighted truncate">{{ idCardFileName || tr('ID / Student Card', 'บัตรประชาชน') }}</p>
                        <p class="mt-1 text-xs font-bold text-brand-600 uppercase tracking-widest">{{ tr('Required', 'จำเป็น') }}</p>
                      </div>
                    </label>

                    <label class="group grid cursor-pointer gap-4 rounded-[2rem] border-2 border-dashed border-default bg-white p-8 transition-all hover:border-brand-400 hover:bg-brand-50/30">
                      <input
                        type="file"
                        class="sr-only"
                        @change="handleNamedFileChange($event, 'transcript')"
                      >
                      <div class="grid size-14 place-items-center rounded-2xl bg-slate-50 text-slate-600 ring-1 ring-slate-100 transition-transform group-hover:scale-110">
                        <UIcon
                          name="i-lucide-file-text"
                          class="size-7"
                        />
                      </div>
                      <div>
                        <p class="text-base font-black text-highlighted truncate">{{ transcriptFileName || tr('Academic Transcript', 'ใบเกรด') }}</p>
                        <p class="mt-1 text-xs font-bold text-dimmed uppercase tracking-widest">{{ tr('Recommended', 'แนะนำ') }}</p>
                      </div>
                    </label>

                    <label class="group grid cursor-pointer gap-4 rounded-[2rem] border-2 border-dashed border-default bg-white p-8 transition-all hover:border-brand-400 hover:bg-brand-50/30">
                      <input
                        type="file"
                        class="sr-only"
                        @change="handleNamedFileChange($event, 'portfolio')"
                      >
                      <div class="grid size-14 place-items-center rounded-2xl bg-slate-50 text-slate-600 ring-1 ring-slate-100 transition-transform group-hover:scale-110">
                        <UIcon
                          name="i-lucide-award"
                          class="size-7"
                        />
                      </div>
                      <div>
                        <p class="text-base font-black text-highlighted truncate">{{ portfolioFileName || tr('Portfolio / Certs', 'ผลงาน') }}</p>
                        <p class="mt-1 text-xs font-bold text-dimmed uppercase tracking-widest">{{ tr('Optional', 'ถ้ามี') }}</p>
                      </div>
                    </label>
                  </div>

                  <div class="rounded-2xl border border-border-muted bg-muted/30 p-6 text-center">
                    <p class="text-sm font-medium leading-relaxed text-muted">
                      {{ tr('By clicking apply, you agree to our professional code of conduct and confirm that all information provided is true and accurate.', 'การกดสมัครถือว่าคุณยอมรับจรรยาบรรณวิชาชีพและยืนยันว่าข้อมูลทั้งหมดเป็นความจริง') }}
                    </p>
                  </div>

                  <UButton
                    :label="tr('Submit Application', 'ส่งใบสมัครติวเตอร์')"
                    size="xl"
                    class="rounded-full py-8 text-xl font-black shadow-premium-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  />
                </div>
              </section>
            </div>

            <!-- Sidebar Sticky Tips -->
            <aside class="hidden lg:block">
              <div class="sticky top-24 space-y-6">
                <div class="premium-card rounded-[2.5rem] bg-highlighted p-8 text-white shadow-premium-xl">
                  <UIcon
                    name="i-lucide-lightbulb"
                    class="size-8 text-brand-400"
                  />
                  <h3 class="mt-4 text-xl font-black">
                    {{ tr('Pro Tips', 'เคล็ดลับมือโปร') }}
                  </h3>
                  <ul class="mt-6 space-y-4 text-sm font-medium text-white/80">
                    <li class="flex gap-3">
                      <span class="font-bold text-brand-400">•</span>
                      {{ tr('Clear profile photos increase trust by 40%.', 'รูปโปรไฟล์ที่ชัดเจนเพิ่มความเชื่อมั่นได้ 40%') }}
                    </li>
                    <li class="flex gap-3">
                      <span class="font-bold text-brand-400">•</span>
                      {{ tr('Detailed teaching history helps parents choose faster.', 'ประวัติการสอนที่ละเอียดช่วยให้ตัดสินใจง่ายขึ้น') }}
                    </li>
                  </ul>
                </div>

                <div class="premium-card rounded-[2.5rem] border border-border-muted bg-white p-8 shadow-premium">
                  <h4 class="text-xs font-black uppercase tracking-widest text-dimmed">
                    {{ tr('Need Help?', 'ต้องการความช่วยเหลือ?') }}
                  </h4>
                  <p class="mt-3 text-sm font-bold text-toned">
                    support@tutorly.test
                  </p>
                  <UButton
                    variant="link"
                    :label="tr('Read FAQs', 'อ่านคำถามที่พบบ่อย')"
                    class="mt-4 p-0 font-bold text-brand-600"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Transition>
    </UContainer>
  </div>
</template>

<style scoped>
.glass-premium {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
