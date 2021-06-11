import React from 'react'

import { useQuery } from 'urql'
import { QUERY_USER } from 'graphql/queries/users'

import {
  Stack,
  Heading
} from '@chakra-ui/react'

export default function Example () {
  const [result] = useQuery({
    query: QUERY_USER
  })

  const { data, fetching, error } = result

  const users = data?.users

  return (
    <Stack mt='8' alignItems='center'>
      {fetching && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {users && users.map(user => (
        <Heading key={user.id} as='h3' size='sm'>{user.fullName}</Heading>
      ))}
    </Stack>
  )
}
