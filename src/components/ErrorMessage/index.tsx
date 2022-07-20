import React, { Component } from 'react'

interface IProps {
  message?: string
  color?: string
}
class ErrorMessage extends Component<IProps> {
  private static defaultProps = {
    color: 'red',
    message: 'Under construction',
  }

  public render() {
    const { message, color } = this.props
    return <div style={{ color }}>{message}</div>
  }
}

export default ErrorMessage
