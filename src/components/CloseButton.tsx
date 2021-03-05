import {
  CloseButton as ChakraCloseButton,
  CloseButtonProps as ChakraCloseButtonProps,
} from '@chakra-ui/react'
import React from 'react'
import { useStyleProps } from '../context/StylesContext'

export interface CloseButtonProps extends ChakraCloseButtonProps {}

export const CloseButton = (props: CloseButtonProps) => {
  const styleProps = useStyleProps({
    closeButton: {
      top: 1,
      right: 1,
      zIndex: 1,
      position: 'absolute',
    },
  })
  return <ChakraCloseButton {...styleProps.closeButton} {...props} />
}
