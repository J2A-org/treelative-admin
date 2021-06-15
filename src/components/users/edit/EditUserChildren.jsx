import React from 'react'

import UserSelection from 'components/users/UserSelection'

import { useMutation } from 'urql'
import { ADD_USER_CHILD, DELETE_USER_CHILD } from 'graphql/mutations/users'

import { LIST_USER_AVAILABLE_CHILDREN } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
  Text,
  Modal,
  Stack,
  Button,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  createStandaloneToast
} from '@chakra-ui/react'

const toast = createStandaloneToast()

export default function EditUserChildren ({ inline = false, ...props }) {
  return inline ? <EditUserChildrenInline {...props} /> : <EditUserChildrenTrigger {...props} />
}

function EditUserChildrenInline ({ user }) {
  const [result, addUserChild] = useMutation(ADD_USER_CHILD)

  const [removeUserChildResult, removeUserChild] = useMutation(DELETE_USER_CHILD)

  const handleOnChange = userChildren => {
    const existingChildren = user.children.map(({ id }) => id)
    let action, value
    if (!userChildren) {
      action = 'unlink'
      value = existingChildren[0]
    } else {
      const updatedValues = userChildren.map(({ value }) => value)
      const unlinkedValue = existingChildren
        .filter(value => !updatedValues.includes(value))[0]
      const linkedValue = updatedValues
        .filter(value => !existingChildren.includes(value))[0]
      action = unlinkedValue ? 'unlink' : 'link'
      value = unlinkedValue || linkedValue
    }
    if (action === 'link') {
      addUserChild({ userID: user.id, childID: value })
        .then(result => {
          if (result.data) {
            toast({
              title: 'Successfully added the child',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
          }
        })
    } else {
      removeUserChild({ userID: user.id, childID: value })
        .then(result => {
          if (result.data) {
            toast({
              title: 'Successfully removed the child',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
          }
        })
    }
  }

  return (
    <Stack spacing='8'>
      <UserSelection
        autoFocus
        isMulti
        isDisabled={result.fetching || removeUserChildResult.fetching}
        isClearable={false}
        query={LIST_USER_AVAILABLE_CHILDREN}
        variables={{ userID: user.id }}
        key={`children_key__${JSON.stringify(user?.children?.length > 0 ? user?.children.map(child => ({ label: child?.fullName, value: child?.id })) : undefined)}`}
        value={user?.children ? user?.children.map(child => ({ label: child?.fullName, value: child?.id })) : undefined}
        onChange={handleOnChange}
        placeholder='Select Children'
      />
      {result.fetching && <Loading />}
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
      {removeUserChildResult.fetching && <Loading />}
      {removeUserChildResult.error && <ErrorAlert> {removeUserChildResult.error.message} </ErrorAlert>}
    </Stack>
  )
}

function EditUserChildrenTrigger ({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {isOpen && <EditUserChildrenDialog user={user} onClose={onClose} />}
      <Button isFullWidth onClick={onOpen} size='xs' variant='outline'>
        {user?.children?.length || '0'} Children
      </Button>
    </>
  )
}

export function EditUserChildrenDialog ({ user, onClose }) {
  return (
    <Modal isOpen onClose={onClose} size='md' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent pb='2' minH='500px'>
        <ModalHeader>
          Edit Children
          <Text fontSize='xs'>{user.fullName}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb='4'>
          <EditUserChildrenInline user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
