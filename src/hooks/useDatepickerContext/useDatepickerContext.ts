import { useContext } from 'react'
import { DatepickerContext } from '../../context/DatepickerContext'

export const useDatepickerContext = () => useContext(DatepickerContext)
