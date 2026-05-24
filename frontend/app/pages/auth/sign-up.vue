<script setup lang="ts">
const { tr, pick } = useAppLocale()

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
const accountType = ref('Parent Registration')
const verificationFileName = ref('')
const isTutorRegistration = computed(() => accountType.value === 'Tutor Registration')

const handleVerificationFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  verificationFileName.value = input.files?.[0]?.name || ''
}
</script>

<template>
  <UCard
    class="max-h-[calc(100dvh-var(--ui-header-height)-0.75rem)] w-full max-w-lg overflow-y-auto bg-elevated/95 shadow-xl shadow-neutral-200/80 backdrop-blur"
    :ui="{
      header: 'px-5 py-3 sm:px-6',
      body: 'px-5 py-3 sm:px-6'
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
    <div class="grid gap-2.5">
      <div class="grid gap-2 sm:grid-cols-3">
        <button
          v-for="type in accountTypes"
          :key="type.value"
          type="button"
          :class="[
            'inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold outline outline-1 outline-offset-2 transition hover:border-primary/70 hover:bg-primary/5 hover:outline-primary/25',
            accountType === type.value
              ? 'border-primary bg-primary/10 text-primary outline-primary/45'
              : 'border-slate-300 bg-elevated text-muted outline-slate-200'
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
      <template v-if="!isTutorRegistration">
        <div class="grid gap-3 sm:grid-cols-2">
          <UInput :placeholder="tr('First name', 'ชื่อ')" />
          <UInput :placeholder="tr('Last name', 'นามสกุล')" />
        </div>
        <UInput
          icon="i-lucide-mail"
          :placeholder="tr('Email address', 'อีเมล')"
        />
        <UInput
          icon="i-lucide-lock"
          :placeholder="tr('Password', 'รหัสผ่าน')"
          type="password"
        />
      </template>

      <Transition name="auth-form">
        <div
          v-if="isTutorRegistration"
          class="rounded-[10px] border border-default bg-muted/70 p-1.5"
        >
          <Stepper
            step-circle-container-class-name="!max-w-none !rounded-[10px] !bg-white !p-2.5 !shadow-none"
            step-container-class-name="!mb-3"
            content-class-name="text-sm"
            footer-class-name="pt-0"
            :back-button-text="tr('Back', 'ย้อนกลับ')"
            :next-button-text="tr('Next', 'ถัดไป')"
            :lock-on-complete="false"
          >
            <div class="grid gap-2.5">
              <p class="text-sm font-semibold text-highlighted">
                {{ tr('Account information', 'ข้อมูลบัญชี') }}
              </p>
              <UInput
                icon="i-lucide-mail"
                :placeholder="tr('Email address *', 'อีเมล *')"
              />
              <UInput
                icon="i-lucide-lock"
                :placeholder="tr('Password *', 'รหัสผ่าน *')"
                type="password"
              />
              <UInput
                icon="i-lucide-lock-keyhole"
                :placeholder="tr('Confirm password *', 'ยืนยันรหัสผ่าน *')"
                type="password"
              />
            </div>

            <div class="grid gap-2.5">
              <p class="text-sm font-semibold text-highlighted">
                {{ tr('Personal information', 'ข้อมูลส่วนตัว') }}
              </p>
              <div class="grid gap-2.5 sm:grid-cols-2">
                <UInput :placeholder="tr('First name *', 'ชื่อ *')" />
                <UInput :placeholder="tr('Last name *', 'นามสกุล *')" />
              </div>
              <div class="grid gap-2.5 sm:grid-cols-2">
                <UInput :placeholder="tr('Nickname *', 'ชื่อเล่น *')" />
                <USelect
                  :items="genders"
                  :placeholder="tr('Gender *', 'เพศ *')"
                />
              </div>
              <div class="grid gap-2.5 sm:grid-cols-2">
                <UInput
                  icon="i-lucide-calendar-days"
                  :placeholder="tr('Birth date *', 'วัน/เดือน/ปีเกิด *')"
                />
                <UInput
                  icon="i-lucide-smartphone"
                  :placeholder="tr('Mobile number *', 'เบอร์โทรศัพท์ *')"
                />
              </div>
              <UInput
                icon="i-lucide-message-circle"
                :placeholder="tr('Line ID *', 'ไลน์ไอดี *')"
              />
            </div>

            <div class="grid gap-2.5">
              <p class="text-sm font-semibold text-highlighted">
                {{ tr('Address information', 'ข้อมูลที่อยู่') }}
              </p>
              <UTextarea
                :rows="2"
                :placeholder="tr('Address *', 'ที่อยู่ *')"
              />
              <div class="grid gap-2.5 sm:grid-cols-3">
                <UInput :placeholder="tr('Sub-district *', 'แขวง / ตำบล *')" />
                <UInput :placeholder="tr('District *', 'เขต / อำเภอ *')" />
                <USelect
                  :items="provinces"
                  :placeholder="tr('Province *', 'จังหวัด *')"
                />
              </div>
            </div>

            <div class="grid gap-2.5">
              <p class="text-sm font-semibold text-highlighted">
                {{ tr('High school background', 'ประวัติการศึกษาระดับมัธยม') }}
              </p>
              <UInput
                icon="i-lucide-school"
                :placeholder="tr('High school name *', 'โรงเรียนมัธยมศึกษา *')"
              />
              <div class="grid gap-2.5 sm:grid-cols-2">
                <UInput :placeholder="tr('High school major *', 'สายการเรียน *')" />
                <UInput :placeholder="tr('High school GPA *', 'เกรดเฉลี่ยมัธยม *')" />
              </div>
            </div>

            <div class="grid gap-2.5">
              <p class="text-sm font-semibold text-highlighted">
                {{ tr('University background', 'ประวัติการศึกษาระดับมหาวิทยาลัย') }}
              </p>
              <USelect
                :items="degreeOptions"
                :placeholder="tr('University degree *', 'ระดับการศึกษา *')"
              />
              <UInput
                icon="i-lucide-building-2"
                :placeholder="tr('University *', 'มหาวิทยาลัย *')"
              />
              <div class="grid gap-2.5 sm:grid-cols-2">
                <UInput :placeholder="tr('Faculty *', 'คณะ *')" />
                <UInput :placeholder="tr('Major *', 'สาขา *')" />
              </div>
              <div class="grid gap-2.5 sm:grid-cols-2">
                <USelect
                  :items="yearOptions"
                  :placeholder="tr('Year *', 'ชั้นปี *')"
                />
                <UInput :placeholder="tr('University GPA *', 'เกรดเฉลี่ยมหาวิทยาลัย *')" />
              </div>
              <div class="rounded-[10px] border border-sky-100 bg-sky-50/40 p-3">
                <p class="text-xs font-semibold text-slate-700">
                  {{ tr('Do you have any additional higher education?', 'มีประวัติการศึกษาระดับสูงเพิ่มเติมหรือไม่?') }}
                </p>
                <div class="mt-2 flex gap-4 text-xs text-muted">
                  <label class="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="hasMoreEducation"
                    >
                    {{ tr('Yes', 'ใช่') }}
                  </label>
                  <label class="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="hasMoreEducation"
                    >
                    {{ tr('No', 'ไม่ใช่') }}
                  </label>
                </div>
              </div>
            </div>

            <div class="grid gap-2.5">
              <p class="text-sm font-semibold text-highlighted">
                {{ tr('Teaching profile', 'ข้อมูลการสอน') }}
              </p>
              <UTextarea
                :rows="2"
                :placeholder="tr('Teaching subjects *', 'วิชาที่สอน *')"
              />
              <UTextarea
                :rows="2"
                :placeholder="tr('Preferred teaching location *', 'สถานที่สอนที่สะดวก *')"
              />
              <UTextarea
                :rows="2"
                :placeholder="tr('Foreign languages you can teach', 'ภาษาต่างประเทศที่สามารถสอนได้')"
              />
            </div>

            <div class="grid gap-2.5">
              <p class="text-sm font-semibold text-highlighted">
                {{ tr('Experience and verification', 'ประสบการณ์และเอกสารยืนยัน') }}
              </p>
              <UTextarea
                :rows="2"
                :placeholder="tr('Tutor experience *', 'ประสบการณ์สอน *')"
              />
              <div class="grid gap-2.5 sm:grid-cols-2">
                <UInput
                  icon="i-lucide-badge-dollar-sign"
                  :placeholder="tr('Hourly rate *', 'ราคาต่อชั่วโมง *')"
                />
                <USelect
                  :items="teachingModes"
                  :placeholder="tr('Teaching mode *', 'รูปแบบการสอน *')"
                />
              </div>
              <label class="grid min-h-16 cursor-pointer place-items-center rounded-[10px] border border-dashed border-sky-200 bg-sky-50/35 px-4 py-3 text-center transition hover:border-primary/60 hover:bg-primary/5">
                <input
                  type="file"
                  accept=".svg,.png,.jpg,.jpeg,.gif,.pdf,image/svg+xml,image/png,image/jpeg,image/gif,application/pdf"
                  class="sr-only"
                  @change="handleVerificationFileChange"
                >
                <span class="flex w-full min-w-0 items-center justify-center gap-2 text-sm font-medium text-slate-700">
                  <UIcon
                    name="i-lucide-upload"
                    class="size-4 shrink-0 text-primary"
                  />
                  <span class="min-w-0 truncate">
                    {{ verificationFileName || tr('Upload ID card, certificate, or profile image *', 'อัปโหลดบัตรประชาชน ใบรับรอง หรือรูปโปรไฟล์ *') }}
                  </span>
                </span>
                <span
                  v-if="!verificationFileName"
                  class="mt-1 text-xs text-slate-500"
                >
                  {{ tr('SVG, PNG, JPG or PDF (max. 2MB)', 'รองรับ SVG, PNG, JPG หรือ PDF (สูงสุด 2MB)') }}
                </span>
              </label>
              <label class="inline-flex items-start gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  class="mt-0.5"
                >
                <span>
                  {{ tr('I agree to the tutor terms and confirm that the information is correct.', 'ยอมรับเงื่อนไขสำหรับติวเตอร์และยืนยันว่าข้อมูลถูกต้อง') }}
                </span>
              </label>
              <UButton
                :label="tr('Apply as Tutor', 'สมัครเป็นติวเตอร์')"
                block
                size="lg"
              />
            </div>
          </Stepper>
        </div>
      </Transition>

      <UButton
        v-if="!isTutorRegistration"
        :label="tr('Create Account', 'สร้างบัญชี')"
        block
        size="lg"
      />
      <p class="text-center text-sm text-muted">
        {{ tr('Already have an account?', 'มีบัญชีอยู่แล้ว?') }}
        <NuxtLink
          to="/auth/sign-in"
          class="font-medium text-primary"
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
        />
        <UButton
          label="Apple"
          icon="i-simple-icons-apple"
          color="neutral"
          variant="outline"
        />
        <UButton
          label="Facebook"
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="outline"
        />
      </div>
    </div>
  </UCard>
</template>
