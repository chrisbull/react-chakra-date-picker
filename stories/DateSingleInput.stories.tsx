import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { DateSingleInput } from '../src'

const meta: Meta = {
  title: 'DateSingleInput',
  component: DateSingleInput,
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
  const [date, setDate] = useState<Date | null>(null)
  const [showDatepicker, setShowDatepicker] = useState(false)

  return (
    <DateSingleInput
      {...args}
      onDayRender={undefined}
      date={date}
      showDatepicker={showDatepicker}
      onDateChange={data => {
        setDate(data.date)
        setShowDatepicker(data.showDatepicker)
      }}
      onFocusChange={(isFocused: boolean) => {
        setShowDatepicker(isFocused)
      }}
    />
  )
}

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
