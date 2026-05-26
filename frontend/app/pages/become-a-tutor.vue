<script setup lang="ts">
const { tr } = useAppLocale()

const requirements = computed(() => [
  {
    title: tr('Personal identity', 'ยืนยันตัวตน'),
    desc: tr('Secure verification of your credentials and background.', 'ตรวจสอบคุณวุฒิและประวัติอย่างปลอดภัย'),
    icon: 'i-lucide-user-check'
  },
  {
    title: tr('Academic Excellence', 'ความเป็นเลิศทางวิชาการ'),
    desc: tr('Showcase your degrees, certifications, and expertise.', 'แสดงวุฒิการศึกษา ใบรับรอง และความเชี่ยวชาญของคุณ'),
    icon: 'i-lucide-graduation-cap'
  },
  {
    title: tr('Teaching Mastery', 'ทักษะการสอน'),
    desc: tr('Detail your experience and unique pedagogical approach.', 'ระบุประสบการณ์และแนวทางการสอนที่เป็นเอกลักษณ์'),
    icon: 'i-lucide-presentation'
  },
  {
    title: tr('Profile Curation', 'การคัดกรองโปรไฟล์'),
    desc: tr('Our team reviews every profile to maintain elite standards.', 'ทีมงานของเราตรวจสอบทุกโปรไฟล์เพื่อรักษามาตรฐานระดับสูง'),
    icon: 'i-lucide-shield-check'
  }
])
</script>

<template>
  <div class="min-h-screen bg-bg pb-20 pt-16">
    <UContainer>
      <div class="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <!-- Invitation Content -->
        <div class="space-y-12">
          <div v-reveal>
            <UBadge
              :label="tr('Join the Elite', 'เข้าร่วมกลุ่มระดับแนวหน้า')"
              variant="subtle"
              class="mb-6 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-brand-600 ring-1 ring-brand-100"
            />
            <h1 class="text-5xl font-extrabold tracking-tight text-highlighted lg:text-6xl lg:leading-[1.1]">
              {{ tr('Elevate your teaching career.', 'ยกระดับอาชีพการสอนของคุณ') }}
            </h1>
            <p class="mt-8 text-xl font-medium leading-relaxed text-muted">
              {{ tr('TeachThrough is more than a marketplace. It’s a curated community for exceptional educators who value quality and professional growth.', 'TeachThrough เป็นมากกว่าตลาดวิชา แต่เป็นชุมชนที่คัดสรรมาเพื่อครูที่ยอดเยี่ยม ผู้ให้ความสำคัญกับคุณภาพและการเติบโตในวิชาชีพ') }}
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div
              v-for="(item, index) in requirements"
              :key="item.title"
              v-reveal="{ delay: index * 100 }"
              class="premium-card rounded-[2rem] bg-white p-6 shadow-premium-md"
            >
              <div class="mb-4 grid size-12 place-items-center rounded-[1rem] bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <UIcon :name="item.icon" class="size-6" />
              </div>
              <h3 class="text-lg font-bold text-highlighted">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm font-medium leading-relaxed text-dimmed">
                {{ item.desc }}
              </p>
            </div>
          </div>

          <div v-reveal="{ delay: 400 }" class="rounded-[2.5rem] bg-accent-50 p-8 ring-1 ring-accent-100">
            <div class="flex items-center gap-4">
              <div class="flex -space-x-3">
                <div v-for="i in 3" :key="i" class="size-10 rounded-full border-2 border-white bg-accent-200 shadow-sm" />
              </div>
              <p class="text-sm font-bold text-accent-700">
                {{ tr('Join 1,200+ verified mentors today.', 'ร่วมกับที่ปรึกษากว่า 1,200 คนที่ผ่านการรับรองแล้ววันนี้') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Application Form -->
        <section v-reveal="{ delay: 200 }">
          <UCard
            class="premium-card overflow-hidden rounded-[3rem] bg-white p-2 shadow-premium-xl lg:p-6"
            :ui="{ header: 'border-b-0 pb-0', body: 'pt-8' }"
          >
            <template #header>
              <div class="text-center">
                <h2 class="text-3xl font-extrabold tracking-tight text-highlighted">
                  {{ tr('Begin Application', 'เริ่มการสมัคร') }}
                </h2>
                <p class="mt-3 text-base font-medium text-muted">
                  {{ tr('Complete your profile to start your journey.', 'กรอกข้อมูลโปรไฟล์ของคุณเพื่อเริ่มต้น') }}
                </p>
              </div>
            </template>

            <div class="grid gap-6">
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="space-y-1.5">
                  <p class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">
                    {{ tr('First Name', 'ชื่อ') }}
                  </p>
                  <UInput :placeholder="tr('Enter first name', 'กรอกชื่อ')" class="premium-input" size="xl" />
                </div>
                <div class="space-y-1.5">
                  <p class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">
                    {{ tr('Last Name', 'นามสกุล') }}
                  </p>
                  <UInput :placeholder="tr('Enter last name', 'กรอกนามสกุล')" class="premium-input" size="xl" />
                </div>
              </div>

              <div class="space-y-1.5">
                <p class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">
                  {{ tr('Email Address', 'อีเมล') }}
                </p>
                <UInput
                  icon="i-lucide-mail"
                  :placeholder="tr('you@example.com', 'you@example.com')"
                  class="premium-input"
                  size="xl"
                />
              </div>

              <div class="space-y-1.5">
                <p class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">
                  {{ tr('Expertise & Experience', 'ความเชี่ยวชาญและประสบการณ์') }}
                </p>
                <UTextarea
                  :placeholder="tr('Describe your academic background and teaching history...', 'อธิบายประวัติการศึกษาและประสบการณ์สอนของคุณ...')"
                  :rows="4"
                  class="premium-input"
                />
              </div>

              <div class="grid gap-6 sm:grid-cols-2">
                <div class="space-y-1.5">
                  <p class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">
                    {{ tr('Primary Subject', 'วิชาหลักที่สอน') }}
                  </p>
                  <UInput
                    icon="i-lucide-book-open"
                    :placeholder="tr('e.g. Mathematics', 'เช่น คณิตศาสตร์')"
                    class="premium-input"
                    size="xl"
                  />
                </div>
                <div class="space-y-1.5">
                  <p class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">
                    {{ tr('Hourly Rate', 'ราคาต่อชั่วโมง') }}
                  </p>
                  <UInput
                    icon="i-lucide-dollar-sign"
                    :placeholder="tr('Your rate', 'ราคาของคุณ')"
                    class="premium-input"
                    size="xl"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <p class="px-1 text-[11px] font-black uppercase tracking-widest text-dimmed">
                  {{ tr('Credentials Upload', 'อัปโหลดหลักสูตรหรือใบรับรอง') }}
                </p>
                <div class="relative">
                  <UInput
                    icon="i-lucide-upload"
                    :placeholder="tr('Select files...', 'เลือกไฟล์...')"
                    class="premium-input"
                    size="xl"
                    readonly
                  />
                  <div class="absolute inset-0 cursor-pointer opacity-0" />
                </div>
              </div>

              <div class="pt-4">
                <UButton
                  :label="tr('Submit for Review', 'ส่งข้อมูลเพื่อตรวจสอบ')"
                  icon="i-lucide-send"
                  size="xl"
                  block
                  class="rounded-full font-bold shadow-premium-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                />
              </div>

              <p class="text-center text-xs font-medium text-dimmed">
                {{ tr('By submitting, you agree to our professional standards.', 'การส่งข้อมูลแสดงว่าคุณยอมรับมาตรฐานวิชาชีพของเรา') }}
              </p>
            </div>
          </UCard>
        </section>
      </div>
    </UContainer>
  </div>
</template>
