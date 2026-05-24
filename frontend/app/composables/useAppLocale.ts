export const useAppLocale = () => {
  const locale = useState<'en' | 'th'>('locale', () => 'en')
  const isThai = computed(() => locale.value === 'th')

  const tr = (en: string, th: string) => isThai.value ? th : en
  const pick = <T>(en: T, th: T) => isThai.value ? th : en
  const toggleLocale = () => {
    locale.value = isThai.value ? 'en' : 'th'
  }

  return {
    locale,
    isThai,
    tr,
    pick,
    toggleLocale
  }
}
