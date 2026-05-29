<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import VueBitsStepper from '~/components/VueBitsStepper.vue'

const { tr, pick } = useAppLocale()

type TutorDocumentKey = 'additionalEducation' | 'idCard' | 'transcript' | 'portfolio'
type CalendarSelection = DateValue | DateValue[] | { start: DateValue | undefined, end: DateValue | undefined } | null | undefined

const teachingModes = computed(() => pick(
  ['Online', 'Offline', 'Online & Offline'],
  ['Online', 'Offline', 'Online & Offline']
))
const genders = computed(() => pick(
  ['Male', 'Female', 'Prefer not to say'],
  ['Male', 'Female', 'Prefer not to say']
))
const provinces = computed(() => pick(
  ['Bangkok', 'Nonthaburi', 'Pathum Thani', 'Samut Prakan', 'Chiang Mai'],
  ['Bangkok', 'Nonthaburi', 'Pathum Thani', 'Samut Prakan', 'Chiang Mai']
))
const degreeOptions = computed(() => pick(
  ['High School', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree'],
  ['High School', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree']
))
const yearOptions = computed(() => pick(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated'],
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated']
))
const subjectOptions = computed(() => pick(
  ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Thai', 'Social Studies'],
  ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Thai', 'Social Studies']
))
const languageOptions = computed(() => pick(
  ['English', 'Chinese', 'Japanese', 'Korean'],
  ['English', 'Chinese', 'Japanese', 'Korean']
))

const hasAdditionalEducation = ref(false)
const selectedSubjects = ref<string[]>([])
const selectedLanguages = ref<string[]>([])
const birthDate = shallowRef<DateValue>()
const isBirthDateOpen = ref(false)
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

const birthDateLabel = computed(() => {
  if (!birthDate.value) return ''
  const month = String(birthDate.value.month).padStart(2, '0')
  const day = String(birthDate.value.day).padStart(2, '0')
  return `${birthDate.value.year}-${month}-${day}`
})

const handleBirthDateChange = (date: CalendarSelection) => {
  if (!date || Array.isArray(date) || !('day' in date)) return

  birthDate.value = date
  isBirthDateOpen.value = false
}

definePageMeta({
  layout: 'auth'
})

useHead({
  bodyAttrs: {
    class: 'auth-page sign-up2-page'
  }
})
</script>

<template>
  <UCard
    class="premium-card mx-auto w-full max-w-lg overflow-visible bg-elevated/95 shadow-xl backdrop-blur"
    :ui="{
      header: 'shrink-0 px-5 py-4 sm:px-8 border-b border-muted',
      body: 'px-5 py-8 sm:px-10'
    }"
  >
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <h1 class="text-2xl font-black tracking-tight text-highlighted">
            {{ tr('Tutor Registration', 'Tutor Registration') }}
          </h1>
          <p class="mt-1 text-sm font-medium text-dimmed">
            {{ tr('Complete your tutor profile step by step.', 'Complete your tutor profile step by step.') }}
          </p>
        </div>
        <div class="grid size-11 shrink-0 place-items-center rounded-[1.25rem] bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <UIcon
            name="i-lucide-presentation"
            class="size-6"
          />
        </div>
      </div>
    </template>

    <VueBitsStepper
      class="sign-up2-stepper"
      step-circle-container-class-name="!h-auto !min-h-0 !max-w-md !rounded-[1.25rem] !border-sky-100 !bg-white !p-3 !shadow-premium-sm sm:!rounded-[1.75rem] sm:!p-5"
      step-container-class-name="!mb-0"
      content-class-name="sign-up2-step-content min-w-0 text-sm"
      footer-class-name="pt-1 px-1 sm:px-2"
      :back-button-text="tr('Back', 'Back')"
      :next-button-text="tr('Next', 'Next')"
      :complete-button-text="tr('Register', 'Register')"
      :lock-on-complete="false"
      :content-transition-duration="0.34"
      content-exit-distance="100%"
    >
      <div class="mx-auto grid w-full max-w-[360px] min-w-0 gap-4 py-2">
        <div class="text-center">
          <h2 class="text-base font-black tracking-tight text-highlighted">
            {{ tr('Account access', 'Account access') }}
          </h2>
          <p class="mx-auto mt-1 max-w-[320px] text-[10px] font-semibold leading-relaxed text-muted sm:text-[11px]">
            {{ tr('This registration takes about 5-7 minutes. You can review your information before submitting.', 'This registration takes about 5-7 minutes. You can review your information before submitting.') }}
          </p>
        </div>

        <div class="grid w-full min-w-0 gap-2.5 rounded-[1.25rem] bg-sky-50/45 p-3 ring-1 ring-sky-100 sm:p-4">
          <UInput
            class="premium-input w-full min-w-0"
            icon="i-lucide-mail"
            size="lg"
            type="email"
            autocomplete="email"
            :placeholder="tr('Email address *', 'Email address *')"
          />
          <UInput
            class="premium-input w-full min-w-0"
            icon="i-lucide-lock"
            size="lg"
            :placeholder="tr('Password *', 'Password *')"
            type="password"
            autocomplete="new-password"
          />
          <UInput
            class="premium-input w-full min-w-0"
            icon="i-lucide-lock-keyhole"
            size="lg"
            :placeholder="tr('Confirm password *', 'Confirm password *')"
            type="password"
            autocomplete="new-password"
          />
          <p class="px-1 text-[11px] font-medium leading-relaxed text-muted">
            {{ tr('Use an email you check often. We may contact you during verification.', 'Use an email you check often. We may contact you during verification.') }}
          </p>
        </div>
      </div>

      <div class="grid gap-5">
        <section class="form-panel">
          <div>
            <p class="form-title">
              <UIcon
                name="i-lucide-user-round"
                class="size-4"
              />
              {{ tr('Basic information', 'Basic information') }}
            </p>
            <p class="form-helper">
              {{ tr('Enter your legal name and personal details for verification.', 'Enter your legal name and personal details for verification.') }}
            </p>
          </div>
          <div class="grid gap-3">
            <UInput
              class="premium-input"
              autocomplete="given-name"
              :placeholder="tr('First name *', 'First name *')"
            />
            <UInput
              class="premium-input"
              autocomplete="family-name"
              :placeholder="tr('Last name *', 'Last name *')"
            />
            <UInput
              class="premium-input"
              :placeholder="tr('Nickname *', 'Nickname *')"
            />
            <USelect
              class="premium-input"
              :items="genders"
              :placeholder="tr('Gender *', 'Gender *')"
            />
            <UPopover v-model:open="isBirthDateOpen">
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                icon="i-lucide-calendar-days"
                :class="[
                  'premium-input w-full justify-start font-semibold',
                  birthDateLabel ? 'text-highlighted' : 'text-muted'
                ]"
              >
                {{ birthDateLabel || tr('Birth date *', 'Birth date *') }}
              </UButton>

              <template #content>
                <div class="flex flex-wrap justify-center gap-5 p-2">
                  <UiCalendar
                    v-model="birthDate"
                    title-position="right"
                    @update:model-value="handleBirthDateChange"
                  />
                </div>
              </template>
            </UPopover>
          </div>
        </section>

        <section class="form-panel">
          <div>
            <p class="form-title">
              <UIcon
                name="i-lucide-contact-round"
                class="size-4"
              />
              {{ tr('Contact information', 'Contact information') }}
            </p>
            <p class="form-helper">
              {{ tr('Students and parents will not see private contact details before approval.', 'Students and parents will not see private contact details before approval.') }}
            </p>
          </div>
          <div class="grid gap-3">
            <UInput
              class="premium-input"
              icon="i-lucide-smartphone"
              type="tel"
              autocomplete="tel"
              inputmode="tel"
              :placeholder="tr('Mobile number *', 'Mobile number *')"
            />
            <UInput
              class="premium-input"
              icon="i-lucide-message-circle"
              :placeholder="tr('Line ID *', 'Line ID *')"
            />
            <USelect
              class="premium-input"
              :items="provinces"
              :placeholder="tr('Province *', 'Province *')"
            />
            <UTextarea
              class="premium-input"
              :rows="2"
              autocomplete="street-address"
              :placeholder="tr('Address *', 'Address *')"
            />
            <UInput
              class="premium-input"
              :placeholder="tr('Sub-district *', 'Sub-district *')"
            />
            <UInput
              class="premium-input"
              :placeholder="tr('District *', 'District *')"
            />
          </div>
        </section>
      </div>

      <div class="grid gap-5">
        <section class="form-panel">
          <div>
            <p class="form-title">
              <UIcon
                name="i-lucide-school"
                class="size-4"
              />
              {{ tr('High school background', 'High school background') }}
            </p>
            <p class="form-helper">
              {{ tr('Add your latest high school information.', 'Add your latest high school information.') }}
            </p>
          </div>
          <div class="grid gap-3">
            <UInput
              class="premium-input"
              icon="i-lucide-school"
              :placeholder="tr('High school name *', 'High school name *')"
            />
            <UInput
              class="premium-input"
              :placeholder="tr('High school major *', 'High school major *')"
            />
            <UInput
              class="premium-input"
              type="number"
              step="0.01"
              :placeholder="tr('High school GPA *', 'High school GPA *')"
            />
          </div>
        </section>

        <section class="form-panel">
          <div>
            <p class="form-title">
              <UIcon
                name="i-lucide-building-2"
                class="size-4"
              />
              {{ tr('University background', 'University background') }}
            </p>
            <p class="form-helper">
              {{ tr('Use your current or most recent university record.', 'Use your current or most recent university record.') }}
            </p>
          </div>
          <div class="grid gap-3">
            <USelect
              class="premium-input"
              :items="degreeOptions"
              :placeholder="tr('University degree *', 'University degree *')"
            />
            <UInput
              class="premium-input"
              icon="i-lucide-building-2"
              :placeholder="tr('University *', 'University *')"
            />
            <UInput
              class="premium-input"
              :placeholder="tr('Faculty *', 'Faculty *')"
            />
            <UInput
              class="premium-input"
              :placeholder="tr('Major *', 'Major *')"
            />
            <USelect
              class="premium-input"
              :items="yearOptions"
              :placeholder="tr('Year *', 'Year *')"
            />
            <UInput
              class="premium-input"
              type="number"
              step="0.01"
              :placeholder="tr('University GPA *', 'University GPA *')"
            />
          </div>
        </section>

        <section class="rounded-[1.5rem] border border-sky-100 bg-sky-50/40 p-4">
          <p class="form-title">
            <UIcon
              name="i-lucide-badge-check"
              class="size-4"
            />
            {{ tr('Additional education?', 'Additional education?') }}
          </p>
          <p class="form-helper mt-1">
            {{ tr('Add certificates or qualifications only if you have them.', 'Add certificates or qualifications only if you have them.') }}
          </p>
          <div class="mt-2 flex gap-6 text-xs text-muted">
            <label class="inline-flex cursor-pointer items-center gap-2 hover:text-primary">
              <input
                v-model="hasAdditionalEducation"
                type="radio"
                :value="true"
                name="hasMoreEducation"
                class="accent-primary"
              >
              {{ tr('Yes', 'Yes') }}
            </label>
            <label class="inline-flex cursor-pointer items-center gap-2 hover:text-primary">
              <input
                v-model="hasAdditionalEducation"
                type="radio"
                :value="false"
                name="hasMoreEducation"
                class="accent-primary"
              >
              {{ tr('No', 'No') }}
            </label>
          </div>
          <div
            v-if="hasAdditionalEducation"
            class="mt-3 grid gap-3"
          >
            <UInput
              class="premium-input"
              :placeholder="tr('Certificate or qualification name', 'Certificate or qualification name')"
            />
            <label class="grid min-h-14 cursor-pointer place-items-center rounded-[1rem] border border-dashed border-sky-200 bg-white/75 px-4 py-2 text-center transition-all hover:border-primary/60 hover:bg-primary/5">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                class="sr-only"
                @change="handleNamedFileChange($event, 'additionalEducation')"
              >
              <span class="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                <UIcon
                  name="i-lucide-upload"
                  class="size-5 shrink-0 text-primary"
                />
                <span class="truncate">{{ additionalEducationFileName || tr('Upload supporting document', 'Upload supporting document') }}</span>
              </span>
            </label>
          </div>
        </section>
      </div>

      <div class="grid gap-4">
        <section class="form-panel">
          <div>
            <p class="form-title">
              <UIcon
                name="i-lucide-book-open-check"
                class="size-4"
              />
              {{ tr('Teaching subjects', 'Teaching subjects') }}
            </p>
            <p class="form-helper">
              {{ tr('Choose every subject you are comfortable teaching.', 'Choose every subject you are comfortable teaching.') }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="subject in subjectOptions"
              :key="subject"
              type="button"
              :class="[
                'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
                selectedSubjects.includes(subject)
                  ? 'border-primary bg-primary text-white shadow-sm shadow-sky-200'
                  : 'border-sky-100 bg-sky-50/60 text-slate-600 hover:border-primary/50 hover:text-primary'
              ]"
              @click="toggleSubject(subject)"
            >
              {{ subject }}
            </button>
            <button
              type="button"
              class="rounded-full border border-dashed border-sky-200 px-3 py-1.5 text-xs font-bold text-primary hover:bg-sky-50"
            >
              {{ tr('+ Add other subject', '+ Add other subject') }}
            </button>
          </div>
        </section>

        <div class="form-panel">
          <UTextarea
            class="premium-input"
            :rows="3"
            :placeholder="tr('Tutor experience *', 'Tutor experience *')"
          />
          <UTextarea
            class="premium-input"
            :rows="3"
            :placeholder="tr('Preferred teaching location *', 'Preferred teaching location *')"
          />
        </div>
        <div class="form-panel">
          <UInput
            class="premium-input"
            icon="i-lucide-badge-dollar-sign"
            type="number"
            inputmode="decimal"
            :placeholder="tr('Hourly rate *', 'Hourly rate *')"
          />
          <USelect
            class="premium-input"
            :items="teachingModes"
            :placeholder="tr('Teaching mode *', 'Teaching mode *')"
          />
        </div>

        <section class="form-panel">
          <div>
            <p class="form-title">
              <UIcon
                name="i-lucide-languages"
                class="size-4"
              />
              {{ tr('Foreign languages', 'Foreign languages') }}
            </p>
            <p class="form-helper">
              {{ tr('Select languages you can use while teaching.', 'Select languages you can use while teaching.') }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="language in languageOptions"
              :key="language"
              type="button"
              :class="[
                'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
                selectedLanguages.includes(language)
                  ? 'border-primary bg-primary text-white shadow-sm shadow-sky-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-primary/50 hover:text-primary'
              ]"
              @click="toggleLanguage(language)"
            >
              {{ language }}
            </button>
          </div>
        </section>
      </div>

      <div class="grid gap-4">
        <div class="rounded-[1.25rem] bg-sky-50/70 px-4 py-3 ring-1 ring-sky-100">
          <p class="form-title">
            <UIcon
              name="i-lucide-file-up"
              class="size-4"
            />
            {{ tr('Verification documents', 'Verification documents') }}
          </p>
          <p class="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
            {{ tr('Accepted file types: JPG, PNG, PDF. Maximum size: 5MB per file.', 'Accepted file types: JPG, PNG, PDF. Maximum size: 5MB per file.') }}
          </p>
        </div>

        <div class="grid gap-3">
          <label class="grid cursor-pointer gap-2 rounded-[1.5rem] border border-dashed border-sky-200 bg-sky-50/35 p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              class="sr-only"
              @change="handleNamedFileChange($event, 'idCard')"
            >
            <span class="flex items-center justify-between gap-3">
              <span class="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
                <UIcon
                  name="i-lucide-id-card"
                  class="size-5 shrink-0 text-primary"
                />
                <span class="truncate">{{ idCardFileName || tr('ID card or student card *', 'ID card or student card *') }}</span>
              </span>
              <span class="text-[11px] font-bold text-primary">{{ tr('Upload', 'Upload') }}</span>
            </span>
            <span class="text-xs text-dimmed">{{ tr('One clear JPG, PNG, or PDF file.', 'One clear JPG, PNG, or PDF file.') }}</span>
          </label>

          <label class="grid cursor-pointer gap-2 rounded-[1.5rem] border border-dashed border-sky-200 bg-white p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              class="sr-only"
              @change="handleNamedFileChange($event, 'transcript')"
            >
            <span class="flex items-center justify-between gap-3">
              <span class="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
                <UIcon
                  name="i-lucide-file-text"
                  class="size-5 shrink-0 text-primary"
                />
                <span class="truncate">{{ transcriptFileName || tr('Transcript or education certificate', 'Transcript or education certificate') }}</span>
              </span>
              <span class="text-[11px] font-bold text-primary">{{ tr('Upload', 'Upload') }}</span>
            </span>
          </label>

          <label class="grid cursor-pointer gap-2 rounded-[1.5rem] border border-dashed border-sky-200 bg-white p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              class="sr-only"
              @change="handleNamedFileChange($event, 'portfolio')"
            >
            <span class="flex items-center justify-between gap-3">
              <span class="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
                <UIcon
                  name="i-lucide-folder-check"
                  class="size-5 shrink-0 text-primary"
                />
                <span class="truncate">{{ portfolioFileName || tr('Certificate or portfolio', 'Certificate or portfolio') }}</span>
              </span>
              <span class="text-[11px] font-bold text-primary">{{ tr('Upload', 'Upload') }}</span>
            </span>
          </label>
        </div>

        <label class="inline-flex cursor-pointer items-start gap-2 text-[11px] leading-tight text-muted hover:text-toned">
          <input
            type="checkbox"
            class="mt-0.5 accent-primary"
          >
          <span>{{ tr('I agree to the tutor terms and confirm that the information is accurate.', 'I agree to the tutor terms and confirm that the information is accurate.') }}</span>
        </label>
      </div>
    </VueBitsStepper>

    <p class="mt-3 shrink-0 text-center text-xs font-medium text-muted">
      {{ tr('Already have an account?', 'Already have an account?') }}
      <NuxtLink
        to="/auth/sign-in"
        class="font-bold text-primary hover:underline"
      >
        {{ tr('Sign In', 'Sign In') }}
      </NuxtLink>
    </p>
  </UCard>
</template>

<style scoped>
:global(body.sign-up2-page section.relative.isolate) {
  height: auto;
  min-height: calc(100dvh - var(--ui-header-height));
  overflow: visible;
}

.sign-up2-stepper :deep(.sign-up2-step-content) {
  min-height: 0 !important;
}

.sign-up2-stepper :deep(.sign-up2-step-content > div) {
  min-height: 0 !important;
}

.sign-up2-stepper :deep(.premium-input) {
  min-width: 0;
  width: 100%;
}

.form-panel {
  display: grid;
  gap: 0.75rem;
  min-width: 0;
  border: 1px solid rgb(224 242 254 / 0.9);
  border-radius: 1.25rem;
  background: rgb(248 250 252 / 0.72);
  padding: 1rem;
}

.form-title {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(3 105 161);
}

.form-helper {
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.45;
  color: rgb(100 116 139);
}
</style>
