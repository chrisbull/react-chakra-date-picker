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

export interface StylesContextProps {
  overwriteDefaultStyles: boolean
  styles: DatepickerStyles
}

export interface StylesProviderProps {
  overwriteDefaultStyles?: boolean
  styles?: Partial<DatepickerStyles>
}

export const emptyStylesObject: DatepickerStyles = {
  actionButton: {},
  closeButton: {},
  datepickerComponent: {},
  day: {},
  inputComponent: {},
  month: {},
  resetDatesButton: {},
  selectDate: {},
  dateRangeInputStyles: {},
}

export const StylesContext = createContext<StylesContextProps>({
  styles: emptyStylesObject,
  overwriteDefaultStyles: false,
})

export const StylesProvider: FC<StylesProviderProps> = ({
  children,
  overwriteDefaultStyles = false,
  styles = emptyStylesObject,
}) => (
  <StylesContext.Provider
    value={{ overwriteDefaultStyles, styles: merge(emptyStylesObject, styles) }}
  >
    {children}
  </StylesContext.Provider>
)

export function useStyles<K extends keyof DatepickerStyles>(
  key: K,
  inlineStyles: DatepickerStyles[K],
) {
  const { styles: customStyles, overwriteDefaultStyles } = useContext(StylesContext)
  const customStyle = customStyles[key]

  return overwriteDefaultStyles ? customStyle : merge(inlineStyles, customStyle)
}
