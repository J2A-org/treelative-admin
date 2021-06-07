import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const authContext = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      AUTH_SESSION_ID: window.localStorage.getItem('AUTH_SESSION_ID')
    }
  }
})

const httpLink = new HttpLink({
  uri: import.meta.env.SNOWPACK_PUBLIC_GRAPHQL_URL
})

const link = authContext.concat(httpLink)

const cache = new InMemoryCache()

const defaultOptions = {
  watchQuery: {
    errorPolicy: 'all'
  },
  query: {
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
}

export default new ApolloClient({ link, cache, defaultOptions })
