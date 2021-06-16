import React, { useState } from 'react'

import {
  Box,
  Text,
  Icon,
  Modal,
  Stack,
  Badge,
  ModalBody,
  IconButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton
} from '@chakra-ui/react'

import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'

import ViewUser from 'components/users/view/ViewUser'

export default function OpenUserTrigger ({ user, refetch, self, edit: EditComponent }) {
  const [isEditVisible, setIsEditVisible] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (user?.isDeleted) {
    return (
      <Badge borderRadius='md' colorScheme='gray'>Deleted <Icon as={AiFillEyeInvisible} /></Badge>
    )
  }

  return (
    <>
      {isOpen && <OpenUser user={user} refetch={refetch} onClose={onClose} />}
      {self && (
        <IconButton
          size='xs'
          variant='outline'
          icon={<BiEdit fontSize='16px' />}
          onClick={onOpen}
        />
      )}
      {!self && (
        <Stack
          direction='row'
          alignItems='center'
          width='100%'
          onMouseEnter={() => setIsEditVisible(true)}
          onMouseLeave={() => setIsEditVisible(false)}
        >
          <Text fontSize='sm' overflowX='hidden'>
            {user?.fullName || '-'}
          </Text>
          {isEditVisible && <IconButton size='xs' variant='outline' icon={<AiOutlineEye fontSize='16px' />} onClick={onOpen} isDisabled={!user} />}
          {isEditVisible && (
            <Box onMouseEnter={e => e.stopPropagation()}>
              {EditComponent}
            </Box>
          )}
        </Stack>
      )}
    </>
  )
}

function OpenUser ({ user, refetch, onClose }) {
  return (
    <Modal isOpen onClose={onClose} size='xl' scrollBehavior='inside' closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent minH='400px'>
        <ModalHeader>{user.fullName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ViewUser user={user} refetch={refetch} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
