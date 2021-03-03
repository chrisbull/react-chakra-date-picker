import { CalendarIcon } from '@chakra-ui/icons'
import { Box, Icon, Stack, StackDivider, useBreakpointValue } from '@chakra-ui/react'
import {
  END_DATE,
  FirstDayOfWeek,
  FocusedInput,
  FormatFunction,
  getInputValue,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks'
import React, { Ref, useEffect, useRef, useState } from 'react'
import { DatepickerStyles, StylesContextProvider, useStyles } from '../context/StylesContext'
import { dateRangeInputPhrases, DateRangeInputPhrases } from '../phrases'
import { InputDate } from '../types'
import { Datepicker } from './Datepicker'
import { Input } from './Input'

export interface DateRangeInputProps {
  ids: [string, string]
  names?: [string, string]
  placeholders?: [string, string]
  refs?: [Ref<any>, Ref<any>]
  showCalendarIcons?: [boolean, boolean]
  dates?: [InputDate, InputDate]
  icons?: [typeof Icon, typeof Icon]

  onFocusChange?(focusInput: FocusedInput): void
  phrases?: DateRangeInputPhrases
  placement?: 'top' | 'bottom'

  // DatepickerProps
  displayFormat?: string | FormatFunction
  onClose?(): void
  onDayRender?(date: Date): React.ReactNode
  showClose?: boolean
  showResetDates?: boolean
  showSelectedDates?: boolean
  showDivider?: boolean
  vertical?: boolean
  overwriteDefaultStyles?: boolean
  styles?: Partial<DatepickerStyles>
  dayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string

  // UseDatepickerProps
  onDatesChange?(data: OnDatesChangeProps): void
  minBookingDate?: Date
  maxBookingDate?: Date

  focusedInput?: FocusedInput
  numberOfMonths?: number
  minBookingDays?: number
  exactMinBookingDays?: boolean
  firstDayOfWeek?: FirstDayOfWeek
  initialVisibleMonth?: Date
  isDateBlocked?(date: Date): boolean
  unavailableDates?: Date[]
  changeActiveMonthOnSelect?: boolean
}

const { startDatePlaceholder, endDatePlaceholder } = dateRangeInputPhrases

export const DateRangeInput = ({
  dates = [null, null],
  ids = ['startDate', 'endDate'],
  names = ['startDate', 'endDate'],
  placeholders = [startDatePlaceholder, endDatePlaceholder],
  refs = [null, null],
  icons = [CalendarIcon, CalendarIcon],
  showCalendarIcons = [true, true],

  focusedInput: focusedInputProp = null,
  onClose: onCloseProp = () => {},
  onDatesChange: onDatesChangeProp = () => {},
  onFocusChange: onFocusChangeProp = () => {},

  exactMinBookingDays,
  firstDayOfWeek,
  initialVisibleMonth,
  isDateBlocked = () => false,
  maxBookingDate,
  minBookingDate,
  minBookingDays = 1,
  numberOfMonths: numberOfMonthsProps,
  onDayRender,
  overwriteDefaultStyles,
  phrases = dateRangeInputPhrases,
  placement = 'bottom',
  showClose = true,
  showResetDates = true,
  showSelectedDates = true,
  showDivider = false,

  //
  styles: customStyles,
  unavailableDates = [],
  vertical = false,
  //
  dayLabelFormat,
  displayFormat = 'MM/dd/yyyy',
  monthLabelFormat,
  weekdayLabelFormat,
}: DateRangeInputProps) => {
  const datepickerRef = useRef(null)
  const datepickerWrapperRef = useRef<HTMLDivElement>(null)

  const [startDate, setStartDate] = useState<InputDate>(dates[0])
  const [endDate, setEndDate] = useState<InputDate>(dates[1])
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(focusedInputProp)

  const styles = useStyles('dateRangeInputStyles', {
    selectDatesContainer: { spacing: 5 },
    selectDatesDivider: {},
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', onClickOutsideHandler)
    }
    return () => {
      window.removeEventListener('click', onClickOutsideHandler)
    }
  })

  function onFocusChange(_focusedInput: FocusedInput) {
    setFocusedInput(_focusedInput)
    onFocusChangeProp(_focusedInput)
  }

  function onDatesChange(data: OnDatesChangeProps) {
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setFocusedInput(data.focusedInput)
    onDatesChangeProp(data)
  }

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
    onFocusChange(null)
    onCloseProp()
  }

  function handleInputChange(date: Date) {
    // @ts-ignore
    if (datepickerRef && datepickerRef.current && datepickerRef.current.onDateSelect) {
      // @ts-ignore
      datepickerRef.current.onDateSelect(date)
    }
  }

  const isMobile = vertical || useBreakpointValue({ base: true, md: false })

  return (
    <StylesContextProvider
      customStyles={customStyles}
      overwriteDefaultStyles={overwriteDefaultStyles}
    >
      <Box position="relative" ref={datepickerWrapperRef}>
        <Stack
          isInline={!isMobile}
          {...styles.selectDatesContainer}
          data-testid="DateRangeInputGrid"
          divider={showDivider ? <StackDivider {...styles.selectDatesDivider} /> : undefined}
        >
          <Input
            iconComponent={icons[0]}
            id={ids[0]}
            name={names[0]}
            placeholder={placeholders[0]}
            ref={refs[0]}
            showCalendarIcon={showCalendarIcons[0]}
            aria-label={phrases.startDateAriaLabel}
            dateFormat={displayFormat}
            isActive={focusedInput === START_DATE}
            onChange={handleInputChange}
            onClick={() => onFocusChange(START_DATE)}
            value={getInputValue(startDate, displayFormat, '')}
            vertical={vertical}
          />
          <Input
            iconComponent={icons[1]}
            id={ids[1]}
            name={names[1]}
            placeholder={placeholders[1]}
            ref={refs[1]}
            showCalendarIcon={showCalendarIcons[1]}
            aria-label={phrases.endDateAriaLabel}
            dateFormat={displayFormat}
            disableAccessibility={focusedInput === START_DATE}
            isActive={focusedInput === END_DATE}
            onChange={handleInputChange}
            onClick={() => onFocusChange(!startDate ? START_DATE : END_DATE)}
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
              ref={datepickerRef}
              showClose={showClose}
              showResetDates={showResetDates}
              showSelectedDates={showSelectedDates}
              startDate={startDate}
              styles={customStyles}
              unavailableDates={unavailableDates}
              vertical={vertical}
              weekdayLabelFormat={weekdayLabelFormat}
            />
          )}
        </Box>
      </Box>
    </StylesContextProvider>
  )
}
