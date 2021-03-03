import { RepeatIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useDatepickerContext } from '../context/DatepickerContext'
import { useStyles } from '../context/StylesContext'

interface ResetDatesProps {
  onResetDates(): void
  text: string
}

export function ResetDatesButton({ onResetDates, text }: ResetDatesProps) {
  const { phrases } = useDatepickerContext()

  const styles = useStyles('resetDatesButton', {
    resetDatesButton: {
      variant: 'ghost',
    },
  })

  function handleMouseUp(e: React.MouseEvent) {
    // @ts-ignore
    e.currentTarget.blur()
  }

  return (
    <Button
      icon={<RepeatIcon />}
      tabIndex={-1}
      aria-label={phrases.resetDates}
      {...styles.resetDatesButton}
      onClick={onResetDates}
      onMouseUp={handleMouseUp}
    >
      {text}
    </Button>
  )
}
