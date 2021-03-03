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
import * as React from 'react'
import 'react-app-polyfill/ie11'
import { useForm } from 'react-hook-form'
import { DateRangeInput } from '../src/components/DateRangeInput'

const theme = extendTheme({
  components: {
    Container: {
      baseStyle: {},
    },
    InputGroup: {
      defaultProps: {
        height: '50px',
      },
      baseStyle: {
        height: '50px',
      },
      variants: {
        md: {
          height: '50px',
        },
      },
    },
  },
})

export function HookForm() {
  const { handleSubmit, errors, register, formState } = useForm()

  function validateName(value) {
    if (!value) {
      return 'Name is required'
    } else if (value !== 'Chris') {
      return "Jeez! You're not a fan 😱"
    } else return true
  }

  function validateExpirationDate(value) {
    if (!value) {
      return 'Name is required'
    } else {
      return true
    }
  }

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
        {/* <FormControl isInvalid={errors.name}>
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
        <FormControl>
          <FormLabel>Date Range</FormLabel>
          <DateRangeInput
            ids={['checkInDate', 'checkOutDate']}
            names={['checkInDate', 'checkOutDate']}
            refs={[
              register({ validate: validateExpirationDate }),
              register({ validate: validateExpirationDate }),
            ]}
          />
          <FormHelperText>Helper text goes here</FormHelperText>
          <FormErrorMessage>{errors.dateRange && errors.dateRange.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
        Submit
      </Button>
    </Box>
  )
}
