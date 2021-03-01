import { Box } from '@chakra-ui/react'
import React from 'react'
import { useThemeContext } from '../hooks/useThemeContext'

export interface DatepickerContainerProps {}

export const DatepickerContainer: React.FC<DatepickerContainerProps> = ({ children }) => {
  const theme = useThemeContext()
  return <Box {...theme.datepickerContainer}>{children}</Box>
}
