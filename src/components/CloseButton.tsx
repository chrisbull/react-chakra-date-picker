import {
  CloseButton as ChakraCloseButton,
  CloseButtonProps as ChakraCloseButtonProps,
} from '@chakra-ui/react'
import React from 'react'
import { useThemeContext } from '../hooks/useThemeContext'

export interface CloseButtonProps extends ChakraCloseButtonProps {}

export const CloseButton: React.FC<CloseButtonProps> = props => {
  const theme = useThemeContext()
  return <ChakraCloseButton {...props} {...theme.closeButton} />
}
