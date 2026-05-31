export const tutorRegistrationPath = '/auth/sign-up2'
export const tutorRegistrationCtaLabel = 'Start tutor registration'
export const tutorRecruitmentHeroMedia = {
  src: '/images/tutor-teaching.jpg',
  alt: 'Tutor teaching a learner'
}

export const tutorNavigationLabels = {
  findTutors: {
    en: 'Find Tutors',
    th: 'ค้นหาติวเตอร์'
  },
  startTutorRegistration: {
    en: 'Start tutor registration',
    th: 'เริ่มสมัครเป็นติวเตอร์'
  }
}

export const tutorRecruitmentHeroContent = {
  eyebrow: tutorNavigationLabels.startTutorRegistration,
  heading: {
    en: 'Turn your expertise into trusted learning.',
    th: 'ทำให้ความเชี่ยวชาญของคุณให้ เป็นการเรียนรู้ที่ที่น่าเชื่อถือ'
  },
  primaryCta: {
    ...tutorNavigationLabels.startTutorRegistration,
    to: tutorRegistrationPath
  },
  media: tutorRecruitmentHeroMedia,
  layout: {
    desktop: 'copy-media',
    mobile: 'media-copy',
    headingWrap: 'anywhere',
    preventHorizontalOverflow: true
  },
  headingReveal: {
    animateOnScroll: false,
    duration: 0.55,
    stagger: 0.012,
    blur: 6,
    y: 10
  }
}

export const authEntryContent = {
  signIn: {
    eyebrow: {
      en: 'Account access',
      th: 'เข้าสู่บัญชี'
    },
    title: {
      en: 'Sign In',
      th: 'เข้าสู่ระบบ'
    },
    description: {
      en: 'Access your student or tutor account.',
      th: 'เข้าสู่บัญชีนักเรียน ผู้ปกครอง หรือติวเตอร์ของคุณ'
    },
    fields: {
      email: {
        en: 'Email address',
        th: 'อีเมล'
      },
      password: {
        en: 'Password',
        th: 'รหัสผ่าน'
      }
    },
    placeholders: {
      email: {
        en: 'name@example.com',
        th: 'name@example.com'
      },
      password: {
        en: 'Enter your password',
        th: 'กรอกรหัสผ่าน'
      }
    },
    actions: {
      submit: {
        en: 'Sign In',
        th: 'เข้าสู่ระบบ'
      },
      remember: {
        en: 'Remember me',
        th: 'จดจำการเข้าสู่ระบบ'
      },
      forgotPassword: {
        en: 'Forgot Password?',
        th: 'ลืมรหัสผ่าน?'
      },
      createPrompt: {
        en: 'Don\'t have an account?',
        th: 'ยังไม่มีบัญชี?'
      },
      createAccount: {
        en: 'Create account',
        th: 'สมัครสมาชิก'
      },
      separator: {
        en: 'or continue with',
        th: 'หรือเข้าสู่ระบบด้วย'
      },
      showPassword: {
        en: 'Show password',
        th: 'แสดงรหัสผ่าน'
      },
      hidePassword: {
        en: 'Hide password',
        th: 'ซ่อนรหัสผ่าน'
      }
    }
  },
  signUp: {
    eyebrow: {
      en: 'Create account',
      th: 'สร้างบัญชี'
    },
    title: {
      en: 'Sign Up',
      th: 'สมัครสมาชิก'
    },
    description: {
      en: 'Create an account as a parent, student, or tutor.',
      th: 'สร้างบัญชีสำหรับผู้ปกครอง นักเรียน หรือติวเตอร์'
    },
    accountTypes: {
      parent: {
        en: 'Parent',
        th: 'ผู้ปกครอง'
      },
      student: {
        en: 'Student',
        th: 'นักเรียน'
      },
      tutor: {
        en: 'Tutor',
        th: 'ติวเตอร์'
      }
    },
    fields: {
      firstName: {
        en: 'First name',
        th: 'ชื่อ'
      },
      lastName: {
        en: 'Last name',
        th: 'นามสกุล'
      },
      email: {
        en: 'Email address',
        th: 'อีเมล'
      },
      password: {
        en: 'Password',
        th: 'รหัสผ่าน'
      },
      confirmPassword: {
        en: 'Confirm password',
        th: 'ยืนยันรหัสผ่าน'
      }
    },
    placeholders: {
      firstName: {
        en: 'Enter your first name',
        th: 'กรอกชื่อ'
      },
      lastName: {
        en: 'Enter your last name',
        th: 'กรอกนามสกุล'
      },
      email: {
        en: 'name@example.com',
        th: 'name@example.com'
      },
      password: {
        en: 'Create a password',
        th: 'ตั้งรหัสผ่าน'
      },
      confirmPassword: {
        en: 'Re-enter your password',
        th: 'กรอกรหัสผ่านอีกครั้ง'
      }
    },
    actions: {
      submit: {
        en: 'Create Account',
        th: 'สร้างบัญชี'
      },
      existingPrompt: {
        en: 'Already have an account?',
        th: 'มีบัญชีอยู่แล้ว?'
      },
      signIn: {
        en: 'Sign In',
        th: 'เข้าสู่ระบบ'
      },
      separator: {
        en: 'or continue with',
        th: 'หรือสมัครด้วย'
      },
      showPassword: {
        en: 'Show password',
        th: 'แสดงรหัสผ่าน'
      },
      hidePassword: {
        en: 'Hide password',
        th: 'ซ่อนรหัสผ่าน'
      }
    }
  }
}

export const tutorDocumentPrivacyMessage = 'These documents are used only to review your Tutor Application. They will not appear on your public Tutor Profile.'
export const tutorRegistrationSuccessContent = {
  status: 'Pending Review',
  title: 'Tutor Application submitted',
  body: 'Your Tutor Application is now Pending Review. Our team will review your submitted information and verification documents before your Tutor Profile can become public.'
}

export const tutorRegistrationSteps = [
  { number: '01', label: 'Account' },
  { number: '02', label: 'Personal' },
  { number: '03', label: 'Education' },
  { number: '04', label: 'Teaching' },
  { number: '05', label: 'Documents' },
  { number: '06', label: 'Review' }
]

export const learnerLevelOptions = [
  'Primary',
  'Lower secondary',
  'Upper secondary',
  'University',
  'Adult'
]

export const teachingFormatOptions = [
  'One-on-one',
  'Small group',
  'Online',
  'Learning center',
  'School'
]

export const tutorRecruitmentSections = [
  {
    id: 'hero',
    ctas: [{ intent: 'primary', label: tutorRegistrationCtaLabel, to: tutorRegistrationPath }]
  },
  { id: 'benefits' },
  { id: 'who-its-for' },
  {
    id: 'preparation',
    ctas: [{ intent: 'primary', label: tutorRegistrationCtaLabel, to: tutorRegistrationPath }]
  },
  { id: 'steps' },
  { id: 'faq' },
  {
    id: 'final-cta',
    ctas: [{ intent: 'primary', label: tutorRegistrationCtaLabel, to: tutorRegistrationPath }]
  }
]

export const createEmptyTutorFormState = () => ({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  nickname: '',
  gender: '',
  birthDate: '',
  mobile: '',
  lineId: '',
  province: '',
  address: '',
  subDistrict: '',
  district: '',
  highSchoolName: '',
  highSchoolMajor: '',
  highSchoolGpa: '',
  degree: '',
  university: '',
  faculty: '',
  major: '',
  year: '',
  universityGpa: '',
  hasAdditionalEducation: false,
  additionalEducationName: '',
  additionalEducationFileName: '',
  subjectLevels: [],
  additionalSubject: '',
  experienceYears: '',
  teachingFormats: [],
  teachingOutcomes: '',
  teachingLocation: '',
  onsiteProvince: '',
  onsiteArea: '',
  onsiteNote: '',
  hourlyRate: '',
  pricingNote: '',
  teachingMode: '',
  languages: [],
  idCardFileName: '',
  transcriptFileName: '',
  portfolioFileName: '',
  termsAccepted: false
})

const excludedDraftFields = new Set([
  'password',
  'confirmPassword',
  'additionalEducationFileName',
  'idCardFileName',
  'transcriptFileName',
  'portfolioFileName'
])

export const createTutorDraftSnapshot = (state) => {
  const snapshot = {}

  for (const [key, value] of Object.entries(state)) {
    if (!excludedDraftFields.has(key)) {
      snapshot[key] = value
    }
  }

  return snapshot
}

export const restoreTutorDraftSnapshot = (baseState, snapshot) => ({
  ...baseState,
  ...Object.fromEntries(
    Object.entries(snapshot || {}).filter(([key]) => !excludedDraftFields.has(key))
  )
})

export const resetTutorDraftState = () => createEmptyTutorFormState()

export const createTutorStepNavigationState = () => ({
  currentStep: 1,
  highestValidatedStep: 0,
  totalSteps: tutorRegistrationSteps.length
})

export const getTutorStepNavigationDecision = ({
  currentStep,
  highestValidatedStep,
  totalSteps = tutorRegistrationSteps.length
}, targetStep) => {
  if (targetStep < 1 || targetStep > totalSteps) {
    return { allowed: false, reason: 'out-of-range' }
  }

  if (targetStep <= currentStep) {
    return { allowed: true, reason: 'backward' }
  }

  if (targetStep <= highestValidatedStep + 1) {
    return { allowed: true, reason: 'validated' }
  }

  return {
    allowed: false,
    reason: 'requires-validation',
    validationStep: highestValidatedStep + 1
  }
}

export const createReviewEditState = (reviewStep = tutorRegistrationSteps.length) => {
  let editingStep = null

  return {
    startEditing(step) {
      editingStep = step
    },
    finishEditing() {
      editingStep = null
    },
    isEditingFromReview(step) {
      return editingStep === step
    },
    getNextStepAfterValidEdit(step) {
      return editingStep === step ? reviewStep : step + 1
    }
  }
}

export const validateSubjectLearnerLevelPairs = (pairs) => {
  if (!Array.isArray(pairs) || pairs.length === 0) {
    return { success: false, message: 'Select at least one subject and learner level' }
  }

  const invalidPair = pairs.find((pair) => {
    const subject = typeof pair?.subject === 'string' ? pair.subject.trim() : ''
    return !subject || !Array.isArray(pair?.learnerLevels) || pair.learnerLevels.length === 0
  })

  if (invalidPair) {
    return { success: false, message: 'Each subject needs at least one learner level' }
  }

  return { success: true }
}

export const requiresOnsiteDetails = teachingMode =>
  ['Offline', 'Online & Offline', 'นอกสถานที่', 'ออนไลน์และนอกสถานที่'].includes(teachingMode)
