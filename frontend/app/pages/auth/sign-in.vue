<script setup lang="ts">
import { z } from 'zod'

const { tr } = useAppLocale()

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
    class="premium-card light-aware-card max-h-[calc(100dvh-var(--ui-header-height)-1.5rem)] w-full max-w-md overflow-y-auto bg-elevated/95 shadow-xl backdrop-blur sm:max-h-none sm:overflow-visible"
    :ui="{
      header: 'px-5 py-4 sm:px-8 border-b border-muted',
      body: 'px-5 py-6 sm:px-8'
    }"
  >
    <template #header>
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          <BlurText
            :text="tr('Sign In', 'Sign In')"
            :animate-on-scroll="false"
            :duration="0.5"
            blur="4px"
            :y="8"
          />
        </h1>
        <p class="mt-1 text-sm text-dimmed">
          {{ tr('Access your student or tutor account.', 'Access your student or tutor account.') }}
        </p>
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
          :label="tr('Email address', 'Email address')"
          required
        >
          <UInput
            v-model="signInState.email"
            class="premium-input"
            icon="i-lucide-mail"
            size="lg"
            type="email"
            autocomplete="email"
            :placeholder="tr('name@example.com', 'name@example.com')"
          />
        </UFormField>
        <UFormField
          name="password"
          :label="tr('Password', 'Password')"
          required
        >
          <UInput
            v-model="signInState.password"
            class="premium-input"
            icon="i-lucide-lock"
            size="lg"
            :placeholder="tr('Enter your password', 'Enter your password')"
            type="password"
            autocomplete="current-password"
          />
        </UFormField>
      </div>

      <div class="flex items-center justify-between gap-4">
        <label class="inline-flex cursor-pointer items-center gap-2 text-sm text-muted hover:text-toned">
          <input
            v-model="signInState.remember"
            type="checkbox"
            class="size-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary"
          >
          <span>{{ tr('Remember me', 'Remember me') }}</span>
        </label>
        <NuxtLink
          to="/auth/forgot-password"
          class="text-sm font-semibold text-primary hover:underline"
        >
          {{ tr('Forgot Password?', 'Forgot Password?') }}
        </NuxtLink>
      </div>

      <UButton
        :label="tr('Sign In', 'Sign In')"
        type="submit"
        block
        size="xl"
        class="shadow-premium-md hover:shadow-premium-lg"
      />

      <p class="text-center text-sm text-muted">
        {{ tr("Don't have an account?", "Don't have an account?") }}
        <NuxtLink
          to="/auth/sign-up"
          class="font-bold text-primary hover:underline"
        >
          {{ tr('Create account', 'Create account') }}
        </NuxtLink>
      </p>

      <USeparator :label="tr('or continue with', 'or continue with')" />

      <div class="flex flex-nowrap justify-center gap-2">
        <UButton
          label="Google"
          icon="i-simple-icons-google"
          color="neutral"
          variant="outline"
          class="w-[6.8rem] justify-center rounded-full px-3 text-sm sm:w-32"
        />
        <UButton
          label="Apple"
          icon="i-simple-icons-apple"
          color="neutral"
          variant="outline"
          class="w-[6.8rem] justify-center rounded-full px-3 text-sm sm:w-32"
        />
        <UButton
          label="Facebook"
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="outline"
          class="w-[6.8rem] justify-center rounded-full px-3 text-sm sm:w-32"
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
