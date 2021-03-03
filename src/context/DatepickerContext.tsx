import React, { useContext } from 'react'
import { datepickerPhrases } from '../phrases'
import {
  DatepickerContextBaseProps,
  DatepickerContextProps,
  DatepickerFormatProps,
  DatepickerProviderProps,
  UseDatepickerReturnType,
} from '../types'
import { monthLabelFormatFn, weekdayLabelFormatFn, dayLabelFormatFn } from '../utils/formatters'

const defaultBase: DatepickerContextBaseProps = {
  displayFormat: 'MM/dd/yyyy',
  endDate: null,
  focusedInput: null,
  onDayRender: undefined,
  phrases: datepickerPhrases,
  startDate: null,
}

const defaultFormatters: DatepickerFormatProps = {
  monthLabelFormat: monthLabelFormatFn,
  weekdayLabelFormat: weekdayLabelFormatFn,
  dayLabelFormat: dayLabelFormatFn,
}

const defaultUseDatepicker: UseDatepickerReturnType = {
  numberOfMonths: 2,
  activeMonths: [],
  firstDayOfWeek: 0,
  focusedDate: null,
  hoveredDate: null,
  goToDate: () => {},
  goToNextMonths: () => {},
  goToNextMonthsByOneMonth: () => {},
  goToNextYear: () => {},
  goToPreviousMonths: () => {},
  goToPreviousMonthsByOneMonth: () => {},
  goToPreviousYear: () => {},
  isDateBlocked: () => false,
  isDateFocused: () => false,
  isDateHovered: () => false,
  isDateSelected: () => false,
  isEndDate: () => false,
  isFirstOrLastSelectedDate: () => false,
  isStartDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {},
  onResetDates: () => {},
}

export const datepickerContextDefaultValue: DatepickerContextProps = {
  ...defaultBase,
  ...defaultFormatters,
  ...defaultUseDatepicker,
}

export const DatepickerContext = React.createContext(datepickerContextDefaultValue)

export const useDatepickerContext = () => useContext(DatepickerContext)

export const DatepickerProvider: React.FC<DatepickerProviderProps> = ({ children, ...props }) => (
  <DatepickerContext.Provider value={{ ...datepickerContextDefaultValue, ...props }}>
    {children}
  </DatepickerContext.Provider>
)
