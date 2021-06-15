import SimpleTable from 'components/_table/SimpleTable'

import { GET_USER_FAMILY } from 'graphql/queries/users'
import { useQuery } from 'urql'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import fields from 'components/users/fields'

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

export default function ViewUserFamily ({ inline = false, ...props }) {
  return inline ? <ViewUserFamilyInline {...props} /> : <OpenUserFamilyTrigger {...props} />
}

function ViewUserFamilyInline ({ user }) {
  const [result] = useQuery({ query: GET_USER_FAMILY, variables: { userID: user.id } })

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorAlert> {result.error.message} </ErrorAlert>

  return (
    <SimpleTable
      rows={result.data.allData}
      hideFields={['family']}
      fields={fields}
      rowKey='id'
      rowType='user'
    />
  )
}

function OpenUserFamilyTrigger ({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {isOpen && <OpenUserFamily user={user} onClose={onClose} />}
      <Button isFullWidth onClick={onOpen} size='xs' variant='outline'>
        Family Members
      </Button>
    </>
  )
}

export function OpenUserFamily ({ user, onClose }) {
  return (
    <Modal isOpen onClose={onClose} size='' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent pb='6' width='80vw'>
        <ModalHeader>Family Members of {user.fullName} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ViewUserFamily inline user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
