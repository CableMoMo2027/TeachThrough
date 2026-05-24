<script setup lang="ts">
const { tr, pick } = useAppLocale()

const requirements = computed(() => [
  tr('Personal information and contact details', 'ข้อมูลส่วนตัวและช่องทางติดต่อ'),
  tr('Education background and teaching experience', 'ประวัติการศึกษาและประสบการณ์สอน'),
  tr('Subject expertise, grade levels, and hourly pricing', 'วิชาที่เชี่ยวชาญ ระดับชั้น และราคาต่อชั่วโมง'),
  tr('Certificates or supporting documents', 'ใบรับรองหรือเอกสารประกอบ'),
  tr('Profile verification before publishing', 'ตรวจสอบโปรไฟล์ก่อนเผยแพร่')
])

const teachingFormats = computed(() => pick(
  ['Online', 'Offline', 'Hybrid'],
  ['ออนไลน์', 'ออนไซต์', 'ผสมผสาน']
))
</script>

<template>
  <UContainer class="py-12">
    <div class="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
      <div>
        <UBadge
          :label="tr('Teach on Platform', 'สอนบนแพลตฟอร์ม')"
          variant="subtle"
        />
        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-highlighted">
          {{ tr('Apply as Tutor', 'สมัครเป็นติวเตอร์') }}
        </h1>
        <p class="mt-4 text-lg leading-8 text-muted">
          {{ tr('Build a professional profile, show your credentials, and receive student requests after verification.', 'สร้างโปรไฟล์มืออาชีพ แสดงคุณวุฒิ และเริ่มรับคำขอจากนักเรียนหลังผ่านการตรวจสอบ') }}
        </p>
        <div class="mt-8 grid gap-3">
          <div
            v-for="item in requirements"
            :key="item"
            class="flex gap-3 rounded-lg border border-default bg-elevated p-4"
          >
            <UIcon
              name="i-lucide-check-circle-2"
              class="mt-0.5 size-5 shrink-0 text-primary"
            />
            <span class="text-toned">{{ item }}</span>
          </div>
        </div>
      </div>

      <UCard v-reveal>
        <template #header>
          <div>
            <h2 class="text-2xl font-semibold text-highlighted">
              {{ tr('Tutor Registration', 'สมัครติวเตอร์') }}
            </h2>
            <p class="mt-1 text-sm text-dimmed">
              {{ tr('This MVP form captures the core profile fields.', 'แบบฟอร์ม MVP นี้เก็บข้อมูลสำคัญสำหรับโปรไฟล์ติวเตอร์') }}
            </p>
          </div>
        </template>

        <div class="grid gap-4">
          <div class="grid gap-4 sm:grid-cols-2">
            <UInput :placeholder="tr('First name', 'ชื่อ')" />
            <UInput :placeholder="tr('Last name', 'นามสกุล')" />
          </div>
          <UInput
            icon="i-lucide-mail"
            :placeholder="tr('Email address', 'อีเมล')"
          />
          <UInput
            icon="i-lucide-phone"
            :placeholder="tr('Phone number', 'เบอร์โทรศัพท์')"
          />
          <UTextarea
            :placeholder="tr('Education and experience', 'การศึกษาและประสบการณ์')"
            :rows="4"
          />
          <UInput
            icon="i-lucide-book-open"
            :placeholder="tr('Subjects, e.g. Math, English, Physics', 'วิชาที่สอน เช่น คณิต อังกฤษ ฟิสิกส์')"
          />
          <div class="grid gap-4 sm:grid-cols-2">
            <USelect
              :items="teachingFormats"
              :placeholder="tr('Teaching format', 'รูปแบบการสอน')"
            />
            <UInput
              icon="i-lucide-dollar-sign"
              :placeholder="tr('Hourly rate', 'ราคาต่อชั่วโมง')"
            />
          </div>
          <UInput
            icon="i-lucide-upload"
            :placeholder="tr('Certificate upload placeholder', 'อัปโหลดใบรับรอง')"
          />
          <UButton
            :label="tr('Submit Application', 'ส่งใบสมัคร')"
            icon="i-lucide-send"
            size="lg"
            block
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
