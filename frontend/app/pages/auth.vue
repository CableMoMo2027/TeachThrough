<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'auth-page'
  }
})
</script>

<template>
  <AuthRouteBackground>
    <NuxtPage
      :transition="{
        name: 'auth-form',
        mode: 'out-in'
      }"
    />
  </AuthRouteBackground>
</template>
