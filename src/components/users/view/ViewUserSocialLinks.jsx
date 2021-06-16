import React from 'react'

import { useQuery } from 'urql'
import { GET_USER_SOCIAL } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
  Alert,
  Stack,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'

import CreateSocialLink from 'components/social/CreateSocialLink'

import EditSocialLinkUrl from 'components/social/EditSocialLinkUrl'
import EditSocialLinkType from 'components/social/EditSocialLinkType'
import DeleteSocialLink from 'components/social/DeleteSocialLink'

export default function ViewUserSocialLinks ({ user }) {
  const [result, refetch] = useQuery({ query: GET_USER_SOCIAL, variables: { filter: { id: user.id } } })

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorAlert> {result.error.message} </ErrorAlert>

  return (
    <Stack spacing='4'>
      <Stack alignItems='center'>
        <CreateSocialLink user={user} />
      </Stack>
      {result.data.getUser.socialLinks.length === 0 && (
        <Alert status='warning' borderRadius='lg'>
          <AlertIcon />
          <AlertDescription>
            No social links available
          </AlertDescription>
        </Alert>
      )}
      {result.data.getUser.socialLinks.map(socialLink => (
        <Stack
          key={socialLink.id}
          spacing='4'
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <DeleteSocialLink socialLink={socialLink} refetch={() => refetch({ requestPolicy: 'network-only' })} />
          <EditSocialLinkType socialLink={socialLink} />
          <EditSocialLinkUrl inline socialLink={socialLink} fontSize='xs' />
        </Stack>
      ))}
    </Stack>
  )
}
