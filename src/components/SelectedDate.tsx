import { Stack, Text } from '@chakra-ui/react'
import { getInputValue } from '@datepicker-react/hooks'
import React, { useMemo } from 'react'
import { useDatepickerContext } from '../context/DatepickerContext'
import { useStyles } from '../context/StylesContext'
import { InputDate } from '../types'

export interface SelectedDateProps {
  isFocused: boolean
  date: InputDate
}

export const SelectedDate = ({ isFocused, date }: SelectedDateProps) => {
  const { phrases, displayFormat } = useDatepickerContext()
  const styles = useStyles('selectDate', {
    selectedDateContainer: {
      width: '100%',
      borderBottom: '2px solid',
      borderBottomColor: 'transparent',
    },
    selectedDateContainerActive: {
      borderBottomColor: 'blue.300',
    },
    selectedDateText: {
      fontSize: 'xs',
      color: 'gray.500',
    },
    selectedDateTextActive: {},

    selectedDateDateText: {
      fontWeight: 'bold',
    },
    selectedDateDateTextActive: {},
  })

  const stateStyles = useMemo(
    () =>
      !isFocused
        ? {
            container: styles.selectedDateContainer,
            text: styles.selectedDateText,
            dateText: styles.selectedDateDateText,
          }
        : {
            container: styles.selectedDateContainerActive,
            text: styles.selectedDateTextActive,
            dateText: styles.selectedDateDateTextActive,
          },
    [isFocused, styles],
  )

  return (
    <Stack {...stateStyles.container}>
      <Text {...stateStyles.text}>{phrases.datepickerStartDateLabel}</Text>
      <Text {...stateStyles.dateText}>
        {getInputValue(date, displayFormat, phrases.datepickerStartDatePlaceholder)}
      </Text>
    </Stack>
  )
}
