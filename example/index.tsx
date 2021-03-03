import 'react-app-polyfill/ie11'
import { ChakraProvider, Container, extendTheme, Heading, Stack } from '@chakra-ui/react'
import * as React from 'react'
import { FC } from 'react'
import * as ReactDOM from 'react-dom'
import { HookForm } from './HookForm'

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

const Card: FC = ({ children }) => (
  <Stack mt={5} mb={5}>
    {children}
  </Stack>
)
const Subhead: FC = ({ children }) => (
  <Heading size="sm" as="h5">
    {children}
  </Heading>
)

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container mt={10}>
        <Heading>React Chakra-UI Date Picker</Heading>
        <HookForm />

        <Stack>
          {/* <Card>
            <Subhead>Single Date Picker</Subhead>
            <DateSingleInput />
          </Card> */}
          {/* <Card>
            <Subhead>Date Range Picker</Subhead>
            <DateRangeInputDemo
              startDateInputId="horizontal-startDate-range"
              endDateInputId="horizontal-endDate"
            />
          </Card> */}
          {/* <Card>
            <Subhead>Single Date Picker</Subhead>
            <DateSingleInputDemo inputId="vertical-startDate-single" vertical />
          </Card> */}
          {/* <Card>
            <Subhead>Date Range Picker</Subhead>
            <DateRangeInputDemo
              startDateInputId="vertical-startDate-range"
              endDateInputId="vertical-endDate"
              vertical
            />
          </Card> */}
        </Stack>
      </Container>
    </ChakraProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
