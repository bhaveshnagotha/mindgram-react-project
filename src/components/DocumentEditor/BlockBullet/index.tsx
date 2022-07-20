import React from 'react'

interface IProps {
  children: any
}
const BlockBullet = ({ children = null }: IProps) => {
  return <li>{children}</li>
}

export default BlockBullet
