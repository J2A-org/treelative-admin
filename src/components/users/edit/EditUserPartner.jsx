import React from 'react'

import UserSelection from 'components/users/UserSelection'

import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton
} from '@chakra-ui/react'

export default function EditUserPartner ({ inline = false, ...props }) {
  return inline ? <EditUserPartnerInline {...props} /> : <EditUserPartnerTrigger {...props} />
}

function EditUserPartnerInline ({ user }) {
  const handleOnChange = (user) => {
    console.log(user)
  }

  return (
    <UserSelection
      autoFocus
      value={user?.couple?.partner?.id ? { label: user?.couple?.partner?.fullName, value: user?.couple?.partner?.id } : undefined}
      onChange={handleOnChange}
      placeholder='Select a Partner'
    />
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
          <EditUserPartnerInline user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
