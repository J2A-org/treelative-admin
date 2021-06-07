import { gql } from '@apollo/client'

export const QUERY_USER = gql`
  query QUERY_USER {
    queryUser {
      id
      username
      fullName
    }
  }
`
