import 'react-app-polyfill/ie11'
import {
  ChakraProvider,
  Container,
  extendTheme,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import { FC } from 'react'
import * as ReactDOM from 'react-dom'
import { HookForm } from './HookForm'
import { CalendarIcon } from '@chakra-ui/icons'

const theme = extendTheme({
  components: {
    Container: {},
    Button: {},
    InputGroup: {},
    Input: {},
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
          <InputLeftAddon>
            <CalendarIcon />
          </InputLeftAddon>
          <Input />
        </InputGroup>
        <HookForm />
      </Container>
    </ChakraProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
