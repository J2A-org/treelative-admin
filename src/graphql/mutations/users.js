import { gql } from 'urql'

export const ADD_USER = gql`
  mutation ADD_USER ($data: AddUserInput!) {
    addUser(data: $data) {
      id
    }
  }
`
