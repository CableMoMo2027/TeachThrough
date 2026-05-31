<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { segmentGraphemes } from '~/utils/textSegmentation'

interface Props {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  blur?: string
  y?: number
  animateOnScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  delay: 0,
  duration: 1,
  stagger: 0.04,
  blur: '12px',
  y: 20,
  animateOnScroll: true
})

const containerRef = ref<HTMLElement | null>(null)
const words = computed(() => props.text.split(' ').map(word => segmentGraphemes(word)))

const initAnimation = () => {
  if (!containerRef.value || !import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  const chars = containerRef.value.querySelectorAll('.blur-char')
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const blurAmount = isMobile || shouldReduceMotion ? '0px' : props.blur
  const yAmount = isMobile ? props.y * 0.5 : props.y

  const animation = gsap.fromTo(chars,
    {
      filter: `blur(${blurAmount})`,
      opacity: 0,
      y: yAmount
    },
    {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      duration: props.duration,
      stagger: props.stagger,
      ease: 'expo.out',
      delay: props.delay,
      paused: props.animateOnScroll
    }
  )

  if (props.animateOnScroll) {
    ScrollTrigger.create({
      trigger: containerRef.value,
      start: 'top 85%',
      onEnter: () => animation.play()
    })
  } else {
    animation.play()
  }
}

watch(() => props.text, () => {
  nextTick(initAnimation)
})

onMounted(() => {
  initAnimation()
})
</script>

<template>
  <span
    ref="containerRef"
    :class="['inline-block', className]"
  >
    <span
      v-for="(word, wIndex) in words"
      :key="wIndex"
      class="inline-block whitespace-nowrap mr-[0.25em]"
    >
      <span
        v-for="(char, cIndex) in word"
        :key="cIndex"
        class="blur-char inline-block"
      >
        {{ char }}
      </span>
    </span>
  </span>
</template>
