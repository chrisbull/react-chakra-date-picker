import { ChakraProvider } from '@chakra-ui/react'
import React, { createContext } from 'react'
import merge from 'ts-deepmerge'
import { defaultTheme, Theme } from '../defaultTheme'

export const ThemeContext = createContext({} as Theme)

export const ThemeProvider: React.FC<{ theme?: Partial<Theme> }> = ({
  children,
  theme: customTheme = {},
}) => {
  const theme = merge(defaultTheme, customTheme)
  return (
    <ChakraProvider>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ChakraProvider>
  )
}
