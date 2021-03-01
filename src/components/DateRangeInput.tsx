import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex, Grid, GridItem, GridProps, useBreakpointValue } from '@chakra-ui/react'
import {
  END_DATE,
  FocusedInput,
  FormatFunction,
  getInputValue,
  START_DATE,
  UseDatepickerProps,
} from '@datepicker-react/hooks'
import React, { useEffect, useRef } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { Theme } from '../defaultTheme'
import { DateRangeInputPhrases, dateRangeInputPhrases } from '../phrases'
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
  theme?: Partial<Theme>
  size?: InputProps['size']
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
  theme,
  size,
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

  const gridStyleProps: GridProps = vertical
    ? {
        gridTemplateColumns: '1.9fr 0.1fr',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridTemplateAreas: `"Start Arrow" "End Arrow"`,
        gap: 4,
      }
    : {
        gridTemplateColumns: '1.3fr 0.1fr 1.3fr',
        gridTemplateRows: '1fr',
        gridTemplateAreas: `"Start Arrow End"`,
        gap: 4,
      }

  const numberOfMonths = numberOfMonthsProps || useBreakpointValue({ base: 1, md: 2 })

  return (
    <ThemeProvider theme={theme}>
      <Box position="relative" ref={datepickerWrapperRef}>
        <Grid {...gridStyleProps} data-testid="DateRangeInputGrid">
          <GridItem gridArea="Start">
            <Input
              id={startDateInputId}
              ariaLabel={phrases.startDateAriaLabel}
              placeholder={phrases.startDatePlaceholder}
              value={getInputValue(startDate, displayFormat, '')}
              onClick={() => onFocusChange(START_DATE)}
              showCalendarIcon={showStartDateCalendarIcon}
              vertical={vertical}
              isActive={focusedInput === START_DATE}
              onChange={handleInputChange}
              dateFormat={displayFormat}
              size={size}
            />
          </GridItem>
          <GridItem gridArea="Arrow">
            <Flex
              h="100%"
              w="100%"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
            >
              <ArrowForwardIcon transform={`rotate(${vertical ? 90 : 0}deg)`} />
            </Flex>
          </GridItem>
          <GridItem gridArea="End">
            <Input
              id={endDateInputId}
              ariaLabel={phrases.endDateAriaLabel}
              placeholder={phrases.endDatePlaceholder}
              value={getInputValue(endDate, displayFormat, '')}
              onClick={() => onFocusChange(!startDate ? START_DATE : END_DATE)}
              showCalendarIcon={showEndDateCalendarIcon}
              vertical={vertical}
              isActive={focusedInput === END_DATE}
              disableAccessibility={focusedInput === START_DATE}
              onChange={handleInputChange}
              dateFormat={displayFormat}
              size={size}
            />
          </GridItem>
        </Grid>

        <Box position="absolute" top={placement === 'bottom' ? 65 : 0}>
          {focusedInput !== null && (
            <Datepicker
              onClose={handleDatepickerClose}
              startDate={startDate}
              endDate={endDate}
              minBookingDate={minBookingDate}
              maxBookingDate={maxBookingDate}
              firstDayOfWeek={firstDayOfWeek}
              numberOfMonths={numberOfMonths}
              focusedInput={focusedInput}
              displayFormat={displayFormat}
              onDatesChange={onDatesChange}
              minBookingDays={minBookingDays}
              isDateBlocked={isDateBlocked}
              exactMinBookingDays={exactMinBookingDays}
              showResetDates={showResetDates}
              vertical={vertical}
              showSelectedDates={showSelectedDates}
              showClose={showClose}
              dayLabelFormat={dayLabelFormat}
              weekdayLabelFormat={weekdayLabelFormat}
              monthLabelFormat={monthLabelFormat}
              onDayRender={onDayRender}
              phrases={phrases}
              unavailableDates={unavailableDates}
              ref={ref}
              initialVisibleMonth={initialVisibleMonth}
              theme={theme}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
