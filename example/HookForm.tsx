import {
  Box,
  Button,
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
import * as z from 'zod'
import { DateRangeInput, DateSingleInput } from '../.'

const dateValidation = z
  .string()
  .length(String('MM/dd/yyyy').length, 'Date is required')
  .refine(date => validator.isDate(date, { format: 'MM/dd/yyyy', strictMode: true }), {
    message: 'Date is required and must be in the form of mm/dd/yyyy',
  })

const schema = z.object({
  someDate: dateValidation,
  startDate: dateValidation,
  endDate: dateValidation,
})

type Schema = z.infer<typeof schema>

export function HookForm() {
  const { handleSubmit, errors, register, formState } = useForm({
    resolver: zodResolver(schema),
  })

  function onSubmit(values: Schema) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2))
        resolve(true)
      }, 500)
    })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5} my={5}>
        <FormControl isInvalid={!!errors?.someDate}>
          <FormLabel htmlFor="someDate">Some Date</FormLabel>
          <DateSingleInput ref={register} id="someDate" name="someDate" />
          <FormErrorMessage>{errors?.someDate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors?.startDate || !!errors?.endDate}>
          <FormLabel>Date Range</FormLabel>
          <DateRangeInput startRef={register} endRef={register} />
          <FormHelperText>Helper text goes here</FormHelperText>
          <FormErrorMessage>
            {errors?.startDate?.message || errors?.endDate?.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <Button type="submit" colorScheme="teal" isLoading={formState.isSubmitting}>
        Submit
      </Button>
    </Box>
  )
}
