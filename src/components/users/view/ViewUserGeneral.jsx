import React from 'react'

import {
  Stack,
  FormLabel,
  FormControl
} from '@chakra-ui/react'

import { useQuery } from 'urql'
import { GET_USER_GENERAL } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import EditUserUsername from 'components/users/edit/EditUserUsername'
import EditUserDateOfBirth from 'components/users/edit/EditUserDateOfBirth'
import EditUserEmail from 'components/users/edit/EditUserEmail'
import EditUserPhoneNumber from 'components/users/edit/EditUserPhoneNumber'
import EditUserFullName from 'components/users/edit/EditUserFullName'
import EditUserShortName from 'components/users/edit/EditUserShortName'
import EditUserBirthLocation from 'components/users/edit/EditUserBirthLocation'
import EditUserCurrentLocation from 'components/users/edit/EditUserCurrentLocation'

export default function ViewUserGeneral ({ user }) {
  const [result] = useQuery({ query: GET_USER_GENERAL, variables: { filter: { id: user.id } } })

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorAlert> {result.error.message} </ErrorAlert>

  return (
    <Stack spacing='8'>
      <Stack direction='row'>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <EditUserUsername inline user={result.data.getUser} />
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <EditUserDateOfBirth inline user={result.data.getUser} />
        </FormControl>
      </Stack>
      <Stack direction='row'>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <EditUserFullName inline user={result.data.getUser} />
        </FormControl>
        <FormControl>
          <FormLabel>Short Name (Nickname)</FormLabel>
          <EditUserShortName inline user={result.data.getUser} />
        </FormControl>
      </Stack>
      <Stack direction='row'>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <EditUserEmail inline user={result.data.getUser} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <EditUserPhoneNumber inline user={result.data.getUser} />
        </FormControl>
      </Stack>
      <Stack direction='row'>
        <FormControl>
          <FormLabel>Birth Location</FormLabel>
          <EditUserBirthLocation inline user={result.data.getUser} />
        </FormControl>
        <FormControl>
          <FormLabel>Current Location</FormLabel>
          <EditUserCurrentLocation inline user={result.data.getUser} />
        </FormControl>
      </Stack>
    </Stack>
  )
}
