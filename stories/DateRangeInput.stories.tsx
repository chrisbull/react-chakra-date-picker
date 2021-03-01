import { FocusedInput } from '@datepicker-react/hooks'
import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { DateRangeInput } from '../src'

const meta: Meta = {
  title: 'DateRangeInput',
  component: DateRangeInput,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

interface Props {}

const Template: Story<Props> = args => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(null)

  return (
    <DateRangeInput
      {...args}
      onDayRender={undefined}
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

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
