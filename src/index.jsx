import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import App from './App.jsx'

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme'

import { Provider } from 'urql'
import client from 'graphql/client'

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider value={client}>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
if (import.meta.hot) {
  import.meta.hot.accept()
}
