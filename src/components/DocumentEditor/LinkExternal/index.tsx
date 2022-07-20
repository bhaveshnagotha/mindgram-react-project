import React, { Component } from 'react'

interface IProps {
  children: any
  href: string
}
class LinkExternal extends Component<IProps> {
  public render() {
    const { children, href } = this.props

    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
}

export default LinkExternal
