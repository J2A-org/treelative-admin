import React, { useState } from 'react'

import useDevice from 'hooks/useDevice'

import {
  Stack,
  Button,
  Divider,
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
import EditUserAvatar from 'components/users/edit/EditUserAvatar'
import ResetUserPassword from 'components/users/edit/ResetUserPassword'

const toast = createStandaloneToast()

export default function ViewUserGeneral ({ user, refetch, onClose }) {
  const { responsive } = useDevice()

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
        <Stack spacing='8' direction={responsive(['column-reverse', 'row'])} alignItems='center'>
          <Stack width='100%' spacing='8'>
            <FormControl>
              <FormLabel>Short Name (Nickname)</FormLabel>
              <EditUserShortName inline user={result.data.getUser} />
            </FormControl>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <EditUserFullName inline user={result.data.getUser} />
            </FormControl>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <EditUserDateOfBirth inline user={result.data.getUser} />
            </FormControl>
          </Stack>
          <Stack minW='150px' spacing='4' alignSelf='flex-start'>
            <EditUserAvatar user={result.data.getUser} />
            <FormControl>
              <FormLabel textAlign={responsive(['', 'right'])}>Username</FormLabel>
              <EditUserUsername inline user={result.data.getUser} textAlign={responsive(['', 'right'])} />
            </FormControl>
          </Stack>
        </Stack>
        <Stack spacing='8' direction={responsive(['column', 'row'])}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <EditUserEmail inline user={result.data.getUser} />
          </FormControl>
          <FormControl>
            <FormLabel textAlign={responsive(['', 'right'])}>Phone Number</FormLabel>
            <EditUserPhoneNumber inline user={result.data.getUser} textAlign={responsive(['', 'right'])} />
          </FormControl>
        </Stack>
        <Stack spacing='8'>
          <FormControl>
            <FormLabel>Birth Location</FormLabel>
            <EditUserBirthLocation inline user={result.data.getUser} />
          </FormControl>
          <FormControl>
            <FormLabel>Current Location</FormLabel>
            <EditUserCurrentLocation inline user={result.data.getUser} />
          </FormControl>
        </Stack>
        <Divider />
        <Stack width='100%'>
          {deleteUserResult.fetching && <Loading />}
          {deleteUserResult.error && <ErrorAlert> {deleteUserResult.error.message} </ErrorAlert>}
          <Stack spacing='8' direction={responsive(['column', 'row'])} justifyContent='space-between'>
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
