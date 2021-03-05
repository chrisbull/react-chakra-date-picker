import _pick from 'lodash.pick'
import React, { createContext, FC, useContext } from 'react'
import merge from 'ts-deepmerge'
import { DatepickerStyles } from '../types'

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
  arrowIcon: {},
  buttonsWrapper: {},
  closeButton: {},
  datepickerContainer: {},
  dateRangeInputContainer: {},
  dateRangeInputDivider: {},
  day: {
    base: {},
    normal: {},
    rangeHover: {},
    selected: {},
    first: {},
    firstOrLast: {},
    last: {},
  },
  dayContainer: {
    base: {},
    normal: {},
    rangeHover: {},
    selected: {},
    first: {},
    firstOrLast: {},
    last: {},
  },
  inputComponentIcon: {
    active: {},
    default: {},
  },
  inputComponentInput: {
    active: {},
    default: {},
  },
  inputComponentInputAddon: {
    active: {},
    default: {},
  },
  inputComponentInputGroup: {
    active: {},
    default: {},
  },
  monthContainer: {},
  monthDayGrid: {},
  monthMonthLabel: {},
  monthsWrapper: {},
  monthWeekdayLabel: {},
  resetDatesButton: {},
  selectDateContainer: {
    active: {},
    default: {},
  },
  selectDateDateText: {
    active: {},
    default: {},
  },
  selectDateText: {
    active: {},
    default: {},
  },
  datepickerFooter: {},
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

export function useStyleProps<I extends DatepickerStyles>(inlineStyles: Partial<I>) {
  const { styles, overwriteDefaultStyles } = useContext(StylesContext)
  const keys = Object.keys(inlineStyles)
  const filteredStyles = _pick(styles, keys) as I
  const result = merge(filteredStyles, !overwriteDefaultStyles ? inlineStyles : ({} as I))
  return result
}
