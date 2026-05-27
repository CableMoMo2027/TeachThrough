<script setup lang="ts">
import type { Ref } from 'vue'

const { tr, pick } = useAppLocale()

type TutorDocumentKey = 'additionalEducation' | 'idCard' | 'transcript' | 'portfolio'

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

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <UCard
    class="premium-card mx-auto w-full max-w-2xl bg-elevated/95 shadow-xl backdrop-blur"
    :ui="{
      header: 'px-5 py-4 sm:px-8 border-b border-muted',
      body: 'px-5 py-8 sm:px-10'
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-black text-highlighted">
            <BlurText :text="tr('Tutor Registration', 'สมัครสมาชิกติวเตอร์')" :animate-on-scroll="false" />
          </h1>
          <p class="mt-1 text-sm text-dimmed">
            {{ tr('Join our elite educator community step by step.', 'เข้าร่วมเป็นครูระดับหัวกะทิทีละขั้นตอน') }}
          </p>
        </div>
        <UIcon name="i-lucide-graduation-cap" class="size-8 text-primary" />
      </div>
    </template>

    <div class="mt-4">
      <Stepper
        step-circle-container-class-name="!max-w-none !rounded-[1rem] !bg-brand-50/30 !p-4 !shadow-none !border-none !mb-10"
        :back-button-text="tr('Back', 'ย้อนกลับ')"
        :next-button-text="tr('Continue', 'ต่อไป')"
        complete-button-text="Finish Application"
        :lock-on-complete="false"
      >
        <!-- Step 1: Account -->
        <div class="grid gap-6">
          <div class="mb-4">
            <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
              {{ tr('Account Access', 'ข้อมูลเข้าสู่ระบบ') }}
            </h2>
            <p class="text-sm font-medium text-muted">Create your professional credentials.</p>
          </div>
          <div class="grid gap-5">
            <div class="grid gap-1.5">
              <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">Email address</label>
              <UInput class="premium-input" size="xl" icon="i-lucide-mail" placeholder="email@example.com" />
            </div>
            <div class="grid gap-1.5">
              <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">Password</label>
              <UInput class="premium-input" size="xl" icon="i-lucide-lock" type="password" />
            </div>
            <div class="grid gap-1.5">
              <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">Confirm Password</label>
              <UInput class="premium-input" size="xl" icon="i-lucide-lock-keyhole" type="password" />
            </div>
          </div>
        </div>

        <!-- Step 2: Personal -->
        <div class="grid gap-6">
          <div class="mb-4">
            <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
              {{ tr('Personal Details', 'ข้อมูลส่วนตัว') }}
            </h2>
            <p class="text-sm font-medium text-muted">Let us know more about you.</p>
          </div>
          <div class="grid gap-5">
            <div class="grid gap-4 sm:grid-cols-2">
              <UInput class="premium-input" size="xl" :placeholder="tr('First Name', 'ชื่อ')" />
              <UInput class="premium-input" size="xl" :placeholder="tr('Last Name', 'นามสกุล')" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <UInput class="premium-input" size="xl" :placeholder="tr('Nickname', 'ชื่อเล่น')" />
              <USelect class="premium-input" size="xl" :items="genders" :placeholder="tr('Gender', 'เพศ')" />
            </div>
            <UInput class="premium-input" size="xl" icon="i-lucide-smartphone" :placeholder="tr('Mobile Number', 'เบอร์โทรศัพท์')" />
            <UInput class="premium-input" size="xl" icon="i-lucide-message-circle" :placeholder="tr('Line ID', 'ไลน์ไอดี')" />
          </div>
        </div>

        <!-- Step 3: Education -->
        <div class="grid gap-6">
          <div class="mb-4">
            <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
              {{ tr('Education', 'ประวัติการศึกษา') }}
            </h2>
            <p class="text-sm font-medium text-muted">Your academic background and qualifications.</p>
          </div>
          <div class="grid gap-5">
            <div class="rounded-2xl border border-sky-100 bg-sky-50/30 p-5">
              <p class="mb-4 text-[10px] font-black uppercase tracking-widest text-brand-600">University Details</p>
              <div class="grid gap-4">
                <USelect class="premium-input" :items="degreeOptions" :placeholder="tr('Degree', 'ระดับการศึกษา')" />
                <UInput class="premium-input" icon="i-lucide-building-2" :placeholder="tr('University Name', 'มหาวิทยาลัย')" />
                <div class="grid gap-4 sm:grid-cols-2">
                  <UInput class="premium-input" :placeholder="tr('Faculty', 'คณะ')" />
                  <UInput class="premium-input" :placeholder="tr('Major', 'สาขา')" />
                </div>
              </div>
            </div>
            <div class="rounded-2xl border border-default p-5 transition-all hover:bg-white/60">
              <p class="text-sm font-bold text-highlighted">{{ tr('Any additional qualifications?', 'มีคุณวุฒิอื่นๆ เพิ่มเติมไหม?') }}</p>
              <div class="mt-4 flex gap-6">
                <label class="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-muted">
                  <input v-model="hasAdditionalEducation" type="radio" :value="true" class="size-4 accent-primary">
                  {{ tr('Yes', 'ใช่') }}
                </label>
                <label class="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-muted">
                  <input v-model="hasAdditionalEducation" type="radio" :value="false" class="size-4 accent-primary">
                  {{ tr('No', 'ไม่ใช่') }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Profile -->
        <div class="grid gap-6">
          <div class="mb-4">
            <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
              {{ tr('Teaching Profile', 'โปรไฟล์การสอน') }}
            </h2>
            <p class="text-sm font-medium text-muted">Define your expertise and methodology.</p>
          </div>
          <div class="grid gap-5">
            <div class="grid gap-2.5">
              <label class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">Subjects</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="subject in subjectOptions"
                  :key="subject"
                  type="button"
                  :class="[
                    'rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all',
                    selectedSubjects.includes(subject)
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-sky-100 bg-white text-slate-600'
                  ]"
                  @click="toggleSubject(subject)"
                >
                  {{ subject }}
                </button>
              </div>
            </div>
            <UTextarea class="premium-input" :rows="3" :placeholder="tr('Describe your experience...', 'อธิบายประสบการณ์สอน...')" />
            <div class="grid gap-4 sm:grid-cols-2">
              <UInput class="premium-input" icon="i-lucide-badge-dollar-sign" :placeholder="tr('Hourly Rate', 'ราคาต่อชั่วโมง')" />
              <USelect class="premium-input" :items="teachingModes" :placeholder="tr('Format', 'รูปแบบ')" />
            </div>
          </div>
        </div>

        <!-- Step 5: Verification -->
        <div class="grid gap-6">
          <div class="mb-4">
            <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
              {{ tr('Verification', 'การยืนยัน') }}
            </h2>
            <p class="text-sm font-medium text-muted">Upload your documents to build trust.</p>
          </div>
          <div class="grid gap-4">
            <label class="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-sky-200 bg-sky-50/20 p-4 transition-all hover:bg-white">
              <input type="file" class="sr-only" @change="handleNamedFileChange($event, 'idCard')">
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-id-card" class="size-6 text-primary" />
                <span class="text-sm font-bold text-slate-700 truncate">{{ idCardFileName || tr('ID Card *', 'บัตรประชาชน *') }}</span>
              </div>
              <UBadge label="Required" size="sm" variant="subtle" class="rounded-full bg-brand-100 text-brand-700" />
            </label>

            <label class="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-200 bg-white p-4 transition-all hover:bg-slate-50">
              <input type="file" class="sr-only" @change="handleNamedFileChange($event, 'transcript')">
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-file-text" class="size-6 text-slate-400" />
                <span class="text-sm font-bold text-slate-600 truncate">{{ transcriptFileName || tr('Transcript', 'ใบเกรด') }}</span>
              </div>
              <span class="text-[10px] font-black uppercase text-dimmed">Optional</span>
            </label>

            <div class="mt-4 rounded-2xl bg-muted/40 p-5 text-center">
              <label class="inline-flex cursor-pointer items-start gap-3 text-left">
                <input type="checkbox" class="mt-1 size-4 accent-primary shrink-0">
                <span class="text-xs font-medium leading-relaxed text-muted">
                  {{ tr('I confirm that all information is accurate and agree to the professional code of conduct.', 'ฉันยืนยันว่าข้อมูลถูกต้องและยอมรับจรรยาบรรณวิชาชีพ') }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </Stepper>
    </div>

    <p class="mt-10 text-center text-sm text-muted">
      {{ tr('Already have an account?', 'มีบัญชีอยู่แล้ว?') }}
      <NuxtLink to="/auth/sign-in" class="font-bold text-primary hover:underline">
        {{ tr('Sign In', 'เข้าสู่ระบบ') }}
      </NuxtLink>
    </p>
  </UCard>
</template>
