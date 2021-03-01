import React from 'react'
import * as ReactDOM from 'react-dom'
import { Default as Datepicker } from '../stories/Datepicker.stories'

describe('Datepicker', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Datepicker />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
