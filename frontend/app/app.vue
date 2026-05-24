<script setup lang="ts">
import ShinyText from '~/assets/animations/Text Animations/Shiny_Text.vue'

const { locale, isThai, toggleLocale } = useAppLocale()

const copy = computed(() => isThai.value
  ? {
      title: 'Tutorly - ค้นหาติวเตอร์ที่ไว้ใจได้',
      description: 'แพลตฟอร์มหาติวเตอร์มืออาชีพสำหรับนักเรียน ผู้ปกครอง และครูที่ผ่านการตรวจสอบ',
      nav: [
        { label: 'หน้าแรก', to: '/' },
        { label: 'ค้นหาติวเตอร์', to: '/find-tutors' },
        { label: 'สมัครเป็นติวเตอร์', to: '/become-a-tutor' },
        { label: 'เกี่ยวกับเรา', to: '/about' },
        { label: 'ติดต่อเรา', to: '/contact' }
      ],
      signIn: 'เข้าสู่ระบบ',
      signUp: 'สมัครสมาชิก',
      footerBrand: 'Tutorly',
      footerDescription: 'ช่วยให้ครอบครัวค้นหาติวเตอร์ที่ผ่านการตรวจสอบ พร้อมโปรไฟล์ชัดเจน ราคาโปร่งใส และเส้นทางการเรียนที่มั่นใจกว่าเดิม',
      platform: 'แพลตฟอร์ม',
      company: 'บริษัท',
      trust: 'ความน่าเชื่อถือ',
      myAccount: 'บัญชีของฉัน',
      learningResources: 'แหล่งเรียนรู้',
      pricing: 'ราคา / ค่าธรรมเนียม',
      policies: 'ข้อกำหนดและความเป็นส่วนตัว'
    }
  : {
      title: 'Tutorly - Find trusted tutors',
      description: 'A professional tutor discovery platform for students, parents, and verified educators.',
      nav: [
        { label: 'Home', to: '/' },
        { label: 'Find Tutors', to: '/find-tutors' },
        { label: 'Teach on Platform', to: '/become-a-tutor' },
        { label: 'About Us', to: '/about' },
        { label: 'Contact Us', to: '/contact' }
      ],
      signIn: 'Sign In',
      signUp: 'Sign Up',
      footerBrand: 'Tutorly',
      footerDescription: 'Helping families discover verified tutors with clear profiles, transparent pricing, and a smoother path to confident learning.',
      platform: 'Platform',
      company: 'Company',
      trust: 'Trust',
      myAccount: 'My Account',
      learningResources: 'Learning Resources',
      pricing: 'Pricing / Fees',
      policies: 'Terms & Privacy'
    })

useHead(() => ({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale.value
  }
}))

useSeoMeta({
  title: () => copy.value.title,
  description: () => copy.value.description,
  ogTitle: () => copy.value.title,
  ogDescription: () => copy.value.description,
  twitterCard: 'summary_large_image'
})

const navItems = computed(() => copy.value.nav)

const route = useRoute()
const showFooter = computed(() => !route.path.startsWith('/auth'))
</script>

<template>
  <UApp>
    <header class="sticky top-0 z-50 border-b border-default bg-default/90 backdrop-blur">
      <UContainer class="flex h-16 items-center justify-between gap-5">
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        >
          <AppLogo class="size-9" />
          <ShinyText
            text="TeachThrough"
            class-name="text-xl font-bold [text-shadow:0_1px_10px_rgba(14,165,233,0.18)]"
            color="#0f172a"
            shine-color="#0ea5e9"
            :speed="1.8"
            :spread="95"
          />
        </NuxtLink>

        <nav class="hidden items-center gap-1 lg:flex">
          <UButton
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :label="item.label"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </nav>

        <div class="flex items-center gap-2">
          <UButton
            :label="isThai ? 'EN' : 'TH'"
            icon="i-lucide-languages"
            color="neutral"
            variant="outline"
            size="sm"
            aria-label="Switch language"
            @click="toggleLocale"
          />
          <UButton
            to="/auth/sign-in"
            :label="copy.signIn"
            color="neutral"
            variant="ghost"
            class="hidden sm:inline-flex"
          />
          <UButton
            to="/auth/sign-up"
            :label="copy.signUp"
            trailing-icon="i-lucide-arrow-right"
            class="hidden sm:inline-flex"
          />
          <UDropdownMenu
            :items="navItems.map(item => ({ ...item, icon: item.to === '/' ? 'i-lucide-home' : 'i-lucide-circle' }))"
            :content="{ align: 'end' }"
            class="lg:hidden"
          >
            <UButton
              icon="i-lucide-menu"
              aria-label="Open navigation"
              color="neutral"
              variant="ghost"
            />
          </UDropdownMenu>
        </div>
      </UContainer>
    </header>

    <UMain class="bg-elevated">
      <NuxtPage />
    </UMain>

    <footer
      v-if="showFooter"
      class="border-t border-default bg-muted"
    >
      <UContainer class="grid gap-8 py-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div class="flex items-center gap-3">
            <AppLogo class="size-9" />
            <span class="text-lg font-semibold text-highlighted">{{ copy.footerBrand }}</span>
          </div>
          <p class="mt-4 max-w-sm text-sm leading-6 text-muted">
            {{ copy.footerDescription }}
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-3">
          <div>
            <p class="font-semibold text-highlighted">
              {{ copy.platform }}
            </p>
            <div class="mt-3 grid gap-2 text-sm text-muted">
              <NuxtLink to="/find-tutors">{{ navItems[1]?.label }}</NuxtLink>
              <NuxtLink to="/become-a-tutor">{{ navItems[2]?.label }}</NuxtLink>
              <NuxtLink to="/account">{{ copy.myAccount }}</NuxtLink>
            </div>
          </div>
          <div>
            <p class="font-semibold text-highlighted">
              {{ copy.company }}
            </p>
            <div class="mt-3 grid gap-2 text-sm text-muted">
              <NuxtLink to="/about">{{ navItems[3]?.label }}</NuxtLink>
              <NuxtLink to="/contact">{{ navItems[4]?.label }}</NuxtLink>
              <NuxtLink to="/blog">{{ copy.learningResources }}</NuxtLink>
            </div>
          </div>
          <div>
            <p class="font-semibold text-highlighted">
              {{ copy.trust }}
            </p>
            <div class="mt-3 grid gap-2 text-sm text-muted">
              <NuxtLink to="/pricing">{{ copy.pricing }}</NuxtLink>
              <NuxtLink to="/policies">{{ copy.policies }}</NuxtLink>
              <span>support@tutorly.test</span>
            </div>
          </div>
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>
