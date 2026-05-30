<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  blur?: boolean
  duration?: number
  delay?: number
  y?: number
  x?: number
  scale?: number
  stagger?: number
  animateOnScroll?: boolean
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  blur: false,
  duration: 1,
  delay: 0,
  y: 20,
  x: 0,
  scale: 1,
  stagger: 0,
  animateOnScroll: true,
  threshold: 0.1
})

const containerRef = ref<HTMLElement | null>(null)

const initAnimation = () => {
  if (!containerRef.value || !import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  const targets = containerRef.value.children
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const blurValue = props.blur && !isMobile && !shouldReduceMotion ? 'blur(10px)' : 'none'
  const yValue = isMobile ? props.y * 0.5 : props.y
  const xValue = isMobile ? props.x * 0.5 : props.x

  const animation = gsap.fromTo(targets,
    {
      opacity: 0,
      y: yValue,
      x: xValue,
      scale: props.scale,
      filter: blurValue
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: props.duration,
      stagger: props.stagger,
      ease: 'power3.out',
      delay: props.delay,
      paused: props.animateOnScroll
    }
  )

  if (props.animateOnScroll) {
    ScrollTrigger.create({
      trigger: containerRef.value,
      start: `top ${100 - (props.threshold * 100)}%`,
      onEnter: () => animation.play()
    })
  } else {
    animation.play()
  }
}

onMounted(() => {
  initAnimation()
})
</script>

<template>
  <div
    ref="containerRef"
    class="fade-content-container"
  >
    <slot />
  </div>
</template>
