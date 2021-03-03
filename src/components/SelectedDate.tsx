import { Stack, Text } from '@chakra-ui/react'
import { getInputValue } from '@datepicker-react/hooks'
import React from 'react'
import merge from 'ts-deepmerge'
import { useDatepickerContext } from '../context/DatepickerContext'
import { useStyles } from '../context/StylesContext'
import { InputDate } from '../types'

export interface SelectedDateProps {
  isFocused: boolean
  date: InputDate
}

export const SelectedDate = ({ isFocused, date }: SelectedDateProps) => {
  const { phrases, displayFormat } = useDatepickerContext()

  const { default: defaultStyle = {}, active: activeStyle = {} } = useStyles('selectDate', {
    default: {
      container: {
        width: '100%',
        borderBottom: '2px solid',
        borderBottomColor: 'transparent',
      },
      text: {
        fontSize: 'xs',
        color: 'gray.500',
      },
      dateText: {
        fontWeight: 'bold',
      },
    },
    active: {
      container: {
        borderBottomColor: 'blue.300',
      },
      text: {},
      dateText: {},
    },
  })

  const styles = merge(defaultStyle, isFocused ? activeStyle : {})

  return (
    <Stack {...styles.container}>
      <Text {...styles.text}>{phrases.datepickerStartDateLabel}</Text>
      <Text {...styles.dateText}>
        {getInputValue(date, displayFormat, phrases.datepickerStartDatePlaceholder)}
      </Text>
    </Stack>
  )
}
