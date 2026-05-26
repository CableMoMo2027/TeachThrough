<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  to: number
  from?: number
  duration?: number
  delay?: number
  precision?: number
  prefix?: string
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  from: 0,
  duration: 3,
  delay: 0,
  precision: 0,
  prefix: '',
  suffix: ''
})

const displayValue = ref(props.from)
const countRef = ref<HTMLElement | null>(null)

const formattedValue = computed(() => {
  const value = displayValue.value.toFixed(props.precision)
  return `${props.prefix}${value}${props.suffix}`
})

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)

    const counter = { val: props.from }

    gsap.to(counter, {
      val: props.to,
      duration: props.duration,
      delay: props.delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: countRef.value,
        start: 'top 90%'
      },
      onUpdate: () => {
        displayValue.value = counter.val
      }
    })
  }
})
</script>

<template>
  <span
    ref="countRef"
    class="tabular-nums"
  >
    {{ formattedValue }}
  </span>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
