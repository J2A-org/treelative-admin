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

export const UPDATE_USER_SHORT_NAME = gql`
  mutation UPDATE_USER_SHORT_NAME ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      shortName
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

export const ADD_USER_PARENT = gql`
  mutation ADD_USER_PARENT ($userID: String! $parentID: String!) {
    addUserParent(userID: $userID parentID: $parentID){
      id
      parents {
        id
      }
    }
  }
`

export const DELETE_USER_PARENT = gql`
  mutation DELETE_USER_PARENT ($userID: String! $parentID: String!) {
    deleteUserParent(userID: $userID parentID: $parentID){
      id
      parents {
        id
      }
    }
  }
`

export const ADD_USER_CHILD = gql`
  mutation ADD_USER_CHILD ($userID: String! $childID: String!) {
    addUserChild(userID: $userID childID: $childID){
      id
      children {
        id
      }
    }
  }
`

export const DELETE_USER_CHILD = gql`
  mutation DELETE_USER_CHILD ($userID: String! $childID: String!) {
    deleteUserChild(userID: $userID childID: $childID){
      id
      children {
        id
      }
    }
  }
`
