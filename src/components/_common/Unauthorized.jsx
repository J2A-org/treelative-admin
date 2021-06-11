import React from 'react'

import {
  Text,
  Grid,
  Link,
  Image,
  Button,
  Stack
} from '@chakra-ui/react'

import UnauthorizedSVG from 'images/unauthorized.svg'

export default function Unauthorized () {
  return (
    <Grid h='100vh' placeItems='center' p='4'>
      <Stack spacing='8' alignItems='center'>
        <Image ignoreFallback maxW={['200px', '500px']} src={UnauthorizedSVG} alt='Permission Denied' />
        <Text fontSize={['3xl', '5xl']}>Permission Denied</Text>
        <Text fontSize={['md', 'xl']} mb='12' textAlign='center'>
          You're not authorized to view this page. <br />
          If you believe this is an error, please contact your administrator for further assistance.
        </Text>
        <Button as={Link} href='/' size='lg'>
          Go Back Home
        </Button>
      </Stack>
    </Grid>
  )
}
