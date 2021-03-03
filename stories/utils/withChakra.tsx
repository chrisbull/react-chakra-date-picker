import { ChakraProvider, Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { StoryContext } from '@storybook/react'
import * as React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const nextMode = useColorModeValue('dark', 'light')

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={() => toggleColorMode()}
        icon={<SwitchIcon />}
      />
    </Flex>
  )
}

export const withChakra = (StoryFn: Function, _context: StoryContext) => {
  return (
    <ChakraProvider>
      <ColorModeToggleBar />
      <StoryFn />
    </ChakraProvider>
  )
}
