import React, { useState } from 'react'

import {
  Box,
  Text,
  Icon,
  Modal,
  Stack,
  Badge,
  Button,
  ModalBody,
  IconButton,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  createStandaloneToast
} from '@chakra-ui/react'

import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BiEdit, BiTrash } from 'react-icons/bi'

import ViewUser from 'components/users/view/ViewUser'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import { useMutation } from 'urql'
import { DELETE_USER } from 'graphql/mutations/users'

const toast = createStandaloneToast()

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
  const [result, deleteUser] = useMutation(DELETE_USER)

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

  return (
    <Modal isOpen onClose={onClose} size='2xl' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user.fullName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ViewUser user={user} />
        </ModalBody>
        <ModalFooter>
          <Stack width='100%' alignItems='center' spacing='4'>
            {result.fetching && <Loading />}
            {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
            <Button
              colorScheme='red'
              leftIcon={<BiTrash />}
              onClick={onDeleteUser}
              isLoading={result.fetching}
            >
              Delete User
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
