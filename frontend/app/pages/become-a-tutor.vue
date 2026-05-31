<script setup lang="ts">
import {
  tutorRecruitmentHeroContent,
  tutorRecruitmentHeroMedia,
  tutorRegistrationCtaLabel,
  tutorRegistrationPath
} from '~/utils/tutorOnboarding'

const { tr } = useAppLocale()

const benefits = [
  {
    title: 'Teach with qualified demand',
    desc: 'Meet learners and families who are actively looking for trusted tutors.',
    icon: 'i-lucide-users-round'
  },
  {
    title: 'Set your own rhythm',
    desc: 'Choose your teaching mode, availability, and base hourly rate.',
    icon: 'i-lucide-calendar-check'
  },
  {
    title: 'Build a trusted profile',
    desc: 'Use verified education and teaching experience to stand out.',
    icon: 'i-lucide-badge-check'
  },
  {
    title: 'Grow with clarity',
    desc: 'Start with a structured application and a profile draft after approval.',
    icon: 'i-lucide-trending-up'
  }
]

const suitableFor = [
  'People with real knowledge in a subject area',
  'Tutors who can communicate clearly with learners and parents',
  'Teachers who respect time, preparation, and follow-through',
  'Applicants who are ready for identity and education verification'
]

const preparationItems = [
  'Email and phone number you check regularly',
  'Education background and current study status',
  'Subjects and learner levels you want to teach',
  'Teaching mode, preferred area, and base hourly rate',
  'ID card plus transcript or education proof'
]

const registrationSteps = [
  'Create account access',
  'Add personal and contact details',
  'Provide education background',
  'Describe teaching setup and experience',
  'Upload verification documents',
  'Review and submit the application'
]

const faqItems = [
  {
    q: 'How long does review take?',
    a: 'Most applications should expect a review period before the Tutor Profile can become public.'
  },
  {
    q: 'What documents do I need?',
    a: 'Prepare an ID card and a transcript or equivalent education proof. Portfolio or certificates are optional.'
  },
  {
    q: 'Are there application fees or commissions?',
    a: 'The registration flow focuses on collecting your application. Any commercial terms should be reviewed before approval.'
  },
  {
    q: 'Can I choose my own price and time?',
    a: 'Yes. You provide a base hourly rate, teaching mode, and optional pricing note during registration.'
  },
  {
    q: 'Can I teach online and onsite?',
    a: 'Yes. You can choose online, onsite, or both. Onsite applicants provide province and area details.'
  },
  {
    q: 'Can I apply with limited teaching experience?',
    a: 'Yes, if you can show subject knowledge, learner levels you can support, and clear outcome examples.'
  },
  {
    q: 'How are my documents used?',
    a: 'Verification documents are used to review your Tutor Application and are not shown on your public Tutor Profile.'
  },
  {
    q: 'What happens after approval?',
    a: 'Approved application data can seed a Tutor Profile draft. You review and publish it before learners see it.'
  }
]
</script>

<template>
  <main class="min-h-screen bg-bg-muted/30 pb-16 pt-8 lg:pt-10">
    <UContainer class="grid gap-14">
      <section class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.85fr)] lg:items-center">
        <div
          v-reveal
          class="min-w-0"
        >
          <UBadge
            :label="tr(tutorRecruitmentHeroContent.eyebrow.en, tutorRecruitmentHeroContent.eyebrow.th)"
            variant="subtle"
            class="mb-6 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-600 ring-1 ring-brand-100"
          />
          <h1 class="max-w-3xl text-pretty text-3xl font-black leading-[1.12] tracking-tight text-highlighted sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
            <BlurText
              :text="tr(tutorRecruitmentHeroContent.heading.en, tutorRecruitmentHeroContent.heading.th)"
              :animate-on-scroll="tutorRecruitmentHeroContent.headingReveal.animateOnScroll"
              :duration="tutorRecruitmentHeroContent.headingReveal.duration"
              :stagger="tutorRecruitmentHeroContent.headingReveal.stagger"
              :blur="`${tutorRecruitmentHeroContent.headingReveal.blur}px`"
              :y="tutorRecruitmentHeroContent.headingReveal.y"
              class-name="max-w-full whitespace-normal break-words [overflow-wrap:anywhere] [&>span]:max-w-full [&>span]:whitespace-normal [&>span]:break-words"
            />
          </h1>
          <p class="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-muted lg:text-xl">
            {{ tr('Join TeachThrough as a verified tutor. Show your strengths, set your teaching preferences, and start with a clear application process.', 'เข้าร่วม TeachThrough ในฐานะติวเตอร์ที่ผ่านการตรวจสอบ แสดงจุดแข็งของคุณ ตั้งค่ารูปแบบการสอนที่ต้องการ และเริ่มสมัครด้วยขั้นตอนที่ชัดเจน') }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <UButton
              :to="tutorRegistrationPath"
              :label="tr(tutorRegistrationCtaLabel, 'เริ่มสมัครเป็นติวเตอร์')"
              icon="i-lucide-arrow-right"
              trailing
              size="lg"
              class="rounded-full px-8 py-4 text-base font-black shadow-premium-lg transition-all hover:scale-[1.03] active:scale-[0.98]"
            />
            <UButton
              to="/find-tutors"
              :label="tr('Explore tutors', 'ค้นหาติวเตอร์')"
              variant="ghost"
              color="neutral"
              size="lg"
              class="rounded-full px-6 font-bold text-toned"
            />
          </div>
        </div>

        <div class="relative order-first w-full max-w-sm justify-self-center sm:max-w-md lg:order-none lg:self-center">
          <img
            :src="tutorRecruitmentHeroMedia.src"
            :alt="tutorRecruitmentHeroMedia.alt"
            class="aspect-[4/5] max-h-[30rem] w-full rounded-[1.5rem] object-cover shadow-premium-lg ring-1 ring-sky-100 lg:max-h-[32rem]"
          >
        </div>
      </section>

      <section
        v-reveal
        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="premium-card rounded-[1.25rem] bg-white p-6 shadow-premium-sm transition-all hover:-translate-y-1 hover:shadow-premium-md"
        >
          <div class="mb-5 grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <UIcon
              :name="benefit.icon"
              class="size-6"
            />
          </div>
          <h2 class="text-base font-black tracking-tight text-highlighted">
            {{ tr(benefit.title, [
              'สอนกับผู้เรียนที่ต้องการติวเตอร์จริง',
              'กำหนดจังหวะการสอนของคุณเอง',
              'สร้างโปรไฟล์ที่น่าเชื่อถือ',
              'เติบโตอย่างชัดเจน'
            ][benefits.indexOf(benefit)] || benefit.title) }}
          </h2>
          <p class="mt-2 text-sm font-medium leading-relaxed text-muted">
            {{ tr(benefit.desc, [
              'พบผู้เรียนและครอบครัวที่กำลังมองหาติวเตอร์ที่ไว้ใจได้',
              'เลือกรูปแบบการสอน เวลาที่สะดวก และราคาพื้นฐานต่อชั่วโมงได้เอง',
              'ใช้ประวัติการศึกษาและประสบการณ์การสอนที่ตรวจสอบได้เพื่อเพิ่มความโดดเด่น',
              'เริ่มด้วยใบสมัครที่เป็นระบบ และต่อยอดเป็นร่างโปรไฟล์หลังผ่านการอนุมัติ'
            ][benefits.indexOf(benefit)] || benefit.desc) }}
          </p>
        </article>
      </section>

      <section class="grid gap-8 lg:grid-cols-2">
        <div
          v-reveal
          class="grid content-start gap-4"
        >
          <h2 class="text-2xl font-black tracking-tight text-highlighted">
            {{ tr('Who it is for', 'เหมาะกับใคร') }}
          </h2>
          <ul class="grid gap-3">
            <li
              v-for="item in suitableFor"
              :key="item"
              class="flex gap-3 rounded-[1.25rem] bg-white p-4 text-sm font-semibold leading-relaxed text-slate-650 shadow-premium-sm ring-1 ring-sky-50"
            >
              <UIcon
                name="i-lucide-check-circle-2"
                class="mt-0.5 size-5 shrink-0 text-primary"
              />
              <span>{{ tr(item, [
                'ผู้ที่มีความรู้จริงในวิชาที่ต้องการสอน',
                'ติวเตอร์ที่สื่อสารกับผู้เรียนและผู้ปกครองได้ชัดเจน',
                'ผู้สอนที่ให้ความสำคัญกับเวลา การเตรียมตัว และความรับผิดชอบ',
                'ผู้สมัครที่พร้อมให้ตรวจสอบตัวตนและข้อมูลการศึกษา'
              ][suitableFor.indexOf(item)] || item) }}</span>
            </li>
          </ul>
        </div>

        <div
          v-reveal="{ delay: 120 }"
          class="grid content-start gap-4"
        >
          <h2 class="text-2xl font-black tracking-tight text-highlighted">
            {{ tr('Prepare before applying', 'เตรียมข้อมูลก่อนสมัคร') }}
          </h2>
          <ol class="grid gap-3">
            <li
              v-for="(item, index) in preparationItems"
              :key="item"
              class="flex gap-3 rounded-[1.25rem] bg-white p-4 text-sm font-semibold leading-relaxed text-slate-650 shadow-premium-sm ring-1 ring-sky-50"
            >
              <span class="grid size-6 shrink-0 place-items-center rounded-full bg-sky-50 text-xs font-black text-primary ring-1 ring-sky-100">{{ index + 1 }}</span>
              <span>{{ tr(item, [
                'อีเมลและเบอร์โทรที่ติดต่อได้เป็นประจำ',
                'ประวัติการศึกษาและสถานะการเรียนปัจจุบัน',
                'วิชาและระดับผู้เรียนที่คุณต้องการสอน',
                'รูปแบบการสอน พื้นที่ที่สะดวก และราคาพื้นฐานต่อชั่วโมง',
                'บัตรประชาชน พร้อมใบแสดงผลการเรียนหรือหลักฐานการศึกษา'
              ][preparationItems.indexOf(item)] || item) }}</span>
            </li>
          </ol>
          <UButton
            :to="tutorRegistrationPath"
            :label="tr(tutorRegistrationCtaLabel, 'เริ่มสมัครเป็นติวเตอร์')"
            icon="i-lucide-arrow-right"
            trailing
            size="lg"
            class="mt-2 w-fit rounded-full px-7 font-black shadow-premium-md transition-all hover:scale-[1.03]"
          />
        </div>
      </section>

      <section
        v-reveal
        class="grid gap-5"
      >
        <h2 class="text-2xl font-black tracking-tight text-highlighted">
          {{ tr('Registration steps', 'ขั้นตอนการสมัคร') }}
        </h2>
        <div class="grid gap-3 md:grid-cols-3">
          <article
            v-for="(step, index) in registrationSteps"
            :key="step"
            class="rounded-[1.25rem] bg-white p-5 shadow-premium-sm ring-1 ring-sky-50"
          >
            <p class="text-xs font-black uppercase tracking-widest text-primary">
              {{ String(index + 1).padStart(2, '0') }}
            </p>
            <h3 class="mt-3 text-base font-black tracking-tight text-highlighted">
              {{ tr(step, [
                'สร้างข้อมูลบัญชี',
                'กรอกข้อมูลส่วนตัวและช่องทางติดต่อ',
                'ระบุประวัติการศึกษา',
                'อธิบายรูปแบบและประสบการณ์การสอน',
                'อัปโหลดเอกสารสำหรับตรวจสอบ',
                'ตรวจทานและส่งใบสมัคร'
              ][registrationSteps.indexOf(step)] || step) }}
            </h3>
          </article>
        </div>
      </section>

      <section class="grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:gap-10">
        <div v-reveal>
          <h2 class="text-2xl font-black tracking-tight text-highlighted">
            {{ tr('Questions before applying', 'คำถามก่อนเริ่มสมัคร') }}
          </h2>
          <p class="mt-3 text-sm font-semibold leading-relaxed text-muted">
            {{ tr('Review the points most tutors ask about before starting the application.', 'อ่านประเด็นที่ติวเตอร์มักสงสัยก่อนเริ่มกรอกใบสมัคร') }}
          </p>
        </div>
        <div
          v-reveal="{ delay: 120 }"
          class="grid gap-3"
        >
          <details
            v-for="item in faqItems"
            :key="item.q"
            class="group rounded-[1.25rem] bg-white p-4 shadow-premium-sm ring-1 ring-sky-50"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-black text-highlighted">
              <span>{{ tr(item.q, [
                'ใช้เวลาตรวจสอบนานแค่ไหน',
                'ต้องใช้เอกสารอะไรบ้าง',
                'มีค่าสมัครหรือค่าคอมมิชชันไหม',
                'กำหนดราคาและเวลาเองได้ไหม',
                'สอนได้ทั้งออนไลน์และนอกสถานที่ไหม',
                'ถ้ามีประสบการณ์สอนไม่มาก สมัครได้ไหม',
                'เอกสารของฉันถูกใช้อย่างไร',
                'หลังผ่านการอนุมัติต้องทำอะไรต่อ'
              ][faqItems.indexOf(item)] || item.q) }}</span>
              <UIcon
                name="i-lucide-chevron-down"
                class="size-4 shrink-0 text-primary transition-transform group-open:rotate-180"
              />
            </summary>
            <p class="mt-3 text-sm font-medium leading-relaxed text-muted">
              {{ tr(item.a, [
                'โดยทั่วไปใบสมัครจะต้องผ่านการตรวจสอบก่อนที่โปรไฟล์ติวเตอร์จะเผยแพร่ได้',
                'เตรียมบัตรประชาชน และใบแสดงผลการเรียนหรือหลักฐานการศึกษา ส่วนพอร์ตโฟลิโอหรือเกียรติบัตรเป็นเอกสารเสริม',
                'ขั้นตอนสมัครนี้เน้นการส่งข้อมูลเพื่อพิจารณา เงื่อนไขด้านค่าใช้จ่ายควรตรวจสอบก่อนผ่านการอนุมัติ',
                'ได้ คุณสามารถระบุราคาพื้นฐานต่อชั่วโมง รูปแบบการสอน และรายละเอียดราคาเพิ่มเติมในฟอร์มสมัคร',
                'ได้ คุณเลือกได้ว่าออนไลน์ นอกสถานที่ หรือทั้งสองแบบ หากเลือกนอกสถานที่จะมีช่องให้ระบุจังหวัดและพื้นที่ที่สะดวก',
                'สมัครได้ หากคุณแสดงความรู้ในวิชา ระดับผู้เรียนที่สอนได้ และตัวอย่างผลลัพธ์หรือแนวทางการสอนได้ชัดเจน',
                'เอกสารใช้เพื่อตรวจสอบใบสมัครติวเตอร์เท่านั้น และจะไม่แสดงบนโปรไฟล์ติวเตอร์สาธารณะ',
                'ข้อมูลจากใบสมัครที่ผ่านการอนุมัติจะใช้ตั้งต้นร่างโปรไฟล์ติวเตอร์ คุณจะตรวจทานก่อนเผยแพร่ให้ผู้เรียนเห็น'
              ][faqItems.indexOf(item)] || item.a) }}
            </p>
          </details>
        </div>
      </section>

      <section
        v-reveal
        class="rounded-[1.5rem] bg-white px-6 py-8 text-center shadow-premium-md ring-1 ring-sky-100"
      >
        <h2 class="text-2xl font-black tracking-tight text-highlighted">
          {{ tr('Ready to send your Tutor Application?', 'พร้อมเริ่มส่งใบสมัครติวเตอร์แล้วหรือยัง') }}
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-muted">
          {{ tr('The Tutor Registration Form takes you step by step and lets you review your information before submission.', 'ฟอร์มสมัครเป็นติวเตอร์จะแนะนำคุณทีละขั้น และให้ตรวจทานข้อมูลก่อนส่งใบสมัคร') }}
        </p>
        <UButton
          :to="tutorRegistrationPath"
          :label="tr(tutorRegistrationCtaLabel, 'เริ่มสมัครเป็นติวเตอร์')"
          icon="i-lucide-arrow-right"
          trailing
          size="lg"
          class="mt-6 rounded-full px-8 font-black shadow-premium-md transition-all hover:scale-[1.03]"
        />
      </section>
    </UContainer>
  </main>
</template>
