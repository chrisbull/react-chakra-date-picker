import { ArrowDownIcon, ArrowForwardIcon, ArrowLeftIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useThemeProps } from '../hooks/useThemeProps'

export interface SelectedDatesArrowProps {
  direction?: 'up' | 'right' | 'down' | 'left'
}

export const SelectedDatesArrow: React.FC<SelectedDatesArrowProps> = ({ direction = 'right' }) => {
  const theme = useThemeProps()

  let Component = ArrowForwardIcon

  if (direction === 'up') {
    Component = ArrowUpIcon
  } else if (direction === 'right') {
    Component = ArrowForwardIcon
  } else if (direction === 'down') {
    Component = ArrowDownIcon
  } else if (direction === 'left') {
    Component = ArrowLeftIcon
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <Component {...theme.selectedDateArrow} />
    </Flex>
  )
}
