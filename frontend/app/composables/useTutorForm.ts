import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import { z } from 'zod'

export type TutorDocumentKey = 'additionalEducation' | 'idCard' | 'transcript' | 'portfolio'
export type CalendarSelection = DateValue | DateValue[] | { start: DateValue | undefined, end: DateValue | undefined } | null | undefined
export type TutorFormField = keyof TutorFormState

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
  subjects: string[]
  experience: string
  teachingLocation: string
  hourlyRate: string
  teachingMode: string
  languages: string[]
  idCardFileName: string
  transcriptFileName: string
  portfolioFileName: string
  termsAccepted: boolean
}

const requiredText = (message: string) => z.string().trim().min(1, message)
const gpaText = (message: string) => requiredText(message)
  .refine((value) => /^\d+(\.\d{1,2})$/.test(value), 'Enter a GPA like 3.50')
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
  subjects: z.array(z.string()).min(1, 'Select at least one subject'),
  experience: z.string().trim().min(10, 'Add at least 10 characters about your experience'),
  teachingLocation: requiredText('Preferred teaching location is required'),
  hourlyRate: requiredText('Hourly rate is required').refine((value) => {
    const numericValue = Number(value)
    return Number.isFinite(numericValue) && numericValue > 0
  }, 'Hourly rate must be greater than 0'),
  teachingMode: requiredText('Teaching mode is required'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  idCardFileName: requiredText('ID card or student card is required'),
  transcriptFileName: z.string(),
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
})

export const tutorStepFields: Record<number, TutorFormField[]> = {
  1: ['email', 'password', 'confirmPassword'],
  2: ['firstName', 'lastName', 'nickname', 'gender', 'birthDate', 'mobile', 'lineId', 'province', 'address', 'subDistrict', 'district'],
  3: ['highSchoolName', 'highSchoolMajor', 'highSchoolGpa', 'degree', 'university', 'faculty', 'major', 'year', 'universityGpa', 'additionalEducationName', 'additionalEducationFileName'],
  4: ['subjects', 'experience', 'teachingLocation', 'hourlyRate', 'teachingMode', 'languages'],
  5: ['idCardFileName', 'termsAccepted']
}

export const useTutorForm = () => {
  const { pick } = useAppLocale()
  const tutorFormState = reactive<TutorFormState>({
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
    subjects: [],
    experience: '',
    teachingLocation: '',
    hourlyRate: '',
    teachingMode: '',
    languages: [],
    idCardFileName: '',
    transcriptFileName: '',
    portfolioFileName: '',
    termsAccepted: false
  })

  const teachingModes = computed(() => pick(
    ['Online', 'Offline', 'Online & Offline'],
    ['Online', 'Offline', 'Online & Offline']
  ))
  const genders = computed(() => pick(
    ['Male', 'Female', 'Prefer not to say'],
    ['Male', 'Female', 'Prefer not to say']
  ))
  const provinces = computed(() => pick(
    ['Bangkok', 'Nonthaburi', 'Pathum Thani', 'Samut Prakan', 'Chiang Mai'],
    ['Bangkok', 'Nonthaburi', 'Pathum Thani', 'Samut Prakan', 'Chiang Mai']
  ))
  const degreeOptions = computed(() => pick(
    ['High School', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree'],
    ['High School', 'Bachelor Degree', 'Master Degree', 'Doctoral Degree']
  ))
  const yearOptions = computed(() => pick(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated'],
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduated']
  ))
  const subjectOptions = computed(() => pick(
    ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Thai', 'Social Studies'],
    ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Thai', 'Social Studies']
  ))
  const languageOptions = computed(() => pick(
    ['English', 'Chinese', 'Japanese', 'Korean'],
    ['English', 'Chinese', 'Japanese', 'Korean']
  ))

  const hasAdditionalEducation = toRef(tutorFormState, 'hasAdditionalEducation')
  const selectedSubjects = toRef(tutorFormState, 'subjects')
  const selectedLanguages = toRef(tutorFormState, 'languages')
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
    toggleFromList(selectedSubjects, subject)
  }

  const toggleLanguage = (language: string) => {
    toggleFromList(selectedLanguages, language)
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
    languageOptions,
    hasAdditionalEducation,
    selectedSubjects,
    selectedLanguages,
    birthDate,
    isBirthDateOpen,
    additionalEducationFileName,
    idCardFileName,
    transcriptFileName,
    portfolioFileName,
    toggleSubject,
    toggleLanguage,
    handleNamedFileChange,
    birthDateLabel,
    handleBirthDateChange
  }
}
