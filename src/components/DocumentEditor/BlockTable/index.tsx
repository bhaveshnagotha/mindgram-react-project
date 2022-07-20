import React, { Component } from 'react'
import styled from 'styled-components'

import { Block } from 'slate'
import getBlockPadding from '../helpers'

const Container = styled.div`
  margin-left: ${(props: { indentation: number }) =>
    getBlockPadding(props.indentation)};
  padding-top: 10px;
`

interface IProps {
  attributes: object
  children: any
  node: Block
}
class BlockTable extends Component<IProps> {
  private static defaultProps = {
    children: null,
  }

  public render() {
    const { attributes, node, children } = this.props
    const indentation = node.getIn(['data', 'indentation'])

    return (
      <Container {...attributes} indentation={indentation}>
        <table>
          <tbody>{children}</tbody>
        </table>
      </Container>
    )
  }
}

export default BlockTable
