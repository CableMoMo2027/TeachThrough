<template>
  <div
    class="flex w-full justify-center"
    v-bind="$attrs"
  >
    <div
      :class="`flex h-full min-h-0 w-full max-w-md flex-col rounded-[1.25rem] border border-sky-100 bg-white p-6 shadow-[0_18px_45px_rgba(14,116,144,0.10)] ${stepCircleContainerClassName}`"
    >
      <div class="shrink-0">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="text-[11px] font-black uppercase tracking-widest text-primary/70">
              {{ progressLabel || `Step ${currentStep} of ${totalSteps}` }}
            </p>
            <p
              v-if="currentStepLabel"
              class="mt-1 truncate text-base font-extrabold tracking-tight text-highlighted"
            >
              {{ currentStepLabel }}
            </p>
          </div>
          <span class="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-primary ring-1 ring-sky-100">
            {{ progressPercent }}%
          </span>
        </div>
        <div class="mb-5 h-2 overflow-hidden rounded-full bg-sky-50 ring-1 ring-sky-100">
          <Motion
            as="div"
            class="h-full rounded-full bg-primary"
            :initial="{ width: 0 }"
            :animate="{ width: `${progressPercent}%` }"
            :transition="{ type: 'tween', duration: 0.22, ease: [0.16, 1, 0.3, 1] }"
          />
        </div>
      </div>

      <div
        :class="`flex shrink-0 items-center justify-center w-full ${stepContainerClassName}`"
      >
        <template
          v-for="(_, index) in stepsArray"
          :key="index + 1"
        >
          <div
            v-if="!renderStepIndicator"
            :class="[
              'relative outline-none flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold sm:h-8 sm:w-8 sm:text-sm',
              isCompleted && lockOnComplete ? 'cursor-default' : 'cursor-pointer'
            ]"
            :style="getStepIndicatorStyle(index + 1)"
            @click="() => handleStepClick(index + 1)"
          >
            <svg
              v-if="getStepStatus(index + 1) === 'complete'"
              class="h-4 w-4 text-white stroke-white"
              fill="none"
              stroke="currentColor"
              :stroke-width="2"
              viewBox="0 0 24 24"
            >
              <Motion
                as="path"
                d="M5 13l4 4L19 7"
                stroke-linecap="round"
                stroke-linejoin="round"
                :initial="{ pathLength: 0, opacity: 0 }"
                :animate="
                  getStepStatus(index + 1) === 'complete'
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                "
              />
            </svg>
            <div
              v-else-if="getStepStatus(index + 1) === 'active'"
              class="h-2.5 w-2.5 rounded-full bg-white sm:h-3 sm:w-3"
            />
            <span
              v-else
              class="text-xs sm:text-sm"
            >{{ index + 1 }}</span>
          </div>

          <component
            :is="renderStepIndicator"
            v-else
            :step="index + 1"
            :current-step="currentStep"
            :on-step-click="handleCustomStepClick"
          />

          <div
            v-if="index < totalSteps - 1"
            class="relative mx-1 h-0.5 flex-1 overflow-hidden rounded bg-sky-100 sm:mx-2"
          >
            <Motion
              as="div"
              class="absolute left-0 top-0 h-full"
              :initial="{ width: 0, backgroundColor: '#bae6fd' }"
              :animate="
                currentStep > index + 1
                  ? { width: '100%', backgroundColor: '#0ea5e9' }
                  : { width: 0, backgroundColor: '#bae6fd' }
              "
              :transition="{ type: 'spring', stiffness: 100, damping: 15, duration: 0.4 }"
            />
          </div>
        </template>
      </div>

      <div
        :class="`mt-4 min-h-0 flex-1 overflow-hidden ${contentClassName}`"
      >
        <AnimatePresence
          :initial="false"
          mode="wait"
          :custom="direction"
        >
          <Motion
            v-if="!isCompleted"
            :key="currentStep"
            as="div"
            class="h-full overflow-y-auto pr-2"
            :initial="getStepContentInitial()"
            :animate="{ x: '0%', opacity: 1 }"
            :exit="getStepContentExit()"
            :transition="{ type: 'tween', duration: 0.2, ease: [0.16, 1, 0.3, 1] }"
          >
            <div
              v-if="slots.default && slots.default()[currentStep - 1]"
            >
              <component :is="slots.default()[currentStep - 1]" />
            </div>
          </Motion>
        </AnimatePresence>
      </div>

      <div
        v-if="!isCompleted"
        :class="`mt-5 w-full shrink-0 ${footerClassName}`"
      >
        <div :class="`flex w-full ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`">
          <button
            v-if="currentStep !== 1"
            :disabled="backButtonProps?.disabled"
            :class="`cursor-pointer rounded-full border border-sky-100 bg-white px-3 py-1.5 text-sm font-medium text-slate-500 transition-all duration-[350ms] hover:border-primary/40 hover:bg-sky-50 hover:text-primary ${currentStep === 1 ? 'cursor-not-allowed opacity-50' : ''}`"
            v-bind="backButtonProps"
            @click="handleBack"
          >
            {{ backButtonText }}
          </button>
          <button
            :disabled="nextButtonProps?.disabled"
            :class="`flex cursor-pointer items-center justify-center rounded-full border-none bg-primary px-4 py-1.5 text-sm font-semibold tracking-tight text-white shadow-sm shadow-sky-200 transition-all duration-[350ms] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50`"
            @click="isLastStep ? handleComplete() : handleNext()"
          >
            {{ isLastStep ? completeButtonText : nextButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useSlots,
  watch,
  type VNode,
  type ButtonHTMLAttributes,
  type Component
} from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

defineOptions({
  name: 'TutorStepper'
})

interface StepperProps {
  children?: VNode[]
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: ButtonHTMLAttributes
  nextButtonProps?: ButtonHTMLAttributes
  backButtonText?: string
  nextButtonText?: string
  completeButtonText?: string
  disableStepIndicators?: boolean
  renderStepIndicator?: Component
  lockOnComplete?: boolean
  stepLabels?: string[]
  progressLabel?: string
}

const props = withDefaults(defineProps<StepperProps>(), {
  initialStep: 1,
  onStepChange: () => {},
  onFinalStepCompleted: () => {},
  stepCircleContainerClassName: '',
  stepContainerClassName: '',
  contentClassName: '',
  footerClassName: '',
  backButtonProps: () => ({}),
  nextButtonProps: () => ({}),
  backButtonText: 'Back',
  nextButtonText: 'Continue',
  completeButtonText: 'Complete',
  disableStepIndicators: false,
  renderStepIndicator: undefined,
  lockOnComplete: true,
  stepLabels: () => [],
  progressLabel: ''
})

const slots = useSlots()
const currentStep = ref(props.initialStep)
const direction = ref(1)
const isCompleted = ref(false)

const stepsArray = computed(() => slots.default?.() || [])
const totalSteps = computed(() => stepsArray.value.length)
const isLastStep = computed(() => currentStep.value === totalSteps.value)
const currentStepLabel = computed(() => props.stepLabels[currentStep.value - 1] || '')
const progressPercent = computed(() => {
  if (!totalSteps.value) return 0
  return Math.round((currentStep.value / totalSteps.value) * 100)
})

const getStepStatus = (step: number) => {
  if (isCompleted.value || currentStep.value > step) return 'complete'
  if (currentStep.value === step) return 'active'
  return 'inactive'
}

const getStepIndicatorStyle = (step: number) => {
  const status = getStepStatus(step)
  switch (status) {
    case 'active':
    case 'complete':
      return { backgroundColor: '#0ea5e9', color: '#fff' }
    default:
      return { backgroundColor: '#e0f2fe', color: '#0369a1' }
  }
}

const getStepContentInitial = () => ({
  x: direction.value >= 0 ? '100%' : '-100%',
  opacity: 0
})

const getStepContentExit = () => ({
  x: direction.value >= 0 ? '-50%' : '50%',
  opacity: 0
})

const handleStepClick = (step: number) => {
  if (isCompleted.value && props.lockOnComplete) return
  if (!props.disableStepIndicators) {
    direction.value = step > currentStep.value ? 1 : -1
    updateStep(step)
  }
}

const handleCustomStepClick = (clicked: number) => {
  if (isCompleted.value && props.lockOnComplete) return
  if (clicked !== currentStep.value && !props.disableStepIndicators) {
    direction.value = clicked > currentStep.value ? 1 : -1
    updateStep(clicked)
  }
}

const updateStep = (newStep: number) => {
  if (newStep >= 1 && newStep <= totalSteps.value) {
    currentStep.value = newStep
  }
}

const handleBack = () => {
  direction.value = -1
  updateStep(currentStep.value - 1)
}

const handleNext = () => {
  direction.value = 1
  updateStep(currentStep.value + 1)
}

const handleComplete = () => {
  isCompleted.value = true
  props.onFinalStepCompleted?.()
}

watch(currentStep, (newStep, oldStep) => {
  props.onStepChange?.(newStep)
  if (newStep !== oldStep && !props.lockOnComplete && isCompleted.value) {
    isCompleted.value = false
  }
})
</script>
