import { Box } from '@chakra-ui/react'
import {
  FirstDayOfWeek,
  FormatFunction,
  getInputValue,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks'
import React, { useEffect, useRef } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { Theme } from '../defaultTheme'
import { DateSingleInputPhrases, dateSingleInputPhrases } from '../phrases'
import { Datepicker } from './Datepicker'
import { Input } from './Input'

export interface OnDateChangeProps {
  date: Date | null
  showDatepicker: boolean
}

export interface DateSingleInputProps {
  date: Date | null
  minBookingDate?: Date
  maxBookingDate?: Date
  showDatepicker: boolean
  numberOfMonths?: number
  firstDayOfWeek?: FirstDayOfWeek
  displayFormat?: string | FormatFunction
  phrases?: DateSingleInputPhrases
  showCalendarIcon?: boolean
  vertical?: boolean
  showResetDate?: boolean
  showClose?: boolean
  rtl?: boolean
  placement?: 'top' | 'bottom'
  initialVisibleMonth?: Date
  onDateChange(data: OnDateChangeProps): void
  onFocusChange(focusInput: boolean): void
  isDateBlocked?(date: Date): boolean
  onClose?(): void
  dayLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
  inputId?: string
  unavailableDates?: Date[]
  theme?: Theme
}

export function DateSingleInput({
  date,
  minBookingDate,
  maxBookingDate,
  firstDayOfWeek,
  onFocusChange,
  showDatepicker,
  onDateChange,
  dayLabelFormat,
  weekdayLabelFormat,
  monthLabelFormat,
  onDayRender,
  initialVisibleMonth,
  numberOfMonths = 1,
  showClose = true,
  showResetDate = true,
  vertical = false,
  isDateBlocked = () => false,
  onClose = () => {},
  showCalendarIcon = true,
  displayFormat = 'MM/dd/yyyy',
  phrases = dateSingleInputPhrases,
  placement = 'bottom',
  inputId = 'startDate',
  unavailableDates = [],
  theme,
}: DateSingleInputProps) {
  const ref = useRef<unknown>(null)
  const datepickerWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', onClickOutsideHandler)
    }

    return () => {
      window.removeEventListener('click', onClickOutsideHandler)
    }
  })

  function onClickOutsideHandler(event: Event) {
    if (
      showDatepicker &&
      datepickerWrapperRef &&
      datepickerWrapperRef.current &&
      // @ts-ignore
      !datepickerWrapperRef.current.contains(event.target)
    ) {
      onFocusChange(false)
    }
  }

  function handleDatepickerClose() {
    onClose()
    onFocusChange(false)
  }

  function onDatesChange({ focusedInput, startDate }: OnDatesChangeProps) {
    onDateChange({
      showDatepicker: focusedInput !== null,
      date: startDate,
    })
  }

  function handleInputChange(date: Date) {
    // @ts-ignore
    if (ref && ref.current && ref.current.onDateSelect) {
      // @ts-ignore
      ref.current.onDateSelect(date)
    }
  }

  return (
    <ThemeProvider theme={theme || {}}>
      <Box position="relative" ref={datepickerWrapperRef}>
        <Input
          ariaLabel={phrases.dateAriaLabel}
          dateFormat={displayFormat}
          id={inputId}
          isActive={false}
          onChange={handleInputChange}
          onClick={() => onFocusChange(true)}
          placeholder={phrases.datePlaceholder}
          showCalendarIcon={showCalendarIcon}
          value={getInputValue(date, displayFormat, '')}
          vertical={vertical}
        />
        <Box position="absolute" top={placement === 'bottom' ? '65px' : 0}>
          {showDatepicker && (
            <Datepicker
              dayLabelFormat={dayLabelFormat}
              displayFormat={displayFormat}
              endDate={date}
              exactMinBookingDays
              firstDayOfWeek={firstDayOfWeek}
              focusedInput={showDatepicker ? START_DATE : null}
              initialVisibleMonth={initialVisibleMonth}
              isDateBlocked={isDateBlocked}
              maxBookingDate={maxBookingDate}
              minBookingDate={minBookingDate}
              minBookingDays={1}
              monthLabelFormat={monthLabelFormat}
              numberOfMonths={numberOfMonths}
              onClose={handleDatepickerClose}
              onDatesChange={onDatesChange}
              onDayRender={onDayRender}
              phrases={phrases}
              ref={ref}
              showClose={showClose}
              showResetDates={showResetDate}
              showSelectedDates={false}
              startDate={date}
              theme={theme}
              unavailableDates={unavailableDates}
              vertical={vertical}
              weekdayLabelFormat={weekdayLabelFormat}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
