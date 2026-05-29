<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <UCard
    class="premium-card max-h-[calc(100dvh-var(--ui-header-height)-1.5rem)] w-full max-w-md overflow-y-auto bg-elevated/95 shadow-xl backdrop-blur sm:max-h-none sm:overflow-visible"
    :ui="{
      header: 'px-5 py-4 sm:px-8 border-b border-muted',
      body: 'px-5 py-6 sm:px-8'
    }"
  >
    <template #header>
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          {{ tr('Sign In', 'เข้าสู่ระบบ') }}
        </h1>
        <p class="mt-1 text-sm text-dimmed">
          {{ tr('Access your student or tutor account.', 'เข้าสู่บัญชีนักเรียนหรือบัญชีติวเตอร์ของคุณ') }}
        </p>
      </div>
    </template>

    <div class="grid gap-5">
      <div class="grid gap-4">
        <UInput
          class="premium-input"
          icon="i-lucide-mail"
          size="lg"
          :placeholder="tr('Email address', 'อีเมล')"
        />
        <UInput
          class="premium-input"
          icon="i-lucide-lock"
          size="lg"
          :placeholder="tr('Password', 'รหัสผ่าน')"
          type="password"
        />
      </div>

      <div class="flex items-center justify-between">
        <label class="inline-flex cursor-pointer items-center gap-2 text-sm text-muted hover:text-toned">
          <input
            type="checkbox"
            class="size-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary"
          >
          <span>{{ tr('Remember me', 'จดจำฉัน') }}</span>
        </label>
        <NuxtLink
          to="/auth/forgot-password"
          class="text-sm font-semibold text-primary hover:underline"
        >
          {{ tr('Forgot Password?', 'ลืมรหัสผ่าน?') }}
        </NuxtLink>
      </div>

      <UButton
        :label="tr('Sign In', 'เข้าสู่ระบบ')"
        block
        size="xl"
        class="shadow-premium-md hover:shadow-premium-lg"
      />

      <p class="text-center text-sm text-muted">
        {{ tr("Don't have an account?", 'ยังไม่มีบัญชี?') }}
        <NuxtLink
          to="/auth/sign-up"
          class="font-bold text-primary hover:underline"
        >
          {{ tr('Create account', 'สร้างบัญชี') }}
        </NuxtLink>
      </p>

      <USeparator :label="tr('or continue with', 'หรือเข้าสู่ระบบด้วย')" />

      <div class="grid gap-2 sm:grid-cols-3">
        <UButton
          label="Google"
          icon="i-simple-icons-google"
          color="neutral"
          variant="outline"
          class="rounded-full"
        />
        <UButton
          label="Apple"
          icon="i-simple-icons-apple"
          color="neutral"
          variant="outline"
          class="rounded-full"
        />
        <UButton
          label="Facebook"
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="outline"
          class="rounded-full"
        />
      </div>
    </div>
  </UCard>
</template>
