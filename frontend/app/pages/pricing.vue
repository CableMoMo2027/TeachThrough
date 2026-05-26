<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <div class="py-16 lg:py-24 bg-muted/30 min-h-screen">
    <UContainer>
      <header class="mb-20 text-center">
        <UBadge
          :label="tr('Pricing / Fees', 'ราคา / ค่าธรรมเนียม')"
          variant="subtle"
          class="rounded-full px-4 py-1"
        />
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl lg:text-6xl">
          {{ tr('Simple, transparent pricing.', 'ราคาที่เรียบง่ายและโปร่งใส') }}
        </h1>
        <p class="mx-auto mt-6 max-w-[60ch] text-lg text-muted sm:text-xl">
          {{ tr('Whether you are a student looking for help or a tutor sharing your expertise, our platform is designed to be accessible and fair.', 'ไม่ว่าคุณจะเป็นนักเรียนที่ต้องการความช่วยเหลือ หรือติวเตอร์ที่ต้องการแบ่งปันความรู้ แพลตฟอร์มของเราถูกออกแบบมาให้เข้าถึงง่ายและเป็นธรรม') }}
        </p>
      </header>

      <div class="grid gap-8 lg:grid-cols-2 lg:max-w-5xl lg:mx-auto">
        <!-- Students & Parents -->
        <div
          v-reveal
          class="premium-card flex flex-col rounded-[2.5rem] bg-white p-10 sm:p-12 transition-all hover:-translate-y-1"
        >
          <div class="mb-8">
            <div class="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <UIcon name="i-lucide-users" class="size-8" />
            </div>
            <h2 class="text-3xl font-bold text-highlighted">
              {{ tr('For Students & Parents', 'สำหรับนักเรียนและผู้ปกครอง') }}
            </h2>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-bold text-highlighted">฿0</span>
              <span class="text-muted">{{ tr('/ free forever', '/ ฟรีตลอดไป') }}</span>
            </div>
          </div>

          <ul class="mb-10 flex-1 space-y-4 text-muted">
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-check-circle-2" class="mt-1 size-5 text-brand-500 shrink-0" />
              <span>{{ tr('Unlimited tutor profile browsing', 'ค้นหาและดูโปรไฟล์ติวเตอร์ได้ไม่จำกัด') }}</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-check-circle-2" class="mt-1 size-5 text-brand-500 shrink-0" />
              <span>{{ tr('Detailed credentials and reviews', 'ดูประวัติการศึกษาและรีวิวอย่างละเอียด') }}</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-check-circle-2" class="mt-1 size-5 text-brand-500 shrink-0" />
              <span>{{ tr('Direct contact requests', 'ส่งคำขอติดต่อติวเตอร์โดยตรง') }}</span>
            </li>
            <li class="flex items-start gap-3 text-dimmed italic">
              <UIcon name="i-lucide-info" class="mt-1 size-5 shrink-0" />
              <span>{{ tr('Booking and payment features coming in Phase 2', 'ระบบจองและชำระเงินจะมาใน Phase 2') }}</span>
            </li>
          </ul>

          <UButton
            :label="tr('Start Finding Tutors', 'เริ่มหาติวเตอร์เลย')"
            size="xl"
            block
            class="rounded-full shadow-premium-md"
            to="/find-tutors"
          />
        </div>

        <!-- Tutors -->
        <div
          v-reveal
          class="premium-card relative flex flex-col rounded-[2.5rem] bg-white p-10 sm:p-12 transition-all hover:-translate-y-1"
          style="--reveal-delay: 100ms"
        >
          <div class="absolute -top-4 right-10">
            <UBadge
              label="Verified"
              color="tertiary"
              variant="solid"
              class="rounded-full px-4 py-1 shadow-premium-md"
            />
          </div>

          <div class="mb-8">
            <div class="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-500">
              <UIcon name="i-lucide-graduation-cap" class="size-8" />
            </div>
            <h2 class="text-3xl font-bold text-highlighted">
              {{ tr('For Tutors', 'สำหรับติวเตอร์') }}
            </h2>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-bold text-highlighted">Free</span>
              <span class="text-muted">{{ tr('during Beta', 'ในช่วงเบต้า') }}</span>
            </div>
          </div>

          <ul class="mb-10 flex-1 space-y-4 text-muted">
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-check-circle-2" class="mt-1 size-5 text-accent-500 shrink-0" />
              <span>{{ tr('Professional verified profile', 'โปรไฟล์มืออาชีพที่ผ่านการตรวจสอบ') }}</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-check-circle-2" class="mt-1 size-5 text-accent-500 shrink-0" />
              <span>{{ tr('List subjects and availability', 'ระบุวิชาที่สอนและช่วงเวลาที่สะดวก') }}</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-check-circle-2" class="mt-1 size-5 text-accent-500 shrink-0" />
              <span>{{ tr('Receive inquiries from students', 'รับคำขอติดต่อจากนักเรียน') }}</span>
            </li>
            <li class="flex items-start gap-3 text-dimmed italic">
              <UIcon name="i-lucide-info" class="mt-1 size-5 shrink-0" />
              <span>{{ tr('Commission models may be introduced later', 'อาจมีการนำระบบคอมมิชชันมาใช้ในอนาคต') }}</span>
            </li>
          </ul>

          <UButton
            :label="tr('Apply as a Tutor', 'สมัครเป็นติวเตอร์')"
            color="neutral"
            variant="outline"
            size="xl"
            block
            class="rounded-full"
            to="/auth/sign-up"
          />
        </div>
      </div>

      <div class="mt-20 text-center">
        <p class="text-muted">
          {{ tr('Questions about our pricing model?', 'มีคำถามเกี่ยวกับราคา?') }}
          <NuxtLink to="/contact" class="font-bold text-primary hover:underline">{{ tr('Contact our team', 'ติดต่อทีมงานของเรา') }}</NuxtLink>
        </p>
      </div>
    </UContainer>
  </div>
</template>
