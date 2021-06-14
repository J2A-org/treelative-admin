import { gql } from 'urql'

export const ADD_USER = gql`
  mutation ADD_USER ($input: AddUserInput!) {
    addUser(input: $input) {
      id
    }
  }
`

export const UPDATE_USER_USERNAME = gql`
  mutation UPDATE_USER_USERNAME ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      username
    }
  }
`

export const UPDATE_USER_FULL_NAME = gql`
  mutation UPDATE_USER_FULL_NAME ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      fullName
    }
  }
`

export const UPDATE_USER_EMAIL = gql`
  mutation UPDATE_USER_EMAIL ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      email
    }
  }
`

export const UPDATE_USER_PHONE_NUMBER = gql`
  mutation UPDATE_USER_PHONE_NUMBER ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      phoneNumber
    }
  }
`

export const UPDATE_USER_DATE_OF_BIRTH = gql`
  mutation UPDATE_USER_DATE_OF_BIRTH ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      dateOfBirth
    }
  }
`

export const UPDATE_USER_CURRENT_LOCATION = gql`
  mutation UPDATE_USER_CURRENT_LOCATION ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      currentLocation
    }
  }
`
