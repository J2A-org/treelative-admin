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
