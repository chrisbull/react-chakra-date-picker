import { START_DATE } from '@datepicker-react/hooks'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { DateRangeInput, DateRangeInputProps } from '../src'
import { withChakra } from './utils/withChakra'

const meta: Meta = {
  title: 'DateRangeInput',
  component: DateRangeInput,
  parameters: {
    controls: { expanded: true },
  },
  decorators: [withChakra],
  args: {
    onDayRender: undefined,
    focusedInput: START_DATE,
  },
}
export default meta

const Template: Story<DateRangeInputProps> = args => <DateRangeInput {...args} />

export const Default = Template.bind({})
Default.args = {}
