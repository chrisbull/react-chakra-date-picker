import { CalendarIcon } from '@chakra-ui/icons'
import {
  FormControl,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import { FormatFunction, parseDate } from '@datepicker-react/hooks'
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import merge from 'ts-deepmerge'
import { useStyles } from '../context/StylesContext'
import { InputDate } from '../types'
import { defaultDisplayFormat } from '../utils/formatters'

export interface InputProps {
  dateFormat?: string | FormatFunction
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

export const Input = forwardRef((props: InputProps, ref: Ref<any>) => {
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
  } = props

  const timeoutRef = useRef<any>(null)

  const [searchString, setSearchString] = useState(value)

  const { default: defaultStyles = {}, active: activeStyles = {} } = useStyles('inputComponent', {
    default: {
      inputGroup: {},
      input: {},
      icon: {},
      inputAddon: {},
    },
    active: {
      inputGroup: {},
      input: {},
      icon: {},
      inputAddon: {},
    },
  })

  const styles = merge(defaultStyles, isActive ? activeStyles : {})

  useEffect(() => {
    setSearchString(value)
  }, [value])

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value
    setSearchString(dateValue)

    if (typeof timeoutRef.current === 'number') {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
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

  return (
    <FormControl>
      <InputGroup {...styles.inputGroup} htmlFor={id}>
        {showCalendarIcon && (
          <InputLeftAddon {...styles.inputAddon}>
            <Icon as={iconComponent} {...styles.icon} />
          </InputLeftAddon>
        )}
        <ChakraInput
          {...styles.input}
          ref={ref}
          id={id}
          name={name}
          value={searchString}
          placeholder={placeholder}
          tabIndex={disableAccessibility ? -1 : 0}
          autoComplete="off"
          data-testid="DatepickerInput"
          onFocus={onClick}
          onChange={handleOnChange}
        />
      </InputGroup>
    </FormControl>
  )
})
