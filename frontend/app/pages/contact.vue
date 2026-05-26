<script setup lang="ts">
const { tr, pick } = useAppLocale()

const topicItems = computed(() => pick(
  ['I am a parent/student', 'I am a tutor', 'Partnership', 'Support'],
  ['ฉันเป็นผู้ปกครอง/นักเรียน', 'ฉันเป็นติวเตอร์', 'พาร์ตเนอร์', 'ฝ่ายสนับสนุน']
))
</script>

<template>
  <div class="py-16 lg:py-24">
    <UContainer>
      <div class="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <UBadge
            :label="tr('Support', 'ฝ่ายสนับสนุน')"
            variant="subtle"
            class="rounded-full px-4 py-1"
          />
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
            {{ tr('How can we help you today?', 'มีอะไรให้เราช่วยไหม?') }}
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {{ tr('Questions about tutor verification, booking, pricing, or parent support? Send a message and the team will follow up.', 'มีคำถามเกี่ยวกับการตรวจสอบติวเตอร์ การจอง ราคา หรือการช่วยเหลือผู้ปกครอง? ส่งข้อความมาได้ ทีมงานจะติดต่อกลับ') }}
          </p>

          <div class="mt-12 space-y-8">
            <div class="flex items-center gap-6">
              <div class="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                <UIcon name="i-lucide-mail" class="size-6" />
              </div>
              <div>
                <p class="text-sm font-semibold text-muted uppercase tracking-wider">
                  {{ tr('Email us', 'อีเมล') }}
                </p>
                <p class="text-lg font-bold text-highlighted">
                  support@TeachThrough.test
                </p>
              </div>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex size-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-500">
                <UIcon name="i-lucide-clock" class="size-6" />
              </div>
              <div>
                <p class="text-sm font-semibold text-muted uppercase tracking-wider">
                  {{ tr('Working Hours', 'เวลาทำการ') }}
                </p>
                <p class="text-lg font-bold text-highlighted">
                  {{ tr('Mon-Fri, 9:00-18:00', 'จันทร์-ศุกร์ 9:00-18:00') }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex size-12 items-center justify-center rounded-2xl bg-trust-50 text-trust-500">
                <UIcon name="i-lucide-message-circle" class="size-6" />
              </div>
              <div>
                <p class="text-sm font-semibold text-muted uppercase tracking-wider">
                  {{ tr('Social Media', 'โซเชียลมีเดีย') }}
                </p>
                <p class="text-lg font-bold text-highlighted">
                  {{ tr('Facebook, Instagram, and Line', 'Facebook, Instagram และ Line') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <UCard
          v-reveal
          class="premium-card rounded-[2.5rem] bg-white shadow-premium-xl"
          :ui="{ body: 'p-8 sm:p-12' }"
        >
          <h2 class="text-2xl font-bold text-highlighted mb-8">
            {{ tr('Send a Message', 'ส่งข้อความหาเรา') }}
          </h2>
          <div class="grid gap-6">
            <div class="grid gap-6 sm:grid-cols-2">
              <UInput
                class="premium-input"
                size="lg"
                :placeholder="tr('First Name', 'ชื่อ')"
              />
              <UInput
                class="premium-input"
                size="lg"
                :placeholder="tr('Last Name', 'นามสกุล')"
              />
            </div>
            <UInput
              class="premium-input"
              icon="i-lucide-mail"
              size="lg"
              :placeholder="tr('Email address', 'อีเมล')"
            />
            <USelect
              class="premium-input"
              size="lg"
              icon="i-lucide-help-circle"
              :items="topicItems"
              :placeholder="tr('What are you looking for?', 'หัวข้อที่ต้องการติดต่อ')"
            />
            <UTextarea
              class="premium-input"
              size="lg"
              :placeholder="tr('Tell us more about your needs...', 'บอกรายละเอียดที่ให้เราช่วย...')"
              :rows="5"
            />
            <UButton
              :label="tr('Send Inquiry', 'ส่งคำขอติดต่อ')"
              icon="i-lucide-send"
              size="xl"
              block
              class="rounded-full shadow-premium-md"
            />
          </div>
        </UCard>
      </div>

      <!-- FAQ Section -->
      <section class="mt-32">
        <div class="mb-16 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            {{ tr('Frequently Asked Questions', 'คำถามที่พบบ่อย') }}
          </h2>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-reveal
            class="premium-card rounded-[2rem] bg-white p-8"
          >
            <h3 class="text-lg font-bold text-highlighted">
              {{ tr('Are tutors verified?', 'ติวเตอร์ผ่านการตรวจสอบไหม?') }}
            </h3>
            <p class="mt-4 text-muted leading-relaxed">
              {{ tr('Tutor profiles are reviewed before appearing in search.', 'โปรไฟล์ติวเตอร์จะถูกตรวจสอบก่อนแสดงในหน้าค้นหา') }}
            </p>
          </div>

          <div
            v-reveal
            class="premium-card rounded-[2rem] bg-white p-8"
            style="--reveal-delay: 100ms"
          >
            <h3 class="text-lg font-bold text-highlighted">
              {{ tr('Can sessions be online?', 'เรียนออนไลน์ได้ไหม?') }}
            </h3>
            <p class="mt-4 text-muted leading-relaxed">
              {{ tr('Tutors can offer online, offline, or hybrid lessons.', 'ติวเตอร์สามารถเปิดสอนออนไลน์ ออนไซต์ หรือแบบผสมผสานได้') }}
            </p>
          </div>

          <div
            v-reveal
            class="premium-card rounded-[2rem] bg-white p-8"
            style="--reveal-delay: 200ms"
          >
            <h3 class="text-lg font-bold text-highlighted">
              {{ tr('How do I pay?', 'ชำระเงินอย่างไร?') }}
            </h3>
            <p class="mt-4 text-muted leading-relaxed">
              {{ tr('Currently, you pay tutors directly. Platform payments are coming in Phase 2.', 'ขณะนี้คุณชำระเงินให้ติวเตอร์โดยตรง ระบบชำระผ่านแพลตฟอร์มกำลังจะมาใน Phase 2') }}
            </p>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>
