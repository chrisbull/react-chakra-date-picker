import { Box } from '@chakra-ui/react'
import {
  FirstDayOfWeek,
  FormatFunction,
  getInputValue,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks'
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import { DatepickerStyles, StylesContextProvider } from '../context/StylesContext'
import { DateSingleInputPhrases, dateSingleInputPhrases } from '../phrases'
import { InputDate } from '../types'
import { Datepicker } from './Datepicker'
import { Input } from './Input'

export interface OnDateChangeProps {
  date: InputDate
  showDatepicker: boolean
}

export interface DateSingleInputProps {
  id?: string
  name?: string
  value?: InputDate
  onDateChange?(date: InputDate): void
  onFocusChange?(focusInput: boolean): void
  onClick?(): void
  placement?: 'top' | 'bottom'
  showCalendarIcon?: boolean
  showResetDate?: boolean
  showDatepicker?: boolean
  phrases?: DateSingleInputPhrases
  placeholder?: string

  // DatepickerProps
  displayFormat?: string | FormatFunction
  onClose?(): void
  onDayRender?(date: Date): React.ReactNode
  showClose?: boolean
  showSelectedDates?: boolean
  vertical?: boolean
  overwriteDefaultStyles?: boolean
  styles?: Partial<DatepickerStyles>
  dayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  minBookingDate?: Date
  maxBookingDate?: Date
  numberOfMonths?: number
  firstDayOfWeek?: FirstDayOfWeek
  initialVisibleMonth?: Date
  isDateBlocked?(date: Date): boolean
  unavailableDates?: Date[]
  changeActiveMonthOnSelect?: boolean
}

export const DateSingleInput = forwardRef(
  (
    {
      id = 'startDate',
      name = 'startDate',
      value,
      placeholder,
      onDateChange: onDateChangeProp = () => {},
      onFocusChange: onFocusChangeProp = () => {},
      showDatepicker: showDatepickerProp = false,
      onClick: onClickProp = () => {},
      onClose: onCloseProp = () => {},

      //
      displayFormat = 'MM/dd/yyyy',
      firstDayOfWeek,
      initialVisibleMonth,
      isDateBlocked = () => false,
      maxBookingDate,
      minBookingDate,
      numberOfMonths = 1,
      onDayRender,
      phrases = dateSingleInputPhrases,
      placement = 'bottom',
      overwriteDefaultStyles = false,
      showClose = true,
      styles: customStyles,
      unavailableDates = [],
      showCalendarIcon = true,
      showResetDate = true,
      vertical = false,
      //
      monthLabelFormat,
      dayLabelFormat,
      weekdayLabelFormat,
    }: //
    DateSingleInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const datepickerRef = useRef<any>(null)
    const datepickerWrapperRef = useRef<HTMLDivElement>(null)

    const [date, setDate] = useState<InputDate>(value || null)
    const [showDatepicker, setShowDatepicker] = useState(showDatepickerProp)

    useEffect(() => {
      onDateChangeProp(date)
    }, [date, onDateChangeProp])

    useEffect(() => {
      onFocusChangeProp(showDatepicker)
    }, [showDatepicker, onFocusChangeProp])

    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('click', onClickOutsideHandler)
      }
      return () => {
        window.removeEventListener('click', onClickOutsideHandler)
      }
    })

    function onFocusChange(show: boolean) {
      setShowDatepicker(show)
    }

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
      onFocusChange(false)
      onCloseProp()
    }

    function onDatesChange(data: OnDatesChangeProps) {
      onFocusChange(data.focusedInput !== null)
      setDate(data.startDate)
    }

    function handleInputChange(date: Date) {
      // @ts-ignore
      if (ref && ref.current && ref.current.onDateSelect) {
        // @ts-ignore
        ref.current.onDateSelect(date)
      }
    }

    return (
      <StylesContextProvider
        customStyles={customStyles}
        overwriteDefaultStyles={overwriteDefaultStyles}
      >
        <Box position="relative" ref={datepickerWrapperRef}>
          <Input
            id={id}
            name={name}
            ref={ref}
            aria-label={phrases.dateAriaLabel}
            value={getInputValue(date, displayFormat, '')}
            placeholder={placeholder || phrases.datePlaceholder}
            dateFormat={displayFormat}
            showCalendarIcon={showCalendarIcon}
            vertical={vertical}
            isActive={showDatepicker}
            onChange={handleInputChange}
            onClick={() => {
              onFocusChange(true)
              onClickProp()
            }}
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
                ref={datepickerRef}
                showClose={showClose}
                showResetDates={showResetDate}
                showSelectedDates={false}
                startDate={date}
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
  },
)
