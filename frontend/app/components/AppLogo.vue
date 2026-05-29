<script setup lang="ts">
import GlassIcons from './GlassIcons/GlassIcons.vue'

const logoIcon = [
  {
    icon: 'i-lucide-graduation-cap',
    color: 'linear-gradient(135deg, oklch(0.72 0.15 221), oklch(0.63 0.18 252))',
    label: 'TeachThrough'
  }
]
</script>

<template>
  <div class="grid place-items-center overflow-visible">
    <GlassIcons
      :items="logoIcon"
      class-name="!grid-cols-1 !gap-0 !overflow-visible !p-0 text-[8px]"
      icon-class-name="!size-[1.45em] text-white"
      :interactive="false"
      :show-label="false"
    />
  </div>
</template>
