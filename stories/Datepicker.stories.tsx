import { Button, Container } from '@chakra-ui/react'
import { FocusedInput, OnDatesChangeProps, START_DATE } from '@datepicker-react/hooks'
import { Meta, Story } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { Datepicker, DatepickerElement, DatepickerProps, InputDate } from '../src'
import { withChakra } from './utils/withChakra'

const meta: Meta = {
  title: 'Datepicker',
  component: Datepicker,
  parameters: {
    controls: { expanded: true },
  },
  decorators: [withChakra],
  args: {
    onDayRender: undefined,
  },
}
export default meta

const Template: Story<DatepickerProps> = args => {
  const datepickerRef = useRef<DatepickerElement>(null)

  const [startDate, setStartDate] = useState<InputDate>(null)
  const [endDate, setEndDate] = useState<InputDate>(null)
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(START_DATE)
  const [showDatepicker, setShowDatepicker] = useState(true)

  function handleOnFocusChange(_focusedInput: FocusedInput) {
    setFocusedInput(_focusedInput)
  }

  function handleOnDatesChange(data: OnDatesChangeProps) {
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setFocusedInput(data.focusedInput || START_DATE)
  }

  function handleOnClose() {
    handleOnFocusChange(null)
    setShowDatepicker(false)
    setFocusedInput(START_DATE)
  }

  return (
    <Container>
      {!showDatepicker && <Button onClick={() => setShowDatepicker(true)}>Open Datepicker</Button>}
      {showDatepicker && (
        <Datepicker
          {...args}
          ref={datepickerRef}
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          onClose={handleOnClose}
          onDatesChange={handleOnDatesChange}
        />
      )}
    </Container>
  )
}

export const Default = Template.bind({})
Default.args = {}
