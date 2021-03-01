import React, { useState } from 'react'
import { useRef } from 'react'
import { DateSingleInput, DateSingleInputProps } from '../../src/components/DateSingleInput'

export interface DateSingleInputDemoProps extends Partial<DateSingleInputProps> {
  vertical?: boolean
  inputId: string
}

export const DateSingleInputDemo = ({ vertical = false, ...props }: DateSingleInputDemoProps) => {
  const [date, setDate] = useState<Date | null>(null)
  const [showDatepicker, setShowDatepicker] = useState(false)

  const ref = useRef<any>(null)

  return (
    <DateSingleInput
      {...props}
      vertical={vertical}
      date={date}
      showDatepicker={showDatepicker}
      onDateChange={data => {
        setDate(data.date)
        setShowDatepicker(data.showDatepicker)
      }}
      onFocusChange={(isFocused: boolean) => {
        setShowDatepicker(isFocused)
      }}
      ref={ref}
    />
  )
}
