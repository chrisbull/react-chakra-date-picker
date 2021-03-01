import { Button, Flex, useTheme } from '@chakra-ui/react'
import { getColor } from '@chakra-ui/theme-tools'
import { useDay } from '@datepicker-react/hooks'
import React, { useContext, useRef } from 'react'
import merge from 'ts-deepmerge'
import { DatepickerContext } from '../context/DatepickerContext'
import { useThemeProps } from '../hooks/useThemeProps'

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
  } = useContext(DatepickerContext)

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

  const { onClick, onKeyDown, onMouseEnter, tabIndex } = dayProps

  const theme = useThemeProps()

  const chakraTheme = useTheme()

  const { isSelectedStartOrEnd, isSelected, isWithinHoverRange } = dayProps

  const { borderColor, ...buttonStyle } = merge(
    theme.dayNormal,
    isSelectedStartOrEnd
      ? theme.daySelectedFirstOrLast
      : isSelected
      ? theme.daySelected
      : isWithinHoverRange
      ? theme.dayRangeHover
      : {},
  )

  const _borderColor = getColor(chakraTheme, borderColor as string)

  return (
    <Button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      ref={dayRef}
      {...buttonStyle}
      boxShadow={`1px 0 0 0 ${_borderColor},
        0 1px 0 0 ${_borderColor},
        1px 1px 0 0 ${_borderColor},
        1px 0 0 0 ${_borderColor} inset,
        0 1px 0 0 ${_borderColor} inset`}
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
  )
}

export default Day
