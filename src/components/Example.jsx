import React from 'react'

import { useQuery } from 'urql'
import { QUERY_USER } from '@/graphql/queries/users'

import {
  Stack,
  Heading,
  Table,
  Thead,
  Tr,
  Th
} from '@chakra-ui/react'

export default function Example () {
  const [result] = useQuery({
    query: QUERY_USER
  })

  const { data, fetching, error } = result

  const users = data?.users

  console.log(users)

  return (
    <Stack mt='8' alignItems='center'>
      {fetching && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {users && users.map(user => (
        <Table
          key={user.id}
          variant='simple'
        >
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Heading as='h3' size='sm'>{user.fullName}</Heading>
        </Table>
      ))}
    </Stack>
  )
}
