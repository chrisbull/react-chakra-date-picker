import { FocusedInput } from '@datepicker-react/hooks'
import React, { useState } from 'react'
import { DateRangeInput, DateRangeInputProps } from '../../src/components/DateRangeInput'

export interface DateRangeInputDemoProps extends Partial<DateRangeInputProps> {
  vertical?: boolean
  startDateInputId: string
  endDateInputId: string
}

export const DateRangeInputDemo = ({ vertical = false, ...props }: DateRangeInputDemoProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(null)

  return (
    <DateRangeInput
      {...props}
      vertical={vertical}
      startDate={startDate}
      endDate={endDate}
      focusedInput={focusedInput}
      onDatesChange={data => {
        setStartDate(data.startDate)
        setEndDate(data.endDate)
        setFocusedInput(data.focusedInput)
      }}
      onFocusChange={focused => {
        setFocusedInput(focused)
      }}
    />
  )
}
