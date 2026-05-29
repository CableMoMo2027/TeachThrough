<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <div class="grid min-h-[calc(100dvh-var(--ui-header-height))] place-items-center py-12">
    <UCard
      v-reveal
      class="premium-card w-full max-w-md bg-elevated/95 shadow-xl backdrop-blur"
      :ui="{
        header: 'px-5 py-4 sm:px-8 border-b border-muted',
        body: 'px-5 py-6 sm:px-8'
      }"
    >
      <template #header>
        <div>
          <h1 class="text-2xl font-semibold text-highlighted">
            {{ tr('Forgot Password', 'ลืมรหัสผ่าน') }}
          </h1>
          <p class="mt-1 text-sm text-dimmed">
            {{ tr('Enter your email to receive a reset link.', 'กรอกอีเมลเพื่อรับลิงก์รีเซ็ตรหัสผ่าน') }}
          </p>
        </div>
      </template>

      <div class="grid gap-6">
        <UInput
          class="premium-input"
          icon="i-lucide-mail"
          size="lg"
          :placeholder="tr('Email address', 'อีเมล')"
        />

        <UButton
          :label="tr('Send Reset Email', 'ส่งอีเมลรีเซ็ต')"
          icon="i-lucide-send"
          block
          size="xl"
          class="shadow-premium-md hover:shadow-premium-lg"
        />

        <div class="text-center">
          <NuxtLink
            to="/auth/sign-in"
            class="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="size-4"
            />
            <span>{{ tr('Back to Sign In', 'กลับไปหน้าเข้าสู่ระบบ') }}</span>
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>
