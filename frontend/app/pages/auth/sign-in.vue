<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <UCard class="max-h-[calc(100dvh-var(--ui-header-height)-1.5rem)] w-full max-w-md overflow-y-auto bg-elevated/95 shadow-xl shadow-neutral-200/80 backdrop-blur sm:max-h-none sm:overflow-visible">
    <template #header>
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          {{ tr('Sign In', 'เข้าสู่ระบบ') }}
        </h1>
        <p class="mt-1 text-sm text-muted">
          {{ tr('Access your student or tutor account.', 'เข้าสู่บัญชีนักเรียนหรือบัญชีติวเตอร์ของคุณ') }}
        </p>
      </div>
    </template>
    <div class="grid gap-3 sm:gap-4">
      <UInput
        icon="i-lucide-mail"
        :placeholder="tr('Email address', 'อีเมล')"
      />
      <UInput
        icon="i-lucide-lock"
        :placeholder="tr('Password', 'รหัสผ่าน')"
        type="password"
      />
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <NuxtLink
          to="/auth/sign-up"
          class="text-sm font-medium text-primary"
        >{{ tr('Create account', 'สร้างบัญชี') }}</NuxtLink>
        <NuxtLink
          to="/auth/forgot-password"
          class="text-sm font-medium text-primary"
        >{{ tr('Forgot Password?', 'ลืมรหัสผ่าน?') }}</NuxtLink>
      </div>
      <UButton
        :label="tr('Sign In', 'เข้าสู่ระบบ')"
        block
        size="lg"
      />
      <USeparator :label="tr('or continue with', 'หรือเข้าสู่ระบบด้วย')" />
      <div class="grid gap-2">
        <UButton
          label="Google"
          icon="i-simple-icons-google"
          color="neutral"
          variant="outline"
          block
        />
        <UButton
          label="Apple"
          icon="i-simple-icons-apple"
          color="neutral"
          variant="outline"
          block
        />
        <UButton
          label="Facebook"
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="outline"
          block
        />
      </div>
    </div>
  </UCard>
</template>
