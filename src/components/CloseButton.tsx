import {
  CloseButton as ChakraCloseButton,
  CloseButtonProps as ChakraCloseButtonProps,
} from '@chakra-ui/react'
import React from 'react'
import { useStyles } from '../context/StylesContext'
import { CloseButtonStyles } from '../types'

const closeButtonStyles: CloseButtonStyles = {
  closeButton: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
  },
}

export interface CloseButtonProps extends ChakraCloseButtonProps {}

export const CloseButton: React.FC<CloseButtonProps> = props => {
  const styles = useStyles('closeButton', closeButtonStyles)
  return <ChakraCloseButton {...styles.closeButton} {...props} />
}
