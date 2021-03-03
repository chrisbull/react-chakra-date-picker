import { CalendarIcon } from '@chakra-ui/icons'
import {
  FormControl,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { FormatFunction, parseDate } from '@datepicker-react/hooks'
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import merge from 'ts-deepmerge'
import { useStyles } from '../context/StylesContext'

export interface InputProps extends Omit<ChakraInputProps, 'onChange'> {
  id: string
  name: string
  value: string
  onChange(date: Date): void
  onClick(): void
  disableAccessibility?: boolean
  iconComponent?: typeof CalendarIcon
  dateFormat?: string | FormatFunction
  isActive?: boolean
  showCalendarIcon?: boolean
  vertical?: boolean
}

export const Input = forwardRef(
  (
    {
      id,
      name,
      value,
      onChange,
      onClick,
      vertical,
      showCalendarIcon = true,
      isActive = false,
      dateFormat = 'MM/dd/yyyy',
      disableAccessibility = false,
      iconComponent = CalendarIcon,

      ...inputProps // placeholder, aria, etc
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const timeoutRef = useRef<any>(null)

    const [searchString, setSearchString] = useState(value)

    const stateStyles = useStyles('inputComponent', {
      default: {
        container: {},
        input: {},
        icon: {},
        inputAddon: {},
      },
      active: {
        container: {},
        input: {},
        icon: {},
        inputAddon: {},
      },
    })

    const styles = merge(stateStyles.default, isActive ? stateStyles.active : {})

    useEffect(() => {
      setSearchString(value)
    }, [value])

    return (
      <FormControl>
        <InputGroup {...styles.container} htmlFor={id}>
          {showCalendarIcon && (
            <InputLeftAddon {...styles.inputAddon}>
              <Icon as={iconComponent} {...styles.icon} />
            </InputLeftAddon>
          )}
          <ChakraInput
            {...styles.input}
            {...inputProps}
            ref={ref}
            id={id}
            name={name}
            tabIndex={disableAccessibility ? -1 : 0}
            value={searchString}
            onFocus={onClick}
            autoComplete="off"
            data-testid="DatepickerInput"
            onChange={e => {
              const dateValue = e.target.value

              console.log('dateValue', dateValue)

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
            }}
          />
        </InputGroup>
      </FormControl>
    )
  },
)
