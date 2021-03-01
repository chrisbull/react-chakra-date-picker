import { Button } from '@chakra-ui/react'
import React from 'react'
import { RepeatIcon } from '@chakra-ui/icons'
import { useThemeProps } from '../hooks/useThemeProps'
import { useDatepickerContext } from '../hooks/useDatepickerContext'

interface ResetDatesProps {
  onResetDates(): void
  text: string
}

export function ResetDates({ onResetDates, text }: ResetDatesProps) {
  const theme = useThemeProps()
  const { phrases } = useDatepickerContext()

  function handleMouseUp(e: React.MouseEvent) {
    // @ts-ignore
    e.currentTarget.blur()
  }

  return (
    <Button
      icon={<RepeatIcon />}
      tabIndex={-1}
      aria-label={phrases.resetDates}
      {...theme.resetDatesButton}
      onClick={onResetDates}
      onMouseUp={handleMouseUp}
    >
      {text}
    </Button>
  )
}
