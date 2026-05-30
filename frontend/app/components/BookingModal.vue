<script setup lang="ts">
const props = defineProps<{
  open: boolean
  tutorName: string
  price: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'confirm': []
}>()

const selectedDay = ref('Wed 19:30')
const selectedDuration = ref('60 minutes')

const availableDays = ['Mon 18:00', 'Wed 19:30', 'Sat 10:00', 'Sun 14:00']
const durations = ['45 minutes', '60 minutes', '90 minutes']

const numericPrice = computed(() => Number(props.price.replace(/[^0-9.]/g, '')) || 0)
const totalPrice = computed(() => {
  const multiplier = selectedDuration.value === '90 minutes' ? 1.5 : selectedDuration.value === '45 minutes' ? 0.75 : 1
  return `$${Math.round(numericPrice.value * multiplier)}`
})

const close = () => emit('update:open', false)

const confirmBooking = () => {
  emit('confirm')
  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="booking-modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-md"
        @click.self="close"
      >
        <section class="glass-premium w-full max-w-lg rounded-[2rem] border border-white/45 bg-white/85 p-6 shadow-2xl ring-1 ring-sky-100/70 sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-black uppercase tracking-widest text-primary">
                Reserve a Session
              </p>
              <h2 class="mt-2 text-2xl font-black tracking-tight text-highlighted">
                {{ tutorName }}
              </h2>
              <p class="mt-1 text-sm font-semibold text-muted">
                Choose a time and review your estimated lesson price.
              </p>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              aria-label="Close booking modal"
              @click="close"
            />
          </div>

          <div class="mt-7 grid gap-5">
            <section>
              <p class="text-xs font-black uppercase tracking-widest text-dimmed">
                Available time
              </p>
              <div class="mt-3 grid grid-cols-2 gap-2">
                <button
                  v-for="day in availableDays"
                  :key="day"
                  type="button"
                  :class="[
                    'rounded-2xl border px-3 py-3 text-sm font-bold transition-all',
                    selectedDay === day
                      ? 'border-primary bg-primary text-white shadow-premium-sm'
                      : 'border-sky-100 bg-white/70 text-slate-600 hover:border-primary/50 hover:text-primary'
                  ]"
                  @click="selectedDay = day"
                >
                  {{ day }}
                </button>
              </div>
            </section>

            <section>
              <p class="text-xs font-black uppercase tracking-widest text-dimmed">
                Duration
              </p>
              <div class="mt-3 grid gap-2 sm:grid-cols-3">
                <button
                  v-for="duration in durations"
                  :key="duration"
                  type="button"
                  :class="[
                    'rounded-2xl border px-3 py-3 text-xs font-bold transition-all',
                    selectedDuration === duration
                      ? 'border-primary bg-sky-50 text-primary ring-1 ring-primary/20'
                      : 'border-sky-100 bg-white/70 text-slate-600 hover:border-primary/50 hover:text-primary'
                  ]"
                  @click="selectedDuration = duration"
                >
                  {{ duration }}
                </button>
              </div>
            </section>

            <div class="rounded-[1.5rem] bg-sky-50/80 p-4 ring-1 ring-sky-100">
              <div class="flex items-center justify-between text-sm font-semibold text-muted">
                <span>{{ selectedDay }}</span>
                <span>{{ selectedDuration }}</span>
              </div>
              <div class="mt-3 flex items-end justify-between">
                <p class="text-xs font-black uppercase tracking-widest text-primary">
                  Estimated total
                </p>
                <p class="text-3xl font-black text-highlighted">
                  {{ totalPrice }}
                </p>
              </div>
            </div>

            <UButton
              size="xl"
              block
              trailing-icon="i-lucide-calendar-check"
              class="rounded-full font-black shadow-premium-md transition-all hover:scale-[1.01]"
              @click="confirmBooking"
            >
              Confirm Reservation
            </UButton>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.booking-modal-enter-active,
.booking-modal-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.booking-modal-enter-from,
.booking-modal-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
