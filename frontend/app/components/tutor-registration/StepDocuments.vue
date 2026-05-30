<script setup lang="ts">
import type { TutorDocumentKey, TutorFormState } from '~/composables/useTutorForm'

defineProps<{
  idCardFileName: string
  transcriptFileName: string
  portfolioFileName: string
  handleNamedFileChange: (event: Event, target: TutorDocumentKey) => void
}>()

const state = defineModel<TutorFormState>('state', { required: true })
const { tr } = useAppLocale()
</script>

<template>
  <div class="grid gap-4">
    <div class="rounded-[1.25rem] bg-sky-50/70 px-4 py-3 ring-1 ring-sky-100">
      <p class="form-title">
        <UIcon
          name="i-lucide-file-up"
          class="size-4"
        />
        {{ tr('Verification documents', 'Verification documents') }}
      </p>
      <p class="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
        {{ tr('Accepted file types: JPG, PNG, PDF. Maximum size: 5MB per file.', 'Accepted file types: JPG, PNG, PDF. Maximum size: 5MB per file.') }}
      </p>
    </div>

    <div class="grid gap-3">
      <UFormField
        name="idCardFileName"
        :label="tr('ID card or student card', 'ID card or student card')"
        required
      >
        <label class="grid cursor-pointer gap-2 rounded-[1.5rem] border border-dashed border-sky-200 bg-sky-50/35 p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            class="sr-only"
            @change="handleNamedFileChange($event, 'idCard')"
          >
          <span class="flex items-center justify-between gap-3">
            <span class="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
              <UIcon
                name="i-lucide-id-card"
                class="size-5 shrink-0 text-primary"
              />
              <span class="truncate">{{ idCardFileName || tr('Upload JPG, PNG, or PDF', 'Upload JPG, PNG, or PDF') }}</span>
            </span>
            <span class="text-[11px] font-bold text-primary">{{ tr('Upload', 'Upload') }}</span>
          </span>
          <span class="text-xs text-dimmed">{{ tr('One clear JPG, PNG, or PDF file.', 'One clear JPG, PNG, or PDF file.') }}</span>
        </label>
      </UFormField>

      <UFormField
        name="transcriptFileName"
        :label="tr('Transcript or education certificate', 'Transcript or education certificate')"
      >
        <label class="grid cursor-pointer gap-2 rounded-[1.5rem] border border-dashed border-sky-200 bg-white p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            class="sr-only"
            @change="handleNamedFileChange($event, 'transcript')"
          >
          <span class="flex items-center justify-between gap-3">
            <span class="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
              <UIcon
                name="i-lucide-file-text"
                class="size-5 shrink-0 text-primary"
              />
              <span class="truncate">{{ transcriptFileName || tr('Upload transcript file', 'Upload transcript file') }}</span>
            </span>
            <span class="text-[11px] font-bold text-primary">{{ tr('Upload', 'Upload') }}</span>
          </span>
        </label>
      </UFormField>

      <UFormField
        name="portfolioFileName"
        :label="tr('Certificate or portfolio', 'Certificate or portfolio')"
      >
        <label class="grid cursor-pointer gap-2 rounded-[1.5rem] border border-dashed border-sky-200 bg-white p-4 transition-all hover:border-primary/60 hover:bg-primary/5">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            class="sr-only"
            @change="handleNamedFileChange($event, 'portfolio')"
          >
          <span class="flex items-center justify-between gap-3">
            <span class="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
              <UIcon
                name="i-lucide-folder-check"
                class="size-5 shrink-0 text-primary"
              />
              <span class="truncate">{{ portfolioFileName || tr('Upload certificate or portfolio file', 'Upload certificate or portfolio file') }}</span>
            </span>
            <span class="text-[11px] font-bold text-primary">{{ tr('Upload', 'Upload') }}</span>
          </span>
        </label>
      </UFormField>
    </div>

    <UFormField name="termsAccepted">
      <label class="inline-flex cursor-pointer items-start gap-2 text-[11px] leading-tight text-muted hover:text-toned">
        <input
          v-model="state.termsAccepted"
          type="checkbox"
          class="mt-0.5 accent-primary"
        >
        <span>{{ tr('I agree to the tutor terms and confirm that the information is accurate.', 'I agree to the tutor terms and confirm that the information is accurate.') }}</span>
      </label>
    </UFormField>
  </div>
</template>
