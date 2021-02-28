import { CalendarIcon } from '@chakra-ui/icons';
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FormatFunction, parseDate } from '@datepicker-react/hooks';
import React, { useEffect, useRef, useState } from 'react';

export interface InputProps extends Omit<ChakraInputProps, 'onChange'> {
  placeholder: string;
  value: string;
  id: string;
  ariaLabel: string;
  onClick(): void;
  showCalendarIcon: boolean;
  vertical: boolean;
  isActive: boolean;
  disableAccessibility?: boolean;
  onChange?(date: Date): void;
  dateFormat: string | FormatFunction;
}

export function Input({
  placeholder,
  id,
  ariaLabel,
  onClick,
  value,
  showCalendarIcon,
  disableAccessibility,
  dateFormat,
  onChange = () => {},
}: InputProps) {
  const [searchString, setSearchString] = useState(value);

  const ref = useRef<unknown>(null);

  useEffect(() => {
    setSearchString(value);
  }, [value]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value;
    setSearchString(dateValue);

    if (typeof ref.current === 'number') {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      onClick();
      let _dateFormat =
        typeof dateFormat === 'function'
          ? dateFormat(new Date(dateValue))
          : dateFormat;
      const parsedDate = parseDate(dateValue, _dateFormat, new Date());

      // @ts-ignore
      if (!isNaN(parsedDate)) {
        onChange(parsedDate);
      }
    }, 1000);
  }

  return (
    <InputGroup htmlFor={id}>
      {showCalendarIcon && (
        <InputLeftAddon>
          <CalendarIcon color="gray.500" />
        </InputLeftAddon>
      )}
      <ChakraInput
        tabIndex={disableAccessibility ? -1 : 0}
        id={id}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={searchString}
        autoComplete="off"
        onChange={handleOnChange}
        onFocus={onClick}
        data-testid="DatepickerInput"
      />
    </InputGroup>
  );
}
