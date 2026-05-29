<script setup lang="ts">
const { tr, pick } = useAppLocale()

type TutorDocumentKey = 'idCard'

const benefits = computed(() => [
  {
    title: tr('Elite Community', 'ชุมชนระดับแนวหน้า'),
    desc: tr('Connect with 1,200+ verified experts and ambitious students.', 'ร่วมงานกับที่ปรึกษากว่า 1,200 คน และนักเรียนที่มีความมุ่งมั่น'),
    icon: 'i-lucide-users'
  },
  {
    title: tr('Transparent Pricing', 'ราคาที่โปร่งใส'),
    desc: tr('Set your own rates and keep 100% of your earnings.', 'กำหนดราคาด้วยตัวเองและรับรายได้เต็มจำนวนโดยไม่มีค่าธรรมเนียมแฝง'),
    icon: 'i-lucide-badge-dollar-sign'
  },
  {
    title: tr('Flexible Journey', 'เส้นทางที่ยืดหยุ่น'),
    desc: tr('Teach online or offline with a schedule that fits your life.', 'เลือกสอนออนไลน์หรือออนไซต์ด้วยตารางเวลาที่คุณออกแบบเอง'),
    icon: 'i-lucide-calendar-heart'
  },
  {
    title: tr('Verified Growth', 'การเติบโตที่มีคุณภาพ'),
    desc: tr('Build trust with student reviews and professional credentials.', 'สร้างความน่าเชื่อถือด้วยรีวิวจากนักเรียนและคุณวุฒิที่ผ่านการรับรอง'),
    icon: 'i-lucide-trending-up'
  }
])

const teachingModes = computed(() => pick(
  ['Online', 'Offline', 'Online & Offline'],
  ['ออนไลน์', 'ออนไซต์', 'ออนไลน์และออนไซต์']
))
const genders = computed(() => pick(
  ['Male', 'Female', 'Prefer not to say'],
  ['ชาย', 'หญิง', 'ไม่ระบุ']
))
const degreeOptions = computed(() => pick(
  ['High School', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree'],
  ['มัธยมศึกษา', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก']
))

const showForm = ref(false)
const idCardFileName = ref('')

const documentFileTargets = {
  idCard: idCardFileName
}

const handleNamedFileChange = (event: Event, target: TutorDocumentKey) => {
  const input = event.target as HTMLInputElement
  documentFileTargets[target].value = input.files?.[0]?.name || ''
}
</script>

<template>
  <div class="min-h-screen bg-bg-muted/30 pb-24 pt-16">
    <UContainer>
      <Transition
        name="auth-form"
        mode="out-in"
      >
        <div
          v-if="!showForm"
          class="mx-auto max-w-5xl space-y-20"
        >
          <!-- Hero Invitation -->
          <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div v-reveal>
              <UBadge
                label="Impact the Future"
                variant="subtle"
                class="mb-6 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-600 ring-1 ring-brand-100"
              />
              <h1 class="text-balance text-5xl font-black tracking-tight text-highlighted lg:text-7xl lg:leading-[1.1]">
                <BlurText
                  :text="tr('Your expertise,', 'ความเชี่ยวชาญของคุณ')"
                  :animate-on-scroll="false"
                />
                <br>
                <BlurText
                  :text="tr('their breakthrough.', 'คือความสำเร็จของเขา')"
                  class-name="text-brand-600"
                  :delay="0.3"
                  :animate-on-scroll="false"
                />
              </h1>
              <p class="mt-8 text-xl font-medium leading-relaxed text-muted lg:text-2xl">
                {{ tr('Join Thailand’s most trusted circle of elite educators. Help students reach their potential with our premium matching experience.', 'เข้าร่วมกลุ่มผู้สอนระดับแนวหน้าที่ได้รับความไว้วางใจที่สุด ช่วยให้นักเรียนบรรลุศักยภาพสูงสุดด้วยระบบการจับคู่ระดับพรีเมียมของเรา') }}
              </p>
              <div class="mt-12 flex flex-wrap gap-4">
                <UButton
                  :label="tr('Become a Tutor', 'สมัครเป็นติวเตอร์')"
                  size="xl"
                  class="rounded-full px-12 py-6 text-lg font-black shadow-premium-lg transition-all hover:scale-105 active:scale-95"
                  @click="showForm = true"
                />
                <UButton
                  to="/find-tutors"
                  :label="tr('Explore Marketplace', 'สำรวจตลาดวิชา')"
                  variant="ghost"
                  color="neutral"
                  size="xl"
                  class="rounded-full px-8 font-bold text-toned"
                />
              </div>
            </div>

            <div
              v-reveal="{ delay: 400 }"
              class="relative hidden lg:block"
            >
              <div class="premium-card overflow-hidden rounded-[3rem] bg-white p-2 shadow-premium-xl">
                <img
                  src="https://images.unsplash.com/photo-1544717297-fa15739a544a?auto=format&fit=crop&w=800&q=80"
                  alt="Tutor teaching"
                  class="aspect-[4/5] w-full rounded-[2.5rem] object-cover"
                >
              </div>
            </div>
          </div>

          <!-- Benefits Grid -->
          <section class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="(item, index) in benefits"
              :key="item.title"
              v-reveal="{ delay: index * 100 + 500 }"
              class="premium-card rounded-[2.5rem] bg-white p-8 shadow-premium-md transition-all hover:shadow-premium-xl hover:scale-105"
            >
              <div class="mb-6 grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <UIcon
                  :name="item.icon"
                  class="size-7"
                />
              </div>
              <h3 class="text-xl font-black tracking-tight text-highlighted">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm font-medium leading-relaxed text-muted">
                {{ item.desc }}
              </p>
            </div>
          </section>

          <!-- Quote Section -->
          <section
            v-reveal="{ delay: 800 }"
            class="glass-premium rounded-[3rem] p-10 text-center shadow-premium-lg lg:p-20"
          >
            <UIcon
              name="i-lucide-quote"
              class="size-12 text-brand-200"
            />
            <h2 class="mx-auto mt-8 max-w-3xl text-3xl font-bold leading-tight text-highlighted lg:text-4xl">
              "{{ tr('The platform makes it effortless to manage my students and focus on what I love most: teaching.', 'แพลตฟอร์มนี้ช่วยให้การจัดการนักเรียนเป็นเรื่องง่าย ทำให้ผมโฟกัสกับสิ่งที่รักที่สุดได้ นั่นคือการสอน') }}"
            </h2>
            <div class="mt-10 flex items-center justify-center gap-4">
              <div class="size-12 rounded-full bg-slate-200" />
              <div class="text-left">
                <p class="text-base font-black text-highlighted">
                  Dr. James Wilson
                </p>
                <p class="text-xs font-bold uppercase tracking-widest text-dimmed">
                  Senior Physics Mentor
                </p>
              </div>
            </div>
          </section>
        </div>

        <!-- Registration Form (Long Form Mode) -->
        <div
          v-else
          class="mx-auto w-full max-w-5xl space-y-12"
        >
          <header v-reveal>
            <button
              class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-primary shadow-premium-sm ring-1 ring-primary/10 transition-all hover:bg-primary hover:text-white"
              @click="showForm = false"
            >
              <UIcon
                name="i-lucide-arrow-left"
                class="size-3"
              />
              {{ tr('Back to overview', 'กลับไปหน้าภาพรวม') }}
            </button>
            <h1 class="text-4xl font-black tracking-tight text-highlighted sm:text-6xl">
              <BlurText
                :text="tr('Become a Tutor', 'สมัครเป็นติวเตอร์')"
                :animate-on-scroll="false"
              />
            </h1>
          </header>

          <UCard
            class="premium-card w-full bg-elevated/95 shadow-xl backdrop-blur mx-auto"
            :ui="{
              header: 'px-5 py-4 sm:px-8 border-b border-muted',
              body: 'px-5 py-8 sm:px-10'
            }"
          >
            <div class="grid gap-12">
              <p class="rounded-[1rem] bg-sky-50/70 px-5 py-4 text-sm font-semibold leading-relaxed text-slate-600 ring-1 ring-sky-100">
                {{ tr('Please provide all details below. We will verify your profile before it becomes visible to students.', 'กรุณาระบุรายละเอียดทั้งหมดด้านล่าง เราจะตรวจสอบโปรไฟล์ของคุณก่อนแสดงผลให้นักเรียนเห็น') }}
              </p>

              <!-- Section 1: Account -->
              <section class="grid gap-5">
                <div class="flex items-center gap-3">
                  <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <span class="text-sm font-black">01</span>
                  </div>
                  <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                    {{ tr('Account Information', 'ข้อมูลบัญชี') }}
                  </h2>
                </div>
                <div class="grid gap-4 sm:grid-cols-3">
                  <UInput
                    class="premium-input"
                    icon="i-lucide-mail"
                    :placeholder="tr('Email address *', 'อีเมล *')"
                  />
                  <UInput
                    class="premium-input"
                    icon="i-lucide-lock"
                    type="password"
                    :placeholder="tr('Password *', 'รหัสผ่าน *')"
                  />
                  <UInput
                    class="premium-input"
                    icon="i-lucide-lock-keyhole"
                    type="password"
                    :placeholder="tr('Confirm password *', 'ยืนยันรหัสผ่าน *')"
                  />
                </div>
              </section>

              <!-- Section 2: Personal -->
              <section class="grid gap-6">
                <div class="flex items-center gap-3">
                  <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <span class="text-sm font-black">02</span>
                  </div>
                  <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                    {{ tr('Personal Information', 'ข้อมูลส่วนตัว') }}
                  </h2>
                </div>
                <div class="grid gap-6">
                  <div class="grid gap-4 sm:grid-cols-4">
                    <UInput
                      class="premium-input"
                      :placeholder="tr('First name *', 'ชื่อ *')"
                    />
                    <UInput
                      class="premium-input"
                      :placeholder="tr('Last name *', 'นามสกุล *')"
                    />
                    <UInput
                      class="premium-input"
                      :placeholder="tr('Nickname *', 'ชื่อเล่น *')"
                    />
                    <USelect
                      class="premium-input"
                      :items="genders"
                      :placeholder="tr('Gender *', 'เพศ *')"
                    />
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <UInput
                      class="premium-input"
                      size="xl"
                      icon="i-lucide-smartphone"
                      :placeholder="tr('Mobile *', 'โทรศัพท์ *')"
                    />
                    <UInput
                      class="premium-input"
                      size="xl"
                      icon="i-lucide-message-circle"
                      :placeholder="tr('Line ID *', 'ไลน์ไอดี *')"
                    />
                  </div>
                  <UTextarea
                    class="premium-input"
                    :rows="2"
                    :placeholder="tr('Address *', 'ที่อยู่ *')"
                  />
                </div>
              </section>

              <!-- Section 3: Education -->
              <section class="grid gap-6">
                <div class="flex items-center gap-3">
                  <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <span class="text-sm font-black">03</span>
                  </div>
                  <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                    {{ tr('Education Background', 'ประวัติการศึกษา') }}
                  </h2>
                </div>
                <div class="grid gap-8">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <USelect
                      class="premium-input"
                      :items="degreeOptions"
                      :placeholder="tr('Degree *', 'ระดับการศึกษา *')"
                    />
                    <UInput
                      class="premium-input"
                      icon="i-lucide-building-2"
                      :placeholder="tr('University *', 'มหาวิทยาลัย *')"
                    />
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <UInput
                      class="premium-input"
                      :placeholder="tr('Faculty *', 'คณะ *')"
                    />
                    <UInput
                      class="premium-input"
                      :placeholder="tr('Major *', 'สาขา *')"
                    />
                  </div>
                </div>
              </section>

              <!-- Section 4: Teaching -->
              <section class="grid gap-6">
                <div class="flex items-center gap-3">
                  <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <span class="text-sm font-black">04</span>
                  </div>
                  <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                    {{ tr('Teaching Profile', 'โปรไฟล์การสอน') }}
                  </h2>
                </div>
                <div class="grid gap-6">
                  <div class="grid gap-4 sm:grid-cols-3">
                    <UTextarea
                      class="premium-input sm:col-span-2"
                      :rows="3"
                      :placeholder="tr('Experience... *', 'ประสบการณ์สอน... *')"
                    />
                    <div class="grid gap-4">
                      <UInput
                        class="premium-input"
                        icon="i-lucide-badge-dollar-sign"
                        :placeholder="tr('Hourly rate *', 'ราคาต่อชั่วโมง *')"
                      />
                      <USelect
                        class="premium-input"
                        :items="teachingModes"
                        :placeholder="tr('Mode *', 'รูปแบบการสอน *')"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <!-- Section 5: Verification -->
              <section class="grid gap-6">
                <div class="flex items-center gap-3">
                  <div class="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <span class="text-sm font-black">05</span>
                  </div>
                  <h2 class="text-xl font-extrabold tracking-tight text-highlighted">
                    {{ tr('Verification', 'การยืนยัน') }}
                  </h2>
                </div>
                <div class="grid gap-6">
                  <label class="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-sky-200 bg-sky-50/20 p-5 transition-all hover:bg-white">
                    <input
                      type="file"
                      class="sr-only"
                      @change="handleNamedFileChange($event, 'idCard')"
                    >
                    <div class="flex items-center gap-3">
                      <UIcon
                        name="i-lucide-id-card"
                        class="size-6 text-primary"
                      />
                      <span class="text-sm font-bold text-slate-700 truncate">{{ idCardFileName || tr('Upload ID Card *', 'อัปโหลดบัตรประชาชน *') }}</span>
                    </div>
                    <UBadge
                      label="Required"
                      size="sm"
                      variant="subtle"
                      class="rounded-full bg-brand-100 text-brand-700"
                    />
                  </label>
                  <div class="grid gap-6 max-w-2xl mx-auto w-full text-center">
                    <label class="inline-flex cursor-pointer items-start gap-3 text-left">
                      <input
                        type="checkbox"
                        class="mt-1 size-5 accent-primary shrink-0"
                      >
                      <span class="text-sm font-medium leading-relaxed text-muted">
                        {{ tr('I agree to the tutor terms and confirm that the information is accurate.', 'ฉันยอมรับเงื่อนไขสำหรับติวเตอร์และขอยืนยันว่าข้อมูลถูกต้อง') }}
                      </span>
                    </label>
                    <UButton
                      :label="tr('Submit Application', 'ส่งใบสมัครติวเตอร์')"
                      size="xl"
                      class="rounded-full px-16 py-6 text-lg font-black shadow-premium-md"
                    />
                  </div>
                </div>
              </section>
            </div>
          </UCard>
        </div>
      </Transition>
    </UContainer>
  </div>
</template>
