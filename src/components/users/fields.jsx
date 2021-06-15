import React from 'react'

import OpenUser from 'components/users/view/OpenUser'

import EditUserUsername from 'components/users/edit/EditUserUsername'
import EditUserFullName from 'components/users/edit/EditUserFullName'
import EditUserDateOfBirth from 'components/users/edit/EditUserDateOfBirth'
import EditUserCurrentLocation from 'components/users/edit/EditUserCurrentLocation'

import EditUserPartner from 'components/users/edit/EditUserPartner'
import ViewUserFamily from 'components/users/view/ViewUserFamily'

const fields = [
  {
    key: 'view',
    width: '60px',
    renderTD: (props) => <OpenUser {...props} self />
  },
  {
    key: 'username',
    label: 'Username',
    canSort: true,
    width: '150px',
    renderTD: EditUserUsername
  },
  {
    key: 'fullName',
    label: 'Full Name',
    canSort: true,
    width: '270px',
    renderTD: EditUserFullName
  },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    canSort: true,
    width: '200px',
    renderTD: EditUserDateOfBirth
  },
  {
    key: 'partner',
    label: 'Partner',
    width: '220px',
    justifyContent: 'center',
    renderTD: EditUserPartner
  },
  {
    key: 'family',
    label: 'Family',
    width: '180px',
    justifyContent: 'center',
    renderTD: ViewUserFamily
  },
  {
    key: 'currentLocation',
    label: 'Current Location',
    canSort: true,
    renderTD: EditUserCurrentLocation
  }
]

export default fields
