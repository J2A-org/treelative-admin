import React, { useState } from 'react'

import useAuthUser from 'hooks/useAuthUser'

import useDevice from 'hooks/useDevice'

import {
  Text,
  Flex,
  Menu,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuButton,
  MenuDivider
} from '@chakra-ui/react'

import { CgProfile } from 'react-icons/cg'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import { MdNotificationsNone } from 'react-icons/md'

import ViewMyProfile from 'components/auth/ViewMyProfile'
import ResetUserPassword from 'components/users/edit/ResetUserPassword'

export default function ProfileMenu () {
  const { isDesktop, responsive } = useDevice()

  const authUser = useAuthUser()

  const [viewProfile, setViewProfile] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)

  const onLogout = () => {
    window.localStorage.removeItem('AUTH_SESSION_ID')
    window.localStorage.removeItem('ACTIVE_STORE')
    window.location.href = '/login'
  }

  return (
    <>
      {viewProfile && <ViewMyProfile user={authUser} onClose={() => setViewProfile(false)} />}
      {resetPassword && <ResetUserPassword user={authUser} onClose={() => setResetPassword(false)} />}
      <Menu isLazy placement='bottom-end'>
        <MenuButton
          as={Button}
          color='white'
          variant='header'
          borderRadius='md'
          size='lg'
          px='2'
        >
          <Flex alignItems='center'>
            {isDesktop && <Text fontSize='sm' fontWeight='semibold' mr='2'>{authUser.fullName}</Text>}
            <Avatar
              src={authUser.avatar}
              name={authUser.fullName}
              size={responsive(['md', 'sm'])}
              bg='blue.500'
            />
          </Flex>

        </MenuButton>
        <MenuList zIndex='2'>
          <MenuGroup title='Account'>
            <MenuItem icon={<CgProfile />} onClick={() => setViewProfile(true)}>My Profile</MenuItem>
            <MenuItem icon={<RiLockPasswordLine />} onClick={() => setResetPassword(true)}>Reset Password</MenuItem>
          </MenuGroup>
          <MenuGroup title='Settings'>
            <MenuItem icon={<FiSettings />} onClick={() => { }}>
              Privacy
            </MenuItem>
            <MenuItem icon={<MdNotificationsNone />} onClick={() => { }}>
              Notifications
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem icon={<FiLogOut />} onClick={onLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
