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
} from '@chakra-ui/react'

export type Theme = {
  colors: {
    primaryColor: string
    accessibility: string
    selectedDay: string
    selectedDayHover: string
    charcoal: string
    mud: string
    darcula: string
    greey: string
    silverCloud: string
    graci: string
    normalDayHover: string
    white: string
  }

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

  dayNormal: ButtonProps
  dayRangeHover: ButtonProps
  daySelected: ButtonProps
  daySelectedFirstOrLast: ButtonProps

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

export const defaultTheme: Theme = {
  colors: {
    primaryColor: 'blue.500',
    accessibility: 'blue.500',
    selectedDay: 'blue.200',
    selectedDayHover: 'blue.300',
    charcoal: 'gray.900',
    mud: 'gray.500',
    darcula: 'gray.700',
    greey: 'gray.400',
    silverCloud: 'gray.300',
    graci: 'gray.200',
    normalDayHover: 'gray.200',
    white: 'white',
  },

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
    m: '0 0 28px',
    fontWeight: 'bold',
  },
  monthWeekdayLabel: {
    justifyContent: 'center',
    m: '0 0 16px',
    color: 'gray.500',
  },

  dayNormal: {
    height: ['32px', '48px'],
    width: ['32px', '48px'],
    background: 'white',
    borderColor: 'gray.200',
    color: 'gray.800',
    fontWeight: 'md',
    fontSize: [12, 16],
    borderRadius: 0,

    _hover: {
      color: 'white',
      background: 'blue.500',
      borderColor: 'blue.500',
    },
  },
  dayRangeHover: {
    color: 'white',
    background: 'blue.200',
    borderColor: 'blue.200',
    _hover: {
      background: 'blue.300',
      borderColor: 'blue.300',
    },
  },
  daySelected: {
    color: 'white',
    background: 'blue.200',
    borderColor: 'blue.200',
    _hover: {
      background: 'blue.300',
      borderColor: 'blue.300',
    },
  },
  daySelectedFirstOrLast: {
    color: 'white',
    background: 'blue.500',
    borderColor: 'blue.500',
    _hover: {
      background: 'blue.500',
      borderColor: 'blue.500',
    },
  },

  resetDatesButton: {},

  bottomContainer: {
    alignItems: 'center',
    pt: 5,
  },

  actionButton: {
    size: 'sm',
  },
  actionButtonLeft: {},
  actionButtonRight: {},
}
