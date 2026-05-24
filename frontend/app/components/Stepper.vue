<template>
  <div
    class="flex justify-center items-center w-full h-full"
    v-bind="$attrs"
  >
    <div
      :class="`w-full max-w-md rounded-[1.25rem] border border-sky-100 bg-white p-6 shadow-[0_18px_45px_rgba(14,116,144,0.10)] ${stepCircleContainerClassName}`"
    >
      <div
        :class="`flex items-center justify-center w-full ${stepContainerClassName}`"
        :style="{ marginBottom: isCompleted ? '0' : '1rem' }"
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

      <Motion
        as="div"
        :class="`w-full ${contentClassName}`"
        :style="{
          position: 'relative',
          overflow: 'hidden',
          marginBottom: isCompleted ? '0' : '1rem'
        }"
        :animate="{ height: isCompleted ? 0 : `${parentHeight + 1}px` }"
        :transition="{ type: 'spring', stiffness: 200, damping: 25, duration: 0.4 }"
      >
        <AnimatePresence
          :initial="false"
          mode="sync"
          :custom="direction"
        >
          <Motion
            v-if="!isCompleted"
            ref="containerRef"
            :key="currentStep"
            as="div"
            :initial="getStepContentInitial()"
            :animate="{ x: '0%', opacity: 1 }"
            :exit="getStepContentExit()"
            :transition="{ type: 'tween', stiffness: 300, damping: 30, duration: 0.4 }"
            :style="{ position: 'absolute', left: 0, right: 0, top: 0 }"
          >
            <div
              v-if="slots.default && slots.default()[currentStep - 1]"
              ref="contentRef"
            >
              <component :is="slots.default()[currentStep - 1]" />
            </div>
          </Motion>
        </AnimatePresence>
      </Motion>

      <div
        v-if="!isCompleted"
        :class="`w-full ${footerClassName}`"
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
            {{ isLastStep ? 'Complete' : nextButtonText }}
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
  onMounted,
  nextTick,
  useTemplateRef,
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
  disableStepIndicators?: boolean
  renderStepIndicator?: Component
  lockOnComplete?: boolean
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
  disableStepIndicators: false,
  renderStepIndicator: undefined,
  lockOnComplete: true
})

const slots = useSlots()
const currentStep = ref(props.initialStep)
const direction = ref(1)
const isCompleted = ref(false)
const parentHeight = ref(0)
const containerRef = useTemplateRef<HTMLDivElement>('containerRef')
const contentRef = useTemplateRef<HTMLDivElement>('contentRef')

const stepsArray = computed(() => slots.default?.() || [])
const totalSteps = computed(() => stepsArray.value.length)
const isLastStep = computed(() => currentStep.value === totalSteps.value)

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

const measureHeight = () => {
  nextTick(() => {
    if (contentRef.value) {
      const height = contentRef.value.offsetHeight
      if (height > 0 && height !== parentHeight.value) {
        parentHeight.value = height
      }
    }
  })
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
  if (newStep !== oldStep && !isCompleted.value) {
    nextTick(measureHeight)
  } else if (!props.lockOnComplete && isCompleted.value) {
    isCompleted.value = false
    nextTick(measureHeight)
  }
})

onMounted(() => {
  if (props.initialStep !== 1) {
    currentStep.value = props.initialStep
  }
  measureHeight()
})
</script>
