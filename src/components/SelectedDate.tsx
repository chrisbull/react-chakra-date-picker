import { Stack, Text } from '@chakra-ui/react'
import { getInputValue } from '@datepicker-react/hooks'
import React from 'react'
import merge from 'ts-deepmerge'
import { useDatepickerContext } from '../hooks/useDatepickerContext'
import { useThemeContext } from '../hooks/useThemeContext'

export interface SelectedDateProps {
  isFocused: boolean
  date: Date | null
}

export const SelectedDate = ({ isFocused, date }: SelectedDateProps) => {
  const { phrases, displayFormat } = useDatepickerContext()
  const theme = useThemeContext()

  const containerProps = merge(
    theme.selectedDateContainer,
    isFocused ? theme.selectedDateContainerActive : {},
  )
  const textProps = merge(theme.selectedDateText, isFocused ? theme.selectedDateTextActive : {})
  const dateTextProps = merge(
    theme.selectedDateDateText,
    isFocused ? theme.selectedDateDateTextActive : {},
  )

  return (
    <Stack {...containerProps}>
      <Text {...textProps}>{phrases.datepickerStartDateLabel}</Text>
      <Text {...dateTextProps}>
        {getInputValue(date, displayFormat, phrases.datepickerStartDatePlaceholder)}
      </Text>
    </Stack>
  )
}
