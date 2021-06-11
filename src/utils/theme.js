import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  styles: {
    global: {
      body: {
        minHeight: '100vh'
      },
      '::-webkit-scrollbar': {
        width: '6px',
        height: '6px'
      },
      '::-webkit-scrollbar-track': {
        // transparent
      },
      '::-webkit-scrollbar-thumb': {
        background: 'var(--chakra-colors-blue-200)',
        borderRadius: '10px'
      },
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--chakra-colors-blue-200) transparent'
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue'
      },
      variants: {
        header: {
          _hover: { bg: 'blue.700' },
          _active: { bg: 'blue.700' }
        }
      }

    },
    Progress: {
      defaultProps: {
        colorScheme: 'blue'
      }
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'blue'
      }
    },
    Modal: {
      baseStyle: {
        closeButton: {
          color: 'blue.500'
        },
        dialog: {
          borderRadius: 'xl'
        }
      }
    },
    Drawer: {
      baseStyle: {
        closeButton: {
          color: 'blue.500'
        },
        dialog: {
          borderRadius: 'xl'
        }
      }
    },
    Switch: {
      defaultProps: {
        colorScheme: 'blue'
      }
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: 'blue.900',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-700)'
            }
          }
        }
      }
    },
    Menu: {
      baseStyle: {
        item: {
          _hover: { bg: 'blue.600', color: 'white' },
          _focus: { bg: 'blue.600', color: 'white' },
          borderRadius: 'md'
        }
      }
    },
    Tabs: {
      defaultProps: {
        colorScheme: 'blue'
      },
      baseStyle: {
        tab: {
          _focus: { boxShadow: 'none' }
        }
      }
    },
    FormLabel: {
      baseStyle: {
        mb: '1',
        fontSize: 'sm',
        fontWeight: 'semibold',
        marginRight: '0'
      }
    },
    Badge: {
      defaultProps: {
        colorScheme: 'blue'
      }
    }
  }
})

// console.log(theme)

export default theme
