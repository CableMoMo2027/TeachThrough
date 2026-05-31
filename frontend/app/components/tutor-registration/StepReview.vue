<script setup lang="ts">
import type { TutorFormState } from '~/composables/useTutorForm'

defineProps<{
  goToStep: (step: number) => void
}>()

const state = defineModel<TutorFormState>('state', { required: true })
const { tr } = useAppLocale()

const formatList = (items: string[]) => items.length ? items.join(', ') : tr('Not provided', 'ยังไม่ได้ระบุ')
</script>

<template>
  <div class="grid gap-4">
    <section class="rounded-[1.25rem] bg-sky-50/70 px-4 py-3 ring-1 ring-sky-100">
      <p class="form-title">
        <UIcon
          name="i-lucide-clipboard-list"
          class="size-4"
        />
        {{ tr('Review Tutor Application', 'ตรวจทานใบสมัครติวเตอร์') }}
      </p>
      <p class="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
        {{ tr('Check the main details before submitting. Use Edit to jump back to a section.', 'ตรวจสอบข้อมูลสำคัญก่อนส่งใบสมัคร หากต้องการแก้ไขให้กด “แก้ไข” ในหัวข้อนั้น') }}
      </p>
    </section>

    <section class="review-panel">
      <div class="review-header">
        <h2>{{ tr('Contact', 'ข้อมูลติดต่อ') }}</h2>
        <button
          type="button"
          @click="goToStep(2)"
        >
          {{ tr('Edit', 'แก้ไข') }}
        </button>
      </div>
      <dl class="review-grid">
        <div>
          <dt>{{ tr('Name', 'ชื่อ') }}</dt>
          <dd>{{ state.firstName }} {{ state.lastName }}</dd>
        </div>
        <div>
          <dt>{{ tr('Email', 'อีเมล') }}</dt>
          <dd>{{ state.email }}</dd>
        </div>
        <div>
          <dt>{{ tr('Mobile', 'เบอร์โทรศัพท์') }}</dt>
          <dd>{{ state.mobile }}</dd>
        </div>
        <div>
          <dt>{{ tr('Province', 'จังหวัด') }}</dt>
          <dd>{{ state.province }}</dd>
        </div>
      </dl>
    </section>

    <section class="review-panel">
      <div class="review-header">
        <h2>{{ tr('Education', 'การศึกษา') }}</h2>
        <button
          type="button"
          @click="goToStep(3)"
        >
          {{ tr('Edit', 'แก้ไข') }}
        </button>
      </div>
      <dl class="review-grid">
        <div>
          <dt>{{ tr('University', 'มหาวิทยาลัย') }}</dt>
          <dd>{{ state.university }}</dd>
        </div>
        <div>
          <dt>{{ tr('Degree', 'ระดับการศึกษา') }}</dt>
          <dd>{{ state.degree }}</dd>
        </div>
        <div>
          <dt>{{ tr('Faculty / Major', 'คณะ / สาขา') }}</dt>
          <dd>{{ state.faculty }} / {{ state.major }}</dd>
        </div>
      </dl>
    </section>

    <section class="review-panel">
      <div class="review-header">
        <h2>{{ tr('Teaching', 'การสอน') }}</h2>
        <button
          type="button"
          @click="goToStep(4)"
        >
          {{ tr('Edit', 'แก้ไข') }}
        </button>
      </div>
      <dl class="review-grid">
        <div>
          <dt>{{ tr('Subjects and levels', 'วิชาและระดับผู้เรียน') }}</dt>
          <dd>
            <span
              v-for="pair in state.subjectLevels"
              :key="pair.subject"
              class="block"
            >
              {{ pair.subject }}: {{ formatList(pair.learnerLevels) }}
            </span>
          </dd>
        </div>
        <div>
          <dt>{{ tr('Teaching mode', 'รูปแบบการสอนที่ต้องการ') }}</dt>
          <dd>{{ state.teachingMode }}</dd>
        </div>
        <div>
          <dt>{{ tr('Base hourly rate', 'ราคาพื้นฐานต่อชั่วโมง') }}</dt>
          <dd>{{ state.hourlyRate }}</dd>
        </div>
        <div>
          <dt>{{ tr('Teaching formats', 'รูปแบบการสอนที่เคยทำ') }}</dt>
          <dd>{{ formatList(state.teachingFormats) }}</dd>
        </div>
      </dl>
    </section>

    <section class="review-panel">
      <div class="review-header">
        <h2>{{ tr('Documents', 'เอกสาร') }}</h2>
        <button
          type="button"
          @click="goToStep(5)"
        >
          {{ tr('Edit', 'แก้ไข') }}
        </button>
      </div>
      <ul class="grid gap-2 text-sm font-semibold text-slate-650">
        <li class="flex items-center gap-2">
          <UIcon
            :name="state.idCardFileName ? 'i-lucide-check-circle-2' : 'i-lucide-circle-alert'"
            class="size-4 text-primary"
          />
          {{ tr('ID card', 'บัตรประชาชน') }}: {{ state.idCardFileName || tr('Missing', 'ยังไม่มีไฟล์') }}
        </li>
        <li class="flex items-center gap-2">
          <UIcon
            :name="state.transcriptFileName ? 'i-lucide-check-circle-2' : 'i-lucide-circle-alert'"
            class="size-4 text-primary"
          />
          {{ tr('Transcript or education proof', 'ใบแสดงผลการเรียนหรือหลักฐานการศึกษา') }}: {{ state.transcriptFileName || tr('Missing', 'ยังไม่มีไฟล์') }}
        </li>
        <li class="flex items-center gap-2">
          <UIcon
            name="i-lucide-file-check-2"
            class="size-4 text-muted"
          />
          {{ tr('Portfolio or certificate', 'พอร์ตโฟลิโอหรือเกียรติบัตร') }}: {{ state.portfolioFileName || tr('Optional', 'ไม่บังคับ') }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.review-panel {
  display: grid;
  gap: 0.75rem;
  border-radius: 1.25rem;
  background: white;
  padding: 1rem;
  box-shadow: inset 0 0 0 1px rgb(224 242 254 / 0.9);
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.review-header h2 {
  font-size: 0.875rem;
  font-weight: 900;
  color: rgb(15 23 42);
}

.review-header button {
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: rgb(2 132 199);
}

.review-header button:hover {
  background: rgb(240 249 255);
}

.review-grid {
  display: grid;
  gap: 0.75rem;
}

.review-grid dt {
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  color: rgb(100 116 139);
}

.review-grid dd {
  margin-top: 0.125rem;
  font-size: 0.875rem;
  font-weight: 650;
  color: rgb(51 65 85);
}
</style>
