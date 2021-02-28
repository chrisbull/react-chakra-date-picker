import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { CalendarDay, FirstDayOfWeek, useMonth } from '@datepicker-react/hooks'
import React from 'react'
import Day from './Day'

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

  return (
    <Box>
      <Flex justifyContent="center" m="0 0 28px">
        <Text fontWeight="bold">{monthLabel}</Text>
      </Flex>
      <SimpleGrid columns={7}>
        {weekdayLabels.map((weekdayLabel: string) => (
          <Flex key={weekdayLabel} justifyContent="center" m="0 0 16px">
            <Text color="gray.500 ">{weekdayLabel}</Text>
          </Flex>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={7}>
        {days.map((day: CalendarDay, index: number) => {
          if (typeof day === 'object') {
            return <Day date={day.date} key={day.dayLabel} day={day.dayLabel} />
          }
          return <div key={index} />
        })}
      </SimpleGrid>
    </Box>
  )
}
