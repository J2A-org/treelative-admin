import React from 'react'

import {
  Flex,
  IconButton
} from '@chakra-ui/react'

import { AiOutlineSortDescending, AiOutlineSortAscending } from 'react-icons/ai'

const SortableHeaderCell = ({ children, isLeftEdge, isRightEdge, field, canSort, orderBy, handleOrderBy, ...rest }) => {
  const activeOrderBy = orderBy.find(orderBy => Object.keys(orderBy)[0] === field)

  const sortBy = (value) => {
    if (value) {
      handleOrderBy([{ [field]: value }])
    } else {
      handleOrderBy(null)
    }
  }

  const onSort = () => {
    if (activeOrderBy) {
      if (activeOrderBy[field] === 'asc') {
        sortBy('desc')
      } else if (activeOrderBy[field] === 'desc') {
        sortBy(undefined)
      }
    } else {
      sortBy('asc')
    }
  }

  return (
    <Flex
      as='th'
      position='sticky'
      top='0px'
      bgColor='blue.50'
      zIndex={1}
      textTransform='uppercase'
      alignItems='center'
      minH='8'
      px='2'
      borderLeftRadius={isLeftEdge ? 'md' : ''}
      borderRightRadius={isRightEdge ? 'md' : ''}
      onClick={canSort && onSort}
      cursor={canSort ? 'pointer' : ''}
      {...rest}
    >
      {canSort && activeOrderBy && (
        <IconButton
          aria-label={activeOrderBy[field] === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          size='8px'
          variant='outline'
          border='none'
          mr='1'
          icon={activeOrderBy[field] === 'asc' ? <AiOutlineSortAscending fontSize='18px' /> : <AiOutlineSortDescending fontSize='18px' />}
        />
      )}
      {children}
    </Flex>
  )
}

const HeaderCell = ({ children, isLeftEdge, isRightEdge, field, orderBy, ...rest }) => {
  return (
    <Flex
      as='th'
      position='sticky'
      top='0px'
      bgColor='blue.50'
      zIndex={1}
      textTransform='uppercase'
      alignItems='center'
      minH='8'
      px='2'
      borderLeftRadius={isLeftEdge ? 'md' : ''}
      borderRightRadius={isRightEdge ? 'md' : ''}
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default ({ orderBy, handleOrderBy, canSort, ...rest }) => {
  return orderBy
    ? <SortableHeaderCell canSort={canSort} orderBy={orderBy} handleOrderBy={handleOrderBy} {...rest} />
    : <HeaderCell {...rest} />
}
