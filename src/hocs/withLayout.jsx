import React, { useState, useEffect } from 'react'

import useAuthUser from 'hooks/useAuthUser'

import client from 'graphql/client'
import { WHO_AM_I } from 'graphql/queries/auth'

import Loading from 'components/_common/Loading'
import Unauthorized from 'components/_common/Unauthorized'

import {
  Flex,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'

import { VscTriangleRight, VscTriangleLeft } from 'react-icons/vsc'

import useDevice from 'hooks/useDevice'

// import Sidebar from 'components/_sidebar/Sidebar'

const logout = () => {
  window.localStorage.removeItem('AUTH_SESSION_ID')
  window.localStorage.setItem('REDIRECT_REFERRAL', window.location.href)
  window.location.href = '/login'
}

const withLayout = (WrappedComponent) => () => {
  const authUser = useAuthUser()

  const { isDesktop, responsive } = useDevice()

  const { isOpen: isSidebarOpen, onOpen: setIsSidebarOpen, onClose: setIsSidebarClose } = useDisclosure({ defaultIsOpen: isDesktop })

  const {
    title = 'Treelative',
    isPublic = false,
    isAdminOnly = false
  } = WrappedComponent.props

  const [loading, setLoading] = useState(!isPublic)

  useEffect(() => {
    // set document title
    window.document.title = title
    // check for auth session if not public route
    if (!isPublic) {
      client
        .query(WHO_AM_I)
        .toPromise()
        .then(({ error }) => {
          if (error) {
            logout()
          }
        })
        .catch(() => {
          logout()
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  // no need to perform any additional checks for public route
  if (isPublic) {
    return WrappedComponent
  }

  // show loading while verifying auth session
  if (loading) {
    return <Loading />
  }

  if (!authUser) {
    // wait for authUser to be set in cache
    return <Loading />
  }

  // if adminOnly page, check if the auth user is an admin
  if (isAdminOnly && authUser.role !== 'ADMIN') {
    return <Unauthorized />
  }

  return (
    <Flex height='100%' overflow='hidden'>
      {!isDesktop && (
        <IconButton
          variant='ghost'
          aria-label={!isSidebarOpen ? 'Open Sidebar' : 'Close Sidebar'}
          ml='-3'
          icon={!isSidebarOpen ? <VscTriangleRight fontSize='38px' /> : <VscTriangleLeft fontSize='38px' />}
          alignSelf='center'
          onClick={isSidebarOpen ? setIsSidebarClose : setIsSidebarOpen}
          _focus={{ bg: '' }}
          _hover={{ bg: '' }}
          borderRadius='0'
          height='100%'
        />
      )}
      {(isDesktop || isSidebarOpen) && (
        <Flex as='nav' width={responsive(['100%', '206px'])} flexDir='column' p='4'>
          {/* <Sidebar /> */}
        </Flex>
      )}
      {(isDesktop || !isSidebarOpen) && (
        <Flex as='main' p='6' flex='1' pl={responsive(['0', '6'])} overflow='hidden'>
          <Flex width='100%' borderRadius='xl' p='4'>
            {WrappedComponent}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default withLayout
