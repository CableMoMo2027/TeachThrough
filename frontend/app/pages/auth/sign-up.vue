<script setup lang="ts">
import type { Ref } from 'vue'

const { tr, pick } = useAppLocale()

type TutorDocumentKey = 'additionalEducation' | 'idCard' | 'transcript' | 'portfolio'

const accountTypes = computed(() => [
  {
    label: tr('Parent', 'ผู้ปกครอง'),
    value: 'Parent Registration',
    icon: 'i-lucide-users'
  },
  {
    label: tr('Student', 'นักเรียน'),
    value: 'Student Registration',
    icon: 'i-lucide-graduation-cap'
  },
  {
    label: tr('Tutor', 'ติวเตอร์'),
    value: 'Tutor Registration',
    icon: 'i-lucide-presentation'
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

const accountType = ref('Parent Registration')
const hasAdditionalEducation = ref(false)
const selectedSubjects = ref<string[]>([])
const selectedLanguages = ref<string[]>([])
const additionalEducationFileName = ref('')
const idCardFileName = ref('')
const transcriptFileName = ref('')
const portfolioFileName = ref('')
const isTutorRegistration = computed(() => accountType.value === 'Tutor Registration')

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
  <UCard
    class="premium-card w-full max-w-6xl bg-elevated/95 shadow-xl backdrop-blur mx-auto"
    :class="{ 'max-w-lg': !isTutorRegistration }"
    :ui="{
      header: 'px-5 py-4 sm:px-8 border-b border-muted',
      body: 'px-5 py-8 sm:px-10'
    }"
  >
    <template #header>
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          {{ tr('Sign Up', 'สมัครสมาชิก') }}
        </h1>
        <p class="mt-1 text-sm text-dimmed">
          {{ tr('Create an account as a parent, student, or tutor.', 'สร้างบัญชีสำหรับผู้ปกครอง นักเรียน หรือติวเตอร์') }}
        </p>
      </div>
    </template>

    <div class="grid gap-6">
      <!-- Account Type Selection -->
      <div class="grid gap-2 sm:grid-cols-3">
        <button
          v-for="type in accountTypes"
          :key="type.value"
          type="button"
          :class="[
            'inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-bold outline outline-1 outline-offset-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
            accountType === type.value
              ? 'border-primary bg-primary/10 text-primary outline-primary/45'
              : 'border-slate-200 bg-elevated text-muted outline-slate-100 hover:border-slate-300'
          ]"
          @click="accountType = type.value"
        >
          <UIcon
            :name="type.icon"
            class="size-4"
          />
          <span>{{ type.label }}</span>
        </button>
      </div>

      <!-- Simple Registration (Parent/Student) -->
      <template v-if="!isTutorRegistration">
        <div class="grid gap-4 sm:grid-cols-2">
          <UInput
            class="premium-input"
            :placeholder="tr('First name', 'ชื่อ')"
          />
          <UInput
            class="premium-input"
            :placeholder="tr('Last name', 'นามสกุล')"
          />
        </div>
        <UInput
          class="premium-input"
          icon="i-lucide-mail"
          :placeholder="tr('Email address', 'อีเมล')"
        />
        <UInput
          class="premium-input"
          icon="i-lucide-lock"
          :placeholder="tr('Password', 'รหัสผ่าน')"
          type="password"
        />
        <UButton
          :label="tr('Create Account', 'สร้างบัญชี')"
          block
          size="xl"
          class="shadow-premium-md hover:shadow-premium-lg mt-2"
        />
      </template>

      <!-- Detailed Registration (Tutor) - Long Form -->
      <Transition name="auth-form">
        <div
          v-if="isTutorRegistration"
          class="grid gap-12"
        >
          <p class="rounded-[1rem] bg-sky-50/70 px-5 py-4 text-sm font-semibold leading-relaxed text-slate-600 ring-1 ring-sky-100">
            {{ tr('Please provide all details below. We will verify your profile before it becomes visible to students.', 'กรุณาระบุรายละเอียดทั้งหมดด้านล่าง เราจะตรวจสอบโปรไฟล์ของคุณก่อนแสดงผลให้นักเรียนเห็น') }}
          </p>

          <!-- Section 1: Account -->
          <section class="grid gap-5">
            <div class="flex items-center gap-3">
              <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <span class="text-sm font-black">01</span>
              </div>
              <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                {{ tr('Account Information', 'ข้อมูลบัญชี') }}
              </h2>
            </div>
            <div class="grid gap-4 sm:grid-cols-3">
              <UInput
                class="premium-input"
                icon="i-lucide-mail"
                :placeholder="tr('Email address *', 'อีเมล *')"
              />
              <UInput
                class="premium-input"
                icon="i-lucide-lock"
                :placeholder="tr('Password *', 'รหัสผ่าน *')"
                type="password"
              />
              <UInput
                class="premium-input"
                icon="i-lucide-lock-keyhole"
                :placeholder="tr('Confirm password *', 'ยืนยันรหัสผ่าน *')"
                type="password"
              />
            </div>
          </section>

          <!-- Section 2: Personal -->
          <section class="grid gap-6">
            <div class="flex items-center gap-3">
              <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <span class="text-sm font-black">02</span>
              </div>
              <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                {{ tr('Personal Information', 'ข้อมูลส่วนตัว') }}
              </h2>
            </div>
            <div class="grid gap-6">
              <div class="grid gap-4 sm:grid-cols-4">
                <UInput
                  class="premium-input"
                  :placeholder="tr('First name *', 'ชื่อ *')"
                />
                <UInput
                  class="premium-input"
                  :placeholder="tr('Last name *', 'นามสกุล *')"
                />
                <UInput
                  class="premium-input"
                  :placeholder="tr('Nickname *', 'ชื่อเล่น *')"
                />
                <USelect
                  class="premium-input"
                  :items="genders"
                  :placeholder="tr('Gender *', 'เพศ *')"
                />
              </div>
              <div class="grid gap-4 sm:grid-cols-3">
                <UInput
                  class="premium-input"
                  icon="i-lucide-calendar-days"
                  :placeholder="tr('Birth date *', 'วัน/เดือน/ปีเกิด *')"
                />
                <UInput
                  class="premium-input"
                  icon="i-lucide-smartphone"
                  :placeholder="tr('Mobile number *', 'เบอร์โทรศัพท์ *')"
                />
                <UInput
                  class="premium-input"
                  icon="i-lucide-message-circle"
                  :placeholder="tr('Line ID *', 'ไลน์ไอดี *')"
                />
              </div>
              <div class="grid gap-4 sm:grid-cols-12">
                <UTextarea
                  class="premium-input rounded-md sm:col-span-6 [&_textarea]:rounded-md"
                  :rows="2"
                  :placeholder="tr('Address *', 'ที่อยู่ *')"
                />
                <div class="grid gap-4 sm:col-span-6 sm:grid-cols-3">
                  <UInput
                    class="premium-input"
                    :placeholder="tr('Sub-district *', 'แขวง / ตำบล *')"
                  />
                  <UInput
                    class="premium-input"
                    :placeholder="tr('District *', 'เขต / อำเภอ *')"
                  />
                  <USelect
                    class="premium-input"
                    :items="provinces"
                    :placeholder="tr('Province *', 'จังหวัด *')"
                  />
                </div>
              </div>
            </div>
          </section>

          <!-- Section 3: Education -->
          <section class="grid gap-6">
            <div class="flex items-center gap-3">
              <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <span class="text-sm font-black">03</span>
              </div>
              <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                {{ tr('Education Background', 'ประวัติการศึกษา') }}
              </h2>
            </div>
            <div class="grid gap-8">
              <div class="grid gap-4 sm:grid-cols-3">
                <UInput
                  class="premium-input"
                  icon="i-lucide-school"
                  :placeholder="tr('High school name *', 'โรงเรียนมัธยมศึกษา *')"
                />
                <UInput
                  class="premium-input"
                  :placeholder="tr('High school major *', 'สายการเรียน *')"
                />
                <UInput
                  class="premium-input"
                  type="number"
                  step="0.01"
                  :placeholder="tr('High school GPA *', 'เกรดเฉลี่ยมัธยม *')"
                />
              </div>
              <div class="grid gap-4 sm:grid-cols-4">
                <USelect
                  class="premium-input"
                  :items="degreeOptions"
                  :placeholder="tr('University degree *', 'ระดับการศึกษา *')"
                />
                <UInput
                  class="premium-input"
                  icon="i-lucide-building-2"
                  :placeholder="tr('University *', 'มหาวิทยาลัย *')"
                />
                <UInput
                  class="premium-input"
                  :placeholder="tr('Faculty *', 'คณะ *')"
                />
                <UInput
                  class="premium-input"
                  :placeholder="tr('Major *', 'สาขา *')"
                />
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <USelect
                  class="premium-input"
                  :items="yearOptions"
                  :placeholder="tr('Year *', 'ชั้นปี *')"
                />
                <UInput
                  class="premium-input"
                  type="number"
                  step="0.01"
                  :placeholder="tr('University GPA *', 'เกรดเฉลี่ยมหาวิทยาลัย *')"
                />
              </div>

              <div class="rounded-[1.5rem] border border-sky-100 bg-sky-50/40 p-6">
                <p class="text-sm font-bold uppercase tracking-tight text-slate-700">
                  {{ tr('Additional higher education?', 'มีประวัติการศึกษาระดับสูงเพิ่มเติมหรือไม่?') }}
                </p>
                <div class="mt-4 flex gap-8 text-sm text-muted">
                  <label class="inline-flex cursor-pointer items-center gap-2 hover:text-primary font-semibold">
                    <input
                      v-model="hasAdditionalEducation"
                      type="radio"
                      :value="true"
                      name="hasMoreEducation"
                      class="size-4 accent-primary"
                    >
                    {{ tr('Yes', 'ใช่') }}
                  </label>
                  <label class="inline-flex cursor-pointer items-center gap-2 hover:text-primary font-semibold">
                    <input
                      v-model="hasAdditionalEducation"
                      type="radio"
                      :value="false"
                      name="hasMoreEducation"
                      class="size-4 accent-primary"
                    >
                    {{ tr('No', 'ไม่ใช่') }}
                  </label>
                </div>
                <div
                  v-if="hasAdditionalEducation"
                  class="mt-6 grid gap-4 sm:grid-cols-2"
                >
                  <UInput
                    class="premium-input"
                    :placeholder="tr('Certificate or qualification name', 'ชื่อวุฒิบัตรหรือคุณวุฒิ')"
                  />
                  <label class="grid min-h-14 cursor-pointer place-items-center rounded-xl border border-dashed border-sky-200 bg-white px-4 py-2 text-center transition-all hover:border-primary/60 hover:bg-primary/5">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      class="sr-only"
                      @change="handleNamedFileChange($event, 'additionalEducation')"
                    >
                    <span class="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                      <UIcon
                        name="i-lucide-upload"
                        class="size-5 shrink-0 text-primary"
                      />
                      <span class="truncate">{{ additionalEducationFileName || tr('Upload document', 'อัปโหลดหลักฐาน') }}</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 4: Tutor Info -->
          <section class="grid gap-6">
            <div class="flex items-center gap-3">
              <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <span class="text-sm font-black">04</span>
              </div>
              <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                {{ tr('Tutor Information', 'ข้อมูลการสอน') }}
              </h2>
            </div>
            <div class="grid gap-6">
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="grid gap-3">
                  <p class="text-sm font-bold text-muted uppercase tracking-wider">
                    {{ tr('Teaching Subjects', 'วิชาที่สอน') }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="subject in subjectOptions"
                      :key="subject"
                      type="button"
                      :class="[
                        'rounded-full border px-4 py-2 text-xs font-bold transition-all',
                        selectedSubjects.includes(subject)
                          ? 'border-primary bg-primary text-white shadow-md'
                          : 'border-sky-100 bg-white text-slate-600 hover:border-primary/50'
                      ]"
                      @click="toggleSubject(subject)"
                    >
                      {{ subject }}
                    </button>
                    <button
                      type="button"
                      class="rounded-full border border-dashed border-sky-200 px-4 py-2 text-xs font-bold text-primary hover:bg-sky-50"
                    >
                      + Add other
                    </button>
                  </div>
                </div>
                <div class="grid gap-3">
                  <p class="text-sm font-bold text-muted uppercase tracking-wider">
                    {{ tr('Foreign Languages', 'ภาษาต่างประเทศ') }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="language in languageOptions"
                      :key="language"
                      type="button"
                      :class="[
                        'rounded-full border px-4 py-2 text-xs font-bold transition-all',
                        selectedLanguages.includes(language)
                          ? 'border-accent-500 bg-accent-500 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-accent-300'
                      ]"
                      @click="toggleLanguage(language)"
                    >
                      {{ language }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="grid gap-4 sm:grid-cols-3">
                <UTextarea
                  class="premium-input !rounded-sm sm:col-span-2 focus-within:!rounded-sm"
                  :ui="{
                    root: '!rounded-sm',
                    base: '!rounded-sm resize-none'
                  }"
                  :rows="3"
                  :placeholder="tr('Tutor experience *', 'ประสบการณ์สอน *')"
                />
                <div class="grid gap-4">
                  <UInput
                    class="premium-input"
                    icon="i-lucide-badge-dollar-sign"
                    :placeholder="tr('Hourly rate *', 'ราคาต่อชั่วโมง *')"
                  />
                  <USelect
                    class="premium-input"
                    :items="teachingModes"
                    :placeholder="tr('Teaching mode *', 'รูปแบบการสอน *')"
                  />
                </div>
              </div>
              <UInput
                class="premium-input"
                :placeholder="tr('Preferred teaching location *', 'สถานที่สอนที่สะดวก *')"
              />
            </div>
          </section>

          <!-- Section 5: Verification -->
          <section class="grid gap-6">
            <div class="flex items-center gap-3">
              <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <span class="text-sm font-black">05</span>
              </div>
              <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                {{ tr('Upload Documents & Confirm', 'อัปโหลดเอกสารและยืนยัน') }}
              </h2>
            </div>
            <div class="grid gap-8">
              <div class="grid gap-3 sm:grid-cols-3">
                <label class="grid cursor-pointer gap-1.5 rounded-md border border-dashed border-sky-200 bg-sky-50/35 p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
                  <input
                    type="file"
                    class="sr-only"
                    @change="handleNamedFileChange($event, 'idCard')"
                  >
                  <span class="flex items-center justify-between">
                    <UIcon
                      name="i-lucide-id-card"
                      class="size-5 text-primary"
                    />
                    <span class="text-[10px] font-black uppercase text-primary">Required</span>
                  </span>
                  <p class="mt-2 text-sm font-bold text-slate-700 truncate">{{ idCardFileName || tr('ID Card *', 'บัตรประชาชน *') }}</p>
                  <p class="text-[11px] text-muted leading-tight">Clear JPG, PNG, or PDF</p>
                </label>

                <label class="grid cursor-pointer gap-1.5 rounded-md border border-dashed border-sky-200 bg-white p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
                  <input
                    type="file"
                    class="sr-only"
                    @change="handleNamedFileChange($event, 'transcript')"
                  >
                  <UIcon
                    name="i-lucide-file-text"
                    class="size-5 text-primary"
                  />
                  <p class="mt-2 text-sm font-bold text-slate-700 truncate">{{ transcriptFileName || tr('Transcript', 'ใบเกรด / ทรานสคริปต์') }}</p>
                  <p class="text-[11px] text-muted leading-tight">Optional supporting document</p>
                </label>

                <label class="grid cursor-pointer gap-1.5 rounded-md border border-dashed border-sky-200 bg-white p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
                  <input
                    type="file"
                    class="sr-only"
                    @change="handleNamedFileChange($event, 'portfolio')"
                  >
                  <UIcon
                    name="i-lucide-folder-check"
                    class="size-5 text-primary"
                  />
                  <p class="mt-2 text-sm font-bold text-slate-700 truncate">{{ portfolioFileName || tr('Portfolio', 'ผลงาน / แฟ้มสะสมงาน') }}</p>
                  <p class="text-[11px] text-muted leading-tight">Certificates or achievements</p>
                </label>
              </div>

              <div class="mx-auto grid w-full max-w-lg gap-5 text-center">
                <label class="inline-flex cursor-pointer items-start gap-3 text-left">
                  <input
                    type="checkbox"
                    class="mt-1 size-3 accent-primary shrink-0"
                  >
                  <span class="text-sm font-medium leading-relaxed text-muted">
                    {{ tr('I agree to the tutor terms and confirm that the information is accurate. I understand that my profile will be verified before being public.', 'ฉันยอมรับเงื่อนไขสำหรับติวเตอร์และขอยืนยันว่าข้อมูลถูกต้อง ฉันเข้าใจว่าโปรไฟล์จะถูกตรวจสอบก่อนแสดงผลต่อสาธารณะ') }}
                  </span>
                </label>

                <UButton
                  :label="tr('Submit Application', 'ส่งใบสมัครติวเตอร์')"
                  size="xl"
                  block
                  class="mt-2 shadow-premium-md hover:shadow-premium-lg"
                />
              </div>
            </div>
          </section>
        </div>
      </Transition>

      <div class="mx-auto grid w-full max-w-lg gap-6">
        <p class="text-center text-sm text-muted">
          {{ tr('Already have an account?', 'มีบัญชีอยู่แล้ว?') }}
          <NuxtLink
            to="/auth/sign-in"
            class="font-bold text-primary hover:underline"
          >
            {{ tr('Sign In', 'เข้าสู่ระบบ') }}
          </NuxtLink>
        </p>

        <USeparator :label="tr('or continue with', 'หรือสมัครด้วย')" />

        <div class="grid gap-2 sm:grid-cols-3">
          <UButton
            label="Google"
            icon="i-simple-icons-google"
            color="neutral"
            variant="outline"
            class="rounded-full"
          />
          <UButton
            label="Apple"
            icon="i-simple-icons-apple"
            color="neutral"
            variant="outline"
            class="rounded-full"
          />
          <UButton
            label="Facebook"
            icon="i-simple-icons-facebook"
            color="neutral"
            variant="outline"
            class="rounded-full"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
