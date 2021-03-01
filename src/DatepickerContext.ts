import { FocusedInput, FormatFunction } from '@datepicker-react/hooks'
import React from 'react'
import { DatepickerPhrases, datepickerPhrases } from './phrases'

export interface DatepickerContextProps {
  rtl: boolean
  focusedDate: Date | null
  onDateFocus(date: Date): void
  onDateSelect(date: Date): void
  onDateHover(date: Date): void
  isDateFocused(date: Date): boolean
  isDateSelected(date: Date): boolean
  isDateHovered(date: Date): boolean
  isDateBlocked(date: Date): boolean
  isFirstOrLastSelectedDate(date: Date): boolean
  onDayRender?(date: Date): React.ReactNode

  displayFormat: FormatFunction | string
  startDate: Date | null
  endDate: Date | null
  phrases: DatepickerPhrases
  focusedInput: FocusedInput
  numberOfMonths?: number
}

export const datepickerContextDefaultValue = {
  rtl: false,
  focusedDate: null,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {},
  onDayRender: undefined,

  displayFormat: 'MM/dd/yyyy',
  startDate: null,
  endDate: null,
  phrases: datepickerPhrases,
  focusedInput: null,
  numberOfMonths: 2,
}

export const DatepickerContext = React.createContext(
  datepickerContextDefaultValue as DatepickerContextProps,
)
