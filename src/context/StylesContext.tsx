import React, { createContext, FC, useContext } from 'react'
import merge from 'ts-deepmerge'
import {
  ActionButtonStyles,
  CloseButtonStyles,
  DatepickerComponentStyles,
  DateRangeInputStyles,
  DayStyles,
  InputComponentStyles,
  MonthStyles,
  ResetDatesButtonStyles,
  SelectDateStyles,
} from '../types'

export interface DatepickerStyles {
  actionButton: ActionButtonStyles
  closeButton: CloseButtonStyles
  datepickerComponent: DatepickerComponentStyles
  day: DayStyles
  inputComponent: InputComponentStyles
  month: MonthStyles
  resetDatesButton: ResetDatesButtonStyles
  selectDate: SelectDateStyles
  dateRangeInputStyles: DateRangeInputStyles
}
interface StylesContextProps {
  overwriteDefaultStyles?: boolean
  customStyles?: Partial<DatepickerStyles>
}

export const StylesContext = createContext({} as StylesContextProps)

export const StylesContextProvider: FC<StylesContextProps> = ({
  children,
  overwriteDefaultStyles,
  customStyles,
}) => {
  return (
    <StylesContext.Provider value={{ overwriteDefaultStyles, customStyles }}>
      {children}
    </StylesContext.Provider>
  )
}

export function useStyles<K extends keyof DatepickerStyles>(
  key: K,
  inlineStyles: DatepickerStyles[K],
) {
  const { customStyles = {}, overwriteDefaultStyles } = useContext(StylesContext)
  const customStyle = customStyles[key] as DatepickerStyles[K]

  return overwriteDefaultStyles
    ? customStyle
    : merge(inlineStyles, customStyle || ({} as DatepickerStyles[K]))
}
