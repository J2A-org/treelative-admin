import React from 'react'

import UserSelection from 'components/users/UserSelection'

import { useMutation } from 'urql'
import { ADD_COUPLE, DELETE_COUPLE } from 'graphql/mutations/couples'

import { LIST_USER_PARTNERS } from 'graphql/queries/users'

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
  createStandaloneToast,
  ModalFooter
} from '@chakra-ui/react'

import EditCoupleDateOfMarriage from 'components/couples/edit/EditCoupleDateOfMarriage'
import EditCoupleMarriageLocation from 'components/couples/edit/EditCoupleMarriageLocation'

const toast = createStandaloneToast()

export default function EditUserPartner ({ inline = false, ...props }) {
  return inline ? <EditUserPartnerInline {...props} /> : <EditUserPartnerTrigger {...props} />
}

function EditUserPartnerInline ({ user }) {
  const [result, addCouple] = useMutation(ADD_COUPLE)

  const handleOnChange = userPartner => {
    const variables = { input: { userOneID: user.id, userTwoID: userPartner.value } }
    addCouple(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully updated the partner',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  return (
    <Stack spacing='8'>
      <UserSelection
        autoFocus
        query={LIST_USER_PARTNERS}
        variables={{ userID: user.id }}
        value={user?.couple?.partner?.id ? { label: user?.couple?.partner?.fullName, value: user?.couple?.partner?.id } : undefined}
        onChange={handleOnChange}
        placeholder='Select a Partner'
      />
      {result.fetching && <Loading />}
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
      {user?.couple && (
        <>
          <EditCoupleDateOfMarriage inline couple={user?.couple} />
          <EditCoupleMarriageLocation inline couple={user?.couple} />
        </>
      )}
    </Stack>
  )
}

function EditUserPartnerTrigger ({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {isOpen && <EditUserPartnerDialog user={user} onClose={onClose} />}
      <Button isFullWidth onClick={onOpen} size='xs' variant='outline'>
        {user?.couple?.partner?.fullName || '+'}
      </Button>
    </>
  )
}

export function EditUserPartnerDialog ({ user, onClose }) {
  const [result, deleteCouple] = useMutation(DELETE_COUPLE)

  const handleRemovePartner = () => {
    const variables = { coupleID: user.couple.id }
    deleteCouple(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully removed the partner',
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
    <Modal isOpen onClose={onClose} size='sm' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent pb='2' minH='300px'>
        <ModalHeader>
          Edit Partner
          <Text fontSize='xs'>{user.fullName}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb='4'>
          <EditUserPartnerInline user={user} />
        </ModalBody>
        {user?.couple?.partner?.id && (
          <ModalFooter>
            <Stack width='100%'>
              {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
              <Button
                isFullWidth
                colorScheme='red'
                isLoading={result.fetching}
                onClick={handleRemovePartner}
              >
                Remove Partner
              </Button>
            </Stack>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
