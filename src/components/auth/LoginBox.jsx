import React, { useState, useEffect } from 'react'

import {
  Flex,
  Input,
  Stack,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

import { useMutation } from 'urql'
import { LOGIN } from 'graphql/mutations/auth'

import PasswordInput from 'components/_input/PasswordInput'
import ErrorAlert from 'components/_common/ErrorAlert'
import ErrorDialog from 'components/_common/ErrorDialog'

import ForgotPassword from 'components/auth/ForgotPassword'

const schemaValidation = object().shape({
  username: string().required(),
  password: string().required().min(3)
})

export default function LoginBox () {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  const [loginResult, login] = useMutation(LOGIN)

  const [internalError, setInternalError] = useState()

  const { register, handleSubmit, formState: { errors }, setFocus } = useForm({
    resolver: yupResolver(schemaValidation)
  })

  useEffect(() => { setTimeout(() => setFocus('username')) }, [])

  const onSubmit = (input) => {
    login({ input })
      .then(result => {
        if (result.data) {
          const prevPage = window.localStorage.getItem('REDIRECT_REFERRAL')
          window.localStorage.removeItem('REDIRECT_REFERRAL')
          window.localStorage.setItem('AUTH_SESSION_ID', result.data.login)
          window.location.href = prevPage || '/'
        }
      })
      .catch(setInternalError)
  }

  if (internalError) return <ErrorDialog>{internalError.message}</ErrorDialog>

  return (
    <>
      {isForgotPasswordOpen && <ForgotPassword onClose={() => setIsForgotPasswordOpen(false)} />}
      <Stack
        as='form'
        p='8'
        shadow='md'
        minW='25rem'
        rounded='lg'
        spacing='12'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl id='username' isRequired isInvalid={errors?.username}>
          <FormLabel>Username</FormLabel>
          <Input {...register('username')} type='username' autoComplete='username' size='lg' />
          <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='password' isRequired isInvalid={errors?.password}>
          <Flex justify='space-between'>
            <FormLabel>Password</FormLabel>
            <Button
              variant='link'
              color='orange.500'
              fontWeight='semibold'
              fontSize='sm'
              onClick={() => setIsForgotPasswordOpen(true)}
              tabIndex='-1'
            >
              Forgot Password?
            </Button>
          </Flex>
          <PasswordInput {...register('password')} size='lg' />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <Stack spacing='4' width='100%'>
          {loginResult.error && <ErrorAlert>{loginResult.error.message}</ErrorAlert>}
          <Button type='submit' size='lg' fontSize='md' isLoading={loginResult.fetching}>
            Sign in
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
