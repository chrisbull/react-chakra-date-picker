import {
  BoxProps,
  ButtonProps,
  CloseButtonProps,
  FlexProps,
  IconButtonProps,
  IconProps,
  InputAddonProps,
  InputGroupProps,
  InputProps,
  SimpleGridProps,
  StackDividerProps,
  StackProps,
} from '@chakra-ui/react'

export interface ActionButtonStyles {
  actionButton: Partial<IconButtonProps>
}

export interface CloseButtonStyles {
  closeButton: Partial<CloseButtonProps>
}

export interface DatepickerComponentStyles {
  datepickerContainer: BoxProps
  monthsWrapper: StackProps
  buttonsWrapper: StackProps
  arrowIcon: Omit<IconProps, 'css'>
  datepickerFooter: FlexProps
}

export interface DayState<T extends any> {
  base: T
  normal: T
  rangeHover: T
  selected: T
  firstOrLast: T
  first: T
  last: T
}

export interface DayStyles {
  day: DayState<ButtonProps>
  dayContainer: DayState<BoxProps>
}

export interface InputComponentStyles {
  inputComponentInputGroup: {
    default: InputGroupProps
    active: InputGroupProps
  }
  inputComponentInput: {
    default: InputProps
    active: InputProps
  }
  inputComponentIcon: {
    default: Omit<IconProps, 'css'>
    active: Omit<IconProps, 'css'>
  }
  inputComponentInputAddon: {
    default: InputAddonProps
    active: InputAddonProps
  }
}

export interface MonthStyles {
  monthContainer: BoxProps
  monthMonthLabel: BoxProps
  monthWeekdayLabel: BoxProps
  monthDayGrid: SimpleGridProps
}

export interface ResetDatesButtonStyles {
  resetDatesButton: ButtonProps
}

export interface SelectDateStyles {
  selectDateContainer: {
    default: StackProps
    active: StackProps
  }
  selectDateText: {
    default: BoxProps
    active: BoxProps
  }
  selectDateDateText: {
    default: BoxProps
    active: BoxProps
  }
}

export interface DateRangeInputStyles {
  dateRangeInputContainer: StackProps
  dateRangeInputDivider: StackDividerProps
}

export interface DatepickerStyles
  extends ActionButtonStyles,
    CloseButtonStyles,
    DatepickerComponentStyles,
    DayStyles,
    InputComponentStyles,
    MonthStyles,
    ResetDatesButtonStyles,
    SelectDateStyles,
    DateRangeInputStyles {}
