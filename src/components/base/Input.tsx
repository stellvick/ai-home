import React from 'react'
import {
  Input as HeroUIInput,
  InputProps,
} from '@heroui/react'

export const Input: React.FC<InputProps> = (props) => (
  <HeroUIInput {...props} />
)

export default Input
