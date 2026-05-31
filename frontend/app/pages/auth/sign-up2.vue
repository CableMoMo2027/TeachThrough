<script setup lang="ts">
import StepAccount from '~/components/tutor-registration/StepAccount.vue'
import StepDocuments from '~/components/tutor-registration/StepDocuments.vue'
import StepEducation from '~/components/tutor-registration/StepEducation.vue'
import StepPersonal from '~/components/tutor-registration/StepPersonal.vue'
import StepReview from '~/components/tutor-registration/StepReview.vue'
import StepTeaching from '~/components/tutor-registration/StepTeaching.vue'
import VueBitsStepper from '~/components/VueBitsStepper.vue'
import {
  createReviewEditState,
  getTutorStepNavigationDecision,
  tutorRegistrationSteps
} from '~/utils/tutorOnboarding'

type TutorFormRef = {
  validate: (options?: { name?: string[] }) => Promise<unknown>
}

type TutorStepperRef = {
  goToStep: (step: number) => void
}

const { tr } = useAppLocale()
const {
  tutorFormState,
  tutorFormSchema,
  tutorStepFields,
  teachingModes,
  genders,
  provinces,
  degreeOptions,
  yearOptions,
  subjectOptions,
  learnerLevels,
  teachingFormats,
  languageOptions,
  hasAdditionalEducation,
  selectedLanguages,
  selectedTeachingFormats,
  birthDate,
  isBirthDateOpen,
  additionalEducationFileName,
  idCardFileName,
  transcriptFileName,
  portfolioFileName,
  toggleSubject,
  toggleSubjectLearnerLevel,
  addAdditionalSubject,
  toggleLanguage,
  toggleTeachingFormat,
  handleNamedFileChange,
  birthDateLabel,
  handleBirthDateChange,
  restoredTutorDraft,
  clearTutorDraft
} = useTutorForm()

const tutorFormRef = ref<TutorFormRef | null>(null)
const tutorStepperRef = ref<TutorStepperRef | null>(null)
const tutorFormShaking = ref(false)
const currentTutorStep = ref(1)
const highestValidatedTutorStep = ref(0)
const reviewStepNumber = tutorRegistrationSteps.length
const reviewEditState = createReviewEditState(reviewStepNumber)
const editingStepFromReview = ref<number | null>(null)

const triggerValidationFeedback = () => {
  tutorFormShaking.value = true
  nextTick(() => {
    const invalidField = document.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"], .text-error')
    invalidField?.focus?.()
    invalidField?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
  })
  window.setTimeout(() => {
    tutorFormShaking.value = false
  }, 360)
}

const getStepValidationFields = (step: number) => {
  const fields = tutorStepFields[step] || []

  if (step !== 3 || hasAdditionalEducation.value) return fields

  return fields.filter(field => !['additionalEducationName', 'additionalEducationFileName'].includes(field))
}

const validateTutorStep = async (step: number) => {
  try {
    await tutorFormRef.value?.validate({
      name: getStepValidationFields(step)
    })
    highestValidatedTutorStep.value = Math.max(highestValidatedTutorStep.value, step)
    return true
  } catch {
    triggerValidationFeedback()
    return false
  }
}

const handleTutorNext = async (step: number) => {
  const isValid = await validateTutorStep(step)
  if (!isValid) return false

  if (reviewEditState.isEditingFromReview(step)) {
    reviewEditState.finishEditing()
    editingStepFromReview.value = null
    goToTutorStep(reviewStepNumber)
    return false
  }

  return true
}

const validateTutorCompletion = async () => {
  try {
    await tutorFormRef.value?.validate()
    return true
  } catch {
    triggerValidationFeedback()
    return false
  }
}

const handleTutorRegistrationComplete = () => {
  clearTutorDraft()
  navigateTo('/auth/registration-success')
}

const goToTutorStep = (step: number) => {
  tutorStepperRef.value?.goToStep(step)
}

const editTutorStepFromReview = (step: number) => {
  reviewEditState.startEditing(step)
  editingStepFromReview.value = step
  goToTutorStep(step)
}

const handleTutorStepChangeRequest = async (targetStep: number, fromStep: number) => {
  const decision = getTutorStepNavigationDecision({
    currentStep: fromStep,
    highestValidatedStep: highestValidatedTutorStep.value,
    totalSteps: tutorRegistrationSteps.length
  }, targetStep)

  if (decision.allowed) return true
  if (decision.reason !== 'requires-validation') return false

  return validateTutorStep(decision.validationStep)
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
    class="premium-card mx-auto w-full max-w-5xl overflow-visible bg-elevated/95 shadow-xl backdrop-blur"
    :ui="{
      header: 'shrink-0 px-5 py-4 sm:px-8 border-b border-muted',
      body: 'px-5 py-8 sm:px-10'
    }"
  >
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <h1 class="text-2xl font-black tracking-tight text-highlighted">
            {{ tr('Tutor Registration', 'สมัครเป็นติวเตอร์') }}
          </h1>
          <p class="mt-1 text-sm font-medium text-dimmed">
            {{ tr('Complete your tutor profile step by step.', 'กรอกข้อมูลทีละขั้นตอนเพื่อส่งใบสมัครติวเตอร์') }}
          </p>
          <p class="mt-2 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-primary ring-1 ring-sky-100">
            {{ tutorRegistrationSteps[currentTutorStep - 1]?.number }} {{ tr(tutorRegistrationSteps[currentTutorStep - 1]?.label || '', ['บัญชี', 'ข้อมูลส่วนตัว', 'การศึกษา', 'การสอน', 'เอกสาร', 'ตรวจทาน'][currentTutorStep - 1] || '') }}
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

    <div
      v-if="restoredTutorDraft"
      class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1rem] bg-sky-50 px-4 py-3 text-xs font-semibold text-slate-650 ring-1 ring-sky-100"
    >
      <span>{{ tr('We restored the information you entered in this browser session.', 'เราเรียกคืนข้อมูลที่คุณกรอกไว้ในเซสชันนี้') }}</span>
      <button
        type="button"
        class="rounded-full px-3 py-1 font-black text-primary hover:bg-white"
        @click="clearTutorDraft"
      >
        {{ tr('Clear draft', 'ล้างข้อมูลร่าง') }}
      </button>
    </div>

    <UForm
      ref="tutorFormRef"
      :schema="tutorFormSchema"
      :state="tutorFormState"
      :validate-on="['input', 'blur', 'change']"
      :class="tutorFormShaking ? 'form-shake' : ''"
    >
      <VueBitsStepper
        ref="tutorStepperRef"
        class="sign-up2-stepper"
        step-circle-container-class-name="!h-auto !min-h-0 !max-w-md !rounded-[1.25rem] !border-sky-100 !bg-white !p-3 !shadow-premium-sm sm:!rounded-[1.75rem] sm:!p-5"
        step-container-class-name="!mb-0"
        content-class-name="sign-up2-step-content min-w-0 text-sm"
        footer-class-name="sticky bottom-3 z-20 rounded-full bg-white/95 p-2 shadow-premium-md ring-1 ring-sky-100 sm:static sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none sm:ring-0"
        :back-button-text="tr('Back', 'ย้อนกลับ')"
        :next-button-text="editingStepFromReview === currentTutorStep ? tr('Return to Review', 'กลับไปตรวจทาน') : tr('Next', 'ถัดไป')"
        :complete-button-text="tr('Submit Tutor Application', 'ส่งใบสมัครติวเตอร์')"
        :lock-on-complete="false"
        :on-step-change="(step: number) => currentTutorStep = step"
        :on-before-step-change="handleTutorStepChangeRequest"
        :on-before-next="handleTutorNext"
        :on-before-complete="validateTutorCompletion"
        :on-final-step-completed="handleTutorRegistrationComplete"
        :content-transition-duration="0.34"
        content-exit-distance="100%"
      >
        <StepAccount v-model:state="tutorFormState" />

        <StepPersonal
          v-model:state="tutorFormState"
          v-model:birth-date="birthDate"
          v-model:birth-date-open="isBirthDateOpen"
          :genders="genders"
          :provinces="provinces"
          :birth-date-label="birthDateLabel"
          :handle-birth-date-change="handleBirthDateChange"
        />

        <StepEducation
          v-model:state="tutorFormState"
          v-model:has-additional-education="hasAdditionalEducation"
          :degree-options="degreeOptions"
          :year-options="yearOptions"
          :additional-education-file-name="additionalEducationFileName"
          :handle-named-file-change="handleNamedFileChange"
        />

        <StepTeaching
          v-model:state="tutorFormState"
          :subject-options="subjectOptions"
          :learner-levels="learnerLevels"
          :teaching-formats="teachingFormats"
          :language-options="languageOptions"
          :teaching-modes="teachingModes"
          :selected-languages="selectedLanguages"
          :selected-teaching-formats="selectedTeachingFormats"
          :toggle-subject="toggleSubject"
          :toggle-subject-learner-level="toggleSubjectLearnerLevel"
          :add-additional-subject="addAdditionalSubject"
          :toggle-language="toggleLanguage"
          :toggle-teaching-format="toggleTeachingFormat"
        />

        <StepDocuments
          v-model:state="tutorFormState"
          :id-card-file-name="idCardFileName"
          :transcript-file-name="transcriptFileName"
          :portfolio-file-name="portfolioFileName"
          :handle-named-file-change="handleNamedFileChange"
        />

        <StepReview
          v-model:state="tutorFormState"
          :go-to-step="editTutorStepFromReview"
        />
      </VueBitsStepper>
    </UForm>

    <p class="mt-3 shrink-0 text-center text-xs font-medium text-muted">
      {{ tr('Already have an account?', 'มีบัญชีอยู่แล้ว?') }}
      <NuxtLink
        to="/auth/sign-in"
        class="font-bold text-primary hover:underline"
      >
        {{ tr('Sign In', 'เข้าสู่ระบบ') }}
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

.sign-up2-stepper :deep(.form-panel) {
  display: grid;
  gap: 0.75rem;
  min-width: 0;
  border: 1px solid rgb(224 242 254 / 0.9);
  border-radius: 1.25rem;
  background: rgb(248 250 252 / 0.72);
  padding: 1rem;
}

.sign-up2-stepper :deep(.form-title) {
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

.sign-up2-stepper :deep(.form-helper) {
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.45;
  color: rgb(100 116 139);
}

.form-shake {
  animation: form-shake 320ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@keyframes form-shake {
  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}
</style>
