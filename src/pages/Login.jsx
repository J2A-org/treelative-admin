import React, { useState, useRef } from 'react'

import {
  Box,
  Flex,
  Text,
  Input,
  Modal,
  ModalContent
} from '@chakra-ui/react'

export default function Login () {
  const [showPassword, setShowPassword] = useState(false)

  const username = useRef()
  const password = useRef()

  const signIn = () => {
    console.log('Username: ' + username.current.value)
    console.log('Password: ' + password.current.value)
  }

  return (
    <Box
      width='100vw'
      height='100vh'
      background="url('https://res.cloudinary.com/arun99-dev/image/upload/v1623417231/background-login_khdr3c.jpg')"
      backgroundSize='cover'
      backgroundPosition='center '
    >
      <Modal isOpen isCentered>
        <ModalContent
          fontFamily='VT323'
          backgroundColor='#00204E'
          color='white'
          minHeight='400px'
          overflow='hidden'
          fontSize='18px'
        >
          <Flex
            p='13px'
            backgroundColor='#e8e8e8'
          >
            {['#FD544D', '#FFBD2F', '#28CA41'].map((color, idx) => (
              <Box
                key={idx}
                width='10px'
                height='10px'
                mr='8px'
                borderRadius='50%'
                background={color}
              />
            ))}
          </Flex>
          <Box p='20px'>
            <Text>Ubuntu 20.04.2.0 LTS ubuntu tty1</Text>
            <Flex>
              <Text mr='10px'>treelative login:</Text>
              <Input
                ref={username}
                type='text'
                autoFocus
                w='200px'
                h='27px'
                p='0px'
                fontSize='18px'
                border='none'
                cursor='default'
                _focus={{ border: 'none' }}
                onKeyDown={e => e.key === 'Enter' && setShowPassword(!showPassword)}
              />
            </Flex>
            {showPassword &&
              <Flex>
                <Text mr='10px'>password:</Text>
                <Input
                  ref={password}
                  type='password'
                  autoFocus
                  w='200px'
                  h='27px'
                  p='0px'
                  fontSize='18px'
                  border='none'
                  cursor='default'
                  _focus={{ border: 'none' }}
                  onKeyDown={e => e.key === 'Enter' && signIn()}
                />
              </Flex>}
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  )
}
