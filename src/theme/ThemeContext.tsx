import { ChakraProvider } from '@chakra-ui/react'
import React, { createContext } from 'react'
import { DatepickerTheme } from './defaultTheme'

export const DatepickerThemeContext = createContext({} as DatepickerTheme)

export const DatepickerThemeProvider: React.FC<{
  theme: DatepickerTheme
}> = ({ children, theme }) => {
  return (
    <ChakraProvider>
      <DatepickerThemeContext.Provider value={theme}>{children}</DatepickerThemeContext.Provider>
    </ChakraProvider>
  )
}
