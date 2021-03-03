import { CalendarIcon } from '@chakra-ui/icons'
import { Box, Stack, StackDivider, useBreakpointValue } from '@chakra-ui/react'
import {
  END_DATE,
  FocusedInput,
  getInputValue,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks'
import React, { Ref, useEffect, useRef, useState } from 'react'
import { StylesProvider, useStyles } from '../context/StylesContext'
import { dateRangeInputPhrases, DateRangeInputPhrases } from '../phrases'
import { DatepickerProps, InputDate, StylesProviderProps } from '../types'
import { defaultDisplayFormat } from '../utils/formatters'
import { Datepicker, DatepickerElement } from './Datepicker'
import { Input } from './Input'

export interface DateRangeInputProps extends StylesProviderProps, Partial<DatepickerProps> {
  phrases?: DateRangeInputPhrases
  defaultStartDate?: InputDate
  defaultEndDate?: InputDate
  showDivider?: boolean
  placement?: 'top' | 'bottom'
  onFocusChange?(focusedInput: FocusedInput): void
  endIcon?: typeof CalendarIcon
  endId?: string
  endName?: string
  endPlaceholder?: string
  endRef?: Ref<HTMLInputElement>
  endShowCalendarIcon?: boolean
  startIcon?: typeof CalendarIcon
  startId?: string
  startName?: string
  startPlaceholder?: string
  startRef?: Ref<HTMLInputElement>
  startShowCalendarIcon?: boolean
}

export const DateRangeInput: React.FC<DateRangeInputProps> = props => {
  const {
    displayFormat = defaultDisplayFormat,
    endShowCalendarIcon = true,
    isDateBlocked = () => false,
    minBookingDays = 1,
    phrases = dateRangeInputPhrases,
    placement = 'bottom',
    showClose = true,
    showDivider = false,
    showResetDates = true,
    showSelectedDates = true,
    startShowCalendarIcon = true,
    vertical = false,
    onClose = () => {},
    onDatesChange = () => {},
    onFocusChange = () => {},

    focusedInput: focusedInputProp = null,
    defaultStartDate = null,
    defaultEndDate = null,
    styles: customStyles,
    overwriteDefaultStyles,
    startIcon,
    startId,
    startName,
    startPlaceholder,
    startRef,
    endId,
    endName,
    endRef,
    endIcon,
    endPlaceholder,
    changeActiveMonthOnSelect,
    dayLabelFormat,
    exactMinBookingDays,
    firstDayOfWeek,
    initialVisibleMonth,
    maxBookingDate,
    minBookingDate,
    monthLabelFormat,
    numberOfMonths,
    onDayRender,
    unavailableDates,
    weekdayLabelFormat,
  } = props

  const datepickerRef = useRef<DatepickerElement>(null)
  const datepickerWrapperRef = useRef<HTMLDivElement>(null)

  const [startDate, setStartDate] = useState<InputDate>(defaultStartDate)
  const [endDate, setEndDate] = useState<InputDate>(defaultEndDate)
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

  function handleOnFocusChange(_focusedInput: FocusedInput) {
    setFocusedInput(_focusedInput)
    onFocusChange(_focusedInput)
  }

  function handleOnDatesChange(data: OnDatesChangeProps) {
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setFocusedInput(data.focusedInput)
    onDatesChange(data)
  }

  function onClickOutsideHandler(event: Event) {
    if (
      focusedInput !== null &&
      datepickerWrapperRef &&
      datepickerWrapperRef.current &&
      // @ts-ignore
      !datepickerWrapperRef.current.contains(event.target)
    ) {
      handleOnFocusChange(null)
    }
  }

  function handleOnClose() {
    handleOnFocusChange(null)
    onClose()
  }

  function handleInputChange(date: Date) {
    if (datepickerRef && datepickerRef.current && datepickerRef.current.onDateSelect) {
      datepickerRef.current.onDateSelect(date)
    }
  }

  const isMobile = useBreakpointValue({ base: true, md: false })
  const _vertical = vertical || isMobile

  return (
    <StylesProvider styles={customStyles} overwriteDefaultStyles={overwriteDefaultStyles}>
      <Box position="relative" ref={datepickerWrapperRef}>
        <Stack
          isInline={!isMobile}
          {...styles.selectDatesContainer}
          data-testid="DateRangeInputGrid"
          divider={showDivider ? <StackDivider {...styles.selectDatesDivider} /> : undefined}
        >
          <Input
            iconComponent={startIcon}
            id={startId || 'startDate'}
            name={startName || 'startDate'}
            placeholder={startPlaceholder || phrases.startDatePlaceholder}
            ref={startRef}
            showCalendarIcon={startShowCalendarIcon}
            aria-label={phrases.startDateAriaLabel}
            dateFormat={displayFormat}
            isActive={focusedInput === START_DATE}
            onChange={handleInputChange}
            onClick={() => handleOnFocusChange(START_DATE)}
            value={getInputValue(startDate, displayFormat, '')}
          />
          <Input
            id={endId || 'endDate'}
            name={endName || 'endDate'}
            ref={endRef}
            iconComponent={endIcon}
            placeholder={endPlaceholder || phrases.endDatePlaceholder}
            showCalendarIcon={endShowCalendarIcon}
            aria-label={phrases.endDateAriaLabel}
            dateFormat={displayFormat}
            disableAccessibility={focusedInput === START_DATE}
            isActive={focusedInput === END_DATE}
            onChange={handleInputChange}
            onClick={() => handleOnFocusChange(!startDate ? START_DATE : END_DATE)}
            value={getInputValue(endDate, displayFormat, '')}
          />
        </Stack>
        <Box
          position="absolute"
          top={placement === 'top' ? undefined : _vertical ? '100px' : '45px'}
          bottom={placement === 'bottom' ? undefined : _vertical ? '100px' : '45px'}
        >
          {focusedInput !== null && (
            <Datepicker
              ref={datepickerRef}
              startDate={startDate}
              endDate={endDate}
              focusedInput={focusedInput}
              onClose={handleOnClose}
              onDatesChange={handleOnDatesChange}
              //
              changeActiveMonthOnSelect={changeActiveMonthOnSelect}
              dayLabelFormat={dayLabelFormat}
              exactMinBookingDays={exactMinBookingDays}
              firstDayOfWeek={firstDayOfWeek}
              initialVisibleMonth={initialVisibleMonth}
              isDateBlocked={isDateBlocked}
              maxBookingDate={maxBookingDate}
              minBookingDate={minBookingDate}
              minBookingDays={minBookingDays}
              monthLabelFormat={monthLabelFormat}
              numberOfMonths={_vertical ? 1 : numberOfMonths}
              onDayRender={onDayRender}
              phrases={phrases}
              unavailableDates={unavailableDates}
              displayFormat={displayFormat}
              showClose={showClose}
              showResetDates={showResetDates}
              showSelectedDates={showSelectedDates}
              vertical={_vertical}
              weekdayLabelFormat={weekdayLabelFormat}
            />
          )}
        </Box>
      </Box>
    </StylesProvider>
  )
}
