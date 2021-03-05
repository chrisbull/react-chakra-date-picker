import {
  Box,
  Button,
  extendTheme,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Stack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import 'react-app-polyfill/ie11'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import * as yup from 'yup'
import * as z from 'zod'
import { DateRangeInput, DateSingleInput } from '../src'

const dateValidation = z
  .string()
  .refine(date => validator.isDate(date, { format: 'MM/dd/yyyy', strictMode: true }), {
    message: 'Date must be in the format of MM/dd/yyyy',
  })

const schema = z.object({
  someDate: dateValidation,
  startDate: dateValidation,
  endDate: dateValidation,
})

type Schema = z.infer<typeof schema>

const theme = extendTheme({
  components: {
    Container: {
      baseStyle: {},
    },
    InputGroup: {
      defaultProps: { height: '50px' },
      baseStyle: { height: '50px' },
      variants: { md: { height: '50px' } },
    },
  },
})

export function HookForm() {
  const { handleSubmit, errors, register, formState, getValues } = useForm({
    resolver: zodResolver(schema),
  })

  function onSubmit(values) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2))
        resolve(true)
      }, 500)
    })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5} mt={5}>
        {/* 
        <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input name="name" placeholder="name" ref={register({ validate: validateName })} />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.expirationDate}>
            <FormLabel htmlFor="expirationDate">Expiration Date</FormLabel>
            <DateSingleInput
              id="expirationDate"
              name="expirationDate"
              ref={register({ validate: validateExpirationDate })}
              showCalendarIcon={false}
              placeholder="Expiration Date"
            />
            <FormHelperText>Helper text goes here</FormHelperText>
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl> */}

        <FormControl isInvalid={!!errors.someDate}>
          <FormLabel htmlFor="someDate">Some Date</FormLabel>
          <DateSingleInput ref={register} id="someDate" name="someDate" />
          <FormErrorMessage>{errors.someDate && errors.someDate.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.startDate || !!errors.endDate}>
          <FormLabel>Date Range</FormLabel>
          <DateRangeInput startRef={register} endRef={register} />
          <FormHelperText>Helper text goes here</FormHelperText>
          <FormErrorMessage>
            {(errors.startDate && errors.startDate.message) ||
              (errors.endDate && errors.endDate.message)}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </Box>
  )
}
