<script setup lang="ts">
const favorites = [
  { name: 'Maya Chen', subject: 'IB Math', rating: '4.98', price: '$28/hr' },
  { name: 'Arun Patel', subject: 'Physics', rating: '4.95', price: '$32/hr' }
]

const bookings = [
  { tutor: 'Sofia Rivera', time: 'Sat 10:00', status: 'Confirmed' },
  { tutor: 'Maya Chen', time: 'Wed 19:30', status: 'Pending' }
]
</script>

<template>
  <div class="min-h-screen bg-bg-muted/30 py-10 lg:py-14">
    <UContainer class="grid gap-8">
      <div>
        <p class="text-xs font-black uppercase tracking-widest text-primary">
          Student Dashboard
        </p>
        <h1 class="mt-2 text-4xl font-black tracking-tight text-highlighted">
          Your learning hub
        </h1>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <section class="premium-card rounded-[2rem] bg-white p-6 shadow-premium-md">
          <h2 class="text-2xl font-black text-highlighted">
            Favorite Tutors
          </h2>
          <div class="mt-5 grid gap-3">
            <article
              v-for="tutor in favorites"
              :key="tutor.name"
              class="rounded-[1.5rem] bg-sky-50/50 p-4 ring-1 ring-sky-100"
            >
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="font-black text-highlighted">
                    {{ tutor.name }}
                  </p>
                  <p class="text-sm font-semibold text-muted">
                    {{ tutor.subject }}
                  </p>
                </div>
                <div class="text-right text-sm font-black text-primary">
                  <p>{{ tutor.rating }}</p>
                  <p>{{ tutor.price }}</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="premium-card rounded-[2rem] bg-white p-6 shadow-premium-md">
          <h2 class="text-2xl font-black text-highlighted">
            Booking History
          </h2>
          <div class="mt-5 grid gap-3">
            <article
              v-for="booking in bookings"
              :key="`${booking.tutor}-${booking.time}`"
              class="flex items-center justify-between rounded-[1.5rem] border border-slate-100 bg-white p-4"
            >
              <div>
                <p class="font-black text-highlighted">
                  {{ booking.tutor }}
                </p>
                <p class="text-sm font-semibold text-muted">
                  {{ booking.time }}
                </p>
              </div>
              <UBadge
                :label="booking.status"
                class="rounded-full"
                :color="booking.status === 'Confirmed' ? 'primary' : 'neutral'"
                variant="subtle"
              />
            </article>
          </div>
        </section>
      </div>
    </UContainer>
  </div>
</template>
