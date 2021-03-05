import { ChakraProvider, Container, extendTheme, Heading } from '@chakra-ui/react'
import * as React from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { HookForm } from './HookForm'

const theme = extendTheme({})

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
