import React, { useState, useEffect } from 'react'

import { RESET_USER_PASSWORD } from 'graphql/mutations/users'
import { useMutation } from 'urql'

import {
  Stack,
  FormLabel,
  FormControl,
  FormErrorMessage,
  createStandaloneToast
} from '@chakra-ui/react'

import FormDialog from 'components/_common/FormDialog'
import PasswordInput from 'components/_input/PasswordInput'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, ref } from 'yup'

const toast = createStandaloneToast()

const schemaValidation = object().shape({
  password: string().required().min(3),
  confirmPassword: string().required().oneOf([ref('password'), null], 'Passwords do not match')
})

export default function ResetUserPassword ({ user, onClose }) {
  const handleClose = () => {
    onClose()
    resetForm()
  }

  const [internalError, setInternalError] = useState()

  const [{ error, fetching }, resetUserPassword] = useMutation(RESET_USER_PASSWORD)

  const { register, handleSubmit, formState: { errors }, reset: resetForm, setFocus } = useForm({
    resolver: yupResolver(schemaValidation)
  })

  useEffect(() => { setTimeout(() => setFocus('password'), 1) }, [])

  const onSubmit = ({ password }) => {
    const variables = { userID: user.id, password }
    resetUserPassword(variables)
      .then(async result => {
        if (result.data) {
          toast({
            title: 'Successfully reset the password',
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
          handleClose()
        }
      })
      .catch(setInternalError)
  }

  return (
    <FormDialog
      title='Reset Password'
      formID='#resetPassword'
      error={error || internalError}
      loading={fetching}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing='8'>
        <FormControl id='password' isRequired isInvalid={errors?.password}>
          <FormLabel>New Password</FormLabel>
          <PasswordInput {...register('password')} />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='confirmPassword' isRequired isInvalid={errors?.confirmPassword}>
          <FormLabel>Confirm New Password</FormLabel>
          <PasswordInput {...register('confirmPassword')} />
          <FormErrorMessage>{errors?.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
    </FormDialog>
  )
}
