<script setup lang="ts">
import { z } from 'zod'

const { tr, pick } = useAppLocale()

const roleItems = computed(() => pick(
  ['Parent', 'Student', 'Tutor', 'Partner', 'Support'],
  ['ผู้ปกครอง', 'นักเรียน', 'ติวเตอร์', 'พาร์ตเนอร์', 'ฝ่ายสนับสนุน']
))

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  role: z.string().min(1, 'Select your role'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

const contactState = reactive({
  name: '',
  email: '',
  role: '',
  message: ''
})

const formShaking = ref(false)
const sent = ref(false)

const handleFormError = () => {
  formShaking.value = true
  window.setTimeout(() => {
    formShaking.value = false
  }, 360)
}

const handleContactSubmit = () => {
  sent.value = true
}
</script>

<template>
  <div class="py-16 lg:py-24">
    <UContainer>
      <div class="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <UBadge
            :label="tr('Support', 'ฝ่ายสนับสนุน')"
            variant="subtle"
            class="rounded-full px-4 py-1"
          />
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
            {{ tr('How can we help you today?', 'มีอะไรให้เราช่วยไหม?') }}
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {{ tr('Questions about tutor verification, booking, pricing, or parent support? Send a message and the team will follow up.', 'มีคำถามเกี่ยวกับการตรวจสอบติวเตอร์ การจอง ราคา หรือการช่วยเหลือผู้ปกครอง? ส่งข้อความมาได้ ทีมงานจะติดต่อกลับ') }}
          </p>

          <div class="mt-12 space-y-8">
            <div
              v-for="item in [
                ['i-lucide-mail', tr('Email us', 'อีเมล'), 'support@TeachThrough.test', 'bg-brand-50 text-brand-500'],
                ['i-lucide-clock', tr('Working Hours', 'เวลาทำการ'), tr('Mon-Fri, 9:00-18:00', 'จันทร์-ศุกร์ 9:00-18:00'), 'bg-accent-50 text-accent-500'],
                ['i-lucide-message-circle', tr('Social Media', 'โซเชียลมีเดีย'), tr('Facebook, Instagram, and Line', 'Facebook, Instagram และ Line'), 'bg-trust-50 text-trust-500']
              ]"
              :key="item[1]"
              class="flex items-center gap-6"
            >
              <div :class="['flex size-12 items-center justify-center rounded-2xl', item[3]]">
                <UIcon
                  :name="item[0]"
                  class="size-6"
                />
              </div>
              <div>
                <p class="text-sm font-semibold uppercase tracking-wider text-muted">
                  {{ item[1] }}
                </p>
                <p class="text-lg font-bold text-highlighted">
                  {{ item[2] }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <UCard
          v-reveal
          class="premium-card rounded-[2.5rem] bg-white shadow-premium-xl"
          :ui="{ body: 'p-8 sm:p-12' }"
        >
          <div class="mb-8">
            <h2 class="text-2xl font-black text-highlighted">
              {{ tr('Send a Message', 'ส่งข้อความหาเรา') }}
            </h2>
            <p class="mt-2 text-sm font-medium text-muted">
              {{ tr('Tell us who you are and how we can help.', 'บอกเราว่าคุณคือใคร และต้องการให้เราช่วยเรื่องอะไร') }}
            </p>
          </div>

          <UAlert
            v-if="sent"
            icon="i-lucide-check-circle"
            color="primary"
            variant="subtle"
            class="mb-5 rounded-2xl"
            :title="tr('Message sent', 'ส่งข้อความแล้ว')"
            :description="tr('Our team will follow up soon.', 'ทีมงานจะติดต่อกลับเร็ว ๆ นี้')"
          />

          <UForm
            :schema="contactSchema"
            :state="contactState"
            :validate-on="['input', 'blur', 'change']"
            :class="['grid gap-5', formShaking ? 'form-shake' : '']"
            @error="handleFormError"
            @submit="handleContactSubmit"
          >
            <UFormField
              name="name"
              :label="tr('Name', 'ชื่อ')"
              required
            >
              <UInput
                v-model="contactState.name"
                class="premium-input"
                size="lg"
                icon="i-lucide-user"
                autocomplete="name"
                :placeholder="tr('Enter your name', 'กรอกชื่อของคุณ')"
              />
            </UFormField>

            <UFormField
              name="email"
              :label="tr('Email address', 'อีเมล')"
              required
            >
              <UInput
                v-model="contactState.email"
                class="premium-input"
                icon="i-lucide-mail"
                size="lg"
                type="email"
                autocomplete="email"
                :placeholder="tr('name@example.com', 'name@example.com')"
              />
            </UFormField>

            <UFormField
              name="role"
              :label="tr('Role', 'บทบาท')"
              required
            >
              <USelect
                v-model="contactState.role"
                class="premium-input"
                size="lg"
                icon="i-lucide-users"
                :items="roleItems"
                :placeholder="tr('Select your role', 'เลือกบทบาทของคุณ')"
              />
            </UFormField>

            <UFormField
              name="message"
              :label="tr('Message', 'ข้อความ')"
              required
            >
              <UTextarea
                v-model="contactState.message"
                class="contact-message-textarea"
                variant="none"
                size="lg"
                :placeholder="tr('Tell us what you need help with', 'บอกเราว่าต้องการให้ช่วยเรื่องอะไร')"
                :rows="6"
              />
            </UFormField>

            <UButton
              type="submit"
              size="xl"
              trailing-icon="i-lucide-send"
              class="mx-auto mt-2 w-full max-w-64 justify-center rounded-full font-black shadow-premium-md transition-all hover:scale-[1.01]"
            >
              {{ tr('Send Message', 'ส่งข้อความ') }}
            </UButton>
          </UForm>
        </UCard>
      </div>

      <section class="mt-32">
        <div class="mb-16 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            {{ tr('Frequently Asked Questions', 'คำถามที่พบบ่อย') }}
          </h2>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-for="(faq, index) in [
              [tr('Are tutors verified?', 'ติวเตอร์ผ่านการตรวจสอบไหม?'), tr('Tutor profiles are reviewed before appearing in search.', 'โปรไฟล์ติวเตอร์จะถูกตรวจสอบก่อนแสดงในหน้าค้นหา')],
              [tr('Can sessions be online?', 'เรียนออนไลน์ได้ไหม?'), tr('Tutors can offer online, offline, or hybrid lessons.', 'ติวเตอร์สามารถเปิดสอนออนไลน์ ออนไซต์ หรือแบบผสมผสานได้')],
              [tr('How do I pay?', 'ชำระเงินอย่างไร?'), tr('Currently, you pay tutors directly. Platform payments are coming in Phase 2.', 'ขณะนี้คุณชำระเงินให้ติวเตอร์โดยตรง ระบบชำระผ่านแพลตฟอร์มกำลังจะมาใน Phase 2')]
            ]"
            :key="faq[0]"
            v-reveal
            class="premium-card rounded-[2rem] bg-white p-8 shadow-premium-md"
            :style="{ '--reveal-delay': `${index * 100}ms` }"
          >
            <h3 class="text-lg font-bold text-highlighted">
              {{ faq[0] }}
            </h3>
            <p class="mt-4 leading-relaxed text-muted">
              {{ faq[1] }}
            </p>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<style scoped>
.form-shake {
  animation: form-shake 320ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.contact-message-textarea {
  width: 100%;
  border-radius: 1.5rem;
  background: rgb(255 255 255);
  box-shadow: inset 0 0 0 1px rgb(186 230 253);
  transition: box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-message-textarea:focus-within {
  box-shadow:
    inset 0 0 0 2px rgb(14 165 233),
    0 0 0 4px rgb(14 165 233 / 0.24);
}

.contact-message-textarea :deep(textarea) {
  min-height: 10.5rem;
  resize: none;
  border: 0 !important;
  border-radius: 1.5rem;
  background: transparent !important;
  padding: 1rem;
  outline: none !important;
  box-shadow: none !important;
}

@keyframes form-shake {
  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}
</style>
