<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
const words = computed(() => props.text.split(' '))

const initAnimation = () => {
  if (!containerRef.value || !import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  const chars = containerRef.value.querySelectorAll('.blur-char')

  const animation = gsap.fromTo(chars,
    {
      filter: `blur(${props.blur})`,
      opacity: 0,
      y: props.y
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
        v-for="(char, cIndex) in word.split('')"
        :key="cIndex"
        class="blur-char inline-block"
      >
        {{ char }}
      </span>
    </span>
  </span>
</template>
