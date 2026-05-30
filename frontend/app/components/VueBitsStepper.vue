<template>
  <div
    class="flex justify-center items-center w-full h-full"
    v-bind="$attrs"
  >
    <div
      :class="`w-full max-w-md p-8 rounded-[2rem] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] ${stepCircleContainerClassName}`"
      style="border: 1px solid #222"
    >
      <div
        :class="`flex items-center justify-center w-full ${stepContainerClassName}`"
        :style="{ marginBottom: isCompleted ? '0' : '2rem' }"
      >
        <template
          v-for="(_, index) in stepsArray"
          :key="index + 1"
        >
          <div
            v-if="!renderStepIndicator"
            :class="[
              'relative outline-none flex h-8 w-8 items-center justify-center rounded-full font-semibold',
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
              class="h-3 w-3 rounded-full bg-white"
            />
            <span
              v-else
              class="text-sm"
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
            class="relative ml-2 mr-2 h-0.5 flex-1 overflow-hidden rounded bg-sky-100"
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
          marginBottom: isCompleted ? '0' : '2rem'
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
            :transition="{ type: 'tween', stiffness: 300, damping: 30, duration: contentTransitionDuration }"
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
            type="button"
            :disabled="backButtonProps?.disabled"
            :class="`cursor-pointer rounded-full border border-sky-100 bg-white px-3 py-1.5 text-sm font-medium text-slate-500 transition-all duration-[350ms] hover:border-primary/40 hover:bg-sky-50 hover:text-primary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`"
            v-bind="backButtonProps"
            @click="handleBack"
          >
            {{ backButtonText }}
          </button>
          <button
            type="button"
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
  onMounted,
  onBeforeUnmount,
  nextTick,
  useTemplateRef,
  type VNode,
  type ButtonHTMLAttributes,
  type Component
} from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

interface StepperProps {
  children?: VNode[]
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  onBeforeNext?: (step: number) => boolean | Promise<boolean>
  onBeforeComplete?: () => boolean | Promise<boolean>
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: ButtonHTMLAttributes
  nextButtonProps?: ButtonHTMLAttributes
  backButtonText?: string
  nextButtonText?: string
  completeButtonText?: string
  contentTransitionDuration?: number
  contentExitDistance?: string
  disableStepIndicators?: boolean
  renderStepIndicator?: Component
  lockOnComplete?: boolean
}

const props = withDefaults(defineProps<StepperProps>(), {
  initialStep: 1,
  onStepChange: () => {},
  onFinalStepCompleted: () => {},
  onBeforeNext: () => true,
  onBeforeComplete: () => true,
  stepCircleContainerClassName: '',
  stepContainerClassName: '',
  contentClassName: '',
  footerClassName: '',
  backButtonProps: () => ({}),
  nextButtonProps: () => ({}),
  backButtonText: 'Back',
  nextButtonText: 'Continue',
  completeButtonText: 'Complete',
  contentTransitionDuration: 0.4,
  contentExitDistance: '50%',
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
let contentResizeObserver: ResizeObserver | null = null

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
  x: direction.value >= 0 ? `-${props.contentExitDistance}` : props.contentExitDistance,
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
      const height = contentRef.value.scrollHeight
      if (height > 0 && height !== parentHeight.value) {
        parentHeight.value = height
      }
    }
  })
}

const observeContentHeight = () => {
  if (contentResizeObserver) {
    contentResizeObserver.disconnect()
    contentResizeObserver = null
  }

  if (!contentRef.value || typeof ResizeObserver === 'undefined') return

  contentResizeObserver = new ResizeObserver(() => {
    measureHeight()
  })
  contentResizeObserver.observe(contentRef.value)
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

const handleNext = async () => {
  const canProceed = await props.onBeforeNext?.(currentStep.value)
  if (!canProceed) return

  direction.value = 1
  updateStep(currentStep.value + 1)
}

const handleComplete = async () => {
  const canComplete = await props.onBeforeComplete?.()
  if (!canComplete) return

  isCompleted.value = true
  props.onFinalStepCompleted?.()
}

watch(currentStep, (newStep, oldStep) => {
  props.onStepChange?.(newStep)
  if (newStep !== oldStep && !isCompleted.value) {
    nextTick(() => {
      observeContentHeight()
      measureHeight()
    })
  } else if (!props.lockOnComplete && isCompleted.value) {
    isCompleted.value = false
    nextTick(() => {
      observeContentHeight()
      measureHeight()
    })
  }
})

onMounted(() => {
  if (props.initialStep !== 1) {
    currentStep.value = props.initialStep
  }
  nextTick(() => {
    observeContentHeight()
    measureHeight()
  })
})

onBeforeUnmount(() => {
  contentResizeObserver?.disconnect()
})
</script>
