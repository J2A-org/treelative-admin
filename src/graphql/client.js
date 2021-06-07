import { createClient } from 'urql'

export default createClient({
  url: import.meta.env.SNOWPACK_PUBLIC_GRAPHQL_URL,
  fetchOptions: () => {
    const authorization = window.localStorage.getItem('AUTH_SESSION_ID') || null
    return {
      headers: { authorization }
    }
  }
})
