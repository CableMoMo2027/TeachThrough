<script setup lang="ts">
import type { TutorFormState } from '~/composables/useTutorForm'

defineProps<{
  subjectOptions: string[]
  languageOptions: string[]
  teachingModes: string[]
  selectedSubjects: string[]
  selectedLanguages: string[]
  toggleSubject: (subject: string) => void
  toggleLanguage: (language: string) => void
}>()

const state = defineModel<TutorFormState>('state', { required: true })
const { tr } = useAppLocale()
</script>

<template>
  <div class="grid gap-4">
    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-book-open-check"
            class="size-4"
          />
          {{ tr('Teaching subjects', 'Teaching subjects') }}
        </p>
        <p class="form-helper">
          {{ tr('Choose every subject you are comfortable teaching.', 'Choose every subject you are comfortable teaching.') }}
        </p>
      </div>
      <UFormField
        name="subjects"
        :label="tr('Subjects', 'Subjects')"
        required
      >
        <div class="flex flex-wrap gap-2">
          <button
            v-for="subject in subjectOptions"
            :key="subject"
            type="button"
            :class="[
              'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
              selectedSubjects.includes(subject)
                ? 'border-primary bg-primary text-white shadow-sm shadow-sky-200'
                : 'border-sky-100 bg-sky-50/60 text-slate-600 hover:border-primary/50 hover:text-primary'
            ]"
            @click="toggleSubject(subject)"
          >
            {{ subject }}
          </button>
          <button
            type="button"
            class="rounded-full border border-dashed border-sky-200 px-3 py-1.5 text-xs font-bold text-primary hover:bg-sky-50"
          >
            {{ tr('+ Add other subject', '+ Add other subject') }}
          </button>
        </div>
      </UFormField>
    </section>

    <div class="form-panel">
      <UFormField
        name="experience"
        :label="tr('Tutor experience', 'Tutor experience')"
        required
      >
        <UTextarea
          v-model="state.experience"
          class="premium-input teaching-outline-textarea"
          :rows="3"
          :placeholder="tr('Describe your teaching experience and strengths', 'Describe your teaching experience and strengths')"
        />
      </UFormField>
      <UFormField
        name="teachingLocation"
        :label="tr('Preferred teaching location', 'Preferred teaching location')"
        required
      >
        <UTextarea
          v-model="state.teachingLocation"
          class="premium-input teaching-outline-textarea"
          :rows="3"
          :placeholder="tr('Online, student home, cafe, school, or area', 'Online, student home, cafe, school, or area')"
        />
      </UFormField>
    </div>
    <div class="form-panel">
      <UFormField
        name="hourlyRate"
        :label="tr('Hourly rate', 'Hourly rate')"
        required
      >
        <UInput
          v-model="state.hourlyRate"
          class="premium-input"
          icon="i-lucide-badge-dollar-sign"
          type="number"
          inputmode="decimal"
          :placeholder="tr('Example: 500', 'Example: 500')"
        />
      </UFormField>
      <UFormField
        name="teachingMode"
        :label="tr('Teaching mode', 'Teaching mode')"
        required
      >
        <USelect
          v-model="state.teachingMode"
          class="premium-input"
          :items="teachingModes"
          :placeholder="tr('Select teaching mode', 'Select teaching mode')"
        />
      </UFormField>
    </div>

    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-languages"
            class="size-4"
          />
          {{ tr('Foreign languages', 'Foreign languages') }}
        </p>
        <p class="form-helper">
          {{ tr('Select languages you can use while teaching.', 'Select languages you can use while teaching.') }}
        </p>
      </div>
      <UFormField
        name="languages"
        :label="tr('Languages', 'Languages')"
      >
        <div class="flex flex-wrap gap-2">
          <button
            v-for="language in languageOptions"
            :key="language"
            type="button"
            :class="[
              'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
              selectedLanguages.includes(language)
                ? 'border-primary bg-primary text-white shadow-sm shadow-sky-200'
                : 'border-slate-200 bg-white text-slate-600 hover:border-primary/50 hover:text-primary'
            ]"
            @click="toggleLanguage(language)"
          >
            {{ language }}
          </button>
        </div>
      </UFormField>
    </section>
  </div>
</template>

<style scoped>
.teaching-outline-textarea {
  width: 100%;
  border-radius: 1.5rem;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.teaching-outline-textarea:focus-within {
  box-shadow: none !important;
}

.teaching-outline-textarea :deep(textarea) {
  min-height: 5rem;
  border-radius: 1.5rem;
  resize: none;
  box-shadow: inset 0 0 0 1.5px rgb(100 116 139 / 0.78) !important;
}

.teaching-outline-textarea :deep(textarea:focus),
.teaching-outline-textarea :deep(textarea:focus-visible) {
  --tw-ring-offset-shadow: 0 0 #0000 !important;
  --tw-ring-shadow: 0 0 #0000 !important;
  outline: none !important;
  box-shadow:
    inset 0 0 0 2px rgb(14 165 233),
    inset 0 0 0 4px rgb(14 165 233 / 0.18) !important;
}

</style>
