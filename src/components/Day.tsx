import { Box, Button, Flex } from '@chakra-ui/react'
import { isEndDate, isStartDate, useDay } from '@datepicker-react/hooks'
import React, { useRef } from 'react'
import merge from 'ts-deepmerge'
import { useDatepickerContext } from '../context/DatepickerContext'
import { useStyles } from '../context/StylesContext'
import { DayStyles } from '../types'

const dayStyles: DayStyles = {
  dayBase: {
    height: ['32px', '48px'],
    width: ['32px', '48px'],
    pl: 0,
    pr: 0,
    minWidth: 'unset',
    fontWeight: 'medium',
    fontSize: ['sm', 'md'],
    border: '2px solid',
    borderRadius: '100%',
    borderColor: 'transparent',
    background: 'transparent',
    _hover: {
      borderColor: 'transparent',
      background: 'transparent',
    },
  },
  dayNormal: {
    color: 'gray.900',
    _hover: {
      borderColor: 'black',
    },
  },
  dayRangeHover: {
    _hover: {
      borderColor: 'black',
    },
  },
  daySelected: {
    _hover: {
      borderColor: 'black',
    },
  },
  daySelectedFirstOrLast: {
    color: 'white',
    background: 'black',
    _hover: {
      color: 'white',
      background: 'black',
    },
  },
  daySelectedFirst: {},
  daySelectedLast: {},
  dayBaseContainer: {
    height: ['32px', '48px'],
    width: ['32px', '48px'],
    _hover: {
      borderRightRadius: '100%',
    },
  },
  dayNormalContainer: {},
  dayRangeHoverContainer: {
    background: 'gray.100',
    _hover: {
      borderRightRadius: '100%',
    },
  },
  daySelectedContainer: {
    background: 'gray.100',
    _hover: {
      borderRightRadius: '0%',
    },
  },
  daySelectedFirstOrLastContainer: {
    background: 'gray.100',
  },
  daySelectedFirstContainer: {
    borderLeftRadius: '100%',
  },
  daySelectedLastContainer: {
    borderRightRadius: '100%',
    _hover: {
      borderRightRadius: '100%',
    },
  },
}

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

export function Day({ day, date }: DayProps) {
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

  const styles = useStyles('day', dayStyles)

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
      base: styles.dayBaseContainer,
      normal: styles.dayNormalContainer,
      rangeHover: styles.dayRangeHoverContainer,
      selected: styles.daySelectedContainer,
      first: styles.daySelectedFirstContainer,
      last: styles.daySelectedLastContainer,
      firstOrLast: styles.daySelectedFirstOrLastContainer,
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
      base: styles.dayBase,
      normal: styles.dayNormal,
      rangeHover: styles.dayRangeHover,
      selected: styles.daySelected,
      first: styles.daySelectedFirst,
      last: styles.daySelectedLast,
      firstOrLast: styles.daySelectedFirstOrLast,
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
