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
          {{ tr('Basic information', 'Basic information') }}
        </p>
        <p class="form-helper">
          {{ tr('Enter your legal name and personal details for verification.', 'Enter your legal name and personal details for verification.') }}
        </p>
      </div>
      <div class="grid gap-3">
        <UFormField
          name="firstName"
          :label="tr('First name', 'First name')"
          required
        >
          <UInput
            v-model="state.firstName"
            class="premium-input"
            autocomplete="given-name"
            :placeholder="tr('Enter your first name', 'Enter your first name')"
          />
        </UFormField>
        <UFormField
          name="lastName"
          :label="tr('Last name', 'Last name')"
          required
        >
          <UInput
            v-model="state.lastName"
            class="premium-input"
            autocomplete="family-name"
            :placeholder="tr('Enter your last name', 'Enter your last name')"
          />
        </UFormField>
        <UFormField
          name="nickname"
          :label="tr('Nickname', 'Nickname')"
          required
        >
          <UInput
            v-model="state.nickname"
            class="premium-input"
            :placeholder="tr('Enter your nickname', 'Enter your nickname')"
          />
        </UFormField>
        <UFormField
          name="gender"
          :label="tr('Gender', 'Gender')"
          required
        >
          <USelect
            v-model="state.gender"
            class="premium-input"
            :items="genders"
            :placeholder="tr('Select gender', 'Select gender')"
          />
        </UFormField>
        <UFormField
          name="birthDate"
          :label="tr('Birth date', 'Birth date')"
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
              {{ birthDateLabel || tr('Select birth date', 'Select birth date') }}
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
          {{ tr('Contact information', 'Contact information') }}
        </p>
        <p class="form-helper">
          {{ tr('Students and parents will not see private contact details before approval.', 'Students and parents will not see private contact details before approval.') }}
        </p>
      </div>
      <div class="grid gap-3">
        <UFormField
          name="mobile"
          :label="tr('Mobile number', 'Mobile number')"
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
          :label="tr('Line ID', 'Line ID')"
          required
        >
          <UInput
            v-model="state.lineId"
            class="premium-input"
            icon="i-lucide-message-circle"
            :placeholder="tr('Enter your Line ID', 'Enter your Line ID')"
          />
        </UFormField>
        <UFormField
          name="province"
          :label="tr('Province', 'Province')"
          required
        >
          <USelect
            v-model="state.province"
            class="premium-input"
            :items="provinces"
            :placeholder="tr('Select province', 'Select province')"
          />
        </UFormField>
        <UFormField
          name="address"
          :label="tr('Address', 'Address')"
          required
        >
          <UTextarea
            v-model="state.address"
            class="premium-input address-focus-outline"
            :rows="2"
            autocomplete="street-address"
            :placeholder="tr('House number, street, building, or landmark', 'House number, street, building, or landmark')"
          />
        </UFormField>
        <UFormField
          name="subDistrict"
          :label="tr('Sub-district', 'Sub-district')"
          required
        >
          <UInput
            v-model="state.subDistrict"
            class="premium-input"
            :placeholder="tr('Enter sub-district', 'Enter sub-district')"
          />
        </UFormField>
        <UFormField
          name="district"
          :label="tr('District', 'District')"
          required
        >
          <UInput
            v-model="state.district"
            class="premium-input"
            :placeholder="tr('Enter district', 'Enter district')"
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
