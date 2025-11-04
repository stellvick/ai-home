import React from 'react'
import { Card as HeroUICard, CardProps } from '@heroui/react'

export const Card: React.FC<CardProps> = (props) => (
  <HeroUICard {...props} />
)

export default Card
