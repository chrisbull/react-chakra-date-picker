import {
  BoxProps,
  ButtonProps,
  CloseButtonProps,
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
  actionButton?: Partial<IconButtonProps>
}

export interface CloseButtonStyles {
  closeButton?: CloseButtonProps
}

export interface DatepickerComponentStyles {
  datepickerContainer?: BoxProps
  monthsWrapper?: StackProps
  buttonsWrapper?: BoxProps
  arrowIcon?: Omit<IconProps, 'css'>
}

export interface DayStyles {
  dayBase?: ButtonProps
  dayNormal?: ButtonProps
  dayRangeHover?: ButtonProps
  daySelected?: ButtonProps
  daySelectedFirstOrLast?: ButtonProps
  daySelectedFirst?: ButtonProps
  daySelectedLast?: ButtonProps
  dayBaseContainer?: ButtonProps
  dayNormalContainer?: BoxProps
  dayRangeHoverContainer?: BoxProps
  daySelectedContainer?: BoxProps
  daySelectedFirstOrLastContainer?: BoxProps
  daySelectedFirstContainer?: BoxProps
  daySelectedLastContainer?: BoxProps
}

export interface InputComponentStyles {
  default?: {
    inputGroup?: InputGroupProps
    input?: InputProps
    icon?: Omit<IconProps, 'css'>
    inputAddon?: InputAddonProps
  }
  active?: {
    inputGroup?: InputGroupProps
    input?: InputProps
    icon?: Omit<IconProps, 'css'>
    inputAddon?: InputAddonProps
  }
}

export interface MonthStyles {
  monthContainer?: BoxProps
  monthMonthLabel?: BoxProps
  monthWeekdayLabel?: BoxProps
  monthDayGrid?: SimpleGridProps
}

export interface ResetDatesButtonStyles {
  resetDatesButton?: ButtonProps
}

export interface SelectDateStyles {
  default?: {
    container?: StackProps
    text?: BoxProps
    dateText?: BoxProps
  }
  active?: {
    container?: StackProps
    text?: BoxProps
    dateText?: BoxProps
  }
}

export interface DateRangeInputStyles {
  selectDatesContainer?: StackProps
  selectDatesDivider?: StackDividerProps
}
