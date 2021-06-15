import React, { useState } from 'react'

import {
  Stack,
  Button,
  FormLabel,
  FormControl,
  createStandaloneToast
} from '@chakra-ui/react'

import { BiLock, BiTrash } from 'react-icons/bi'

import { useQuery, useMutation } from 'urql'
import { GET_USER_GENERAL } from 'graphql/queries/users'

import { DELETE_USER } from 'graphql/mutations/users'

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

import ResetUserPassword from 'components/users/edit/ResetUserPassword'

const toast = createStandaloneToast()

export default function ViewUserGeneral ({ user, refetch, onClose }) {
  const [resetPassword, setResetPassword] = useState(false)

  const [result] = useQuery({ query: GET_USER_GENERAL, variables: { filter: { id: user.id } } })

  const [deleteUserResult, deleteUser] = useMutation(DELETE_USER)

  const onDeleteUser = () => {
    const variables = { userID: user.id }
    deleteUser(variables)
      .then(result => {
        if (result.data) {
          refetch()
          toast({
            title: 'Successfully deleted the user',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
          onClose()
        }
      })
  }

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorAlert> {result.error.message} </ErrorAlert>

  return (
    <>
      {resetPassword && <ResetUserPassword user={user} onClose={() => setResetPassword(false)} />}
      <Stack spacing='8'>
        <Stack direction='row'>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <EditUserUsername inline user={result.data.getUser} />
          </FormControl>
          <FormControl>
            <FormLabel textAlign='right'>Date of Birth</FormLabel>
            <EditUserDateOfBirth inline user={result.data.getUser} textAlign='right' />
          </FormControl>
        </Stack>
        <Stack direction='row'>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <EditUserFullName inline user={result.data.getUser} />
          </FormControl>
          <FormControl>
            <FormLabel textAlign='right'>Short Name (Nickname)</FormLabel>
            <EditUserShortName inline user={result.data.getUser} textAlign='right' />
          </FormControl>
        </Stack>
        <Stack direction='row'>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <EditUserEmail inline user={result.data.getUser} />
          </FormControl>
          <FormControl>
            <FormLabel textAlign='right'>Phone Number</FormLabel>
            <EditUserPhoneNumber inline user={result.data.getUser} textAlign='right' />
          </FormControl>
        </Stack>
        <Stack direction='row'>
          <FormControl>
            <FormLabel>Birth Location</FormLabel>
            <EditUserBirthLocation inline user={result.data.getUser} />
          </FormControl>
          <FormControl>
            <FormLabel textAlign='right'>Current Location</FormLabel>
            <EditUserCurrentLocation inline user={result.data.getUser} textAlign='right' />
          </FormControl>
        </Stack>
        <Stack width='100%' spacing='4'>
          {deleteUserResult.fetching && <Loading />}
          {deleteUserResult.error && <ErrorAlert> {deleteUserResult.error.message} </ErrorAlert>}
          <Stack direction='row' justifyContent='space-between'>
            <Button
              colorScheme='orange'
              variant='outline'
              leftIcon={<BiLock />}
              onClick={() => setResetPassword(true)}
            >
              Reset Password
            </Button>
            <Button
              colorScheme='red'
              leftIcon={<BiTrash />}
              onClick={onDeleteUser}
              isLoading={deleteUserResult.fetching}
            >
              Delete User
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
