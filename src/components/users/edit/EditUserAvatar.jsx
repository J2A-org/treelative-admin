import React, { useState } from 'react'

import { useMutation } from 'urql'
import { UPDATE_USER_AVATAR } from 'graphql/mutations/users'

import {
  Box,
  Image,
  Stack,
  Button,
  FormLabel,
  FormControl,
  createStandaloneToast
} from '@chakra-ui/react'

const toast = createStandaloneToast()

export default function EditUserAvatar ({ user }) {
  const [avatarURL, setAvatarURL] = useState(user.avatar)

  const [, updateUserAvatar] = useMutation(UPDATE_USER_AVATAR)

  const [isLoading, setIsLoading] = useState(false)

  const handleError = (error) => {
    toast({
      title: 'Error',
      description: error.message,
      status: 'error',
      position: 'top',
      duration: 10000,
      isClosable: true
    })
  }

  const handleSuccess = () => {
    toast({
      title: 'Successfully updated the avatar',
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true
    })
  }

  const handleUpload = selectedFile => {
    setIsLoading(true)
    const variables = { userID: user.id }
    updateUserAvatar(variables)
      .then(result => {
        if (result.data) {
          const url = result.data.updateUserAvatar
          window.fetch(url, { method: 'PUT', body: selectedFile })
            .then((response) => {
              if (response.status === 200) {
                handleSuccess()
                setAvatarURL(avatarURL + '?' + new Date().getTime())
              } else {
                response.json()
                  .then(error => {
                    console.log({ message: error })
                  })
              }
            })
            .catch(handleError)
            .finally(() => setIsLoading(false))
        }
        if (result.error) {
          handleError(result.error)
        }
      })
      .catch(error => {
        setIsLoading(false)
        handleError(error)
      })
  }

  const handleFileSelect = (event) => {
    event.preventDefault()
    const selectedFile = event.target.files[0]
    if (!selectedFile) return
    if ((selectedFile.size / 1024 / 1024) > 10) {
      handleError({ message: 'File size exceeds 10 MB' })
    } else {
      handleUpload(selectedFile)
    }
  }

  return (
    <Stack spacing='2' as={FormControl} alignItems='center'>
      <input
        type='file'
        id='avatar'
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept='image/png, image/jpeg, image/jpg, image/gif'
      />
      <Box position='relative'>
        <Image
          src={avatarURL}
          fallbackSrc={`https://picsum.photos/200?${user.id}`}
          boxSize='150px'
          borderRadius='full'
          alt={user.fullName}
        />
        <FormLabel htmlFor='avatar' position='absolute' top='95px' left='25px'>
          <Button
            as='span'
            size='sm'
            cursor='pointer'
            isLoading={isLoading}
            minW='100px'
            bg='#00000045'
            _hover={{
              bg: '#00000085'
            }}
          >
            Replace
          </Button>
        </FormLabel>
      </Box>
    </Stack>
  )
}
