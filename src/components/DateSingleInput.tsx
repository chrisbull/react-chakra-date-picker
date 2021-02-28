import { Box } from '@chakra-ui/react';
import {
  FirstDayOfWeek,
  FormatFunction,
  getInputValue,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Theme } from '../defaultTheme';
import { DateSingleInputPhrases, dateSingleInputPhrases } from '../phrases';
import { Datepicker } from './Datepicker';
import { Input } from './Input';

export interface OnDateChangeProps {
  date: Date | null;
  showDatepicker: boolean;
}

export interface DateSingleInputProps {
  date: Date | null;
  minBookingDate?: Date;
  maxBookingDate?: Date;
  showDatepicker: boolean;
  numberOfMonths?: number;
  firstDayOfWeek?: FirstDayOfWeek;
  displayFormat?: string | FormatFunction;
  phrases?: DateSingleInputPhrases;
  showCalendarIcon?: boolean;
  vertical?: boolean;
  showResetDate?: boolean;
  showClose?: boolean;
  rtl?: boolean;
  placement?: 'top' | 'bottom';
  initialVisibleMonth?: Date;
  onDateChange(data: OnDateChangeProps): void;
  onFocusChange(focusInput: boolean): void;
  isDateBlocked?(date: Date): boolean;
  onClose?(): void;
  dayLabelFormat?(date: Date): string;
  weekdayLabelFormat?(date: Date): string;
  monthLabelFormat?(date: Date): string;
  onDayRender?(date: Date): React.ReactNode;
  inputId?: string;
  unavailableDates?: Date[];
  theme?: Theme;
}

export function DateSingleInput({
  date,
  minBookingDate,
  maxBookingDate,
  firstDayOfWeek,
  onFocusChange,
  showDatepicker,
  onDateChange,
  dayLabelFormat,
  weekdayLabelFormat,
  monthLabelFormat,
  onDayRender,
  initialVisibleMonth,
  numberOfMonths = 1,
  showClose = true,
  showResetDate = true,
  vertical = false,
  isDateBlocked = () => false,
  onClose = () => {},
  showCalendarIcon = true,
  displayFormat = 'MM/dd/yyyy',
  phrases = dateSingleInputPhrases,
  placement = 'bottom',
  inputId = 'startDate',
  unavailableDates = [],
  theme,
}: DateSingleInputProps) {
  const ref = useRef<unknown>(null);
  const datepickerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', onClickOutsideHandler);
    }

    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  });

  function onClickOutsideHandler(event: Event) {
    if (
      showDatepicker &&
      datepickerWrapperRef &&
      datepickerWrapperRef.current &&
      // @ts-ignore
      !datepickerWrapperRef.current.contains(event.target)
    ) {
      onFocusChange(false);
    }
  }

  function handleDatepickerClose() {
    onClose();
    onFocusChange(false);
  }

  function onDatesChange({ focusedInput, startDate }: OnDatesChangeProps) {
    onDateChange({
      showDatepicker: focusedInput !== null,
      date: startDate,
    });
  }

  function handleInputChange(date: Date) {
    // @ts-ignore
    if (ref && ref.current && ref.current.onDateSelect) {
      // @ts-ignore
      ref.current.onDateSelect(date);
    }
  }

  return (
    <ThemeProvider theme={theme || {}}>
      <Box position="relative" ref={datepickerWrapperRef}>
        <Input
          id={inputId}
          ariaLabel={phrases.dateAriaLabel}
          placeholder={phrases.datePlaceholder}
          value={getInputValue(date, displayFormat, '')}
          onClick={() => onFocusChange(true)}
          showCalendarIcon={showCalendarIcon}
          vertical={vertical}
          isActive={false}
          onChange={handleInputChange}
          dateFormat={displayFormat}
        />
        <Box position="absolute" top={placement === 'bottom' ? '65px' : 0}>
          {showDatepicker && (
            <Datepicker
              exactMinBookingDays
              minBookingDays={1}
              onClose={handleDatepickerClose}
              startDate={date}
              endDate={date}
              minBookingDate={minBookingDate}
              maxBookingDate={maxBookingDate}
              firstDayOfWeek={firstDayOfWeek}
              numberOfMonths={numberOfMonths}
              focusedInput={showDatepicker ? START_DATE : null}
              displayFormat={displayFormat}
              onDatesChange={onDatesChange}
              isDateBlocked={isDateBlocked}
              showResetDates={showResetDate}
              vertical={vertical}
              showSelectedDates={false}
              showClose={showClose}
              dayLabelFormat={dayLabelFormat}
              weekdayLabelFormat={weekdayLabelFormat}
              monthLabelFormat={monthLabelFormat}
              onDayRender={onDayRender}
              phrases={phrases}
              ref={ref}
              unavailableDates={unavailableDates}
              initialVisibleMonth={initialVisibleMonth}
              theme={theme}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export type DateSingleInputDemoProps = {};
export const DateSingleInputDemo = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [showDatepicker, setShowDatepicker] = useState(false);

  return (
    <DateSingleInput
      date={date}
      showDatepicker={showDatepicker}
      onDateChange={(data: OnDateChangeProps) => {
        setDate(data.date);
        setShowDatepicker(data.showDatepicker);
      }}
      onFocusChange={(isFocused: boolean) => {
        setShowDatepicker(isFocused);
      }}
    />
  );
};
