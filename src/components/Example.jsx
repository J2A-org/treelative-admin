import React from 'react'

import { useQuery } from 'urql'
import { QUERY_USER } from '@/graphql/queries/users'

import {
  Stack,
  Heading
} from '@chakra-ui/react'

export default function Example () {
  const [result] = useQuery({
    query: QUERY_USER
  })

  const { data, fetching, error } = result

  if (error) return <p>{error.message}</p>

  if (fetching) return <p>Loading...</p>

  const users = data?.users

  return (
    <Stack mt='8' alignItems='center'>
      <Heading as='h2' size='md'>example fetching users</Heading>
      {users.map(user => (
        <Heading key={user.id} as='h3' size='sm'>{user.fullName}</Heading>
      ))}
    </Stack>
  )
}
