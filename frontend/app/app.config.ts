export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      secondary: 'trust',
      tertiary: 'accent',
      neutral: 'slate'
    },
    button: {
      slots: {
        base: 'rounded-full font-semibold transition-colors',
        label: 'truncate'
      },
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md'
      }
    },
    card: {
      slots: {
        root: 'rounded-lg shadow-sm ring-1 ring-default',
        header: 'font-semibold',
        body: 'text-sm',
        footer: 'text-sm text-muted'
      }
    },
    input: {
      slots: {
        root: 'rounded-full',
        base: 'bg-elevated'
      }
    },
    textarea: {
      slots: {
        root: 'rounded-2xl',
        base: 'bg-elevated'
      }
    },
    select: {
      slots: {
        base: 'bg-elevated'
      }
    },
    badge: {
      slots: {
        base: 'font-medium'
      }
    }
  }
})
