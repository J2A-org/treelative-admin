import { gql } from 'urql'

export const ADD_USER = gql`
  mutation ADD_USER ($input: AddUserInput!) {
    addUser(input: $input) {
      id
      username
      fullName
      email
      role
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_USER_FULL_NAME = gql`
  mutation UPDATE_USER_FULL_NAME ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      fullName
      updatedAt
    }
  }
`

export const UPDATE_USER_EMAIL = gql`
  mutation UPDATE_USER_EMAIL ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      email
      updatedAt
    }
  }
`
