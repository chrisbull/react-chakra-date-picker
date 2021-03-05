import { Meta, Story } from '@storybook/react'
import React from 'react'
import { DateSingleInput, DateSingleInputProps } from '../src'
import { withChakra } from './utils/withChakra'

const meta: Meta = {
  title: 'DateSingleInput',
  component: DateSingleInput,
  parameters: {
    controls: { expanded: true },
  },
  decorators: [withChakra],
}
export default meta

const Template: Story<DateSingleInputProps> = args => <DateSingleInput {...args} />

export const Default = Template.bind({})
Default.args = {
  onDayRender: undefined,
}
