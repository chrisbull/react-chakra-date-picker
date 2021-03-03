import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Stack, useBreakpointValue } from '@chakra-ui/react'
import { END_DATE, MonthType, START_DATE, useDatepicker } from '@datepicker-react/hooks'
import React, { Ref, useImperativeHandle, useRef } from 'react'
import { DatepickerProvider } from '../context/DatepickerContext'
import { StylesProvider, useStyles } from '../context/StylesContext'
import { datepickerPhrases } from '../phrases'
import { DatepickerProps } from '../types'
import {
  dayLabelFormatFn,
  defaultDisplayFormat,
  monthLabelFormatFn,
  weekdayLabelFormatFn,
} from '../utils/formatters'
import { ActionButton } from './ActionButton'
import { CloseButton } from './CloseButton'
import { Month } from './Month'
import { ResetDatesButton } from './ResetDatesButton'
import { SelectedDate } from './SelectedDate'

export interface DatepickerElement {
  onDateSelect?(date: Date): void
}

export const Datepicker = React.forwardRef(
  (props: DatepickerProps, ref: Ref<DatepickerElement>) => {
    const {
      changeActiveMonthOnSelect,
      displayFormat = defaultDisplayFormat,
      endDate = null,
      exactMinBookingDays = false,
      firstDayOfWeek,
      focusedInput = null,
      initialVisibleMonth,
      isDateBlocked = () => false,
      maxBookingDate,
      minBookingDate,
      minBookingDays = 1,
      numberOfMonths = 2,
      onClose = () => {},
      onDatesChange = () => {},
      phrases = datepickerPhrases,
      showClose = true,
      showResetDates = true,
      showSelectedDates = true,
      startDate = null,
      unavailableDates = [],
      vertical = false,
      onDayRender,
      overwriteDefaultStyles,
      styles: customStyles,
      dayLabelFormat,
      monthLabelFormat,
      weekdayLabelFormat,
    } = props

    useImperativeHandle(ref, () => ({
      onDateSelect: (date: Date) => {
        dp.onDateSelect(date)
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
        color: 'gray.500',
      },
    })

    const dp = useDatepicker({
      startDate,
      endDate,
      focusedInput,
      firstDayOfWeek,
      initialVisibleMonth,
      maxBookingDate,
      minBookingDate,
      numberOfMonths,
      changeActiveMonthOnSelect,
      onDatesChange,
      exactMinBookingDays,
      isDateBlocked,
      minBookingDays,
      unavailableDates,
    })

    const monthGridRef = useRef<HTMLDivElement>(null)

    function scrollTopToMonthGrid() {
      if (monthGridRef && monthGridRef.current && _vertical) {
        monthGridRef.current.scrollTop = 0
      }
    }

    function _goToNextMonths() {
      dp.goToNextMonths()
      scrollTopToMonthGrid()
    }

    function _goToPreviousMonths() {
      dp.goToPreviousMonths()
      scrollTopToMonthGrid()
    }

    const isMobile = useBreakpointValue({ base: true, md: false })

    const _vertical = vertical || isMobile

    return (
      <StylesProvider styles={customStyles} overwriteDefaultStyles={overwriteDefaultStyles}>
        <DatepickerProvider
          firstDayOfWeek={dp.firstDayOfWeek}
          activeMonths={dp.activeMonths}
          isDateSelected={dp.isDateSelected}
          isDateHovered={dp.isDateHovered}
          isFirstOrLastSelectedDate={dp.isFirstOrLastSelectedDate}
          isStartDate={dp.isStartDate}
          isEndDate={dp.isEndDate}
          isDateBlocked={dp.isDateBlocked}
          numberOfMonths={dp.numberOfMonths}
          isDateFocused={dp.isDateFocused}
          focusedDate={dp.focusedDate}
          hoveredDate={dp.hoveredDate}
          onResetDates={dp.onResetDates}
          onDateHover={dp.onDateHover}
          onDateSelect={dp.onDateSelect}
          onDateFocus={dp.onDateFocus}
          goToPreviousMonthsByOneMonth={dp.goToPreviousMonthsByOneMonth}
          goToNextMonthsByOneMonth={dp.goToNextMonthsByOneMonth}
          goToDate={dp.goToDate}
          goToPreviousYear={dp.goToPreviousYear}
          goToNextYear={dp.goToNextYear}
          displayFormat={displayFormat}
          endDate={endDate}
          focusedInput={focusedInput}
          phrases={phrases}
          startDate={startDate}
          onDayRender={onDayRender}
          dayLabelFormat={dayLabelFormat || dayLabelFormatFn}
          monthLabelFormat={monthLabelFormat || monthLabelFormatFn}
          weekdayLabelFormat={weekdayLabelFormat || weekdayLabelFormatFn}
          goToNextMonths={_goToNextMonths}
          goToPreviousMonths={_goToPreviousMonths}
        >
          <Box {...styles.container}>
            {showClose && <CloseButton onClick={onClose} />}

            {showSelectedDates && (
              <Box mb={6}>
                <HStack data-testid="SelectedDatesGrid">
                  <SelectedDate date={startDate} isFocused={focusedInput === START_DATE} />
                  <Flex justifyContent="center" alignItems="center">
                    <ArrowForwardIcon {...styles.arrowIcon} />
                  </Flex>
                  <SelectedDate date={endDate} isFocused={focusedInput === END_DATE} />
                </HStack>
              </Box>
            )}
            <Box position="relative">
              <Stack
                overflow={_vertical ? 'auto' : undefined}
                data-testid="MonthGrid"
                isInline={!_vertical}
                ref={monthGridRef}
                padding={1}
                {...styles.monthsWrapper}
                onMouseLeave={() => {
                  if (dp.hoveredDate) {
                    dp.onDateHover(null)
                  }
                }}
              >
                {dp.activeMonths.map((month: MonthType) => (
                  <Month
                    key={`month-${month.year}-${month.month}`}
                    year={month.year}
                    month={month.month}
                  />
                ))}
              </Stack>

              <Flex {...styles.buttonsWrapper}>
                {showResetDates && (
                  <Flex flex="1">
                    <ResetDatesButton onResetDates={dp.onResetDates} text={phrases.resetDates} />
                  </Flex>
                )}
                <HStack
                  position={!_vertical ? 'absolute' : 'relative'}
                  top={!_vertical ? 0 : undefined}
                  left={!_vertical ? 0 : undefined}
                  right={!_vertical ? 0 : undefined}
                  justifyContent="space-between"
                >
                  <ActionButton
                    direction={_vertical ? 'up' : 'left'}
                    onClick={_goToPreviousMonths}
                    aria-label="Previous month"
                  />
                  <ActionButton
                    direction={_vertical ? 'down' : 'right'}
                    onClick={_goToNextMonths}
                    aria-label="Next month"
                  />
                </HStack>
              </Flex>
            </Box>
          </Box>
        </DatepickerProvider>
      </StylesProvider>
    )
  },
)
