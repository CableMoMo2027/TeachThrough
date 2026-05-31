<script setup lang="ts">
import { z } from 'zod'
import { authEntryContent } from '~/utils/tutorOnboarding'

const { locale, isThai, tr, toggleLocale } = useAppLocale()
const copy = authEntryContent.signUp

const accountTypes = computed(() => [
  {
    label: tr(copy.accountTypes.parent.en, copy.accountTypes.parent.th),
    value: 'Parent Registration',
    icon: 'i-lucide-users'
  },
  {
    label: tr(copy.accountTypes.student.en, copy.accountTypes.student.th),
    value: 'Student Registration',
    icon: 'i-lucide-graduation-cap'
  },
  {
    label: tr(copy.accountTypes.tutor.en, copy.accountTypes.tutor.th),
    value: 'Tutor Registration',
    icon: 'i-lucide-presentation'
  }
])

const accountType = ref('Parent Registration')
const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

const signUpState = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const signUpShaking = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleSignUpError = () => {
  signUpShaking.value = true
  window.setTimeout(() => {
    signUpShaking.value = false
  }, 360)
}

const handleSimpleSignUp = () => {
  navigateTo('/auth/registration-success')
}

const handleAccountTypeSelect = (value: string) => {
  if (value === 'Tutor Registration') {
    return navigateTo('/auth/sign-up2')
  }

  accountType.value = value
}
</script>

<template>
  <UCard
    class="premium-card mx-auto w-full max-w-lg bg-elevated/95 shadow-xl backdrop-blur"
    :ui="{
      header: 'px-5 py-4 sm:px-8 border-b border-muted',
      body: 'px-5 py-8 sm:px-10'
    }"
  >
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <p class="mb-2 text-[11px] font-black uppercase tracking-widest text-primary">
            {{ tr(copy.eyebrow.en, copy.eyebrow.th) }}
          </p>
          <h1 class="text-2xl font-black tracking-tight text-highlighted">
            <BlurText
              :key="locale"
              :text="tr(copy.title.en, copy.title.th)"
              :animate-on-scroll="false"
              :duration="0.5"
              blur="4px"
              :y="8"
            />
          </h1>
          <p class="mt-1 text-sm font-medium leading-6 text-dimmed">
            {{ tr(copy.description.en, copy.description.th) }}
          </p>
        </div>

        <UButton
          color="neutral"
          variant="outline"
          size="sm"
          class="shrink-0 rounded-full font-black"
          icon="i-lucide-languages"
          :label="isThai ? 'TH' : 'EN'"
          aria-label="Switch language"
          @click="toggleLocale"
        />
      </div>
    </template>

    <div class="grid gap-6">
      <div class="grid gap-2 sm:grid-cols-3">
        <button
          v-for="type in accountTypes"
          :key="type.value"
          type="button"
          :class="[
            'inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-bold outline outline-1 outline-offset-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
            accountType === type.value
              ? 'border-primary bg-primary/10 text-primary outline-primary/45'
              : 'border-slate-200 bg-elevated text-muted outline-slate-100 hover:border-slate-300'
          ]"
          @click="handleAccountTypeSelect(type.value)"
        >
          <UIcon
            :name="type.icon"
            class="size-4"
          />
          <span>{{ type.label }}</span>
        </button>
      </div>

      <UForm
        :schema="signUpSchema"
        :state="signUpState"
        :validate-on="['input', 'blur', 'change']"
        :class="['grid gap-4', signUpShaking ? 'form-shake' : '']"
        @error="handleSignUpError"
        @submit="handleSimpleSignUp"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <UFormField
            name="firstName"
            :label="tr(copy.fields.firstName.en, copy.fields.firstName.th)"
            required
          >
            <UInput
              v-model="signUpState.firstName"
              class="premium-input"
              autocomplete="given-name"
              :placeholder="tr(copy.placeholders.firstName.en, copy.placeholders.firstName.th)"
            />
          </UFormField>
          <UFormField
            name="lastName"
            :label="tr(copy.fields.lastName.en, copy.fields.lastName.th)"
            required
          >
            <UInput
              v-model="signUpState.lastName"
              class="premium-input"
              autocomplete="family-name"
              :placeholder="tr(copy.placeholders.lastName.en, copy.placeholders.lastName.th)"
            />
          </UFormField>
        </div>
        <UFormField
          name="email"
          :label="tr(copy.fields.email.en, copy.fields.email.th)"
          required
        >
          <UInput
            v-model="signUpState.email"
            class="premium-input"
            icon="i-lucide-mail"
            type="email"
            autocomplete="email"
            :placeholder="tr(copy.placeholders.email.en, copy.placeholders.email.th)"
          />
        </UFormField>
        <div class="grid gap-4 sm:grid-cols-2">
          <UFormField
            name="password"
            :label="tr(copy.fields.password.en, copy.fields.password.th)"
            required
          >
            <UInput
              v-model="signUpState.password"
              class="premium-input"
              icon="i-lucide-lock"
              :placeholder="tr(copy.placeholders.password.en, copy.placeholders.password.th)"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
            >
              <template #trailing>
                <button
                  type="button"
                  class="inline-flex size-7 items-center justify-center rounded-full text-muted transition hover:bg-slate-100 hover:text-highlighted"
                  :aria-label="showPassword ? tr(copy.actions.hidePassword.en, copy.actions.hidePassword.th) : tr(copy.actions.showPassword.en, copy.actions.showPassword.th)"
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
            :label="tr(copy.fields.confirmPassword.en, copy.fields.confirmPassword.th)"
            required
          >
            <UInput
              v-model="signUpState.confirmPassword"
              class="premium-input"
              icon="i-lucide-lock-keyhole"
              :placeholder="tr(copy.placeholders.confirmPassword.en, copy.placeholders.confirmPassword.th)"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
            >
              <template #trailing>
                <button
                  type="button"
                  class="inline-flex size-7 items-center justify-center rounded-full text-muted transition hover:bg-slate-100 hover:text-highlighted"
                  :aria-label="showConfirmPassword ? tr(copy.actions.hidePassword.en, copy.actions.hidePassword.th) : tr(copy.actions.showPassword.en, copy.actions.showPassword.th)"
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
        </div>
        <UButton
          :label="tr(copy.actions.submit.en, copy.actions.submit.th)"
          type="submit"
          block
          size="xl"
          class="mt-2 shadow-premium-md hover:shadow-premium-lg"
        />
      </UForm>

      <div class="mx-auto grid w-full max-w-lg gap-6">
        <p class="text-center text-sm text-muted">
          {{ tr(copy.actions.existingPrompt.en, copy.actions.existingPrompt.th) }}
          <NuxtLink
            to="/auth/sign-in"
            class="font-bold text-primary hover:underline"
          >
            {{ tr(copy.actions.signIn.en, copy.actions.signIn.th) }}
          </NuxtLink>
        </p>

        <USeparator :label="tr(copy.actions.separator.en, copy.actions.separator.th)" />

        <div class="mx-auto grid w-full max-w-lg gap-2 sm:grid-cols-3">
          <UButton
            label="Google"
            icon="i-simple-icons-google"
            color="neutral"
            variant="outline"
            class="w-full justify-center rounded-full"
          />
          <UButton
            label="Apple"
            icon="i-simple-icons-apple"
            color="neutral"
            variant="outline"
            class="w-full justify-center rounded-full"
          />
          <UButton
            label="Facebook"
            icon="i-simple-icons-facebook"
            color="neutral"
            variant="outline"
            class="w-full justify-center rounded-full"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.form-shake {
  animation: form-shake 320ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
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
