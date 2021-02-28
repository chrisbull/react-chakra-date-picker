import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import {
  DateSingleInput,
  OnDateChangeProps,
} from '../src/components/DateSingleInput';

const App = () => {
  const [date, setDate] = React.useState<Date | null>(null);

  const onDateChange = (data: OnDateChangeProps) => {};

  const onFocusChange = () => {};

  return (
    <ChakraProvider>
      <Container>
        <DateSingleInput
          date={date}
          onDateChange={onDateChange}
          onFocusChange={onFocusChange}
          showDatepicker={true}
        />
      </Container>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
