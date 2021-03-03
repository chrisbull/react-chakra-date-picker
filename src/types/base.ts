import {
  FocusedInput,
  FormatFunction,
  useDatepicker,
  UseDatepickerProps,
} from '@datepicker-react/hooks'
import React from 'react'
import { DatepickerPhrases } from '../phrases'
import { dayLabelFormatFn, monthLabelFormatFn, weekdayLabelFormatFn } from '../utils/formatters'
import {
  ActionButtonStyles,
  CloseButtonStyles,
  DatepickerComponentStyles,
  DateRangeInputStyles,
  DayStyles,
  InputComponentStyles,
  MonthStyles,
  ResetDatesButtonStyles,
  SelectDateStyles,
} from './styles'

export type InputDate = Date | null

export type UseDatepickerReturnType = ReturnType<typeof useDatepicker>

export interface DatepickerFormatProps {
  dayLabelFormat: typeof dayLabelFormatFn
  weekdayLabelFormat: typeof weekdayLabelFormatFn
  monthLabelFormat: typeof monthLabelFormatFn
}

export interface DatepickerContextBaseProps {
  displayFormat: FormatFunction | string
  startDate: InputDate
  endDate: InputDate
  phrases: DatepickerPhrases
  focusedInput: FocusedInput
  onDayRender?(date: Date): React.ReactNode
}

export interface DatepickerContextProps
  extends DatepickerContextBaseProps,
    DatepickerFormatProps,
    UseDatepickerReturnType {}

export interface DatepickerBaseProps {
  displayFormat: FormatFunction | string
  phrases: DatepickerPhrases
  showClose: boolean
  showResetDates: boolean
  showSelectedDates: boolean
  vertical: boolean
  onClose(): void
  onDayRender(date: Date): React.ReactNode
}

export interface DatepickerProps
  extends Partial<DatepickerBaseProps>,
    Partial<StylesProviderProps>,
    Partial<DatepickerFormatProps>,
    Partial<UseDatepickerProps> {
  onDateSelect?(date: Date): void
}

export interface DatepickerProviderProps extends Partial<DatepickerContextProps> {}

export interface DatepickerStyles {
  actionButton: ActionButtonStyles
  closeButton: CloseButtonStyles
  datepickerComponent: DatepickerComponentStyles
  day: DayStyles
  inputComponent: InputComponentStyles
  month: MonthStyles
  resetDatesButton: ResetDatesButtonStyles
  selectDate: SelectDateStyles
  dateRangeInputStyles: DateRangeInputStyles
}

export interface StylesContextProps {
  overwriteDefaultStyles: boolean
  styles: DatepickerStyles
}

export interface StylesProviderProps {
  overwriteDefaultStyles?: boolean
  styles?: Partial<DatepickerStyles>
}

export { UseDatepickerProps }
