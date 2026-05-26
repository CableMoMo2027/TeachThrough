<script setup lang="ts">
const { tr } = useAppLocale()
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="edtech-hero overflow-hidden py-20 lg:py-32">
      <UContainer>
        <div class="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div class="relative z-10">
            <UBadge
              :label="tr('About Us', 'เกี่ยวกับเรา')"
              variant="subtle"
              class="rounded-full px-4 py-1"
            />
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl lg:text-6xl">
              {{ tr('A calmer way to choose the right tutor.', 'วิธีเลือกติวเตอร์ที่ใช่ได้ง่ายและสบายใจกว่าเดิม') }}
            </h1>
            <p class="mt-8 max-w-[65ch] text-lg leading-relaxed text-muted sm:text-xl">
              {{ tr('TeachThrough is designed for parents and learners who need trusted tutor information in one place: credentials, teaching style, reviews, price, format, and schedule.', 'TeachThrough ออกแบบมาสำหรับผู้ปกครองและผู้เรียนที่ต้องการข้อมูลติวเตอร์ที่เชื่อถือได้ในที่เดียว ทั้งคุณวุฒิ สไตล์การสอน รีวิว ราคา รูปแบบการเรียน และตารางเวลา') }}
            </p>
          </div>
          <div class="relative">
            <div class="relative z-10 overflow-hidden rounded-[2.5rem] shadow-premium-xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                :alt="tr('Students studying together', 'นักเรียนกำลังเรียนด้วยกัน')"
                class="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              >
            </div>
            <!-- Decorative element -->
            <div class="absolute -bottom-6 -right-6 -z-10 size-64 rounded-full bg-brand-500/10 blur-3xl" />
            <div class="absolute -left-6 -top-6 -z-10 size-64 rounded-full bg-accent-500/10 blur-3xl" />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Mission & Values -->
    <section class="py-24">
      <UContainer>
        <div class="mb-16 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            {{ tr('Our Core Philosophy', 'ปรัชญาหลักของเรา') }}
          </h2>
          <p class="mx-auto mt-4 max-w-[60ch] text-muted">
            {{ tr('We believe that finding the right educator should be as seamless as it is impactful.', 'เราเชื่อว่าการค้นหาผู้สอนที่เหมาะสมควรจะเป็นเรื่องที่ง่ายและสร้างผลลัพธ์ที่ดีที่สุด') }}
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-reveal
            class="premium-card group rounded-[2rem] bg-white p-8"
          >
            <div class="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
              <UIcon
                name="i-lucide-target"
                class="size-7"
              />
            </div>
            <h3 class="text-2xl font-bold text-highlighted">
              {{ tr('Mission', 'พันธกิจ') }}
            </h3>
            <p class="mt-4 leading-relaxed text-muted">
              {{ tr('Make tutor discovery transparent, efficient, and less stressful for families.', 'ทำให้การค้นหาติวเตอร์โปร่งใส รวดเร็ว และลดความกังวลสำหรับครอบครัว') }}
            </p>
          </div>

          <div
            v-reveal
            class="premium-card group rounded-[2rem] bg-white p-8"
            style="--reveal-delay: 100ms"
          >
            <div class="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white">
              <UIcon
                name="i-lucide-eye"
                class="size-7"
              />
            </div>
            <h3 class="text-2xl font-bold text-highlighted">
              {{ tr('Vision', 'วิสัยทัศน์') }}
            </h3>
            <p class="mt-4 leading-relaxed text-muted">
              {{ tr('Help every student access the right support at the right moment.', 'ช่วยให้นักเรียนทุกคนเข้าถึงการสนับสนุนที่เหมาะสมในเวลาที่ต้องการ') }}
            </p>
          </div>

          <div
            v-reveal
            class="premium-card group rounded-[2rem] bg-white p-8"
            style="--reveal-delay: 200ms"
          >
            <div class="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-trust-50 text-trust-500 transition-colors group-hover:bg-trust-500 group-hover:text-white">
              <UIcon
                name="i-lucide-shield-check"
                class="size-7"
              />
            </div>
            <h3 class="text-2xl font-bold text-highlighted">
              {{ tr('Trust', 'ความน่าเชื่อถือ') }}
            </h3>
            <p class="mt-4 leading-relaxed text-muted">
              {{ tr('Verified profiles, moderated reviews, and clear communication workflows.', 'โปรไฟล์ที่ผ่านการตรวจสอบ รีวิวที่ดูแลคุณภาพ และขั้นตอนการสื่อสารที่ชัดเจน') }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
