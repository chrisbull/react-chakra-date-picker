import { ArrowDownIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import {
  // dayLabelFormat as dayLabelFormatFn,
  END_DATE,
  FirstDayOfWeek,
  FocusedInput,
  FormatFunction,
  monthLabelFormat as monthLabelFormatFn,
  MonthType,
  OnDatesChangeProps,
  START_DATE,
  useDatepicker,
  weekdayLabelFormat as weekdayLabelFormatFn,
} from '@datepicker-react/hooks'
import format from 'date-fns/format'
import React, { useImperativeHandle, useRef } from 'react'
import { DatepickerContext } from '../context/DatepickerContext'
import { DatepickerStyles, StylesContextProvider, useStyles } from '../context/StylesContext'
import { datepickerPhrases, DatepickerPhrases } from '../phrases'
import { InputDate } from '../types'
import { ActionButton } from './ActionButton'
import { CloseButton } from './CloseButton'
import { Month } from './Month'
import { ResetDatesButton } from './ResetDatesButton'
import { SelectedDate } from './SelectedDate'

export const dayLabelFormatFn = (date: Date) => format(date, 'd')

export interface DatepickerProps {
  displayFormat?: string | FormatFunction
  onClose?(): void
  onDayRender?(date: Date): React.ReactNode
  phrases?: DatepickerPhrases
  rtl?: boolean
  showClose?: boolean
  showResetDates?: boolean
  showSelectedDates?: boolean
  vertical?: boolean

  //
  overwriteDefaultStyles?: boolean
  styles?: Partial<DatepickerStyles>

  // format
  dayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string

  // UseDatepickerProps
  onDatesChange?(data: OnDatesChangeProps): void
  minBookingDate?: Date
  maxBookingDate?: Date
  startDate?: InputDate
  endDate?: InputDate
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

export const Datepicker = React.forwardRef((props: DatepickerProps, ref) => {
  const {
    displayFormat = 'MM/dd/yyyy',
    onClose = () => {},
    onDayRender,
    phrases = datepickerPhrases,
    rtl = false,
    showClose = true,
    showResetDates = true,
    showSelectedDates = true,
    vertical = false,
    focusedInput = null,

    // styles
    overwriteDefaultStyles = false,
    styles: customStyles,

    // format
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,

    // useDatepickerProps
    startDate = null,
    endDate = null,
    exactMinBookingDays = false,
    firstDayOfWeek: firstDayOfWeekProp,
    initialVisibleMonth,
    isDateBlocked = () => false,
    maxBookingDate,
    minBookingDate,
    minBookingDays = 1,
    numberOfMonths: numberOfMonthsProp,
    onDatesChange = () => {},
    unavailableDates = [],
  } = props

  const {
    activeMonths,
    isDateSelected,
    isFirstOrLastSelectedDate,
    isDateHovered,
    firstDayOfWeek,
    onDateSelect,
    onResetDates,
    goToPreviousMonths,
    goToNextMonths,
    numberOfMonths,
    hoveredDate,
    onDateHover,
    isDateFocused,
    focusedDate,
    onDateFocus,
    isDateBlocked: isDateBlockedFn,
  } = useDatepicker({
    startDate,
    endDate,
    exactMinBookingDays,
    firstDayOfWeek: firstDayOfWeekProp,
    focusedInput,
    initialVisibleMonth,
    isDateBlocked,
    maxBookingDate,
    minBookingDate,
    minBookingDays,
    numberOfMonths: numberOfMonthsProp,
    onDatesChange,
    unavailableDates,
  })

  useImperativeHandle(ref, () => ({
    onDateSelect: (date: Date) => {
      onDateSelect(date)
    },
  }))

  const styles = useStyles('datepickerComponent', {
    container: {
      background: 'white',
      borderRadius: 'sm',
      position: 'relative',
      width: 'fit-content',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px',
      p: 5,
      pt: 10,
      zIndex: 1,
    },
    monthsWrapper: {
      spacing: 8,
    },
    buttonsWrapper: {
      alignItems: 'center',
      pt: 5,
    },
    arrowIcon: {
      marginLeft: 15,
      marginRight: 15,
      height: '15px',
      width: '15px',
      color: 'gray.500',
    },
  })

  const monthGridRef = useRef<HTMLDivElement>(null)

  function scrollTopToMonthGrid() {
    if (monthGridRef && monthGridRef.current && vertical) {
      monthGridRef.current.scrollTop = 0
    }
  }

  function handleGoToNextMonth() {
    goToNextMonths()
    scrollTopToMonthGrid()
  }

  function handleGoToPreviousMonth() {
    goToPreviousMonths()
    scrollTopToMonthGrid()
  }

  let ArrowComponent = vertical ? ArrowDownIcon : ArrowForwardIcon

  return (
    <StylesContextProvider
      overwriteDefaultStyles={overwriteDefaultStyles}
      customStyles={customStyles}
    >
      <DatepickerContext.Provider
        value={{
          rtl,
          isDateFocused,
          isDateSelected,
          isDateHovered,
          isFirstOrLastSelectedDate,
          onDateFocus,
          focusedDate,
          onDateSelect,
          onDateHover,
          onDayRender,
          isDateBlocked: isDateBlockedFn,
          displayFormat,
          startDate,
          endDate,
          phrases,
          focusedInput,
          numberOfMonths,
        }}
      >
        <Box {...styles.container}>
          {showClose && <CloseButton onClick={onClose} />}

          {showSelectedDates && (
            <Box mb={6}>
              <HStack data-testid="SelectedDatesGrid">
                <SelectedDate date={startDate} isFocused={focusedInput === START_DATE} />
                <Flex justifyContent="center" alignItems="center">
                  <ArrowComponent {...styles.arrowIcon} />
                </Flex>
                <SelectedDate date={endDate} isFocused={focusedInput === END_DATE} />
              </HStack>
            </Box>
          )}
          <Box position="relative">
            <Stack
              overflow={vertical ? 'auto' : undefined}
              data-testid="MonthGrid"
              isInline={!vertical}
              ref={monthGridRef}
              padding={1}
              {...styles.monthsWrapper}
              onMouseLeave={() => {
                if (hoveredDate) {
                  onDateHover(null)
                }
              }}
            >
              {activeMonths.map((month: MonthType) => (
                <Month
                  key={`month-${month.year}-${month.month}`}
                  year={month.year}
                  month={month.month}
                  firstDayOfWeek={firstDayOfWeek}
                  dayLabelFormat={dayLabelFormat || dayLabelFormatFn}
                  weekdayLabelFormat={weekdayLabelFormat || weekdayLabelFormatFn}
                  monthLabelFormat={monthLabelFormat || monthLabelFormatFn}
                />
              ))}
            </Stack>

            <Flex {...styles.buttonsWrapper}>
              {showResetDates && (
                <Flex flex="1">
                  <ResetDatesButton onResetDates={onResetDates} text={phrases.resetDates} />
                </Flex>
              )}
              <HStack
                position={!vertical ? 'absolute' : 'relative'}
                top={!vertical ? 0 : undefined}
                left={!vertical ? 0 : undefined}
                right={!vertical ? 0 : undefined}
                justifyContent="space-between"
              >
                <ActionButton
                  direction={vertical ? 'up' : 'left'}
                  onClick={!vertical ? handleGoToNextMonth : handleGoToPreviousMonth}
                  aria-label="Previous month"
                />
                <ActionButton
                  direction={vertical ? 'down' : 'right'}
                  onClick={!vertical ? handleGoToPreviousMonth : handleGoToNextMonth}
                  aria-label="Next month"
                />
              </HStack>
            </Flex>
          </Box>
        </Box>
      </DatepickerContext.Provider>
    </StylesContextProvider>
  )
})
