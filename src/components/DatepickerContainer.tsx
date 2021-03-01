import { Box } from '@chakra-ui/react'
import React from 'react'
import { useThemeProps } from '../hooks/useThemeProps'

export interface DatepickerContainerProps {}

export const DatepickerContainer: React.FC<DatepickerContainerProps> = ({ children }) => {
  const theme = useThemeProps()
  return <Box {...theme.datepickerContainer}>{children}</Box>
}
