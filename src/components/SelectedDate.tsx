import { Stack, Text } from '@chakra-ui/react'
import { getInputValue } from '@datepicker-react/hooks'
import React from 'react'
import merge from 'ts-deepmerge'
import { useDatepickerContext } from '../context/DatepickerContext'
import { useStyleProps } from '../context/StylesContext'
import { InputDate } from '../types'

export interface SelectedDateProps {
  isFocused: boolean
  date: InputDate
}

export const SelectedDate = ({ isFocused, date }: SelectedDateProps) => {
  const { phrases, displayFormat } = useDatepickerContext()

  const styleProps = useStyleProps({
    selectDateContainer: {
      default: {
        width: '100%',
        borderBottom: '2px solid',
        borderColor: 'gray.300',
        paddingBottom: [1, 3],
      },
      active: {
        borderColor: 'blue.400',
      },
    },
    selectDateText: {
      default: {
        fontSize: 'xs',
        color: 'gray.500',
      },
      active: {},
    },
    selectDateDateText: {
      default: {
        fontWeight: 'bold',
        fontSize: ['sm', 'md', 'lg'],
      },
      active: {},
    },
  })

  const getStateStyle = (style: { default: any; active: any }) =>
    !isFocused ? style.default : merge(style.default, style.active)

  return (
    <Stack {...getStateStyle(styleProps.selectDateContainer)}>
      <Text {...getStateStyle(styleProps.selectDateText)}>{phrases.datepickerStartDateLabel}</Text>
      <Text {...getStateStyle(styleProps.selectDateDateText)}>
        {getInputValue(date, displayFormat, phrases.datepickerStartDatePlaceholder)}
      </Text>
    </Stack>
  )
}
