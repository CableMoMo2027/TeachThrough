<script setup lang="ts">
import type { TutorFormState } from '~/composables/useTutorForm'

const state = defineModel<TutorFormState>('state', { required: true })
const { tr } = useAppLocale()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
</script>

<template>
  <div class="mx-auto grid w-full max-w-[480px] min-w-0 gap-4 py-2">
    <div class="text-center">
      <h2 class="text-base font-black tracking-tight text-highlighted">
        {{ tr('Account access', 'ข้อมูลบัญชี') }}
      </h2>
      <p class="mx-auto mt-1 max-w-[420px] whitespace-nowrap text-[10px] font-semibold leading-relaxed text-muted sm:text-[11px]">
        {{ tr('This registration takes about 5-7 minutes. You can review your information before submitting.', 'การสมัครใช้เวลาประมาณ 5-7 นาที และคุณสามารถตรวจทานข้อมูลก่อนส่งได้') }}
      </p>
    </div>

    <div class="grid w-full min-w-0 gap-2.5 rounded-[1.25rem] bg-sky-50/45 p-3 ring-1 ring-sky-100 sm:p-4">
      <UFormField
        name="email"
        :label="tr('Email address', 'อีเมล')"
        required
      >
        <UInput
          v-model="state.email"
          class="premium-input w-full min-w-0"
          icon="i-lucide-mail"
          size="lg"
          type="email"
          autocomplete="email"
          :placeholder="tr('name@example.com', 'name@example.com')"
        />
      </UFormField>
      <UFormField
        name="password"
        :label="tr('Password', 'รหัสผ่าน')"
        required
      >
        <UInput
          v-model="state.password"
          class="premium-input w-full min-w-0"
          icon="i-lucide-lock"
          size="lg"
          :placeholder="tr('Create a password', 'สร้างรหัสผ่าน')"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
        >
          <template #trailing>
            <button
              type="button"
              class="inline-flex size-7 items-center justify-center rounded-full text-muted transition hover:bg-slate-100 hover:text-highlighted"
              :aria-label="showPassword ? tr('Hide password', 'ซ่อนรหัสผ่าน') : tr('Show password', 'แสดงรหัสผ่าน')"
              @click="showPassword = !showPassword"
            >
              <UIcon
                :name="showPassword ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                class="size-4"
              />
            </button>
          </template>
        </UInput>
      </UFormField>
      <UFormField
        name="confirmPassword"
        :label="tr('Confirm password', 'ยืนยันรหัสผ่าน')"
        required
      >
        <UInput
          v-model="state.confirmPassword"
          class="premium-input w-full min-w-0"
          icon="i-lucide-lock-keyhole"
          size="lg"
          :placeholder="tr('Re-enter your password', 'กรอกรหัสผ่านอีกครั้ง')"
          :type="showConfirmPassword ? 'text' : 'password'"
          autocomplete="new-password"
        >
          <template #trailing>
            <button
              type="button"
              class="inline-flex size-7 items-center justify-center rounded-full text-muted transition hover:bg-slate-100 hover:text-highlighted"
              :aria-label="showConfirmPassword ? tr('Hide password', 'ซ่อนรหัสผ่าน') : tr('Show password', 'แสดงรหัสผ่าน')"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <UIcon
                :name="showConfirmPassword ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                class="size-4"
              />
            </button>
          </template>
        </UInput>
      </UFormField>
      <p class="px-1 text-[11px] font-medium leading-relaxed text-muted">
        {{ tr('Use an email you check often. We may contact you during verification.', 'ใช้อีเมลที่คุณตรวจสอบเป็นประจำ ทีมงานอาจติดต่อคุณระหว่างการตรวจสอบ') }}
      </p>
    </div>
  </div>
</template>
