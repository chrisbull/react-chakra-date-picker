import { CalendarIcon } from '@chakra-ui/icons'
import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { FormatFunction, parseDate } from '@datepicker-react/hooks'
import React, { useEffect, useRef, useState } from 'react'
import merge from 'ts-deepmerge'
import { useThemeProps } from '../hooks/useThemeProps'

export interface InputProps extends Omit<ChakraInputProps, 'onChange'> {
  onClick(): void
  value: string

  dateFormat?: string | FormatFunction
  disableAccessibility?: boolean
  iconComponent?: typeof CalendarIcon
  id?: string
  isActive?: boolean
  onChange?(date: Date): void
  showCalendarIcon?: boolean
  vertical?: boolean
}

export function Input({
  dateFormat = 'MM/dd/yyyy',
  disableAccessibility,
  iconComponent = CalendarIcon,
  id,
  isActive,
  onChange = () => {},
  onClick,
  showCalendarIcon,
  value,
}: InputProps) {
  const [searchString, setSearchString] = useState(value)

  const theme = useThemeProps()

  const ref = useRef<unknown>(null)

  useEffect(() => {
    setSearchString(value)
  }, [value])

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value
    setSearchString(dateValue)

    if (typeof ref.current === 'number') {
      clearTimeout(ref.current)
    }

    ref.current = setTimeout(() => {
      onClick()
      let _dateFormat =
        typeof dateFormat === 'function' ? dateFormat(new Date(dateValue)) : dateFormat
      const parsedDate = parseDate(dateValue, _dateFormat, new Date())

      // @ts-ignore
      if (!isNaN(parsedDate)) {
        onChange(parsedDate)
      }
    }, 1000)
  }

  const containerProps = merge(theme.inputContainer, isActive ? theme.inputContainerActive : {})
  const inputProps = merge(theme.input, isActive ? theme.inputActive : {})
  const leftAddonProps = merge(theme.inputLeftAddon, isActive ? theme.inputLeftAddonActive : {})
  const iconProps = merge(theme.inputIcon, isActive ? theme.inputIconActive : {})

  return (
    <InputGroup {...containerProps} htmlFor={id}>
      {showCalendarIcon && (
        <InputLeftAddon {...leftAddonProps}>
          <Icon as={iconComponent} {...iconProps} />
        </InputLeftAddon>
      )}
      <ChakraInput
        {...inputProps}
        tabIndex={disableAccessibility ? -1 : 0}
        id={id}
        value={searchString}
        autoComplete="off"
        onChange={handleOnChange}
        onFocus={onClick}
        data-testid="DatepickerInput"
      />
    </InputGroup>
  )
}
