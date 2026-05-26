<script setup lang="ts">
import CardSwap from '~/components/Card_Swap.vue'
</script>

<template>
  <section class="relative isolate min-h-[calc(100dvh-var(--ui-header-height))] bg-muted">
    <div class="absolute inset-0 soft-grid opacity-80" />
    <div class="absolute -left-20 top-24 size-64 rounded-full bg-primary/10 blur-3xl sm:size-72" />
    <div class="absolute bottom-0 right-0 hidden size-[620px] bg-[radial-gradient(circle_at_center,var(--color-brand-100),transparent_64%)] opacity-80 lg:block" />

    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <ClientOnly>
        <CardSwap
          :width="380"
          :height="280"
          :card-distance="54"
          :vertical-distance="62"
          :delay="4200"
          :skew-amount="5"
          class="hidden opacity-95 md:block"
        >
          <template #card-0>
            <div class="flex h-full flex-col justify-between rounded-2xl p-6 text-white">
              <div>
                <div class="mb-4 grid size-11 place-items-center rounded-lg bg-white/15">
                  <UIcon
                    name="i-lucide-graduation-cap"
                    class="size-6"
                  />
                </div>
                <p class="text-sm text-white/60">
                  Verified Tutor
                </p>
                <p class="mt-2 text-2xl font-semibold">
                  Mathematics
                </p>
              </div>
              <p class="text-sm leading-6 text-white/70">
                Clear pricing, real reviews, and flexible online sessions.
              </p>
            </div>
          </template>

          <template #card-1>
            <div class="flex h-full flex-col justify-between rounded-2xl bg-primary p-6 text-white">
              <div>
                <div class="mb-4 grid size-11 place-items-center rounded-lg bg-white/20">
                  <UIcon
                    name="i-lucide-calendar-check"
                    class="size-6"
                  />
                </div>
                <p class="text-sm text-white/70">
                  Weekly Plan
                </p>
                <p class="mt-2 text-2xl font-semibold">
                  3 sessions booked
                </p>
              </div>
              <p class="text-sm leading-6 text-white/80">
                Parents can compare availability before contacting tutors.
              </p>
            </div>
          </template>

          <template #card-2>
            <div class="flex h-full flex-col justify-between rounded-2xl bg-white p-6 text-highlighted">
              <div>
                <div class="mb-4 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <UIcon
                    name="i-lucide-star"
                    class="size-6"
                  />
                </div>
                <p class="text-sm text-muted">
                  Parent Review
                </p>
                <p class="mt-2 text-2xl font-semibold">
                  4.9 rating
                </p>
              </div>
              <p class="text-sm leading-6 text-muted">
                Find teachers with proven experience and trusted feedback.
              </p>
            </div>
          </template>
        </CardSwap>
      </ClientOnly>
    </div>

    <UContainer class="auth-route-shell relative z-10 flex min-h-[calc(100dvh-var(--ui-header-height))] items-center justify-center px-4 py-6 sm:py-8">
      <div class="w-full flex justify-center">
        <slot />
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.auth-route-shell:has(.auth-long-form) {
  align-items: flex-start;
}
</style>
