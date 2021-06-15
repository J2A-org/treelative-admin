import React, { useState } from 'react'

import useDevice from 'hooks/useDevice'

import {
  getYear,
  getMonth,
  parseISO,
  eachYearOfInterval
} from 'date-fns'

import {
  Text,
  Modal,
  Stack,
  Alert,
  ModalBody,
  AlertIcon,
  IconButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  createStandaloneToast
} from '@chakra-ui/react'

import { BiCalendarEdit } from 'react-icons/bi'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'

import ReactDatePicker from 'react-datepicker'
import DateTimeRenderer from 'components/_common/DateTimeRenderer'
import CustomSelect from 'components/_select/CustomSelect'

import Loading from 'components/_common/Loading'

import 'react-datepicker/dist/react-datepicker.css'
import './datetimePicker.css'

const toast = createStandaloneToast()

export default function DateTimePickerDialogTrigger (props) {
  const {
    reset,
    isDisabled = false,
    inline = false,
    justifyContent = 'flex-start',
    onChange,
    fontSize = 'sm',
    textAlign = 'left',
    noSubmit = false,
    notification = '',
    ...rest
  } = props

  const { isTouch } = useDevice()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isVisible, setIsVisible] = useState(inline)

  const marginOffset = isVisible && justifyContent === 'center' ? '8' : ''

  const handleClose = () => {
    reset && reset()
    onClose()
  }

  const handleOnSubmit = async (newValue) => {
    try {
      onChange(rest.type === 'time' ? newValue.toISOString() : noSubmit ? newValue.toLocaleDateString('en-CA') : newValue.toLocaleDateString('en-CA') + 'T04:00:00.000Z')
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
    } catch (e) {
      console.log(e.message)
    }
  }

  const touchDeviceProps = isTouch ? { onClick: onOpen, cursor: 'pointer' } : {}

  return (
    <>
      {isOpen && <DateTimePickerDialog {...rest} onClose={handleClose} onSubmit={handleOnSubmit} />}
      <Stack
        direction='row'
        alignItems='center'
        width='100%'
        onMouseEnter={!inline ? () => setIsVisible(true) : null}
        onMouseLeave={!inline ? () => setIsVisible(false) : null}
        justifyContent={textAlign === 'right' ? 'flex-end' : justifyContent}
      >
        <DateTimeRenderer
          value={props.value}
          type={rest.type} // eslint-disable-next-line
          fontSize={fontSize ? fontSize : inline ? 'md' : 'sm'}
          ml={marginOffset}
          {...touchDeviceProps}
        />
        {isVisible && (
          <IconButton
            size={inline ? 'sm' : 'xs'}
            variant='outline'
            icon={<BiCalendarEdit fontSize='16px' />}
            onClick={onOpen}
            isDisabled={isDisabled}
          />
        )}
      </Stack>
    </>
  )
}

function DateTimePickerDialog (props) {
  const {
    title,
    onClose,
    loading,
    value,
    onSubmit,
    error,
    children,
    label,
    subTitle = '',
    fontSize = 'xl',
    type = 'date',
    ...rest
  } = props

  return (
    <Modal isOpen onClose={onClose} scrollBehavior='inside' size={type === 'date' ? 'sm' : 'lg'}>
      <ModalOverlay />
      <ModalContent pb={!children ? '0' : '6'}>
        <ModalHeader>
          {title || label}
          <Text fontSize='xs'>{subTitle}</Text>
        </ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody textAlign='center'>
          <Stack spacing='2'>
            <DateTimeRenderer value={value} type={type} fontSize={fontSize} fontWeight='bold' />
            <ReactDatePicker
              inline
              selected={parseISO(value || new Date().toISOString())}
              onChange={onSubmit}
              showTimeSelect={type === 'time'}
              showYearDropdown
              showMonthDropdown
              dropdownMode='select'
              renderCustomHeader={CustomHeader}
              {...rest}
            />
            {loading && <Loading />}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack spacing='4' width='100%'>
            {error && <Alert status='error'> <AlertIcon /> {error.message} </Alert>}
            {children}
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const yearOptions = eachYearOfInterval({
  start: new Date(1900, 1, 1),
  end: new Date()
}).map(date => ({ value: getYear(date), label: getYear(date) }))

const monthOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
].map((month, idx) => ({ value: idx, label: month }))

function CustomHeader (props) {
  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
  } = props

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' px='2'>
      <Stack width='100%'>
        <CustomSelect
          value={{ value: getYear(date), label: getYear(date) }}
          options={yearOptions}
          onChange={({ value }) => changeYear(value)}
        />
        <CustomSelect
          value={monthOptions[getMonth(date)]}
          options={monthOptions}
          onChange={({ value }) => changeMonth(value)}
        />
      </Stack>
      <IconButton
        size='sm'
        variant='outline'
        aria-label='Previous Month'
        icon={<GrFormPrevious />}
        onClick={decreaseMonth}
        isDisabled={prevMonthButtonDisabled}
      />
      <IconButton
        size='sm'
        variant='outline'
        aria-label='Next Month'
        icon={<GrFormNext />}
        onClick={increaseMonth}
        isDisabled={nextMonthButtonDisabled}
      />
    </Stack>
  )
}
