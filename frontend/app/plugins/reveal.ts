import type { DirectiveBinding } from 'vue'

type RevealOptions = {
  delay?: number
  once?: boolean
}

const observers = new WeakMap<Element, IntersectionObserver>()

function getOptions(binding: DirectiveBinding<number | RevealOptions | undefined>): RevealOptions {
  if (typeof binding.value === 'number') {
    return { delay: binding.value, once: true }
  }

  return {
    delay: binding.value?.delay ?? 0,
    once: binding.value?.once ?? true
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    beforeMount(el: HTMLElement, binding) {
      const options = getOptions(binding)

      el.classList.add('scroll-reveal')
      el.style.setProperty('--reveal-delay', `${options.delay}ms`)
    },

    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || !('IntersectionObserver' in window)) {
        el.classList.add('is-visible')
        return
      }

      const options = getOptions(binding)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            if (!options.once) {
              el.classList.remove('is-visible')
            }

            return
          }

          el.classList.add('is-visible')

          if (options.once) {
            observer.unobserve(el)
            observers.delete(el)
          }
        },
        {
          rootMargin: '0px 0px -8% 0px',
          threshold: 0.18
        }
      )

      observer.observe(el)
      observers.set(el, observer)
    },

    unmounted(el: HTMLElement) {
      const observer = observers.get(el)

      if (observer) {
        observer.disconnect()
        observers.delete(el)
      }
    }
  })
})
