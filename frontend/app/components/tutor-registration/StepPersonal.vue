<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarSelection, TutorFormState } from '~/composables/useTutorForm'

defineProps<{
  genders: string[]
  provinces: string[]
  birthDateLabel: string
  handleBirthDateChange: (date: CalendarSelection) => void
}>()

const state = defineModel<TutorFormState>('state', { required: true })
const birthDate = defineModel<DateValue | undefined>('birthDate')
const isBirthDateOpen = defineModel<boolean>('birthDateOpen', { default: false })
const { tr } = useAppLocale()
</script>

<template>
  <div class="grid gap-5">
    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-user-round"
            class="size-4"
          />
          {{ tr('Basic information', 'ข้อมูลพื้นฐาน') }}
        </p>
        <p class="form-helper">
          {{ tr('Enter your legal name and personal details for verification.', 'กรอกชื่อจริงและข้อมูลส่วนตัวสำหรับการตรวจสอบ') }}
        </p>
      </div>
      <div class="grid gap-3">
        <UFormField
          name="firstName"
          :label="tr('First name', 'ชื่อ')"
          required
        >
          <UInput
            v-model="state.firstName"
            class="premium-input"
            autocomplete="given-name"
            :placeholder="tr('Enter your first name', 'กรอกชื่อ')"
          />
        </UFormField>
        <UFormField
          name="lastName"
          :label="tr('Last name', 'นามสกุล')"
          required
        >
          <UInput
            v-model="state.lastName"
            class="premium-input"
            autocomplete="family-name"
            :placeholder="tr('Enter your last name', 'กรอกนามสกุล')"
          />
        </UFormField>
        <UFormField
          name="nickname"
          :label="tr('Nickname', 'ชื่อเล่น')"
          required
        >
          <UInput
            v-model="state.nickname"
            class="premium-input"
            :placeholder="tr('Enter your nickname', 'กรอกชื่อเล่น')"
          />
        </UFormField>
        <UFormField
          name="gender"
          :label="tr('Gender', 'เพศ')"
          required
        >
          <USelect
            v-model="state.gender"
            class="premium-input"
            :items="genders"
            :placeholder="tr('Select gender', 'เลือกเพศ')"
          />
        </UFormField>
        <UFormField
          name="birthDate"
          :label="tr('Birth date', 'วันเกิด')"
          required
        >
          <UPopover v-model:open="isBirthDateOpen">
            <UButton
              color="neutral"
              variant="outline"
              size="lg"
              icon="i-lucide-calendar-days"
              :class="[
                'premium-input w-full justify-start font-semibold',
                birthDateLabel ? 'text-highlighted' : 'text-muted'
              ]"
            >
              {{ birthDateLabel || tr('Select birth date', 'เลือกวันเกิด') }}
            </UButton>

            <template #content>
              <div class="flex flex-wrap justify-center gap-5 p-2">
                <UiCalendar
                  v-model="birthDate"
                  title-position="right"
                  @update:model-value="handleBirthDateChange"
                />
              </div>
            </template>
          </UPopover>
        </UFormField>
      </div>
    </section>

    <section class="form-panel">
      <div>
        <p class="form-title">
          <UIcon
            name="i-lucide-contact-round"
            class="size-4"
          />
          {{ tr('Contact information', 'ข้อมูลติดต่อ') }}
        </p>
        <p class="form-helper">
          {{ tr('Students and parents will not see private contact details before approval.', 'ผู้เรียนและผู้ปกครองจะไม่เห็นข้อมูลติดต่อส่วนตัวก่อนผ่านการอนุมัติ') }}
        </p>
      </div>
      <div class="grid gap-3">
        <UFormField
          name="mobile"
          :label="tr('Mobile number', 'เบอร์โทรศัพท์')"
          required
        >
          <UInput
            v-model="state.mobile"
            class="premium-input"
            icon="i-lucide-smartphone"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            :placeholder="tr('08x-xxx-xxxx', '08x-xxx-xxxx')"
          />
        </UFormField>
        <UFormField
          name="lineId"
          :label="tr('Line ID', 'ไลน์ไอดี')"
          required
        >
          <UInput
            v-model="state.lineId"
            class="premium-input"
            icon="i-lucide-message-circle"
            :placeholder="tr('Enter your Line ID', 'กรอกไลน์ไอดี')"
          />
        </UFormField>
        <UFormField
          name="province"
          :label="tr('Province', 'จังหวัด')"
          required
        >
          <USelect
            v-model="state.province"
            class="premium-input"
            :items="provinces"
            :placeholder="tr('Select province', 'เลือกจังหวัด')"
          />
        </UFormField>
        <UFormField
          name="address"
          :label="tr('Address', 'ที่อยู่')"
          required
        >
          <UTextarea
            v-model="state.address"
            class="premium-input address-focus-outline"
            :rows="2"
            autocomplete="street-address"
            :placeholder="tr('House number, street, building, or landmark', 'บ้านเลขที่ ถนน อาคาร หรือจุดสังเกต')"
          />
        </UFormField>
        <UFormField
          name="subDistrict"
          :label="tr('Sub-district', 'แขวง/ตำบล')"
          required
        >
          <UInput
            v-model="state.subDistrict"
            class="premium-input"
            :placeholder="tr('Enter sub-district', 'กรอกแขวง/ตำบล')"
          />
        </UFormField>
        <UFormField
          name="district"
          :label="tr('District', 'เขต/อำเภอ')"
          required
        >
          <UInput
            v-model="state.district"
            class="premium-input"
            :placeholder="tr('Enter district', 'กรอกเขต/อำเภอ')"
          />
        </UFormField>
      </div>
    </section>
  </div>
</template>

<style scoped>
.address-focus-outline {
  outline: 0 solid transparent;
  outline-offset: 0;
  transition:
    background-color 0.2s ease,
    outline-color 0.2s ease,
    outline-offset 0.2s ease,
    outline-width 0.2s ease;
}

.address-focus-outline:focus-within {
  box-shadow: none !important;
  outline: 2px solid rgb(14 165 233);
  outline-offset: 2px;
}
</style>
