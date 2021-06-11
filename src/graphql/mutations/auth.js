import { gql } from 'urql'

export const LOGIN = gql`
  query LOGIN ($input: LoginInput!) {
    login (input: $input)
  }
`
