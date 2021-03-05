import { ChakraProvider, Container, extendTheme, Heading, Stack } from '@chakra-ui/react'
import * as React from 'react'
import { FC } from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { HookForm } from './HookForm'

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
        <HookForm />
      </Container>
    </ChakraProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
