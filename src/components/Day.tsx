import { Box, Button, Flex } from '@chakra-ui/react'
import { isEndDate, isStartDate, useDay } from '@datepicker-react/hooks'
import React, { useRef } from 'react'
import merge from 'ts-deepmerge'
import { useDatepickerContext } from '../hooks/useDatepickerContext'
import { useThemeContext } from '../hooks/useThemeContext'

function getColor(
  {
    isSelected,
    isWithinHoverRange,
    isFirst,
    isLast,
  }: {
    isSelected: boolean
    isWithinHoverRange: boolean
    isFirst: boolean
    isLast: boolean
    isSelectedStartOrEnd: boolean
    disabledDate: boolean
  },
  {
    base,
    normal,
    rangeHover,
    selected,
    firstOrLast,
    first,
    last,
  }: {
    base: any
    normal: any
    rangeHover: any
    selected: any
    firstOrLast: any
    first: any
    last: any
  },
) {
  let style = isSelected ? selected : isWithinHoverRange ? rangeHover : normal

  if (isFirst || isLast) {
    style = merge(style, firstOrLast)
  }

  if (isFirst) {
    style = merge(style, first)
  }

  if (isLast) {
    style = merge(style, last)
  }

  return merge(base, style)
}

interface DayProps {
  day: string
  date: Date
}

function Day({ day, date }: DayProps) {
  const dayRef = useRef<HTMLButtonElement>(null)

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
    startDate,
    endDate,
  } = useDatepickerContext()

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
  })

  const {
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
    isSelectedStartOrEnd,
    isSelected,
    isWithinHoverRange,
    disabledDate,
  } = dayProps

  const theme = useThemeContext()

  const isFirst = isStartDate(date, startDate)
  const isLast = isEndDate(date, endDate)

  const containerStyle = getColor(
    {
      isFirst,
      isLast,
      isSelected,
      isWithinHoverRange,
      isSelectedStartOrEnd,
      disabledDate,
    },
    {
      base: theme.dayBaseContainer,
      normal: theme.dayNormalContainer,
      rangeHover: theme.dayRangeHoverContainer,
      selected: theme.daySelectedContainer,
      first: theme.daySelectedFirstContainer,
      last: theme.daySelectedLastContainer,
      firstOrLast: theme.daySelectedFirstOrLastContainer,
    },
  )

  const buttonStyle = getColor(
    {
      isFirst,
      isLast,
      isSelected,
      isWithinHoverRange,
      isSelectedStartOrEnd,
      disabledDate,
    },
    {
      base: theme.dayBase,
      normal: theme.dayNormal,
      rangeHover: theme.dayRangeHover,
      selected: theme.daySelected,
      first: theme.daySelectedFirst,
      last: theme.daySelectedLast,
      firstOrLast: theme.daySelectedFirstOrLast,
    },
  )

  return (
    <Box {...containerStyle}>
      <Button
        variant="unstyled"
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        tabIndex={tabIndex}
        ref={dayRef}
        disabled={disabledDate}
        {...buttonStyle}
        data-testid="Day"
        aria-label={`Day-${date.toDateString()}`}
        type="button"
      >
        {typeof onDayRender === 'function' ? (
          onDayRender(date)
        ) : (
          <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
            {day}
          </Flex>
        )}
      </Button>
    </Box>
  )
}

export default Day
