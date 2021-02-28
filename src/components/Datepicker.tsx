import {
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  dayLabelFormat as dayLabelFormatFn,
  END_DATE,
  FocusedInput,
  FormatFunction,
  getInputValue,
  monthLabelFormat as monthLabelFormatFn,
  MonthType,
  START_DATE,
  useDatepicker,
  UseDatepickerProps,
  weekdayLabelFormat as weekdayLabelFormatFn,
} from '@datepicker-react/hooks';
import React, {
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DatepickerContext } from '../context/DatepickerContext';
import { ThemeContext, ThemeProvider } from '../context/ThemeContext';
import { defaultTheme, Theme } from '../defaultTheme';
import { datepickerPhrases, DatepickerPhrases } from '../phrases';
import { getThemeProp } from '../utils/getThemeProp';
import { Month } from './Month';
import { ResetDates } from './ResetDates';

export interface DatepickerProps extends UseDatepickerProps {
  phrases?: DatepickerPhrases;
  displayFormat?: string | FormatFunction;
  onClose?(): void;
  showResetDates?: boolean;
  showSelectedDates?: boolean;
  showClose?: boolean;
  vertical?: boolean;
  rtl?: boolean;
  initialVisibleMonth?: Date;
  dayLabelFormat?(date: Date): string;
  weekdayLabelFormat?(date: Date): string;
  monthLabelFormat?(date: Date): string;
  onDayRender?(date: Date): React.ReactNode;
  unavailableDates?: Date[];
  theme?: Partial<Theme>;
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
      theme,
    }: DatepickerProps,
    ref?: React.Ref<unknown>
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
      // numberOfMonths,
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
    });
    useImperativeHandle(ref, () => ({
      onDateSelect: (date: Date) => {
        onDateSelect(date);
      },
    }));
    const monthGridRef = useRef<HTMLDivElement>(null);
    const themeContext = useContext(ThemeContext);

    function scrollTopToMonthGrid() {
      if (monthGridRef && monthGridRef.current && vertical) {
        monthGridRef.current.scrollTop = 0;
      }
    }

    function handleGoToNextMonth() {
      goToNextMonths();
      scrollTopToMonthGrid();
    }

    function handleGoToPreviousMonth() {
      goToPreviousMonths();
      scrollTopToMonthGrid();
    }

    return (
      <ThemeProvider theme={theme}>
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
          }}
        >
          <Box
            background="white"
            borderRadius="sm"
            position="relative"
            width="fit-content"
            boxShadow={
              'rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px'
            }
            p={5}
          >
            {showClose && (
              <Box position="absolute" top={5} right={5} zIndex={1}>
                <CloseButton onClick={onClose} />
              </Box>
            )}

            {showSelectedDates && (
              <Box mb={6}>
                <HStack data-testid="SelectedDatesGrid">
                  <Box
                    width="100%"
                    borderBottom="2px solid"
                    borderBottomColor={
                      focusedInput === START_DATE ? 'teal.300' : 'transparent'
                    }
                  >
                    <Box>
                      <Text fontSize="xs" color="gray.500">
                        {phrases.datepickerStartDateLabel}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">
                        {getInputValue(
                          startDate,
                          displayFormat,
                          phrases.datepickerStartDatePlaceholder
                        )}
                      </Text>
                    </Box>
                  </Box>
                  <Flex justifyContent="center" alignItems="center" padding={5}>
                    <ArrowForwardIcon
                      height="15px"
                      width="15px"
                      color={getThemeProp(
                        'silverCloud',
                        defaultTheme.colors.silverCloud,
                        themeContext
                      )}
                    />
                  </Flex>
                  <Box
                    width="100%"
                    borderBottom="2px solid"
                    borderBottomColor={
                      focusedInput === END_DATE ? 'teal.300' : 'transparent'
                    }
                  >
                    <Box>
                      <Text fontSize="xs" color="gray.500">
                        {phrases.datepickerEndDateLabel}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">
                        {getInputValue(
                          endDate,
                          displayFormat,
                          phrases.datepickerEndDatePlaceholder
                        )}
                      </Text>
                    </Box>
                  </Box>
                </HStack>
              </Box>
            )}
            <Box position="relative">
              <Box
                height={vertical ? '50vh' : '100%'}
                overflow={vertical ? 'auto' : undefined}
                padding={1}
              >
                <Stack
                  data-testid="MonthGrid"
                  spacing={8}
                  isInline={!vertical}
                  ref={monthGridRef}
                  onMouseLeave={() => {
                    if (hoveredDate) {
                      onDateHover(null);
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
                      weekdayLabelFormat={
                        weekdayLabelFormat || weekdayLabelFormatFn
                      }
                      monthLabelFormat={monthLabelFormat || monthLabelFormatFn}
                    />
                  ))}
                </Stack>
              </Box>

              <Flex alignItems="center" pt={5}>
                {showResetDates && (
                  <Flex flex="1">
                    <ResetDates
                      onResetDates={onResetDates}
                      text={phrases.resetDates}
                    />
                  </Flex>
                )}
                <HStack
                  position={!vertical ? 'absolute' : 'relative'}
                  top={!vertical ? 0 : undefined}
                  left={!vertical ? 0 : undefined}
                  right={!vertical ? 0 : undefined}
                  justifyContent="space-between"
                >
                  <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={
                      rtl && !vertical
                        ? handleGoToNextMonth
                        : handleGoToPreviousMonth
                    }
                    aria-label="Previous month"
                  />
                  <IconButton
                    icon={<ChevronRightIcon />}
                    onClick={
                      rtl && !vertical
                        ? handleGoToPreviousMonth
                        : handleGoToNextMonth
                    }
                    aria-label="Next month"
                  />
                </HStack>
              </Flex>
            </Box>
          </Box>
        </DatepickerContext.Provider>
      </ThemeProvider>
    );
  }
);

export const DatepickerDemo = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(START_DATE);

  return (
    <>
      <Datepicker
        startDate={startDate}
        endDate={endDate}
        focusedInput={focusedInput}
        onDatesChange={data => {
          console.log('DatepickerDemo', data);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setFocusedInput(data.focusedInput || START_DATE);
        }}
      />
    </>
  );
};
