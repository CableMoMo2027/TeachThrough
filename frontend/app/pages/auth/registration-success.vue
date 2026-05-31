<script setup lang="ts">
import { tutorRegistrationSuccessContent } from '~/utils/tutorOnboarding'

definePageMeta({
  layout: 'auth'
})

const { tr } = useAppLocale()
</script>

<template>
  <UCard
    class="premium-card mx-auto w-full max-w-xl bg-white/95 text-center shadow-xl backdrop-blur"
    :ui="{ body: 'px-8 py-10' }"
  >
    <FadeContent
      :blur="true"
      :duration="0.9"
      :stagger="0.12"
      :y="24"
      :animate-on-scroll="false"
      class="grid place-items-center gap-5"
    >
      <div class="grid size-16 place-items-center rounded-[1.5rem] bg-sky-50 text-primary ring-1 ring-sky-100">
        <UIcon
          name="i-lucide-clipboard-check"
          class="size-8"
        />
      </div>
      <UBadge
        :label="tr(tutorRegistrationSuccessContent.status, 'อยู่ระหว่างการตรวจสอบ')"
        variant="subtle"
        class="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-primary ring-1 ring-sky-100"
      />
      <h1 class="text-3xl font-black tracking-tight text-highlighted">
        <BlurText
          :text="tr(tutorRegistrationSuccessContent.title, 'ส่งใบสมัครติวเตอร์แล้ว')"
          :animate-on-scroll="false"
        />
      </h1>
      <p class="max-w-md text-sm font-semibold leading-relaxed text-muted">
        {{ tr(tutorRegistrationSuccessContent.body, 'ใบสมัครติวเตอร์ของคุณอยู่ระหว่างการตรวจสอบ ทีมงานจะตรวจสอบข้อมูลและเอกสารที่ส่งมา ก่อนที่โปรไฟล์ติวเตอร์ของคุณจะสามารถเผยแพร่ได้') }}
      </p>
      <div class="grid w-full gap-3 sm:grid-cols-2">
        <UButton
          to="/"
          size="lg"
          class="justify-center rounded-full font-black shadow-premium-sm"
        >
          {{ tr('Back to home', 'กลับหน้าแรก') }}
        </UButton>
        <UButton
          to="/find-tutors"
          color="neutral"
          variant="ghost"
          size="lg"
          class="justify-center rounded-full font-black"
        >
          {{ tr('Browse tutors', 'ค้นหาติวเตอร์') }}
        </UButton>
      </div>
    </FadeContent>
  </UCard>
</template>
