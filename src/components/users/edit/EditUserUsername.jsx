import React from 'react'

import EditableInputDialog from 'components/_input/EditableInputDialog'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_EMAIL } from 'graphql/mutations/users'

export default function EditUserUsername ({ user, inline = false, ...props }) {
  const [{ error, fetching }, updateUserUsername] = useMutation(UPDATE_USER_EMAIL)

  const handleSubmit = username => {
    const variables = { user: { id: user.id }, input: { username } }
    return updateUserUsername(variables)
  }

  return (
    <EditableInputDialog
      inline={inline}
      title='Edit Username'
      name='username'
      value={user.username || ''}
      onSubmit={handleSubmit}
      validation={string().required()}
      loading={fetching}
      error={error}
      notification='Successfully updated the username'
      {...props}
    />
  )
}
