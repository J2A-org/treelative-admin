import { createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

import { devtoolsExchange } from '@urql/devtools'

export default createClient({
  url: import.meta.env.SNOWPACK_PUBLIC_GRAPHQL_URL,
  exchanges: [devtoolsExchange, dedupExchange, cacheExchange({}), fetchExchange],
  fetchOptions: () => {
    const AUTH_SESSION_ID = window.localStorage.getItem('AUTH_SESSION_ID') || null
    return {
      headers: { AUTH_SESSION_ID }
    }
  }
})
