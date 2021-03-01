import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex, Stack, StackProps } from '@chakra-ui/react'
import {
  END_DATE,
  FocusedInput,
  FormatFunction,
  getInputValue,
  START_DATE,
  UseDatepickerProps,
} from '@datepicker-react/hooks'
import React, { useEffect, useRef } from 'react'
import merge from 'ts-deepmerge'
import { DateRangeInputPhrases, dateRangeInputPhrases } from '../phrases'
import { datepickerTheme, DatepickerTheme, DatepickerThemeProvider } from '../theme'
import { Datepicker } from './Datepicker'
import { Input, InputProps } from './Input'

export interface DateRangeInputProps extends UseDatepickerProps {
  displayFormat?: string | FormatFunction
  phrases?: DateRangeInputPhrases
  onFocusChange(focusInput: FocusedInput): void
  showStartDateCalendarIcon?: boolean
  showEndDateCalendarIcon?: boolean
  onClose?(): void
  vertical?: boolean
  showResetDates?: boolean
  showSelectedDates?: boolean
  showClose?: boolean
  rtl?: boolean
  placement?: 'top' | 'bottom'
  dayLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
  startDateInputId?: string
  endDateInputId?: string
  unavailableDates?: Date[]
  initialVisibleMonth?: Date
  theme?: Partial<DatepickerTheme>
  size?: InputProps['size']
  resetStyles?: boolean
}

export function DateRangeInput({
  startDate,
  endDate,
  minBookingDate,
  maxBookingDate,
  firstDayOfWeek,
  onFocusChange,
  numberOfMonths: numberOfMonthsProps,
  focusedInput,
  onDatesChange,
  exactMinBookingDays,
  dayLabelFormat,
  weekdayLabelFormat,
  monthLabelFormat,
  onDayRender,
  initialVisibleMonth,
  showClose = true,
  showSelectedDates = true,
  showResetDates = true,
  vertical = false,
  isDateBlocked = () => false,
  minBookingDays = 1,
  onClose = () => {},
  showStartDateCalendarIcon = true,
  showEndDateCalendarIcon = true,
  displayFormat = 'MM/dd/yyyy',
  phrases = dateRangeInputPhrases,
  placement = 'bottom',
  startDateInputId = 'startDate',
  endDateInputId = 'endDate',
  unavailableDates = [],
  theme: customTheme = {},
  size,
  resetStyles = false,
}: DateRangeInputProps) {
  const ref = useRef(null)
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
      focusedInput !== null &&
      datepickerWrapperRef &&
      datepickerWrapperRef.current &&
      // @ts-ignore
      !datepickerWrapperRef.current.contains(event.target)
    ) {
      onFocusChange(null)
    }
  }

  function handleDatepickerClose() {
    onClose()
    onFocusChange(null)
  }

  function handleInputChange(date: Date) {
    // @ts-ignore
    if (ref && ref.current && ref.current.onDateSelect) {
      // @ts-ignore
      ref.current.onDateSelect(date)
    }
  }

  const stackStyleProps: StackProps = vertical ? {} : {}

  const theme = resetStyles ? (customTheme as DatepickerTheme) : merge(datepickerTheme, customTheme)

  return (
    <DatepickerThemeProvider theme={theme}>
      <Box position="relative" ref={datepickerWrapperRef}>
        <Stack isInline={!vertical} {...stackStyleProps} data-testid="DateRangeInputGrid">
          <Input
            aria-label={phrases.startDateAriaLabel}
            dateFormat={displayFormat}
            id={startDateInputId}
            isActive={focusedInput === START_DATE}
            onChange={handleInputChange}
            onClick={() => onFocusChange(START_DATE)}
            placeholder={phrases.startDatePlaceholder}
            showCalendarIcon={showStartDateCalendarIcon}
            size={size}
            value={getInputValue(startDate, displayFormat, '')}
            vertical={vertical}
          />

          <Flex alignContent="center" alignItems="center" justifyContent="center">
            <ArrowForwardIcon transform={`rotate(${vertical ? 90 : 0}deg)`} />
          </Flex>

          <Input
            aria-label={phrases.endDateAriaLabel}
            dateFormat={displayFormat}
            disableAccessibility={focusedInput === START_DATE}
            id={endDateInputId}
            isActive={focusedInput === END_DATE}
            onChange={handleInputChange}
            onClick={() => onFocusChange(!startDate ? START_DATE : END_DATE)}
            placeholder={phrases.endDatePlaceholder}
            showCalendarIcon={showEndDateCalendarIcon}
            size={size}
            value={getInputValue(endDate, displayFormat, '')}
            vertical={vertical}
          />
        </Stack>

        <Box position="absolute" top={placement === 'bottom' ? 65 : 0}>
          {focusedInput !== null && (
            <Datepicker
              dayLabelFormat={dayLabelFormat}
              displayFormat={displayFormat}
              endDate={endDate}
              exactMinBookingDays={exactMinBookingDays}
              firstDayOfWeek={firstDayOfWeek}
              focusedInput={focusedInput}
              initialVisibleMonth={initialVisibleMonth}
              isDateBlocked={isDateBlocked}
              maxBookingDate={maxBookingDate}
              minBookingDate={minBookingDate}
              minBookingDays={minBookingDays}
              monthLabelFormat={monthLabelFormat}
              numberOfMonths={numberOfMonthsProps}
              onClose={handleDatepickerClose}
              onDatesChange={onDatesChange}
              onDayRender={onDayRender}
              phrases={phrases}
              ref={ref}
              showClose={showClose}
              showResetDates={showResetDates}
              showSelectedDates={showSelectedDates}
              startDate={startDate}
              theme={theme}
              unavailableDates={unavailableDates}
              vertical={vertical}
              weekdayLabelFormat={weekdayLabelFormat}
            />
          )}
        </Box>
      </Box>
    </DatepickerThemeProvider>
  )
}
