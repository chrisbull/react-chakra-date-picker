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
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import 'react-app-polyfill/ie11'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { DateRangeInput } from '../src/components/DateRangeInput'
import { DateSingleInput } from '../src/components/DateSingleInput'

const schema = yup.object().shape({
  someDate: yup.date().required(),

  startDate: yup.date().default(function() {
    return new Date()
  }),

  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date should be greator')
    .default(function() {
      return new Date()
    }),
})

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
  const { handleSubmit, errors, register, formState, getValues } = useForm({
    resolver: yupResolver(schema),
  })

  React.useEffect(() => {
    console.log('formState', getValues())
  }, [formState, getValues])

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

        <FormControl isInvalid={errors.someDate}>
          <FormLabel htmlFor="someDate">Some Date</FormLabel>
          <DateSingleInput ref={register} id="someDate" name="someDate" />
          <FormErrorMessage>{errors.someDate && errors.someDate.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.startDate || errors.endDate}>
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
