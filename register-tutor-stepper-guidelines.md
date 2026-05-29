# Register Tutor Stepper Form Guidelines for Codex

## Goal

Improve the `Register Tutor` sign-up page so that the form can collect detailed tutor information, including file uploads, without overflowing the card or feeling too long for users.

The current issue is that the registration form contains many fields. Even with a stepper, the UI can still look crowded or overflow outside the card. The goal is to split the form into clear steps, keep the card layout stable, and allow only the form content area to scroll when needed.

---

## Recommended Form Structure

Use a stepper-based registration flow with 5 main steps.

```text
1. Account
2. Personal Information
3. Education Background
4. Tutor Information
5. Upload Documents & Confirm
```

If the existing design already uses 7 steps, it can remain, but 5 steps is recommended because it feels less overwhelming.

---

## Step 1: Account

Purpose: Create the tutor account.

### Fields

| Field | Type | Required |
|---|---|---|
| Email Address | Text input / email input | Yes |
| Password | Password input | Yes |
| Confirm Password | Password input | Yes |

### Validation

- Email must be a valid email format.
- Password should be at least 8 characters.
- Confirm Password must match Password.

---

## Step 2: Personal Information

Purpose: Collect basic tutor profile and contact information.

### Fields

| Field | Type | Required |
|---|---|---|
| First Name | Text input | Yes |
| Last Name | Text input | Yes |
| Nickname | Text input | Yes |
| Gender | Select | Yes |
| Birth Date | Date picker | Yes |
| Mobile Number | Text input | Yes |
| Line ID | Text input | Yes |
| Address | Textarea | Yes |
| Sub-district | Text input | Yes |
| District | Text input | Yes |
| Province | Select | Yes |

### UX Notes

Split this step into smaller visual sections inside the form content:

```text
Basic Information
- First Name
- Last Name
- Nickname
- Gender
- Birth Date

Contact Information
- Mobile Number
- Line ID
- Address
- Sub-district
- District
- Province
```

Use a two-column grid on desktop and one column on mobile.

---

## Step 3: Education Background

Purpose: Collect high school and university education details.

### High School Fields

| Field | Type | Required |
|---|---|---|
| High School | Text input | Yes |
| High School Major | Select or text input | Yes |
| High School GPA | Number input | Yes |

### University Fields

| Field | Type | Required |
|---|---|---|
| University Degree | Select | Yes |
| University | Text input | Yes |
| Faculty | Text input | Yes |
| Major | Text input | Yes |
| Year | Select | Yes |
| University GPA | Number input | Yes |
| Additional Education | Radio: Yes / No | Yes |

### Conditional Fields

If `Additional Education` is `Yes`, show these fields:

| Field | Type | Required |
|---|---|---|
| Additional Certificate / Qualification Name | Text input | Optional |
| Additional Education Document | File upload | Optional |

This keeps the form clean by hiding unnecessary fields until the user needs them.

---

## Step 4: Tutor Information

Purpose: Collect teaching-related information.

### Fields

| Field | Type | Required |
|---|---|---|
| Teaching Subjects | Multi-select / tag input | Yes |
| Preferred Teaching Location | Textarea or select | Yes |
| Foreign Languages You Can Teach | Multi-select / textarea | Optional |
| Tutor Experience | Textarea | Yes |

### Teaching Subjects UX

Avoid using only a large textarea for teaching subjects. Use multi-select chips or tags instead.

Example subject chips:

```text
Mathematics
English
Science
Physics
Chemistry
Biology
Thai
Social Studies
```

Include an option such as:

```text
+ Add other subject
```

---

## Step 5: Upload Documents & Confirm

Purpose: Upload required documents and confirm registration.

### Fields

| Field | Type | Required |
|---|---|---|
| ID Card or Student Card | File upload | Yes |
| Transcript or Education Certificate | File upload | Optional |
| Certificate or Portfolio | File upload | Optional |
| Agree to Terms & Conditions | Checkbox | Yes |

### File Upload Requirements

Recommended upload rules:

```text
Supported file types: JPG, PNG, PDF
Maximum file size: 5MB per file
Maximum number of files: 1-3 files depending on the field
```

### File Upload UX

Each upload field should show:

```text
- Upload button or drag-and-drop area
- Accepted file types
- Maximum file size
- Uploaded file name
- File size
- Preview button if possible
- Remove button
```

Example uploaded file display:

```text
uploaded-id-card.pdf
1.2 MB
[Preview] [Remove]
```

### ID Card Example

Instead of placing a large example image directly inside the form, show a small card or collapsible section:

```text
View example of a valid document
```

When expanded, show notes:

```text
- The name and photo must be clear.
- The image must not be blurry.
- The document edges should not be cropped.
```

---

## Main Layout Rule: Prevent Stepper Content From Overflowing

The card should not have a fixed `height`. Use `max-height` and allow the form content area to scroll.

### Correct Structure

```text
Card
├── Header / Stepper
├── Scrollable Form Content
└── Action Buttons
```

The stepper and action buttons should stay visible. Only the middle form content should scroll.

---

## Recommended Tailwind Layout

Use this layout pattern for the register card:

```tsx
<div className="flex max-h-[calc(100vh-180px)] flex-col rounded-[32px] border bg-white p-6 shadow-sm">
  <div className="shrink-0">
    {/* Stepper header */}
  </div>

  <div className="mt-6 flex-1 overflow-y-auto pr-2">
    {/* Current step form fields */}
  </div>

  <div className="mt-6 flex shrink-0 justify-between">
    <button type="button">Back</button>
    <button type="button">Next</button>
  </div>
</div>
```

### Important Notes

Do not use this:

```css
height: 520px;
```

Use this instead:

```css
min-height: 520px;
height: auto;
```

Or use this if the card should stay within the viewport:

```css
max-height: calc(100vh - 180px);
```

---

## CSS Version

If not using Tailwind, use this structure:

```css
.register-card {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 180px);
  border-radius: 32px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
}

.stepper-header {
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  margin-top: 24px;
}

.step-actions {
  flex-shrink: 0;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}
```

---

## Form Grid Recommendation

Use a responsive grid for input fields.

### Tailwind Example

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <input placeholder="First name *" />
  <input placeholder="Last name *" />
  <input placeholder="Nickname *" />
  <select>
    <option>Gender *</option>
  </select>
</div>
```

For full-width fields:

```tsx
<div className="md:col-span-2">
  <textarea placeholder="Address *" />
</div>
```

---

## Button Behavior

Use this behavior:

```text
Step 1-4: Show Back and Next buttons
Step 5: Show Back and Register buttons
```

Disable the `Next` button if required fields in the current step are incomplete.

---

## Progress Text

Add a short progress label to reduce user anxiety.

Example:

```text
Step 2 of 5
Personal Information
```

Also show a progress bar if possible:

```text
40% completed
```

---

## Microcopy

Add short helper text near the top of the form:

```text
This registration takes about 5-7 minutes. You can review your information before submitting.
```

For Thai UI:

```text
ใช้เวลาสมัครประมาณ 5-7 นาที และสามารถตรวจสอบข้อมูลก่อนส่งได้
```

---

## Recommended State Shape

Example form state:

```ts
type TutorRegisterForm = {
  account: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  personal: {
    firstName: string;
    lastName: string;
    nickname: string;
    gender: string;
    birthDate: string;
    mobileNumber: string;
    lineId: string;
    address: string;
    subDistrict: string;
    district: string;
    province: string;
  };
  education: {
    highSchool: string;
    highSchoolMajor: string;
    highSchoolGpa: string;
    universityDegree: string;
    university: string;
    faculty: string;
    major: string;
    year: string;
    universityGpa: string;
    hasAdditionalEducation: boolean;
    additionalEducationName?: string;
    additionalEducationDocument?: File | null;
  };
  tutor: {
    teachingSubjects: string[];
    preferredTeachingLocation: string;
    foreignLanguages: string[];
    tutorExperience: string;
  };
  documents: {
    idCardOrStudentCard: File | null;
    transcript: File | null;
    certificateOrPortfolio: File | null;
    acceptTerms: boolean;
  };
};
```

---

## File Upload Component Requirements

The file upload component should support:

```text
- Click to upload
- Drag and drop if possible
- File type validation
- File size validation
- Preview uploaded file name
- Remove uploaded file
- Error message for invalid file
```

### Example Validation Rules

```ts
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
];
```

---

## Do and Don't

### Do

- Keep the card height controlled with `max-height`.
- Make only the form content area scrollable.
- Keep Back and Next buttons visible.
- Use conditional fields to reduce visual clutter.
- Use file previews after uploading.
- Use responsive grids.
- Use helper text for complicated fields.

### Don't

- Do not put every field on one long page.
- Do not use a fixed card height with no scroll area.
- Do not make the whole page scroll inside a small stepper card if only the form content needs scrolling.
- Do not show optional fields all at once.
- Do not show a large ID card example image directly in the main form area.

---

## Final Implementation Summary

The register tutor page should use a centered card with a stepper at the top, a scrollable form content area in the middle, and fixed Back / Next / Register buttons at the bottom.

Recommended final structure:

```text
Register Tutor Card
├── Title: Sign Up
├── Role Tabs: Parent / Student / Tutor
├── Stepper Progress
├── Scrollable Current Step Form
└── Action Buttons
```

This will keep the UI clean, prevent overflow, and make a long tutor registration form feel easier to complete.
