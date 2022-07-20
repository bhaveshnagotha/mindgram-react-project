import React from 'react'

interface IProps {
  children: any
}
const BlockExhibit = ({ children = null }: IProps) => {
  return <div style={{ display: 'flex' }}>{children}</div>
}

export default BlockExhibit
