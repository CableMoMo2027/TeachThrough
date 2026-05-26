<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  text: string
  className?: string
  delay?: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  delay: 0,
  duration: 0.6
})

const containerRef = ref<HTMLElement | null>(null)
const chars = computed(() => props.text.split(''))

const animate = () => {
  if (!containerRef.value) return

  const charElements = containerRef.value.querySelectorAll('.split-char')
  gsap.fromTo(charElements,
    {
      y: 20,
      opacity: 0,
      rotateX: -90
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: props.duration,
      stagger: 0.03,
      ease: 'back.out(2)',
      delay: props.delay
    }
  )
}

watch(() => props.text, () => {
  nextTick(animate)
})

onMounted(() => {
  animate()
})
</script>

<template>
  <span
    ref="containerRef"
    :class="['inline-block perspective-500', className]"
  >
    <span
      v-for="(char, index) in chars"
      :key="index"
      class="split-char inline-block whitespace-pre"
    >
      {{ char }}
    </span>
  </span>
</template>

<style scoped>
.perspective-500 {
  perspective: 500px;
}
</style>
