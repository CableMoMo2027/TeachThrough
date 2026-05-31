<script setup lang="ts">
import type { TutorFormState } from '~/composables/useTutorForm'
import { requiresOnsiteDetails } from '~/utils/tutorOnboarding'

defineProps<{
  subjectOptions: string[]
  learnerLevels: string[]
  teachingFormats: string[]
  languageOptions: string[]
  teachingModes: string[]
  selectedLanguages: string[]
  selectedTeachingFormats: string[]
  toggleSubject: (subject: string) => void
  toggleSubjectLearnerLevel: (subject: string, learnerLevel: string) => void
  addAdditionalSubject: () => void
  toggleLanguage: (language: string) => void
  toggleTeachingFormat: (format: string) => void
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
          {{ tr('Teaching subjects and learner levels', 'วิชาและระดับผู้เรียนที่สอนได้') }}
        </p>
        <p class="form-helper">
          {{ tr('Choose each subject, then mark the learner levels you can teach for that subject.', 'เลือกวิชา แล้วระบุระดับผู้เรียนที่คุณสอนได้ในแต่ละวิชา') }}
        </p>
      </div>
      <UFormField
        name="subjectLevels"
        :label="tr('Subjects', 'วิชาที่สอน')"
        required
      >
        <div class="grid gap-3">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="subject in subjectOptions"
              :key="subject"
              type="button"
              :class="[
                'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
                state.subjectLevels.some(pair => pair.subject === subject)
                  ? 'border-primary bg-primary text-white shadow-sm shadow-sky-200'
                  : 'border-sky-100 bg-sky-50/60 text-slate-600 hover:border-primary/50 hover:text-primary'
              ]"
              @click="toggleSubject(subject)"
            >
              {{ subject }}
            </button>
          </div>

          <div class="grid gap-2 sm:grid-cols-[1fr_auto]">
            <UInput
              v-model="state.additionalSubject"
              class="premium-input"
              :placeholder="tr('Other subject', 'วิชาอื่น ๆ')"
            />
            <UButton
              type="button"
              variant="soft"
              color="primary"
              class="justify-center rounded-full font-bold"
              @click="addAdditionalSubject"
            >
              {{ tr('Add subject', 'เพิ่มวิชา') }}
            </UButton>
          </div>

          <div
            v-if="state.subjectLevels.length"
            class="grid gap-3"
          >
            <div
              v-for="pair in state.subjectLevels"
              :key="pair.subject"
              class="rounded-[1rem] bg-white p-3 ring-1 ring-sky-100"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-black text-highlighted">
                  {{ pair.subject }}
                </p>
                <button
                  type="button"
                  class="text-xs font-bold text-muted hover:text-primary"
                  @click="toggleSubject(pair.subject)"
                >
                  {{ tr('Remove', 'ลบ') }}
                </button>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="level in learnerLevels"
                  :key="`${pair.subject}-${level}`"
                  type="button"
                  :class="[
                    'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
                    pair.learnerLevels.includes(level)
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary/50 hover:text-primary'
                  ]"
                  @click="toggleSubjectLearnerLevel(pair.subject, level)"
                >
                  {{ level }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </UFormField>
    </section>

    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-clipboard-check"
            class="size-4"
          />
          {{ tr('Teaching Experience', 'ประสบการณ์การสอน') }}
        </p>
        <p class="form-helper">
          {{ tr('Use structured details so the team can review your application consistently.', 'กรอกข้อมูลเป็นส่วน ๆ เพื่อให้ทีมงานตรวจสอบใบสมัครได้ชัดเจน') }}
        </p>
      </div>
      <UFormField
        name="experienceYears"
        :label="tr('Teaching duration', 'ระยะเวลาประสบการณ์สอน')"
        required
      >
        <UInput
          v-model="state.experienceYears"
          class="premium-input"
          :placeholder="tr('Example: 2 years, 6 months, or new tutor', 'เช่น 2 ปี, 6 เดือน หรือเริ่มสอนใหม่')"
        />
      </UFormField>
      <UFormField
        name="teachingFormats"
        :label="tr('Teaching formats you have done', 'รูปแบบการสอนที่เคยทำ')"
        required
      >
        <div class="flex flex-wrap gap-2">
          <button
            v-for="format in teachingFormats"
            :key="format"
            type="button"
            :class="[
              'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
              selectedTeachingFormats.includes(format)
                ? 'border-primary bg-primary text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-primary/50 hover:text-primary'
            ]"
            @click="toggleTeachingFormat(format)"
          >
            {{ format }}
          </button>
        </div>
      </UFormField>
      <UFormField
        name="teachingOutcomes"
        :label="tr('Outcome example', 'ตัวอย่างผลลัพธ์การสอน')"
        required
      >
        <UTextarea
          v-model="state.teachingOutcomes"
          class="premium-input teaching-outline-textarea"
          :rows="3"
          :placeholder="tr('Example: helped a Grade 9 learner improve algebra scores before exams', 'เช่น ช่วยนักเรียน ม.3 พัฒนาคะแนนพีชคณิตก่อนสอบ')"
        />
      </UFormField>
    </section>

    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-map-pin"
            class="size-4"
          />
          {{ tr('Teaching setup', 'รูปแบบการสอนที่ต้องการ') }}
        </p>
      </div>
      <UFormField
        name="teachingMode"
        :label="tr('Teaching mode', 'รูปแบบการสอนที่ต้องการ')"
        required
      >
        <USelect
          v-model="state.teachingMode"
          class="premium-input"
          :items="teachingModes"
          :placeholder="tr('Select teaching mode', 'เลือกรูปแบบการสอน')"
        />
      </UFormField>
      <UFormField
        name="teachingLocation"
        :label="tr('Preferred teaching location summary', 'สรุปสถานที่สอนที่สะดวก')"
        required
      >
        <UTextarea
          v-model="state.teachingLocation"
          class="premium-input teaching-outline-textarea"
          :rows="2"
          :placeholder="tr('Online, student home, cafe, school, or other preference', 'ออนไลน์ บ้านผู้เรียน คาเฟ่ โรงเรียน หรือสถานที่อื่น ๆ')"
        />
      </UFormField>
      <div
        v-if="requiresOnsiteDetails(state.teachingMode)"
        class="grid gap-3 rounded-[1rem] bg-sky-50/60 p-3 ring-1 ring-sky-100"
      >
        <UFormField
          name="onsiteProvince"
          :label="tr('Onsite province', 'จังหวัดที่รับสอนนอกสถานที่')"
          required
        >
          <UInput
            v-model="state.onsiteProvince"
            class="premium-input"
            :placeholder="tr('Example: Bangkok', 'เช่น กรุงเทพฯ')"
          />
        </UFormField>
        <UFormField
          name="onsiteArea"
          :label="tr('District or area', 'เขต/อำเภอหรือพื้นที่ที่สะดวก')"
          required
        >
          <UInput
            v-model="state.onsiteArea"
            class="premium-input"
            :placeholder="tr('Example: Pathum Wan, Siam, Ari', 'เช่น ปทุมวัน สยาม อารีย์')"
          />
        </UFormField>
        <UFormField
          name="onsiteNote"
          :label="tr('Area note', 'รายละเอียดพื้นที่เพิ่มเติม')"
        >
          <UTextarea
            v-model="state.onsiteNote"
            class="premium-input teaching-outline-textarea"
            :rows="2"
            :placeholder="tr('Optional travel or location details', 'รายละเอียดการเดินทางหรือพื้นที่เพิ่มเติม (ไม่บังคับ)')"
          />
        </UFormField>
      </div>
    </section>

    <section class="form-panel">
      <UFormField
        name="hourlyRate"
        :label="tr('Base hourly rate', 'ราคาพื้นฐานต่อชั่วโมง')"
        required
      >
        <UInput
          v-model="state.hourlyRate"
          class="premium-input"
          icon="i-lucide-badge-dollar-sign"
          type="number"
          inputmode="decimal"
          :placeholder="tr('Example: 500', 'เช่น 500')"
        />
      </UFormField>
      <UFormField
        name="pricingNote"
        :label="tr('Pricing note', 'รายละเอียดราคาเพิ่มเติม')"
      >
        <UTextarea
          v-model="state.pricingNote"
          class="premium-input teaching-outline-textarea"
          :rows="2"
          :placeholder="tr('Optional: different rates by subject, level, or online/onsite', 'ไม่บังคับ: ราคาต่างกันตามวิชา ระดับผู้เรียน หรือรูปแบบออนไลน์/นอกสถานที่')"
        />
      </UFormField>
    </section>

    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-languages"
            class="size-4"
          />
          {{ tr('Foreign languages', 'ภาษาต่างประเทศ') }}
        </p>
        <p class="form-helper">
          {{ tr('Select languages you can use while teaching.', 'เลือกภาษาที่คุณสามารถใช้ในการสอนได้') }}
        </p>
      </div>
      <UFormField
        name="languages"
        :label="tr('Languages', 'ภาษา')"
        required
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
