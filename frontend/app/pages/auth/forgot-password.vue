<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <UContainer class="grid min-h-[640px] place-items-center py-12">
    <UCard
      v-reveal
      class="w-full max-w-md"
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
      <div class="grid gap-4">
        <UInput
          icon="i-lucide-mail"
          :placeholder="tr('Email address', 'อีเมล')"
        />
        <UButton
          :label="tr('Send Reset Email', 'ส่งอีเมลรีเซ็ต')"
          icon="i-lucide-send"
          block
          size="lg"
        />
      </div>
    </UCard>
  </UContainer>
</template>
