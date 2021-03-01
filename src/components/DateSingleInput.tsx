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
import { Input, InputProps } from './Input'

export interface OnDateChangeProps {
  date: Date | null
  showDatepicker: boolean
}

export interface DateSingleInputProps extends Partial<InputProps> {
  date: Date | null
  dayLabelFormat?(date: Date): string
  displayFormat?: string | FormatFunction
  firstDayOfWeek?: FirstDayOfWeek
  initialVisibleMonth?: Date
  inputId?: string
  isDateBlocked?(date: Date): boolean
  maxBookingDate?: Date
  minBookingDate?: Date
  monthLabelFormat?(date: Date): string
  numberOfMonths?: number
  onClose?(): void
  onDateChange(data: OnDateChangeProps): void
  onDayRender?(date: Date): React.ReactNode
  onFocusChange(focusInput: boolean): void
  phrases?: DateSingleInputPhrases
  placement?: 'top' | 'bottom'
  rtl?: boolean
  showCalendarIcon?: boolean
  showClose?: boolean
  showDatepicker: boolean
  showResetDate?: boolean
  theme?: Theme
  unavailableDates?: Date[]
  vertical?: boolean
  weekdayLabelFormat?(date: Date): string
}

export const DateSingleInput = React.forwardRef(
  (
    {
      date,
      dayLabelFormat,
      displayFormat = 'MM/dd/yyyy',
      firstDayOfWeek,
      initialVisibleMonth,
      inputId = 'startDate',
      isDateBlocked = () => false,
      maxBookingDate,
      minBookingDate,
      monthLabelFormat,
      numberOfMonths = 1,
      onClose = () => {},
      onDateChange,
      onDayRender,
      onFocusChange,
      phrases = dateSingleInputPhrases,
      placement = 'bottom',
      showCalendarIcon = true,
      showClose = true,
      showDatepicker,
      showResetDate = true,
      theme,
      unavailableDates = [],
      vertical = false,
      weekdayLabelFormat,
      rtl = false,

      ...inputProps
    }: DateSingleInputProps,
    ref: React.Ref<any>,
  ) => {
    // const ref = useRef<unknown>(null)
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
            {...inputProps}
            aria-label={phrases.dateAriaLabel}
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
  },
)
