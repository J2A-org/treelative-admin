import React from 'react'

import {
  Flex,
  IconButton
} from '@chakra-ui/react'

import { AiOutlineSortDescending, AiOutlineSortAscending } from 'react-icons/ai'

const SortableHeaderCell = ({ children, isLeftEdge, isRightEdge, field, filterOrderByVar, refetch, ...rest }) => {
  const orderByField = filterOrderByVar().find(orderBy => orderBy.field === field)

  const sortBy = (value) => {
    filterOrderByVar(filterOrderByVar().map(orderBy => {
      if (orderBy.field === field) {
        return {
          ...orderBy,
          isActive: Boolean(value),
          value
        }
      } else {
        return {
          ...orderBy,
          // we're only allowing to sort by one field at this time
          isActive: false
        }
      }
    }))
    refetch()
  }

  const onSort = () => {
    if (orderByField.isActive) {
      if (orderByField.value === 'asc') {
        sortBy('desc')
      } else if (orderByField.value === 'desc') {
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
      onClick={orderByField && onSort}
      cursor={orderByField ? 'pointer' : ''}
      {...rest}
    >
      {orderByField && orderByField.isActive && (
        <IconButton
          aria-label={orderByField.value === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          size='8px'
          variant='outline'
          border='none'
          mr='1'
          icon={orderByField.value === 'asc' ? <AiOutlineSortAscending fontSize='18px' /> : <AiOutlineSortDescending fontSize='18px' />}
        />
      )}
      {children}
    </Flex>
  )
}

const HeaderCell = ({ children, isLeftEdge, isRightEdge, field, filterOrderByVar, refetch, ...rest }) => {
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

export default (props) => {
  return props.filterOrderByVar ? <SortableHeaderCell {...props} /> : <HeaderCell {...props} />
}
