import React from 'react'

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton
} from '@chakra-ui/react'

import ViewUser from 'components/users/view/ViewUser'

import { useQuery } from 'urql'
import { VIEW_MY_PROFILE } from 'graphql/queries/auth'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

export default function ViewMyProfile ({ user, onClose }) {
  const [result, refetch] = useQuery({ query: VIEW_MY_PROFILE })

  return (
    <Modal isOpen onClose={onClose} size='xl' scrollBehavior='inside' closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent minH='400px'>
        <ModalHeader>{user.fullName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {result.fetching && <Loading />}
          {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
          {result.data && <ViewUser user={result.data.whoAmI} refetch={() => refetch({ requestPolicy: 'network-only' })} onClose={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
