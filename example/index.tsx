import 'react-app-polyfill/ie11'
import {
  ChakraProvider,
  Container,
  extendTheme,
  Heading,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react'
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
        h: 100,
      },
      baseStyle: {
        height: 100,
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
    },
    Input: {
      defaultProps: {
        h: 100,
      },
      baseStyle: {
        h: 100,
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
        <InputGroup>
          <Input />
        </InputGroup>
        <HookForm />
      </Container>
    </ChakraProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
