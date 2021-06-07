import React from 'react'

import useQuery from '@/apollo/hooks/useQuery'
import { QUERY_USER } from '@/apollo/queries/users'

import Loading from '@/components/_common/Loading'
import ErrorAlert from '@/components/_common/ErrorAlert'

import {
  Stack,
  Heading
} from '@chakra-ui/react'

export default function Example () {
  const { loading, error, data } = useQuery(QUERY_USER)

  if (error) return <ErrorAlert>{error.message}</ErrorAlert>

  if (loading) return <Loading />

  const users = data?.queryUser

  return (
    <Stack mt='8' alignItems='center'>
      <Heading as='h2' size='md'>example fetching users</Heading>
      {users.map(user => (
        <Heading key={user.id} as='h3' size='sm'>{user.fullName}</Heading>
      ))}
    </Stack>
  )
}
