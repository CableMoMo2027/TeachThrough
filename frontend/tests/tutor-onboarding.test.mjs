import test from 'node:test'
import assert from 'node:assert/strict'

import {
  authEntryContent,
  createEmptyTutorFormState,
  createReviewEditState,
  createTutorDraftSnapshot,
  createTutorStepNavigationState,
  getTutorStepNavigationDecision,
  restoreTutorDraftSnapshot,
  resetTutorDraftState,
  requiresOnsiteDetails,
  tutorNavigationLabels,
  tutorDocumentPrivacyMessage,
  tutorRecruitmentHeroContent,
  tutorRecruitmentHeroMedia,
  tutorRecruitmentSections,
  tutorRegistrationSuccessContent,
  tutorRegistrationSteps,
  validateSubjectLearnerLevelPairs
} from '../app/utils/tutorOnboarding.js'

test('Tutor Recruitment Page content routes every primary CTA to the Tutor Registration Form', () => {
  assert.deepEqual(
    tutorRecruitmentSections.map(section => section.id),
    ['hero', 'benefits', 'who-its-for', 'preparation', 'steps', 'faq', 'final-cta']
  )

  const primaryCtas = tutorRecruitmentSections
    .flatMap(section => section.ctas || [])
    .filter(cta => cta.intent === 'primary')

  assert.equal(primaryCtas.length, 3)
  assert.ok(primaryCtas.every(cta => cta.to === '/auth/sign-up2'))
  assert.ok(primaryCtas.every(cta => cta.label === 'Start tutor registration'))
})

test('Tutor Recruitment bilingual content keeps stable media and navigation contracts', () => {
  assert.deepEqual(tutorRecruitmentHeroMedia, {
    src: '/images/tutor-teaching.jpg',
    alt: 'Tutor teaching a learner'
  })

  assert.deepEqual(tutorNavigationLabels.findTutors, {
    en: 'Find Tutors',
    th: 'ค้นหาติวเตอร์'
  })
  assert.deepEqual(tutorNavigationLabels.startTutorRegistration, {
    en: 'Start tutor registration',
    th: 'เริ่มสมัครเป็นติวเตอร์'
  })
})

test('Tutor Recruitment hero content keeps Thai heading and CTA contracts explicit', () => {
  assert.deepEqual(tutorRecruitmentHeroContent.heading, {
    en: 'Turn your expertise into trusted learning.',
    th: 'เปลี่ยนความเชี่ยวชาญของคุณให้เป็นการเรียนรู้ที่ไว้วางใจได้'
  })
  assert.deepEqual(tutorRecruitmentHeroContent.eyebrow, tutorNavigationLabels.startTutorRegistration)
  assert.equal(tutorRecruitmentHeroContent.primaryCta.en, tutorNavigationLabels.startTutorRegistration.en)
  assert.equal(tutorRecruitmentHeroContent.primaryCta.th, tutorNavigationLabels.startTutorRegistration.th)
  assert.deepEqual(tutorRecruitmentHeroContent.media, tutorRecruitmentHeroMedia)
  assert.equal(tutorRecruitmentHeroContent.primaryCta.to, '/auth/sign-up2')
})

test('Tutor Recruitment Thai hero layout contract allows long localized heading to wrap', () => {
  assert.equal(tutorRecruitmentHeroContent.layout.desktop, 'copy-media')
  assert.equal(tutorRecruitmentHeroContent.layout.mobile, 'media-copy')
  assert.equal(tutorRecruitmentHeroContent.layout.headingWrap, 'anywhere')
  assert.equal(tutorRecruitmentHeroContent.layout.preventHorizontalOverflow, true)
  assert.equal(tutorRecruitmentHeroContent.heading.th.includes(' '), false)
})

test('Tutor Recruitment Thai hero reveal contract keeps long heading readable quickly', () => {
  assert.equal(tutorRecruitmentHeroContent.headingReveal.animateOnScroll, false)
  assert.ok(tutorRecruitmentHeroContent.headingReveal.duration <= 0.6)
  assert.ok(tutorRecruitmentHeroContent.headingReveal.stagger <= 0.012)
  assert.ok(tutorRecruitmentHeroContent.headingReveal.blur <= 6)
  assert.ok(tutorRecruitmentHeroContent.headingReveal.y <= 10)
})

test('Auth entry pages expose bilingual copy contracts for Sign In and Sign Up', () => {
  assert.equal(authEntryContent.signIn.title.en, 'Sign In')
  assert.equal(authEntryContent.signIn.title.th, 'เข้าสู่ระบบ')
  assert.equal(authEntryContent.signIn.fields.password.th, 'รหัสผ่าน')
  assert.equal(authEntryContent.signIn.actions.submit.th, 'เข้าสู่ระบบ')

  assert.equal(authEntryContent.signUp.title.en, 'Sign Up')
  assert.equal(authEntryContent.signUp.title.th, 'สมัครสมาชิก')
  assert.equal(authEntryContent.signUp.accountTypes.tutor.th, 'ติวเตอร์')
  assert.equal(authEntryContent.signUp.actions.submit.th, 'สร้างบัญชี')
})

test('Tutor Registration Form uses six short-labelled steps ending in Review', () => {
  assert.deepEqual(
    tutorRegistrationSteps.map(step => step.label),
    ['Account', 'Personal', 'Education', 'Teaching', 'Documents', 'Review']
  )
  assert.deepEqual(
    tutorRegistrationSteps.map(step => step.number),
    ['01', '02', '03', '04', '05', '06']
  )
})

test('session draft excludes password and file upload fields', () => {
  const state = {
    ...createEmptyTutorFormState(),
    email: 'tutor@example.com',
    password: 'secret-password',
    confirmPassword: 'secret-password',
    firstName: 'Mali',
    idCardFileName: 'id-card.pdf',
    transcriptFileName: 'transcript.pdf',
    portfolioFileName: 'portfolio.pdf',
    subjectLevels: [{ subject: 'Mathematics', learnerLevels: ['Secondary'] }]
  }

  const snapshot = createTutorDraftSnapshot(state)

  assert.equal(snapshot.email, 'tutor@example.com')
  assert.equal(snapshot.firstName, 'Mali')
  assert.equal(snapshot.password, undefined)
  assert.equal(snapshot.confirmPassword, undefined)
  assert.equal(snapshot.idCardFileName, undefined)
  assert.equal(snapshot.transcriptFileName, undefined)
  assert.equal(snapshot.portfolioFileName, undefined)

  const restored = restoreTutorDraftSnapshot(createEmptyTutorFormState(), snapshot)
  assert.equal(restored.email, 'tutor@example.com')
  assert.equal(restored.password, '')
  assert.equal(restored.idCardFileName, '')
  assert.deepEqual(restored.subjectLevels, [{ subject: 'Mathematics', learnerLevels: ['Secondary'] }])
})

test('clearing a Tutor Registration draft resets visible form state to empty values', () => {
  const dirtyState = {
    ...createEmptyTutorFormState(),
    email: 'tutor@example.com',
    firstName: 'Mali',
    termsAccepted: true,
    subjectLevels: [{ subject: 'Mathematics', learnerLevels: ['Secondary'] }],
    teachingFormats: ['One-on-one'],
    languages: ['English'],
    onsiteProvince: 'Bangkok',
    hourlyRate: '700'
  }

  assert.deepEqual(resetTutorDraftState(dirtyState), createEmptyTutorFormState())
})

test('subject-to-Learner-Level pairs require a subject and at least one level per subject', () => {
  assert.equal(
    validateSubjectLearnerLevelPairs([
      { subject: 'Mathematics', learnerLevels: ['Primary', 'Secondary'] },
      { subject: 'English', learnerLevels: ['Adult'] }
    ]).success,
    true
  )

  assert.equal(validateSubjectLearnerLevelPairs([]).success, false)
  assert.equal(validateSubjectLearnerLevelPairs([{ subject: 'Mathematics', learnerLevels: [] }]).success, false)
  assert.equal(validateSubjectLearnerLevelPairs([{ subject: '', learnerLevels: ['Primary'] }]).success, false)
})

test('Teaching Mode controls whether onsite details are required', () => {
  assert.equal(requiresOnsiteDetails('Online'), false)
  assert.equal(requiresOnsiteDetails('Offline'), true)
  assert.equal(requiresOnsiteDetails('Online & Offline'), true)
})

test('Tutor Registration step navigation allows backward movement but blocks unvalidated forward jumps', () => {
  let navigation = createTutorStepNavigationState()

  assert.deepEqual(getTutorStepNavigationDecision(navigation, 3), {
    allowed: false,
    reason: 'requires-validation',
    validationStep: 1
  })

  navigation = { ...navigation, currentStep: 2, highestValidatedStep: 1 }
  assert.deepEqual(getTutorStepNavigationDecision(navigation, 1), {
    allowed: true,
    reason: 'backward'
  })

  navigation = { ...navigation, currentStep: 2, highestValidatedStep: 3 }
  assert.deepEqual(getTutorStepNavigationDecision(navigation, 4), {
    allowed: true,
    reason: 'validated'
  })
})

test('Review Edit state returns directly to Review after a valid edited step', () => {
  const reviewEdit = createReviewEditState(6)
  reviewEdit.startEditing(3)

  assert.equal(reviewEdit.isEditingFromReview(3), true)
  assert.equal(reviewEdit.getNextStepAfterValidEdit(3), 6)

  reviewEdit.finishEditing()

  assert.equal(reviewEdit.isEditingFromReview(3), false)
  assert.equal(reviewEdit.getNextStepAfterValidEdit(3), 4)
})

test('Tutor onboarding content contracts communicate document privacy and Pending Review', () => {
  assert.match(tutorDocumentPrivacyMessage, /not appear on your public Tutor Profile/)
  assert.equal(tutorRegistrationSuccessContent.status, 'Pending Review')
  assert.equal(tutorRegistrationSuccessContent.title, 'Tutor Application submitted')
  assert.match(tutorRegistrationSuccessContent.body, /verification documents/)
  assert.doesNotMatch(JSON.stringify(tutorRegistrationSuccessContent), /dashboard/i)
})
