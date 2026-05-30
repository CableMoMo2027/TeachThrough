<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <UCard
    class="premium-card mx-auto w-full max-w-lg bg-white/95 text-center shadow-xl backdrop-blur"
    :ui="{ body: 'px-8 py-10' }"
  >
    <FadeContent
      :blur="true"
      :duration="0.9"
      :stagger="0.12"
      :y="24"
      :animate-on-scroll="false"
      class="grid place-items-center gap-5"
    >
      <div class="grid size-16 place-items-center rounded-[1.5rem] bg-sky-50 text-primary ring-1 ring-sky-100">
        <UIcon
          name="i-lucide-party-popper"
          class="size-8"
        />
      </div>
      <h1 class="text-3xl font-black tracking-tight text-highlighted">
        <BlurText
          text="Registration complete"
          :animate-on-scroll="false"
        />
      </h1>
      <p class="max-w-sm text-sm font-semibold leading-relaxed text-muted">
        Your account has been created. Tutor profiles will be reviewed before becoming public.
      </p>
      <UButton
        to="/"
        size="xl"
        class="rounded-full font-black shadow-premium-sm"
      >
        Continue to TeachThrough
      </UButton>
    </FadeContent>
  </UCard>
</template>
