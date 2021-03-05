import { CalendarIcon } from '@chakra-ui/icons'
import {
  FormControl,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import { parseDate } from '@datepicker-react/hooks'
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import { useStyleProps } from '../context/StylesContext'
import { InputDate } from '../types'
import { defaultDisplayFormat } from '../utils/formatters'

export interface InputProps {
  allowEditableInputs?: boolean
  dateFormat?: string
  disableAccessibility?: boolean
  iconComponent?: typeof CalendarIcon
  id?: string
  isActive?: boolean
  name?: string
  onChange?(date: InputDate): void
  onClick?(): void
  placeholder?: string
  showCalendarIcon?: boolean
  value?: string
}

export const Input = forwardRef((props: InputProps, inputRef: Ref<any>) => {
  const {
    dateFormat = defaultDisplayFormat,
    disableAccessibility,
    iconComponent = CalendarIcon,
    id,
    isActive = false,
    name,
    onChange = () => {},
    onClick = () => {},
    placeholder,
    showCalendarIcon = true,
    value,
    allowEditableInputs = false,
  } = props

  const ref = useRef<any>(null)

  const [searchString, setSearchString] = useState(value)

  const [touched, setTouched] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  const styleProps = useStyleProps({
    inputComponentInputGroup: {
      default: {},
      active: {},
    },
    inputComponentInput: {
      default: {},
      active: {},
    },
    inputComponentIcon: {
      default: {},
      active: {},
    },
    inputComponentInputAddon: {
      default: {},
      active: {},
    },
  })

  const getStateStyle = (style: { default: any; active: any }) =>
    !isActive ? style.default : style.active

  // Note: value was updated outside of InputComponent
  useEffect(() => {
    // reset states
    setIsInvalid(false)
    setSearchString(value)
  }, [value])

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value

    setTouched(true)
    setSearchString(dateValue)

    if (typeof ref.current === 'number') {
      clearTimeout(ref.current)
    }

    ref.current = setTimeout(() => {
      onClick()
      const parsedDate = parseDate(dateValue, dateFormat, new Date())
      const isValidDate = !isNaN(parsedDate.getDate())

      if (isValidDate) {
        setIsInvalid(false)
        onChange(parsedDate)
      } else {
        setIsInvalid(true)
        onChange(null)
      }
    }, 1000)
  }

  function handleOnFocus(_e: React.FocusEvent<HTMLInputElement>) {
    onClick()
    setTouched(true)
  }

  return (
    <FormControl isInvalid={touched && isInvalid}>
      <InputGroup {...getStateStyle(styleProps.inputComponentInputGroup)} htmlFor={id}>
        {showCalendarIcon && (
          <InputLeftAddon {...getStateStyle(styleProps.inputComponentInputAddon)}>
            <Icon as={iconComponent} {...getStateStyle(styleProps.inputComponentIcon)} />
          </InputLeftAddon>
        )}
        <ChakraInput
          {...getStateStyle(styleProps.inputComponentInput)}
          readOnly={!allowEditableInputs}
          ref={inputRef}
          id={id}
          name={name}
          value={searchString}
          placeholder={placeholder}
          tabIndex={disableAccessibility ? -1 : 0}
          autoComplete="off"
          data-testid="DatepickerInput"
          onFocus={handleOnFocus}
          onChange={handleOnChange}
        />
      </InputGroup>
    </FormControl>
  )
})
