import React from 'react'

import UserSelection from 'components/users/UserSelection'

import { useMutation } from 'urql'
import { ADD_USER_PARTNER } from 'graphql/mutations/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
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

export default function EditUserPartner ({ inline = false, ...props }) {
  return inline ? <EditUserPartnerInline {...props} /> : <EditUserPartnerTrigger {...props} />
}

function EditUserPartnerInline ({ user, onComplete }) {
  const [result, addUserPartner] = useMutation(ADD_USER_PARTNER)

  const handleOnChange = userPartner => {
    const variables = { user: { id: user.id }, partner: { id: userPartner.value } }
    addUserPartner(variables)
      .then(result => {
        if (result.data && onComplete) {
          toast({
            title: 'Successfully updated the partner',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
          onComplete()
        }
      })
  }

  return (
    <Stack spacing='4'>
      <UserSelection
        autoFocus
        value={user?.couple?.partner?.id ? { label: user?.couple?.partner?.fullName, value: user?.couple?.partner?.id } : undefined}
        onChange={handleOnChange}
        placeholder='Select a Partner'
      />
      {result.fetching && <Loading />}
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
    </Stack>
  )
}

function EditUserPartnerTrigger ({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {isOpen && <EditUserPartnerDialog user={user} onClose={onClose} />}
      <Button isFullWidth mr='-px' onClick={onOpen} size='xs' variant='outline'>
        {user?.couple?.partner?.fullName || '+'}
      </Button>
    </>
  )
}

export function EditUserPartnerDialog ({ user, onClose }) {
  return (
    <Modal isOpen onClose={onClose} size='md' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent pb='6' minH='300px'>
        <ModalHeader>Edit User Partner</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditUserPartnerInline user={user} onComplete={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
