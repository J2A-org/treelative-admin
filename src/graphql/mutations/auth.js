import { gql } from 'urql'

export const LOGIN = gql`
  mutation LOGIN ($input: LoginInput!) {
    login (input: $input)
  }
`
