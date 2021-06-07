import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import App from '@/App.jsx'

import { ChakraProvider } from '@chakra-ui/react'

import { ApolloProvider } from '@apollo/client/react'
import client from '@/apollo/client'

render(
  <StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
if (import.meta.hot) {
  import.meta.hot.accept()
}
