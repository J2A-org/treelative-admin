import React, { useEffect, useState } from 'react'

import useDevice from 'hooks/useDevice'

import {
  Text,
  Stack,
  IconButton,
  AspectRatio,
  useDisclosure,
  createStandaloneToast
} from '@chakra-ui/react'

import { BiEdit } from 'react-icons/bi'

import FormDialog from 'components/_common/FormDialog'
import GooglePlacesSelect from 'components/_select/GooglePlacesSelect'

const toast = createStandaloneToast()

export default function InputDialogTrigger (props) {
  const {
    reset,
    initiallyOpen = false,
    isDisabled = false,
    inline = false,
    justifyContent = 'left',
    onClose: onParentClose,
    ...inputProps
  } = props

  const { isTouch } = useDevice()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isVisible, setIsVisible] = useState(inline)

  const marginOffset = isVisible && justifyContent === 'center' ? '8' : ''

  const touchDeviceProps = isTouch ? { onClick: onOpen, cursor: 'pointer' } : {}

  if (initiallyOpen) return <InputDialog {...inputProps} onClose={onParentClose} />

  return (
    <>
      {isOpen && <InputDialog {...inputProps} onClose={onClose} />}
      <Stack
        direction='row'
        alignItems='center'
        width='100%'
        onMouseEnter={!inline ? () => setIsVisible(true) : null}
        onMouseLeave={!inline ? () => setIsVisible(false) : null}
        justifyContent={justifyContent}
      >
        <Text
          fontSize={inline ? 'md' : 'sm'}
          overflowX='hidden'
          ml={marginOffset}
          {...touchDeviceProps}
        >
          {inputProps?.value?.description || '-'}
        </Text>
        {isVisible && (
          <IconButton
            size={inline ? 'sm' : 'xs'}
            variant='outline'
            icon={<BiEdit fontSize='16px' />}
            onClick={onOpen}
            isDisabled={isDisabled}
          />
        )}
      </Stack>
    </>
  )
}

function InputDialog (props) {
  const {
    onClose,
    value = '',
    title = '',
    onSubmit = console.log,
    loading,
    error,
    notification = ''
  } = props

  const [location, setLocation] = useState({ label: value?.description, value })
  const [locationURL, setLocationURL] = useState('')

  useEffect(() => {
    if (location?.value) {
      const key = process.env.REACT_APP_GOOGLE_LOCATION_API_KEY
      const q = `place_id:${location.value.place_id}`
      const zoom = '14'
      setLocationURL(`https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}&zoom=${zoom}`)
    }
  }, [location?.value?.description])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    onSubmit(location.value)
      .then(result => {
        if (result.data) {
          if (notification) {
            toast({
              title: notification,
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
          }
          onClose()
        }
      })
      .catch(console.log)
  }

  return (
    <FormDialog
      closeOnOverlayClick
      title={title}
      submitLabel='Submit'
      error={error}
      loading={loading}
      onClose={onClose}
      onSubmit={handleOnSubmit}
      size='xl'
    >
      <Stack spacing='8' minH='300px'>
        <GooglePlacesSelect
          autoFocus
          value={location}
          onChange={setLocation}
        />
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={locationURL}
            loading='lazy'
            alt={location.label}
          />
        </AspectRatio>
      </Stack>
    </FormDialog>
  )
}
