<script setup lang="ts">
import { z } from 'zod'
import { authEntryContent } from '~/utils/tutorOnboarding'

const { locale, isThai, tr, toggleLocale } = useAppLocale()
const copy = authEntryContent.signIn
const showPassword = ref(false)

const signInSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

const signInState = reactive({
  email: '',
  password: '',
  remember: false
})

const signInShaking = ref(false)

const handleSignInError = () => {
  signInShaking.value = true
  window.setTimeout(() => {
    signInShaking.value = false
  }, 360)
}

const handleSignIn = async () => {
  if (signInState.remember) {
    localStorage.setItem('teachthrough-auth-session', 'mock')
  }

  await navigateTo('/account')
}
</script>

<template>
  <UCard
    class="premium-card light-aware-card max-h-[calc(100dvh-var(--ui-header-height)-1.5rem)] w-full max-w-[34rem] overflow-y-auto bg-elevated/95 shadow-xl backdrop-blur sm:max-h-none sm:overflow-visible"
    :ui="{
      header: 'px-5 py-5 sm:px-8 md:px-10 border-b border-muted',
      body: 'px-5 py-6 sm:px-8 md:px-10'
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

    <UForm
      :schema="signInSchema"
      :state="signInState"
      :validate-on="['input', 'blur', 'change']"
      :class="['grid gap-5', signInShaking ? 'form-shake' : '']"
      @error="handleSignInError"
      @submit="handleSignIn"
    >
      <div class="grid gap-4">
        <UFormField
          name="email"
          :label="tr(copy.fields.email.en, copy.fields.email.th)"
          required
        >
          <UInput
            v-model="signInState.email"
            class="premium-input w-full"
            icon="i-lucide-mail"
            size="lg"
            type="email"
            autocomplete="email"
            :placeholder="tr(copy.placeholders.email.en, copy.placeholders.email.th)"
          />
        </UFormField>
        <UFormField
          name="password"
          :label="tr(copy.fields.password.en, copy.fields.password.th)"
          required
        >
          <UInput
            v-model="signInState.password"
            class="premium-input w-full"
            icon="i-lucide-lock"
            size="lg"
            :placeholder="tr(copy.placeholders.password.en, copy.placeholders.password.th)"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
          >
            <template #trailing>
              <button
                type="button"
                class="inline-flex size-8 items-center justify-center rounded-full text-muted transition hover:bg-slate-100 hover:text-highlighted"
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
      </div>

      <div class="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <label class="inline-flex cursor-pointer items-center gap-2 text-sm text-muted hover:text-toned">
          <input
            v-model="signInState.remember"
            type="checkbox"
            class="size-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary"
          >
          <span>{{ tr(copy.actions.remember.en, copy.actions.remember.th) }}</span>
        </label>
        <NuxtLink
          to="/auth/forgot-password"
          class="text-sm font-semibold text-primary hover:underline"
        >
          {{ tr(copy.actions.forgotPassword.en, copy.actions.forgotPassword.th) }}
        </NuxtLink>
      </div>

      <UButton
        :label="tr(copy.actions.submit.en, copy.actions.submit.th)"
        type="submit"
        block
        size="xl"
        class="shadow-premium-md hover:shadow-premium-lg"
      />

      <p class="text-center text-sm text-muted">
        {{ tr(copy.actions.createPrompt.en, copy.actions.createPrompt.th) }}
        <NuxtLink
          to="/auth/sign-up"
          class="font-bold text-primary hover:underline"
        >
          {{ tr(copy.actions.createAccount.en, copy.actions.createAccount.th) }}
        </NuxtLink>
      </p>

      <USeparator :label="tr(copy.actions.separator.en, copy.actions.separator.th)" />

      <div class="grid gap-2 sm:grid-cols-3">
        <UButton
          label="Google"
          icon="i-simple-icons-google"
          color="neutral"
          variant="outline"
          class="w-full justify-center rounded-full px-3 text-sm"
        />
        <UButton
          label="Apple"
          icon="i-simple-icons-apple"
          color="neutral"
          variant="outline"
          class="w-full justify-center rounded-full px-3 text-sm"
        />
        <UButton
          label="Facebook"
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="outline"
          class="w-full justify-center rounded-full px-3 text-sm"
        />
      </div>
    </UForm>
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
