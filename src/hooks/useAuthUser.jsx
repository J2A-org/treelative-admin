import client from 'graphql/client'

import { WHO_AM_I } from 'graphql/queries/auth'

export default function useAuthUser () {
  // fetch the cached authUser
  const { whoAmI: authUser } = client.readQuery(WHO_AM_I) || {}

  return authUser
}
