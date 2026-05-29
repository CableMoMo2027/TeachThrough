<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date'

type CalendarModel = DateValue | DateValue[] | { start: DateValue | undefined, end: DateValue | undefined } | null | undefined
type TitlePosition = 'left' | 'center' | 'right'

const props = withDefaults(defineProps<{
  modelValue?: CalendarModel
  titlePosition?: TitlePosition
}>(), {
  modelValue: undefined,
  titlePosition: 'center'
})

const emit = defineEmits<{
  'update:modelValue': [value: CalendarModel]
}>()

const currentDate = today(getLocalTimeZone())
const calendarPlaceholder = shallowRef<DateValue>(currentDate)

const monthOptions = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 }
]

const yearOptions = computed(() => {
  const endYear = currentDate.year + 5
  return Array.from({ length: 91 }, (_, index) => endYear - index)
})

const selectedMonth = computed({
  get: () => calendarPlaceholder.value.month,
  set: value => updatePlaceholder(calendarPlaceholder.value.year, Number(value))
})

const selectedYear = computed({
  get: () => calendarPlaceholder.value.year,
  set: value => updatePlaceholder(Number(value), calendarPlaceholder.value.month)
})

const headingClass = computed(() => {
  if (props.titlePosition === 'left') return 'mr-auto text-left'
  if (props.titlePosition === 'right') return 'ml-auto text-right'
  return 'mx-auto text-center'
})

const calendarUi = computed(() => ({
  heading: headingClass.value
}))

const isSingleDate = (value: CalendarModel): value is DateValue => {
  return !!value && !Array.isArray(value) && 'day' in value
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

const updatePlaceholder = (year: number, month: number) => {
  const day = Math.min(calendarPlaceholder.value.day, getDaysInMonth(year, month))
  calendarPlaceholder.value = new CalendarDate(year, month, day)
}

const handlePlaceholderUpdate = (value: DateValue) => {
  calendarPlaceholder.value = value
}

watch(
  () => props.modelValue,
  (value) => {
    if (isSingleDate(value)) {
      calendarPlaceholder.value = value
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="grid gap-3">
    <div class="grid grid-cols-[1fr_auto] gap-2">
      <select
        v-model="selectedMonth"
        class="rounded-full border border-sky-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option
          v-for="month in monthOptions"
          :key="month.value"
          :value="month.value"
        >
          {{ month.label }}
        </option>
      </select>

      <select
        v-model="selectedYear"
        class="rounded-full border border-sky-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option
          v-for="year in yearOptions"
          :key="year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
    </div>

    <UCalendar
      :model-value="modelValue"
      :placeholder="calendarPlaceholder"
      :ui="calendarUi"
      month-controls
      year-controls
      v-bind="$attrs"
      @update:model-value="emit('update:modelValue', $event)"
      @update:placeholder="handlePlaceholderUpdate"
    />
  </div>
</template>
