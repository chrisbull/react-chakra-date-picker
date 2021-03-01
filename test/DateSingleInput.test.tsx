import React from 'react'
import * as ReactDOM from 'react-dom'
import { Default as DateSingleInput } from '../stories/DateSingleInput.stories'

describe('DateSingleInput', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DateSingleInput />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
