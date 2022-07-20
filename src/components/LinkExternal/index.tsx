import React from 'react'

interface IProps {
  children: any
  href: string
  title?: string
}
const LinkExternal = (props: IProps) => {
  return (
    <a
      title={props?.title}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  )
}

export default LinkExternal
