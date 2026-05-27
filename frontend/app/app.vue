<script setup lang="ts">
import ShinyText from '~/assets/animations/Text Animations/Shiny_Text.vue'

const { locale, isThai, toggleLocale } = useAppLocale()

const copy = computed(() => isThai.value
  ? {
      title: 'TeachThrough - ค้นหาติวเตอร์ที่ไว้ใจได้',
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
      footerBrand: 'TeachThrough',
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
      title: 'TeachThrough - Find trusted tutors',
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
      footerBrand: 'TeachThrough',
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

const handleLanguageToggle = () => {
  toggleLocale()
}

const route = useRoute()
const showFooter = computed(() => !route.path.startsWith('/auth'))
</script>

<template>
  <UApp>
    <header class="sticky top-0 z-50 border-b border-default bg-default/90 backdrop-blur">
      <UContainer class="flex h-16 items-center justify-between gap-5">
        <NuxtLink
          v-once
          to="/"
          class="flex items-center gap-3"
          style="view-transition-name: brand-logo;"
        >
          <AppLogo class="size-9" />
          <ShinyText
            text="TeachThrough"
            class-name="text-xl font-bold font-['Plus_Jakarta_Sans'] [text-shadow:0_1px_10px_rgba(14,165,233,0.18)]"
            color="#0f172a"
            shine-color="#0ea5e9"
            :speed="3.5"
            :spread="95"
          />
        </NuxtLink>

        <nav class="hidden items-center gap-2 lg:flex">
          <UButton
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            color="neutral"
            variant="ghost"
            size="md"
            class="px-4 text-[15px] font-bold tracking-tight transition-all hover:scale-105 active:scale-95"
          >
            <BlurText
              :key="locale"
              :text="item.label"
              :animate-on-scroll="false"
              :duration="0.4"
              :stagger="0.02"
              blur="4px"
              :y="10"
            />
          </UButton>
        </nav>

        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="outline"
            size="md"
            class="lang-toggle-btn w-[72px] rounded-full border-border-muted font-black tracking-widest shadow-premium-sm transition-all hover:border-brand-300 hover:bg-brand-50"
            aria-label="Switch language"
            @click="handleLanguageToggle"
          >
            <template #leading>
              <UIcon
                name="i-lucide-languages"
                class="size-4 text-brand-500"
              />
            </template>
            <BlurText
              :key="locale"
              :text="isThai ? 'TH' : 'EN'"
              :animate-on-scroll="false"
              :duration="0.4"
              :stagger="0.02"
              blur="4px"
              :y="5"
              class-name="min-w-[24px] text-center"
            />
          </UButton>

          <UButton
            to="/auth/sign-in"
            color="neutral"
            variant="ghost"
            class="hidden font-bold sm:inline-flex"
          >
            <BlurText
              :key="locale"
              :text="copy.signIn"
              :animate-on-scroll="false"
              :duration="0.4"
              :stagger="0.02"
              blur="4px"
              :y="5"
            />
          </UButton>
          <UButton
            to="/auth/sign-up"
            trailing-icon="i-lucide-arrow-right"
            class="hidden font-bold sm:inline-flex shadow-premium-sm hover:shadow-premium"
          >
            <BlurText
              :key="locale"
              :text="copy.signUp"
              :animate-on-scroll="false"
              :duration="0.4"
              :stagger="0.02"
              blur="4px"
              :y="5"
            />
          </UButton>
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
              <BlurText
                :key="locale"
                :text="copy.platform"
                :animate-on-scroll="false"
                blur="2px"
                :duration="0.5"
              />
            </p>
            <div class="mt-3 grid gap-2 text-sm text-muted">
              <NuxtLink to="/find-tutors">{{ navItems[1]?.label }}</NuxtLink>
              <NuxtLink to="/become-a-tutor">{{ navItems[2]?.label }}</NuxtLink>
              <NuxtLink to="/account">{{ copy.myAccount }}</NuxtLink>
            </div>
          </div>
          <div>
            <p class="font-semibold text-highlighted">
              <BlurText
                :key="locale"
                :text="copy.company"
                :animate-on-scroll="false"
                blur="2px"
                :duration="0.5"
              />
            </p>
            <div class="mt-3 grid gap-2 text-sm text-muted">
              <NuxtLink to="/about">{{ navItems[3]?.label }}</NuxtLink>
              <NuxtLink to="/contact">{{ navItems[4]?.label }}</NuxtLink>
              <NuxtLink to="/blog">{{ copy.learningResources }}</NuxtLink>
            </div>
          </div>
          <div>
            <p class="font-semibold text-highlighted">
              <BlurText
                :key="locale"
                :text="copy.trust"
                :animate-on-scroll="false"
                blur="2px"
                :duration="0.5"
              />
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
