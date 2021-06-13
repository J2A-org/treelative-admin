import React from 'react'

import EditableInputDialog from 'components/_input/EditableInputDialog'

import { string } from 'yup'

import { useMutation } from 'urql'
import { UPDATE_USER_EMAIL } from 'graphql/mutations/users'

export default function EditUserEmail ({ user, inline = false, ...props }) {
  const [{ error, fetching }, updateUserEmail] = useMutation(UPDATE_USER_EMAIL)

  const handleSubmit = email => {
    const variables = { user: { id: user.id }, input: { email } }
    return updateUserEmail(variables)
  }

  return (
    <EditableInputDialog
      inline={inline}
      title='Edit Email'
      name='email'
      value={user.email || ''}
      onSubmit={handleSubmit}
      validation={string().email().required()}
      loading={fetching}
      error={error}
      notification='Successfully updated the email'
      {...props}
    />
  )
}
