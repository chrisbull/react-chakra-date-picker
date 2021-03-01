import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useThemeContext } from '../hooks/useThemeContext'

export interface ActionButtonProps extends IconButtonProps {
  direction?: 'up' | 'right' | 'down' | 'left'
}

export const ActionButton: React.FC<ActionButtonProps> = ({ direction, ...props }) => {
  const theme = useThemeContext()

  let IconComponent = ChevronLeftIcon

  if (direction === 'up') {
    IconComponent = ChevronUpIcon
  } else if (direction === 'right') {
    IconComponent = ChevronRightIcon
  } else if (direction === 'down') {
    IconComponent = ChevronDownIcon
  } else if (direction === 'left') {
    IconComponent = ChevronLeftIcon
  }

  return <IconButton icon={<IconComponent />} {...theme.actionButton} {...props} />
}
