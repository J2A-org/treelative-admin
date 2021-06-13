import React from 'react'

import OpenUser from 'components/users/view/OpenUser'

import EditUserUsername from 'components/users/edit/EditUserUsername'
import EditUserFullName from 'components/users/edit/EditUserFullName'
import EditUserEmail from 'components/users/edit/EditUserEmail'
import EditUserPhoneNumber from 'components/users/edit/EditUserPhoneNumber'
import EditUserDateOfBirth from 'components/users/edit/EditUserDateOfBirth'
import EditUserCurrentLocation from 'components/users/edit/EditUserCurrentLocation'

import EditUserPartner from 'components/users/edit/EditUserPartner'

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
    key: 'email',
    label: 'Email',
    canSort: true,
    width: '250px',
    renderTD: EditUserEmail
  },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
    canSort: true,
    width: '250px',
    renderTD: EditUserPhoneNumber
  },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    canSort: true,
    width: '200px',
    renderTD: EditUserDateOfBirth
  },
  {
    key: 'currentLocation',
    label: 'Current Location',
    canSort: true,
    renderTD: EditUserCurrentLocation
  },
  {
    key: 'partner',
    label: 'Partner',
    renderTD: EditUserPartner
  }
]

export default fields
