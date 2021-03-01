import {
  CloseButton as ChakraCloseButton,
  CloseButtonProps as ChakraCloseButtonProps,
} from '@chakra-ui/react'
import React from 'react'
import { useThemeProps } from '../hooks/useThemeProps'

export interface CloseButtonProps extends ChakraCloseButtonProps {}

export const CloseButton: React.FC<CloseButtonProps> = props => {
  const theme = useThemeProps()
  return <ChakraCloseButton {...props} {...theme.closeButton} />
}
