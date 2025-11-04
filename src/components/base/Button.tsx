import React from 'react'
import { Button as HeroUIButton, ButtonProps } from '@heroui/react'

export const Button: React.FC<ButtonProps> = (props) => (
  <HeroUIButton {...props} />
)

export default Button
