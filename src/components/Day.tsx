import { BoxProps, Button, Flex, useTheme } from '@chakra-ui/react';
import { useDay } from '@datepicker-react/hooks';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { DatepickerContext } from '../context/DatepickerContext';
import { ThemeContext } from '../context/ThemeContext';

import { getColor } from '@chakra-ui/theme-tools';

function getStateColor(
  {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
  }: {
    isSelected: boolean;
    isSelectedStartOrEnd: boolean;
    isWithinHoverRange: boolean;
  },
  {
    selectedFirstOrLast,
    normal,
    selected,
    rangeHover,
  }: {
    selectedFirstOrLast: BoxProps['color'];
    selected: BoxProps['color'];
    normal: BoxProps['color'];
    rangeHover: BoxProps['color'];
  }
) {
  if (isSelectedStartOrEnd) {
    return selectedFirstOrLast;
  } else if (isSelected) {
    return selected;
  } else if (isWithinHoverRange) {
    return rangeHover;
  } else {
    return normal;
  }
}

interface DayProps {
  day: string;
  date: Date;
}

function Day({ day, date }: DayProps) {
  const dayRef = useRef<HTMLButtonElement>(null);

  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
    onDayRender,
  } = useContext(DatepickerContext);

  const dayProps = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  const { onClick, onKeyDown, onMouseEnter, tabIndex } = dayProps;

  useEffect(() => {
    if (dayProps.isSelected) {
      console.log('isSelected', dayProps);
    } else if (dayProps.isSelectedStartOrEnd) {
      console.log('isSelectedStartOrEnd', dayProps);
    } else if (dayProps.isWithinHoverRange) {
      console.log('isWithinHoverRange', dayProps);
    }

    return () => {};
  }, [dayProps]);

  const themeContext = useContext(ThemeContext);

  const chakraTheme = useTheme();

  const themeColors = {
    dayAccessibilityBorderColor: getColor(
      chakraTheme,
      themeContext.colors.accessibility
    ),
    dayBackground: getColor(chakraTheme, themeContext.colors.white),
    dayBorderColor: getColor(chakraTheme, themeContext.colors.normalDayHover),
    dayColor: getColor(chakraTheme, themeContext.colors.mud),
    dayHoverBackground: getColor(
      chakraTheme,
      themeContext.colors.normalDayHover
    ),
    dayHoverColor: getColor(chakraTheme, themeContext.colors.mud),
    dayHoverRangeBackground: getColor(
      chakraTheme,
      themeContext.colors.selectedDay
    ),
    dayHoverRangeBorderColor: getColor(
      chakraTheme,
      themeContext.colors.selectedDay
    ),
    dayHoverRangeColor: getColor(chakraTheme, themeContext.colors.white),
    daySelectedBackground: getColor(
      chakraTheme,
      themeContext.colors.selectedDay
    ),
    daySelectedBorderColor: getColor(
      chakraTheme,
      themeContext.colors.selectedDay
    ),
    daySelectedColor: getColor(chakraTheme, themeContext.colors.white),
    daySelectedFirstOrLastBackground: getColor(
      chakraTheme,
      themeContext.colors.primaryColor
    ),
    daySelectedFirstOrLastBorderColor: getColor(
      chakraTheme,
      themeContext.colors.primaryColor
    ),
    daySelectedFirstOrLastColor: getColor(
      chakraTheme,
      themeContext.colors.white
    ),
    daySelectedHoverBackground: getColor(
      chakraTheme,
      themeContext.colors.selectedDayHover
    ),
    daySelectedHoverColor: getColor(chakraTheme, themeContext.colors.white),
  };

  const borderColor = useMemo(
    () =>
      getStateColor(dayProps, {
        selectedFirstOrLast: themeColors.daySelectedFirstOrLastBorderColor,
        selected: themeColors.daySelectedBorderColor,
        normal: themeColors.dayBorderColor,
        rangeHover: themeColors.dayHoverRangeColor,
      }),
    [dayProps, themeContext]
  );

  const background = useMemo(
    () =>
      getStateColor(dayProps, {
        selectedFirstOrLast: themeColors.daySelectedFirstOrLastBackground,
        selected: themeColors.daySelectedBackground,
        normal: themeColors.dayBackground,
        rangeHover: themeColors.dayHoverRangeBackground,
      }),
    [dayProps, themeContext]
  );

  const color = useMemo(
    () =>
      getStateColor(dayProps, {
        selectedFirstOrLast: themeColors.daySelectedFirstOrLastColor,
        selected: themeColors.daySelectedColor,
        normal: themeColors.dayColor,
        rangeHover: themeColors.dayHoverRangeColor,
      }),
    [dayProps, themeContext]
  );

  return (
    <Button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      ref={dayRef}
      height={themeContext.daySize}
      width={themeContext.daySize}
      fontWeight={themeContext.dayFontWeight}
      fontSize={themeContext.dayFontSize}
      background={background}
      color={color}
      borderRadius={0}
      boxShadow={`1px 0 0 0 ${borderColor},
        0 1px 0 0 ${borderColor},
        1px 1px 0 0 ${borderColor},
        1px 0 0 0 ${borderColor} inset,
        0 1px 0 0 ${borderColor} inset`}
      data-testid="Day"
      aria-label={`Day-${date.toDateString()}`}
      type="button"
    >
      {typeof onDayRender === 'function' ? (
        onDayRender(date)
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          {day}
        </Flex>
      )}
    </Button>
  );
}

export default Day;
