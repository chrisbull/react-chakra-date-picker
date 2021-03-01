import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import format from 'date-fns/format'
import {
  // dayLabelFormat as dayLabelFormatFn,
  END_DATE,
  FormatFunction,
  monthLabelFormat as monthLabelFormatFn,
  MonthType,
  START_DATE,
  useDatepicker,
  UseDatepickerProps,
  weekdayLabelFormat as weekdayLabelFormatFn,
} from '@datepicker-react/hooks'
import React, { useImperativeHandle, useRef } from 'react'
import { DatepickerContext } from '../context/DatepickerContext'
import { ThemeProvider } from '../context/ThemeContext'
import { Theme } from '../defaultTheme'
import { useThemeProps } from '../hooks/useThemeProps'
import { datepickerPhrases, DatepickerPhrases } from '../phrases'
import { ActionButton } from './ActionButton'
import { CloseButton } from './CloseButton'
import { DatepickerContainer } from './DatepickerContainer'
import { Month } from './Month'
import { ResetDates } from './ResetDates'
import { SelectedDate } from './SelectedDate'
import { SelectedDatesArrow } from './SelectedDatesArrow'

export const dayLabelFormatFn = (date: Date) => format(date, 'd')

export interface DatepickerProps extends UseDatepickerProps {
  phrases?: DatepickerPhrases
  displayFormat?: string | FormatFunction
  onClose?(): void
  showResetDates?: boolean
  showSelectedDates?: boolean
  showClose?: boolean
  vertical?: boolean
  rtl?: boolean
  initialVisibleMonth?: Date
  dayLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
  unavailableDates?: Date[]
  theme?: Partial<Theme>
}

export const Datepicker = React.forwardRef(
  (
    {
      startDate,
      endDate,
      minBookingDate,
      maxBookingDate,
      focusedInput,
      onDatesChange,
      dayLabelFormat,
      weekdayLabelFormat,
      monthLabelFormat,
      onDayRender,
      initialVisibleMonth,
      vertical = false,
      rtl = false,
      showResetDates = true,
      showClose = true,
      showSelectedDates = true,
      exactMinBookingDays = false,
      isDateBlocked = () => false,
      minBookingDays = 1,
      onClose = () => {},
      numberOfMonths: numberOfMonthsProp,
      firstDayOfWeek: firstDayOfWeekProp,
      displayFormat = 'MM/dd/yyyy',
      phrases = datepickerPhrases,
      unavailableDates = [],
      theme: customTheme,
    }: DatepickerProps,
    ref?: React.Ref<unknown>,
  ) => {
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
      focusedInput,
      onDatesChange,
      minBookingDate,
      maxBookingDate,
      minBookingDays,
      isDateBlocked,
      exactMinBookingDays,
      unavailableDates,
      initialVisibleMonth,
      numberOfMonths: numberOfMonthsProp,
      firstDayOfWeek: firstDayOfWeekProp,
    })
    useImperativeHandle(ref, () => ({
      onDateSelect: (date: Date) => {
        onDateSelect(date)
      },
    }))
    const monthGridRef = useRef<HTMLDivElement>(null)
    const theme = useThemeProps()

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

    return (
      <ThemeProvider theme={customTheme}>
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
          <DatepickerContainer>
            {showClose && <CloseButton onClick={onClose} />}

            {showSelectedDates && (
              <Box mb={6}>
                <HStack data-testid="SelectedDatesGrid">
                  <SelectedDate date={startDate} isFocused={focusedInput === START_DATE} />
                  <SelectedDatesArrow />
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
                {...theme.monthsContainer}
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

              <Flex {...theme.bottomContainer}>
                {showResetDates && (
                  <Flex flex="1">
                    <ResetDates onResetDates={onResetDates} text={phrases.resetDates} />
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
                    {...theme.actionButtonLeft}
                    direction={vertical ? 'up' : 'left'}
                    onClick={!vertical ? handleGoToNextMonth : handleGoToPreviousMonth}
                    aria-label="Previous month"
                  />
                  <ActionButton
                    {...theme.actionButtonRight}
                    direction={vertical ? 'down' : 'right'}
                    onClick={!vertical ? handleGoToPreviousMonth : handleGoToNextMonth}
                    aria-label="Next month"
                  />
                </HStack>
              </Flex>
            </Box>
          </DatepickerContainer>
        </DatepickerContext.Provider>
      </ThemeProvider>
    )
  },
)

// export const DatepickerDemo = () => {
//   const [startDate, setStartDate] = useState<Date | null>(null)
//   const [endDate, setEndDate] = useState<Date | null>(null)
//   const [focusedInput, setFocusedInput] = useState<FocusedInput>(START_DATE)

//   return (
//     <>
//       <Datepicker
//         startDate={startDate}
//         endDate={endDate}
//         focusedInput={focusedInput}
//         onDatesChange={data => {
//           console.log('DatepickerDemo', data)
//           setStartDate(data.startDate)
//           setEndDate(data.endDate)
//           setFocusedInput(data.focusedInput || START_DATE)
//         }}
//       />
//     </>
//   )
// }
