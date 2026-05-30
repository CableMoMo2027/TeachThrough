<script setup lang="ts">
const stats = [
  { label: 'Earnings', value: '$2,840', icon: 'i-lucide-wallet-cards', tone: 'text-emerald-600 bg-emerald-50 ring-emerald-100' },
  { label: 'Total Students', value: '38', icon: 'i-lucide-users-round', tone: 'text-sky-600 bg-sky-50 ring-sky-100' },
  { label: 'Ratings', value: '4.98', icon: 'i-lucide-star', tone: 'text-amber-600 bg-amber-50 ring-amber-100' }
]

const subjects = ref(['Mathematics', 'SAT', 'IB Calculus'])
const profile = reactive({
  name: 'Maya Chen',
  headline: 'IB Math and SAT Tutor',
  rate: 28,
  bio: 'Structured lessons with diagnostic review, focused practice, and weekly progress notes.'
})
</script>

<template>
  <div class="min-h-screen bg-bg-muted/30 py-10 lg:py-14">
    <UContainer class="grid gap-8">
      <div>
        <p class="text-xs font-black uppercase tracking-widest text-primary">
          Tutor Dashboard
        </p>
        <h1 class="mt-2 text-4xl font-black tracking-tight text-highlighted">
          Manage your teaching profile
        </h1>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="premium-card rounded-[2rem] bg-white p-6 shadow-premium-md"
        >
          <div :class="['grid size-12 place-items-center rounded-2xl ring-1', stat.tone]">
            <UIcon
              :name="stat.icon"
              class="size-6"
            />
          </div>
          <p class="mt-5 text-sm font-bold uppercase tracking-widest text-dimmed">
            {{ stat.label }}
          </p>
          <p class="mt-2 text-3xl font-black text-highlighted">
            {{ stat.value }}
          </p>
        </article>
      </div>

      <section class="premium-card rounded-[2rem] bg-white p-6 shadow-premium-md lg:p-8">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black tracking-tight text-highlighted">
              Edit Profile
            </h2>
            <p class="mt-1 text-sm font-semibold text-muted">
              Keep your public tutor profile ready for students.
            </p>
          </div>
          <UBadge
            label="Verified"
            class="rounded-full bg-sky-50 text-primary ring-1 ring-sky-100"
          />
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <UFormField label="Name">
            <UInput
              v-model="profile.name"
              class="premium-input"
              size="lg"
              placeholder="Enter your public name"
            />
          </UFormField>
          <UFormField label="Headline">
            <UInput
              v-model="profile.headline"
              class="premium-input"
              size="lg"
              placeholder="Example: IB Math and SAT Tutor"
            />
          </UFormField>
          <UFormField label="Hourly rate">
            <UInput
              v-model="profile.rate"
              class="premium-input"
              size="lg"
              type="number"
              icon="i-lucide-badge-dollar-sign"
              placeholder="Example: 500"
            />
          </UFormField>
          <UFormField label="Primary subject">
            <UInput
              v-model="subjects[0]"
              class="premium-input"
              size="lg"
              icon="i-lucide-book-open"
              placeholder="Example: Mathematics"
            />
          </UFormField>
          <UFormField
            label="Bio"
            class="md:col-span-2"
          >
            <UTextarea
              v-model="profile.bio"
              class="premium-input"
              :rows="4"
              placeholder="Describe your teaching style and student outcomes"
            />
          </UFormField>
        </div>

        <div class="mt-6 flex justify-end">
          <UButton
            class="rounded-full font-black shadow-premium-sm"
            trailing-icon="i-lucide-save"
          >
            Save Profile
          </UButton>
        </div>
      </section>
    </UContainer>
  </div>
</template>
