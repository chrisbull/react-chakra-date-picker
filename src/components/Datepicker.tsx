import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Stack, useBreakpointValue } from '@chakra-ui/react'
import {
  END_DATE,
  MonthType,
  START_DATE,
  useDatepicker,
  UseDatepickerProps,
} from '@datepicker-react/hooks'
import React, { Ref, useImperativeHandle, useRef } from 'react'
import { DatepickerFormatProps, DatepickerProvider } from '../context/DatepickerContext'
import { StylesProvider, StylesProviderProps, useStyles } from '../context/StylesContext'
import { DatepickerPhrases, datepickerPhrases } from '../phrases'
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

export interface DatepickerProps
  extends Partial<StylesProviderProps>,
    Partial<DatepickerFormatProps>,
    Partial<UseDatepickerProps> {
  displayFormat?: string
  onClose?(): void
  onDayRender?(date: Date): React.ReactNode
  phrases?: DatepickerPhrases
  showClose?: boolean
  showResetDates?: boolean
  showSelectedDates?: boolean
  vertical?: boolean
}

export const Datepicker = React.forwardRef(
  (props: DatepickerProps, ref: Ref<DatepickerElement>) => {
    const {
      changeActiveMonthOnSelect,
      dayLabelFormat,
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
      monthLabelFormat,
      numberOfMonths = 2,
      onClose = () => {},
      onDatesChange = () => {},
      onDayRender,
      overwriteDefaultStyles,
      phrases = datepickerPhrases,
      showClose = true,
      showResetDates = true,
      showSelectedDates = true,
      startDate = null,
      styles: customStyles,
      unavailableDates = [],
      vertical = false,
      weekdayLabelFormat,
    } = props

    const dp = useDatepicker({
      changeActiveMonthOnSelect,
      endDate,
      exactMinBookingDays,
      firstDayOfWeek,
      focusedInput,
      initialVisibleMonth,
      isDateBlocked,
      maxBookingDate,
      minBookingDate,
      minBookingDays,
      numberOfMonths,
      onDatesChange,
      startDate,
      unavailableDates,
    })

    useImperativeHandle(ref, () => ({
      onDateSelect: (date: Date) => {
        dp.onDateSelect(date)
      },
    }))

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

    const styles = useStyles('datepickerComponent', {
      datepickerContainer: {
        background: 'white',
        borderRadius: 'sm',
        position: 'relative',
        width: 'fit-content',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px',
        p: [3, 5],
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

    return (
      <StylesProvider styles={customStyles} overwriteDefaultStyles={overwriteDefaultStyles}>
        <DatepickerProvider
          activeMonths={dp.activeMonths}
          dayLabelFormat={dayLabelFormat || dayLabelFormatFn}
          displayFormat={displayFormat}
          endDate={endDate}
          firstDayOfWeek={dp.firstDayOfWeek}
          focusedDate={dp.focusedDate}
          focusedInput={focusedInput}
          goToDate={dp.goToDate}
          goToNextMonths={_goToNextMonths}
          goToNextMonthsByOneMonth={dp.goToNextMonthsByOneMonth}
          goToNextYear={dp.goToNextYear}
          goToPreviousMonths={_goToPreviousMonths}
          goToPreviousMonthsByOneMonth={dp.goToPreviousMonthsByOneMonth}
          goToPreviousYear={dp.goToPreviousYear}
          hoveredDate={dp.hoveredDate}
          isDateBlocked={dp.isDateBlocked}
          isDateFocused={dp.isDateFocused}
          isDateHovered={dp.isDateHovered}
          isDateSelected={dp.isDateSelected}
          isEndDate={dp.isEndDate}
          isFirstOrLastSelectedDate={dp.isFirstOrLastSelectedDate}
          isStartDate={dp.isStartDate}
          monthLabelFormat={monthLabelFormat || monthLabelFormatFn}
          numberOfMonths={dp.numberOfMonths}
          onDateFocus={dp.onDateFocus}
          onDateHover={dp.onDateHover}
          onDateSelect={dp.onDateSelect}
          onDayRender={onDayRender}
          onResetDates={dp.onResetDates}
          phrases={phrases}
          startDate={startDate}
          weekdayLabelFormat={weekdayLabelFormat || weekdayLabelFormatFn}
        >
          <Box {...styles.datepickerContainer}>
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
