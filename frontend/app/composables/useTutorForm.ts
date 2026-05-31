import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import { z } from 'zod'
import {
  createEmptyTutorFormState,
  createTutorDraftSnapshot,
  learnerLevelOptions,
  resetTutorDraftState,
  requiresOnsiteDetails,
  restoreTutorDraftSnapshot,
  teachingFormatOptions,
  validateSubjectLearnerLevelPairs
} from '~/utils/tutorOnboarding'

export type TutorDocumentKey = 'additionalEducation' | 'idCard' | 'transcript' | 'portfolio'
export type CalendarSelection = DateValue | DateValue[] | { start: DateValue | undefined, end: DateValue | undefined } | null | undefined
export type TutorFormField = keyof TutorFormState

export interface SubjectLearnerLevelPair {
  subject: string
  learnerLevels: string[]
}

export interface TutorFormState {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  nickname: string
  gender: string
  birthDate: string
  mobile: string
  lineId: string
  province: string
  address: string
  subDistrict: string
  district: string
  highSchoolName: string
  highSchoolMajor: string
  highSchoolGpa: string
  degree: string
  university: string
  faculty: string
  major: string
  year: string
  universityGpa: string
  hasAdditionalEducation: boolean
  additionalEducationName: string
  additionalEducationFileName: string
  subjectLevels: SubjectLearnerLevelPair[]
  additionalSubject: string
  experienceYears: string
  teachingFormats: string[]
  teachingOutcomes: string
  teachingLocation: string
  onsiteProvince: string
  onsiteArea: string
  onsiteNote: string
  hourlyRate: string
  pricingNote: string
  teachingMode: string
  languages: string[]
  idCardFileName: string
  transcriptFileName: string
  portfolioFileName: string
  termsAccepted: boolean
}

const requiredText = (message: string) => z.string().trim().min(1, message)
const subjectLearnerLevelSchema = z.object({
  subject: requiredText('Subject is required'),
  learnerLevels: z.array(z.string()).min(1, 'Select at least one learner level')
})
const gpaText = (message: string) => requiredText(message)
  .refine(value => /^\d+(\.\d{1,2})$/.test(value), 'Enter a GPA like 3.50')
  .refine((value) => {
    const numericValue = Number(value)
    return Number.isFinite(numericValue) && numericValue >= 0 && numericValue <= 4
  }, 'Enter a GPA between 0 and 4')

export const tutorFormSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
  firstName: requiredText('First name is required'),
  lastName: requiredText('Last name is required'),
  nickname: requiredText('Nickname is required'),
  gender: requiredText('Gender is required'),
  birthDate: requiredText('Birth date is required'),
  mobile: z.string().trim().min(9, 'Mobile number is required'),
  lineId: requiredText('Line ID is required'),
  province: requiredText('Province is required'),
  address: requiredText('Address is required'),
  subDistrict: requiredText('Sub-district is required'),
  district: requiredText('District is required'),
  highSchoolName: requiredText('High school name is required'),
  highSchoolMajor: requiredText('High school major is required'),
  highSchoolGpa: gpaText('High school GPA is required'),
  degree: requiredText('University degree is required'),
  university: requiredText('University is required'),
  faculty: requiredText('Faculty is required'),
  major: requiredText('Major is required'),
  year: requiredText('Year is required'),
  universityGpa: gpaText('University GPA is required'),
  hasAdditionalEducation: z.boolean(),
  additionalEducationName: z.string(),
  additionalEducationFileName: z.string(),
  subjectLevels: z.array(subjectLearnerLevelSchema).superRefine((pairs, ctx) => {
    const result = validateSubjectLearnerLevelPairs(pairs)
    if (!result.success) {
      ctx.addIssue({
        code: 'custom',
        message: result.message
      })
    }
  }),
  additionalSubject: z.string(),
  experienceYears: requiredText('Teaching experience duration is required'),
  teachingFormats: z.array(z.string()).min(1, 'Select at least one teaching format'),
  teachingOutcomes: z.string().trim().min(10, 'Add a short teaching outcome example'),
  teachingLocation: requiredText('Preferred teaching location is required'),
  onsiteProvince: z.string(),
  onsiteArea: z.string(),
  onsiteNote: z.string(),
  hourlyRate: requiredText('Hourly rate is required').refine((value) => {
    const numericValue = Number(value)
    return Number.isFinite(numericValue) && numericValue > 0
  }, 'Hourly rate must be greater than 0'),
  pricingNote: z.string(),
  teachingMode: requiredText('Teaching mode is required'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  idCardFileName: requiredText('ID card or student card is required'),
  transcriptFileName: requiredText('Transcript or education proof is required'),
  portfolioFileName: z.string(),
  termsAccepted: z.boolean().refine(Boolean, 'You must accept the tutor terms')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
}).refine(data => !data.hasAdditionalEducation || data.additionalEducationName.trim().length > 0, {
  message: 'Certificate or qualification name is required',
  path: ['additionalEducationName']
}).refine(data => !data.hasAdditionalEducation || data.additionalEducationFileName.trim().length > 0, {
  message: 'Supporting document is required',
  path: ['additionalEducationFileName']
}).refine(data => !requiresOnsiteDetails(data.teachingMode) || data.onsiteProvince.trim().length > 0, {
  message: 'Onsite province is required',
  path: ['onsiteProvince']
}).refine(data => !requiresOnsiteDetails(data.teachingMode) || data.onsiteArea.trim().length > 0, {
  message: 'Onsite area is required',
  path: ['onsiteArea']
})

export const tutorStepFields: Record<number, TutorFormField[]> = {
  1: ['email', 'password', 'confirmPassword'],
  2: ['firstName', 'lastName', 'nickname', 'gender', 'birthDate', 'mobile', 'lineId', 'province', 'address', 'subDistrict', 'district'],
  3: ['highSchoolName', 'highSchoolMajor', 'highSchoolGpa', 'degree', 'university', 'faculty', 'major', 'year', 'universityGpa', 'additionalEducationName', 'additionalEducationFileName'],
  4: ['subjectLevels', 'experienceYears', 'teachingFormats', 'teachingOutcomes', 'teachingLocation', 'onsiteProvince', 'onsiteArea', 'hourlyRate', 'teachingMode', 'languages'],
  5: ['idCardFileName', 'transcriptFileName', 'termsAccepted'],
  6: []
}

const tutorDraftStorageKey = 'teachthrough:tutor-registration-draft'

export const useTutorForm = () => {
  const { pick } = useAppLocale()
  const tutorFormState = reactive<TutorFormState>(createEmptyTutorFormState())
  const restoredTutorDraft = ref(false)

  const teachingModes = computed(() => pick(
    ['Online', 'Offline', 'Online & Offline'],
    ['ออนไลน์', 'นอกสถานที่', 'ออนไลน์และนอกสถานที่']
  ))
  const genders = computed(() => pick(
    ['Male', 'Female', 'Prefer not to say'],
    ['ชาย', 'หญิง', 'ไม่ระบุ']
  ))
  const provinces = computed(() => pick(
    ['Bangkok', 'Nonthaburi', 'Pathum Thani', 'Samut Prakan', 'Chiang Mai'],
    ['กรุงเทพฯ', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'เชียงใหม่']
  ))
  const degreeOptions = computed(() => pick(
    ['High School', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree'],
    ['มัธยมศึกษา', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก']
  ))
  const yearOptions = computed(() => pick(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated'],
    ['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4', 'จบการศึกษาแล้ว']
  ))
  const subjectOptions = computed(() => pick(
    ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Thai', 'Social Studies'],
    ['คณิตศาสตร์', 'ภาษาอังกฤษ', 'วิทยาศาสตร์', 'ฟิสิกส์', 'เคมี', 'ชีววิทยา', 'ภาษาไทย', 'สังคมศึกษา']
  ))
  const learnerLevels = computed(() => pick(
    learnerLevelOptions,
    ['ประถมศึกษา', 'มัธยมต้น', 'มัธยมปลาย', 'มหาวิทยาลัย', 'ผู้ใหญ่']
  ))
  const teachingFormats = computed(() => pick(
    teachingFormatOptions,
    ['ตัวต่อตัว', 'กลุ่มเล็ก', 'ออนไลน์', 'สถาบันกวดวิชา', 'โรงเรียน']
  ))
  const languageOptions = computed(() => pick(
    ['English', 'Chinese', 'Japanese', 'Korean'],
    ['อังกฤษ', 'จีน', 'ญี่ปุ่น', 'เกาหลี']
  ))

  const hasAdditionalEducation = toRef(tutorFormState, 'hasAdditionalEducation')
  const selectedLanguages = toRef(tutorFormState, 'languages')
  const selectedTeachingFormats = toRef(tutorFormState, 'teachingFormats')
  const birthDate = shallowRef<DateValue>()
  const isBirthDateOpen = ref(false)
  const additionalEducationFileName = toRef(tutorFormState, 'additionalEducationFileName')
  const idCardFileName = toRef(tutorFormState, 'idCardFileName')
  const transcriptFileName = toRef(tutorFormState, 'transcriptFileName')
  const portfolioFileName = toRef(tutorFormState, 'portfolioFileName')

  const documentFileTargets: Record<TutorDocumentKey, Ref<string>> = {
    additionalEducation: additionalEducationFileName,
    idCard: idCardFileName,
    transcript: transcriptFileName,
    portfolio: portfolioFileName
  }

  const toggleFromList = (list: Ref<string[]>, value: string) => {
    list.value = list.value.includes(value)
      ? list.value.filter(item => item !== value)
      : [...list.value, value]
  }

  const toggleSubject = (subject: string) => {
    const existing = tutorFormState.subjectLevels.find(pair => pair.subject === subject)
    tutorFormState.subjectLevels = existing
      ? tutorFormState.subjectLevels.filter(pair => pair.subject !== subject)
      : [...tutorFormState.subjectLevels, { subject, learnerLevels: [] }]
  }

  const toggleSubjectLearnerLevel = (subject: string, learnerLevel: string) => {
    tutorFormState.subjectLevels = tutorFormState.subjectLevels.map((pair) => {
      if (pair.subject !== subject) return pair

      const learnerLevels = pair.learnerLevels.includes(learnerLevel)
        ? pair.learnerLevels.filter(level => level !== learnerLevel)
        : [...pair.learnerLevels, learnerLevel]

      return { ...pair, learnerLevels }
    })
  }

  const addAdditionalSubject = () => {
    const subject = tutorFormState.additionalSubject.trim()
    if (!subject || tutorFormState.subjectLevels.some(pair => pair.subject === subject)) return

    tutorFormState.subjectLevels = [...tutorFormState.subjectLevels, { subject, learnerLevels: [] }]
    tutorFormState.additionalSubject = ''
  }

  const toggleLanguage = (language: string) => {
    toggleFromList(selectedLanguages, language)
  }

  const toggleTeachingFormat = (format: string) => {
    toggleFromList(selectedTeachingFormats, format)
  }

  const handleNamedFileChange = (event: Event, target: TutorDocumentKey) => {
    const input = event.target as HTMLInputElement
    documentFileTargets[target].value = input.files?.[0]?.name || ''
  }

  const birthDateLabel = computed(() => {
    if (!birthDate.value) return ''

    const month = String(birthDate.value.month).padStart(2, '0')
    const day = String(birthDate.value.day).padStart(2, '0')

    return `${birthDate.value.year}-${month}-${day}`
  })

  const handleBirthDateChange = (date: CalendarSelection) => {
    if (!date || Array.isArray(date) || !('day' in date)) return

    birthDate.value = date
    tutorFormState.birthDate = birthDateLabel.value
    isBirthDateOpen.value = false
  }

  const clearTutorDraft = () => {
    if (import.meta.client) {
      sessionStorage.removeItem(tutorDraftStorageKey)
    }
    Object.assign(tutorFormState, resetTutorDraftState())
    birthDate.value = undefined
    isBirthDateOpen.value = false
    restoredTutorDraft.value = false
  }

  if (import.meta.client) {
    const savedDraft = sessionStorage.getItem(tutorDraftStorageKey)
    if (savedDraft) {
      try {
        Object.assign(
          tutorFormState,
          restoreTutorDraftSnapshot(createEmptyTutorFormState(), JSON.parse(savedDraft))
        )
        restoredTutorDraft.value = true
      } catch {
        sessionStorage.removeItem(tutorDraftStorageKey)
      }
    }

    watch(tutorFormState, (state) => {
      sessionStorage.setItem(tutorDraftStorageKey, JSON.stringify(createTutorDraftSnapshot(state)))
    }, { deep: true })
  }

  return {
    tutorFormState,
    tutorFormSchema,
    tutorStepFields,
    teachingModes,
    genders,
    provinces,
    degreeOptions,
    yearOptions,
    subjectOptions,
    learnerLevels,
    teachingFormats,
    languageOptions,
    hasAdditionalEducation,
    selectedLanguages,
    selectedTeachingFormats,
    birthDate,
    isBirthDateOpen,
    additionalEducationFileName,
    idCardFileName,
    transcriptFileName,
    portfolioFileName,
    toggleSubject,
    toggleSubjectLearnerLevel,
    addAdditionalSubject,
    toggleLanguage,
    toggleTeachingFormat,
    handleNamedFileChange,
    birthDateLabel,
    handleBirthDateChange,
    restoredTutorDraft,
    clearTutorDraft
  }
}
