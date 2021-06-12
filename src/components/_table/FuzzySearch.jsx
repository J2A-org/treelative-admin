import React, { useRef, useEffect, useCallback } from 'react'

import {
  Input,
  InputGroup,
  IconButton,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'

import { MdRefresh, MdClear } from 'react-icons/md'

import { debounce } from 'lodash'

export default function Search (props) {
  const searchRef = useRef()

  useEffect(() => {
    searchRef && searchRef.current.focus()
  }, [searchRef.current])

  const {
    value,
    setSearchValue,
    handleSearch,
    refetch,
    isRefetching
  } = props

  // eslint-disable-next-line
  const debouncedSearch = useCallback(debounce(handleSearch, 400), [])

  const handleChange = event => {
    const search = event.target.value.trimStart()
    setSearchValue(search)
    debouncedSearch(search.trim())
  }

  const handleClear = () => {
    setSearchValue('')
    debouncedSearch('')
  }

  return (
    <InputGroup minW={['auto', '380px']}>
      <InputLeftElement>
        <IconButton
          size='sm'
          aria-label='Refresh data'
          fontSize='20px'
          icon={<MdRefresh />}
          onClick={refetch}
          isLoading={isRefetching}
          variant='outline'
          border='none'
        />
      </InputLeftElement>
      <Input
        ref={searchRef}
        placeholder='Search ...'
        value={value || ''}
        onChange={handleChange}
        size='md'
      />
      {value && (
        <InputRightElement>
          <IconButton icon={<MdClear />} fontSize='20px' onClick={handleClear} size='sm' variant='outline' border='none' />
        </InputRightElement>
      )}
    </InputGroup>
  )
}
