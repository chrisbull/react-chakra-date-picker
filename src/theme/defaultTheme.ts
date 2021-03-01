import {
  BoxProps,
  ButtonProps,
  IconButtonProps,
  IconProps,
  InputAddonProps,
  InputGroupProps,
  InputProps,
  StackProps,
  CloseButtonProps,
  SimpleGridProps,
} from '@chakra-ui/react'

export type DatepickerTheme = {
  datepickerContainer: BoxProps

  closeButton: CloseButtonProps

  selectedDateContainer: StackProps
  selectedDateContainerActive: StackProps
  selectedDateText: BoxProps
  selectedDateTextActive: BoxProps
  selectedDateDateText: BoxProps
  selectedDateDateTextActive: BoxProps
  selectedDateArrow: Omit<IconProps, 'css'>

  monthsContainer: StackProps

  monthContainer: BoxProps
  monthMonthLabel: BoxProps
  monthWeekdayLabel: BoxProps
  monthDayGrid: SimpleGridProps

  dayBase: ButtonProps
  dayNormal: ButtonProps
  dayRangeHover: ButtonProps
  daySelected: ButtonProps
  daySelectedFirstOrLast: ButtonProps
  daySelectedFirst: ButtonProps
  daySelectedLast: ButtonProps

  dayBaseContainer: ButtonProps
  dayNormalContainer: BoxProps
  dayRangeHoverContainer: BoxProps
  daySelectedContainer: BoxProps
  daySelectedFirstOrLastContainer: BoxProps
  daySelectedFirstContainer: BoxProps
  daySelectedLastContainer: BoxProps

  resetDatesButton: ButtonProps

  bottomContainer: BoxProps

  actionButton: Omit<IconButtonProps, 'aria-label'>
  actionButtonLeft: Omit<IconButtonProps, 'aria-label'>
  actionButtonRight: Omit<IconButtonProps, 'aria-label'>

  inputContainer: InputGroupProps
  inputContainerActive: InputGroupProps
  input: InputProps
  inputActive: InputProps
  inputIcon: Omit<IconProps, 'css'>
  inputIconActive: Omit<IconProps, 'css'>
  inputLeftAddon: InputAddonProps
  inputLeftAddonActive: InputAddonProps
}

export const datepickerTheme: DatepickerTheme = {
  inputContainer: {},
  inputContainerActive: {},
  input: {},
  inputActive: {},
  inputIcon: {},
  inputIconActive: {},
  inputLeftAddon: {},
  inputLeftAddonActive: {},

  datepickerContainer: {
    background: 'white',
    borderRadius: 'sm',
    position: 'relative',
    width: 'fit-content',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px',
    p: 5,
    pt: 10,
    zIndex: 1,
  },

  closeButton: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  selectedDateContainer: {
    width: '100%',
    borderBottom: '2px solid',
    borderBottomColor: 'transparent',
  },
  selectedDateContainerActive: {
    borderBottomColor: 'blue.300',
  },
  selectedDateText: {
    fontSize: 'xs',
    color: 'gray.500',
  },
  selectedDateTextActive: {},
  selectedDateDateText: {
    fontWeight: 'bold',
  },
  selectedDateDateTextActive: {},
  selectedDateArrow: {
    marginLeft: 15,
    marginRight: 15,
    height: '15px',
    width: '15px',
    color: 'gray.500',
  },

  monthsContainer: {
    spacing: 8,
  },

  monthContainer: {},
  monthMonthLabel: {
    justifyContent: 'center',
    fontWeight: 'bold',
    mb: 6,
    fontSize: ['md', 'lg'],
  },
  monthWeekdayLabel: {
    justifyContent: 'center',
    color: 'gray.500',
    mb: 4,
    fontSize: ['sm', 'md'],
  },
  monthDayGrid: {
    rowGap: 1,
  },

  //
  dayBase: {
    height: ['32px', '48px'],
    width: ['32px', '48px'],
    pl: 0,
    pr: 0,
    minWidth: 'unset',
    fontWeight: 'medium',
    fontSize: ['sm', 'md'],
    border: '2px solid',
    borderRadius: '100%',
    borderColor: 'transparent',
    background: 'transparent',
    _hover: {
      borderColor: 'transparent',
      background: 'transparent',
    },
  },
  dayNormal: {
    color: 'gray.900',
    _hover: {
      borderColor: 'black',
    },
  },
  dayRangeHover: {
    _hover: {
      borderColor: 'black',
    },
  },
  daySelected: {
    _hover: {
      borderColor: 'black',
    },
  },
  daySelectedFirstOrLast: {
    color: 'white',
    background: 'black',
    _hover: {
      color: 'white',
      background: 'black',
    },
  },
  daySelectedFirst: {},
  daySelectedLast: {},

  //
  dayBaseContainer: {
    height: ['32px', '48px'],
    width: ['32px', '48px'],
    _hover: {
      borderRightRadius: '100%',
    },
  },
  dayNormalContainer: {},
  dayRangeHoverContainer: {
    background: 'gray.100',
    _hover: {
      borderRightRadius: '100%',
    },
  },
  daySelectedContainer: {
    background: 'gray.100',
    _hover: {
      borderRightRadius: '0%',
    },
  },
  daySelectedFirstOrLastContainer: {
    background: 'gray.100',
  },
  daySelectedFirstContainer: {
    borderLeftRadius: '100%',
  },
  daySelectedLastContainer: {
    borderRightRadius: '100%',
    _hover: {
      borderRightRadius: '100%',
    },
  },

  resetDatesButton: {},

  bottomContainer: {
    alignItems: 'center',
    pt: 5,
  },

  actionButton: {
    position: 'relative',
  },
  actionButtonLeft: {},
  actionButtonRight: {},
}
