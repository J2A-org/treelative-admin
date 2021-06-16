import React from 'react'

import useDevice from 'hooks/useDevice'

import { IconButton } from '@chakra-ui/react'

import { FiLogOut } from 'react-icons/fi'

export default function Logout () {
  const { responsive } = useDevice()

  const onLogout = () => {
    window.localStorage.removeItem('AUTH_SESSION_ID')
    window.location.href = '/login'
  }

  return (
    <IconButton
      size={responsive(['md', 'sm'])}
      colorScheme='red'
      aria-label='Logout'
      fontSize='20px'
      icon={<FiLogOut />}
      onClick={onLogout}
    />
  )
}
