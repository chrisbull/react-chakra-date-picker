import React, { createContext, FC, useContext } from 'react'
import merge from 'ts-deepmerge'
import { DatepickerStyles, StylesContextProps, StylesProviderProps } from '../types'

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
