<script setup lang="ts">
import type { TutorDocumentKey, TutorFormState } from '~/composables/useTutorForm'

defineProps<{
  degreeOptions: string[]
  yearOptions: string[]
  additionalEducationFileName: string
  handleNamedFileChange: (event: Event, target: TutorDocumentKey) => void
}>()

const state = defineModel<TutorFormState>('state', { required: true })
const hasAdditionalEducation = defineModel<boolean>('hasAdditionalEducation', { default: false })
const { tr } = useAppLocale()
</script>

<template>
  <div class="grid gap-5">
    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-school"
            class="size-4"
          />
          {{ tr('High school background', 'High school background') }}
        </p>
        <p class="form-helper">
          {{ tr('Add your latest high school information.', 'Add your latest high school information.') }}
        </p>
      </div>
      <div class="grid gap-3">
        <UFormField
          name="highSchoolName"
          :label="tr('High school name', 'High school name')"
          required
        >
          <UInput
            v-model="state.highSchoolName"
            class="premium-input"
            icon="i-lucide-school"
            :placeholder="tr('Enter school name', 'Enter school name')"
          />
        </UFormField>
        <UFormField
          name="highSchoolMajor"
          :label="tr('High school major', 'High school major')"
          required
        >
          <UInput
            v-model="state.highSchoolMajor"
            class="premium-input"
            :placeholder="tr('Science, Arts, or other track', 'Science, Arts, or other track')"
          />
        </UFormField>
        <UFormField
          name="highSchoolGpa"
          :label="tr('High school GPA', 'High school GPA')"
          required
        >
          <UInput
            v-model="state.highSchoolGpa"
            class="premium-input"
            type="text"
            inputmode="decimal"
            pattern="\d+(\.\d{1,2})"
            :placeholder="tr('Example: 3.50', 'Example: 3.50')"
          />
        </UFormField>
      </div>
    </section>

    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-building-2"
            class="size-4"
          />
          {{ tr('University background', 'University background') }}
        </p>
        <p class="form-helper">
          {{ tr('Use your current or most recent university record.', 'Use your current or most recent university record.') }}
        </p>
      </div>
      <div class="grid gap-3">
        <UFormField
          name="degree"
          :label="tr('University degree', 'University degree')"
          required
        >
          <USelect
            v-model="state.degree"
            class="premium-input"
            :items="degreeOptions"
            :placeholder="tr('Select degree', 'Select degree')"
          />
        </UFormField>
        <UFormField
          name="university"
          :label="tr('University', 'University')"
          required
        >
          <UInput
            v-model="state.university"
            class="premium-input"
            icon="i-lucide-building-2"
            :placeholder="tr('Enter university name', 'Enter university name')"
          />
        </UFormField>
        <UFormField
          name="faculty"
          :label="tr('Faculty', 'Faculty')"
          required
        >
          <UInput
            v-model="state.faculty"
            class="premium-input"
            :placeholder="tr('Enter faculty', 'Enter faculty')"
          />
        </UFormField>
        <UFormField
          name="major"
          :label="tr('Major', 'Major')"
          required
        >
          <UInput
            v-model="state.major"
            class="premium-input"
            :placeholder="tr('Enter major', 'Enter major')"
          />
        </UFormField>
        <UFormField
          name="year"
          :label="tr('Year', 'Year')"
          required
        >
          <USelect
            v-model="state.year"
            class="premium-input"
            :items="yearOptions"
            :placeholder="tr('Select year', 'Select year')"
          />
        </UFormField>
        <UFormField
          name="universityGpa"
          :label="tr('University GPA', 'University GPA')"
          required
        >
          <UInput
            v-model="state.universityGpa"
            class="premium-input"
            type="text"
            inputmode="decimal"
            pattern="\d+(\.\d{1,2})"
            :placeholder="tr('Example: 3.50', 'Example: 3.50')"
          />
        </UFormField>
      </div>
    </section>

    <section class="rounded-[1.5rem] border border-sky-100 bg-sky-50/40 p-4">
      <p class="form-title">
        <UIcon
          name="i-lucide-badge-check"
          class="size-4"
        />
        {{ tr('Additional education?', 'Additional education?') }}
      </p>
      <p class="form-helper mt-1">
        {{ tr('Add certificates or qualifications only if you have them.', 'Add certificates or qualifications only if you have them.') }}
      </p>
      <div class="mt-2 flex gap-6 text-xs text-muted">
        <label class="inline-flex cursor-pointer items-center gap-2 hover:text-primary">
          <input
            v-model="hasAdditionalEducation"
            type="radio"
            :value="true"
            name="hasMoreEducation"
            class="accent-primary"
          >
          {{ tr('Yes', 'Yes') }}
        </label>
        <label class="inline-flex cursor-pointer items-center gap-2 hover:text-primary">
          <input
            v-model="hasAdditionalEducation"
            type="radio"
            :value="false"
            name="hasMoreEducation"
            class="accent-primary"
          >
          {{ tr('No', 'No') }}
        </label>
      </div>
      <div
        v-if="hasAdditionalEducation"
        class="mt-3 grid gap-3"
      >
        <UFormField
          name="additionalEducationName"
          :label="tr('Certificate or qualification name', 'Certificate or qualification name')"
        >
          <UInput
            v-model="state.additionalEducationName"
            class="premium-input"
            :placeholder="tr('Example: IELTS, TOEIC, competition award', 'Example: IELTS, TOEIC, competition award')"
          />
        </UFormField>
        <UFormField
          name="additionalEducationFileName"
          :label="tr('Supporting document', 'Supporting document')"
        >
          <label class="grid min-h-14 cursor-pointer place-items-center rounded-[1rem] border border-dashed border-sky-200 bg-white/75 px-4 py-2 text-center transition-all hover:border-primary/60 hover:bg-primary/5">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              class="sr-only"
              @change="handleNamedFileChange($event, 'additionalEducation')"
            >
            <span class="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
              <UIcon
                name="i-lucide-upload"
                class="size-5 shrink-0 text-primary"
              />
              <span class="truncate">{{ additionalEducationFileName || tr('Upload supporting document', 'Upload supporting document') }}</span>
            </span>
          </label>
        </UFormField>
      </div>
    </section>
  </div>
</template>
