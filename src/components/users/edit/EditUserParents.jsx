import React from 'react'

import UserSelection from 'components/users/UserSelection'

import { useMutation } from 'urql'
import { ADD_USER_PARENT, DELETE_USER_PARENT } from 'graphql/mutations/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
  Text,
  Modal,
  Stack,
  Alert,
  Button,
  FormLabel,
  ModalBody,
  AlertIcon,
  IconButton,
  ModalHeader,
  FormControl,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  AlertDescription,
  createStandaloneToast
} from '@chakra-ui/react'

import { BsTrash } from 'react-icons/bs'

const toast = createStandaloneToast()

export default function EditUserParents ({ inline = false, ...props }) {
  return inline ? <EditUserParentsInline {...props} /> : <EditUserParentsTrigger {...props} />
}

function EditUserParentsInline ({ user }) {
  const [result, addUserParent] = useMutation(ADD_USER_PARENT)

  const [removeParentOneResult, removeUserParentOne] = useMutation(DELETE_USER_PARENT)
  const [removeParentTwoResult, removeUserParentTwo] = useMutation(DELETE_USER_PARENT)

  const handleOnChange = userParent => {
    const variables = { userID: user.id, parentID: userParent.value }
    addUserParent(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully updated the parent',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  const handleRemoveParentOne = parentID => {
    const variables = { userID: user.id, parentID }
    removeUserParentOne(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully removed the parent',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  const handleRemoveParentTwo = parentID => {
    const variables = { userID: user.id, parentID }
    removeUserParentTwo(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully removed the parent',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  const [parentOne, parentTwo] = user?.parents || []

  return (
    <Stack spacing='8'>
      <FormControl>
        <FormLabel>Parent One</FormLabel>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack flex='1'>
            <UserSelection
              autoFocus
              isDisabled={result.fetching || removeParentOneResult.fetching}
              key={`parentOne_key__${JSON.stringify(parentOne ? { label: parentOne.fullName, value: parentOne.id } : undefined)}`}
              value={parentOne ? { label: parentOne.fullName, value: parentOne.id } : undefined}
              onChange={handleOnChange}
              placeholder='Select Parent One'
              filterUsers={({ value }) => value !== user.id}
            />
          </Stack>
          <IconButton
            colorScheme='red'
            variant='outline'
            aria-label='Remove Parent One'
            fontSize='20px'
            icon={<BsTrash />}
            onClick={() => handleRemoveParentOne(parentOne.id)}
            isLoading={removeParentOneResult.fetching}
            isDisabled={!parentOne}
          />
        </Stack>

      </FormControl>
      <FormControl>
        <FormLabel>Parent Two</FormLabel>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack flex='1'>
            <UserSelection
              isDisabled={!parentOne || result.fetching || removeParentTwoResult.fetching}
              key={`parentTwo_key__${JSON.stringify(parentTwo ? { label: parentTwo.fullName, value: parentTwo.id } : undefined)}`}
              value={parentTwo ? { label: parentTwo.fullName, value: parentTwo.id } : undefined}
              onChange={handleOnChange}
              placeholder='Select Parent Two'
              filterUsers={({ value }) => value !== user.id}
            />
          </Stack>
          <IconButton
            colorScheme='red'
            variant='outline'
            aria-label='Remove Parent Two'
            fontSize='20px'
            icon={<BsTrash />}
            onClick={() => handleRemoveParentTwo(parentTwo.id)}
            isLoading={removeParentTwoResult.fetching}
            isDisabled={!parentTwo}
          />
        </Stack>
      </FormControl>
      {result.fetching && <Loading />}
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
      <Alert status='warning' borderRadius='lg'>
        <AlertIcon />
        <AlertDescription>
          {!parentOne && 'A parent with a partner will automatically be added as the second parent'}
          {parentOne && 'Selecting a new parent with a partner will automatically be added as the second parent'}
        </AlertDescription>
      </Alert>
    </Stack>
  )
}

function EditUserParentsTrigger ({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {isOpen && <EditUserParentsDialog user={user} onClose={onClose} />}
      <Button isFullWidth onClick={onOpen} size='xs' variant='outline'>
        Parents
      </Button>
    </>
  )
}

export function EditUserParentsDialog ({ user, onClose }) {
  return (
    <Modal isOpen onClose={onClose} size='md' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent pb='2' minH='300px'>
        <ModalHeader>
          Edit Parents
          <Text fontSize='xs'>{user.fullName}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb='4'>
          <EditUserParentsInline user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
