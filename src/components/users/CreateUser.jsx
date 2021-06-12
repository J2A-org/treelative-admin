import React, { useState, useEffect } from 'react'

import { ADD_USER } from 'graphql/mutations/users'
import { useMutation } from 'urql'

import { startOfToday } from 'date-fns'

import {
  Input,
  Stack,
  Button,
  useToast,
  FormLabel,
  FormControl,
  useDisclosure,
  FormErrorMessage
} from '@chakra-ui/react'

import { FaPlus } from 'react-icons/fa'

import FormDialog from 'components/_common/FormDialog'
import PasswordInput from 'components/_input/PasswordInput'
import DateTimePicker from 'components/_input/DateTimePicker'
import GooglePlacesSelect from 'components/_select/GooglePlacesSelect'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

const schemaValidation = object().shape({
  username: string().required(),
  password: string().required().min(3),
  email: string().email(),
  phoneNumber: string().matches(/^\+?\d{10,14}$/, { message: 'Invalid Phone Number', excludeEmptyString: true }),
  fullName: string().required(),
  shortName: string().required()
})

export default function CreateUser ({ onCreateComplete }) {
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    onClose()
    resetForm()
  }

  const [internalError, setInternalError] = useState()

  const [{ error, fetching }, createUser] = useMutation(ADD_USER)

  const { register, handleSubmit, formState: { errors }, reset: resetForm, setFocus, setValue, getValues, watch } = useForm({
    resolver: yupResolver(schemaValidation),
    defaultValues: { dateOfBirth: startOfToday().toISOString() }
  })
  watch(['dateOfBirth', 'birthLocation', 'currentLocation'])

  useEffect(() => { isOpen && setTimeout(() => setFocus('username'), 1) }, [isOpen])

  const onSubmit = ({ birthLocation, currentLocation, ...rest }) => {
    const input = {
      ...rest,
      birthLocation: birthLocation?.value,
      currentLocation: currentLocation?.value
    }
    createUser({ input })
      .then(result => {
        if (result.data) {
          onCreateComplete(result.data.addUser)
          toast({
            title: 'Successfully created the user',
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
    <>
      <Button size='sm' leftIcon={<FaPlus />} onClick={onOpen}>
        New
      </Button>
      {isOpen && (
        <FormDialog
          title='Create User'
          formID='#createUser'
          size='2xl'
          error={error || internalError}
          loading={fetching}
          onClose={handleClose}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing='8'>
            <Stack direction='row'>
              <FormControl isRequired isInvalid={errors?.username}>
                <FormLabel>Username</FormLabel>
                <Input {...register('username')} type='username' />
                <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors?.password}>
                <FormLabel>Password</FormLabel>
                <PasswordInput {...register('password')} />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction='row'>
              <FormControl isRequired isInvalid={errors?.email}>
                <FormLabel>Email</FormLabel>
                <Input {...register('email')} type='email' />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors?.phoneNumber}>
                <FormLabel>Phone Number</FormLabel>
                <Input {...register('phoneNumber')} />
                <FormErrorMessage>
                  {errors?.phoneNumber?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction='row'>
              <FormControl isRequired isInvalid={errors?.fullName}>
                <FormLabel>Full Name</FormLabel>
                <Input {...register('fullName')} />
                <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors?.shortName}>
                <FormLabel>Short Name (Nickname)</FormLabel>
                <Input {...register('shortName')} />
                <FormErrorMessage>{errors?.shortName?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction='row' justifyContent='space-around' alignItems='center' spacing='4'>
              <FormControl isRequired maxW='200px'>
                <FormLabel>Date of Birth</FormLabel>
                <DateTimePicker
                  type='date'
                  label='Date of Birth'
                  value={getValues('dateOfBirth')}
                  onChange={dateOfBirth => setValue('dateOfBirth', dateOfBirth)}
                  error={errors?.dateOfBirth}
                  fontSize='md'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Birth Location</FormLabel>
                <GooglePlacesSelect
                  value={getValues('birthLocation')}
                  onChange={birthLocation => setValue('birthLocation', birthLocation)}
                />
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>Current Location</FormLabel>
              <GooglePlacesSelect
                value={getValues('currentLocation')}
                onChange={currentLocation => setValue('currentLocation', currentLocation)}
              />
            </FormControl>
          </Stack>
        </FormDialog>
      )}
    </>
  )
}
