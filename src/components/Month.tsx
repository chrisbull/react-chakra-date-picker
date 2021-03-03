import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { CalendarDay, FirstDayOfWeek, useMonth } from '@datepicker-react/hooks'
import React from 'react'
import { useStyles } from '../context/StylesContext'
import { Day } from './Day'

export interface MonthProps {
  year: number
  month: number
  firstDayOfWeek: FirstDayOfWeek
  dayLabelFormat(date: Date): string
  weekdayLabelFormat(date: Date): string
  monthLabelFormat(date: Date): string
}

export const Month = ({
  year,
  month,
  firstDayOfWeek,
  dayLabelFormat,
  monthLabelFormat,
  weekdayLabelFormat,
}: MonthProps) => {
  const { days, weekdayLabels, monthLabel } = useMonth({
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    year,
    month,
    firstDayOfWeek,
  })

  const styles = useStyles('month', {
    monthContainer: {},
    monthMonthLabel: {
      justifyContent: 'center',
      fontWeight: 'bold',
      mb: 6,
      fontSize: ['md', 'lg'],
    },
    monthWeekdayLabel: {
      justifyContent: 'center',
      color: 'gray.500',
      mb: 4,
      fontSize: ['sm', 'md'],
    },
    monthDayGrid: {
      rowGap: 1,
    },
  })

  return (
    <Box {...styles.monthContainer}>
      <Flex {...styles.monthMonthLabel}>
        <Text>{monthLabel}</Text>
      </Flex>
      <SimpleGrid columns={7}>
        {weekdayLabels.map((weekdayLabel: string) => (
          <Flex key={weekdayLabel} {...styles.monthWeekdayLabel}>
            <Text>{weekdayLabel}</Text>
          </Flex>
        ))}
      </SimpleGrid>
      <SimpleGrid {...styles.monthDayGrid} columns={7}>
        {days.map((day: CalendarDay, index: number) =>
          typeof day === 'object' ? (
            <Day date={day.date} key={`${day.dayLabel}-${index}`} day={day.dayLabel} />
          ) : (
            <div key={index} />
          ),
        )}
      </SimpleGrid>
    </Box>
  )
}
