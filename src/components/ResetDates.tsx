import { Button } from '@chakra-ui/react';
import React from 'react';
import { RepeatIcon } from '@chakra-ui/icons';

interface ResetDatesProps {
  onResetDates(): void;
  text: string;
}

export function ResetDates({ onResetDates, text }: ResetDatesProps) {
  function handleMouseUp(e: React.MouseEvent) {
    // @ts-ignore
    e.currentTarget.blur();
  }

  return (
    <Button
      aria-label="Reset dates"
      tabIndex={-1}
      onClick={onResetDates}
      onMouseUp={handleMouseUp}
      icon={<RepeatIcon />}
    >
      {text}
    </Button>
  );
}
