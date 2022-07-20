import React, { Component } from 'react'
import { Editor as CoreEditor } from 'slate'
import { RenderBlockProps } from 'slate-react'

import Button, { buttonTypes } from '../Button'
import Loading from '../Loading'
import BlockBlob from './BlockBlob'
import BlockBullet from './BlockBullet'
import BlockContent, {
  BlockContentHeading,
  BlockContentHeadingPageNumber,
  BlockContentHeadingTitle,
} from './BlockContent'
import BlockExhibit from './BlockExhibit'
import {
  ExhibitDescription,
  ExhibitNumber,
} from './BlockExhibit/BlockExhibit.styles'
import BlockFooter from './BlockFooter'
import BlockHeading from './BlockHeading'
import BlockPage from './BlockPage'
import BlockPageNumber from './BlockPageNumber'
import BlockParagraph from './BlockParagraph'
import BlockTable from './BlockTable'
import { TableBlob, TableCell, TableParagraph } from './DocumentEditor.styles'
// import MarkHotKey from './plugins'

// const plugins = [
//   MarkHotKey({ key: 'b', type: 'bold' }),
//   MarkHotKey({ key: 'i', type: 'italic' }),
//   MarkHotKey({ key: 'h', type: 'strikethrough' }),
//   MarkHotKey({ key: 'u', type: 'underlined' }),
// ]

interface IProps {
  documentTree: object
  onLinkClick?: (nodeData: any) => void
  readOnly?: boolean
}
interface IState {
  value: any
}

class DocumentEditor extends Component<IProps, IState> {
  private static defaultProps = {
    onLinkClick: (nodeData: object) => undefined,
    readOnly: true,
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      value: props.documentTree,
    }
  }

  public render() {
    if (!this.state.value) {
      return <Loading />
    }
    return null
    // return (
    //   <Editor
    //     onChange={this.onChange}
    //     plugins={plugins}
    //     readOnly={this.props.readOnly}
    //     renderMark={this.renderMark}
    //     renderBlock={this.renderNode}
    //     spellCheck
    //     value={this.state.value}
    //   />
    // )
  }

  private onChange = (newState: { value: object }) => {
    this.setState({ value: newState.value })
  }

  private renderMark = (props: {
    children: any
    mark: { type: string }
    attributes: object
  }) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      case 'strikethrough':
        return <del {...attributes}>{children}</del>
      case 'superscript':
        return <sup {...attributes}>{children}</sup>
      default:
        return null
    }
  }

  private renderNode = (
    props: RenderBlockProps,
    editor: CoreEditor,
    next: () => any
  ) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'page':
        return <BlockPage {...attributes}>{children}</BlockPage>
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'link':
        return (
          <Button
            onClick={() => this.props.onLinkClick!(node.data)}
            type={buttonTypes.LINK}
          >
            {children}
          </Button>
        )
      case 'link-external': {
        const href = node.data.get('value')
        if (!href) {
          return <span>{children}</span>
        }

        return (
          <Button
            type={buttonTypes.LINK_EXTERNAL}
            href={href}
            onClick={() => undefined}
          >
            {children}
          </Button>
        )
      }
      case 'heading':
        return <BlockHeading {...props}>{children}</BlockHeading>
      case 'blob':
        return <BlockBlob {...props} />
      case 'paragraph':
        return <BlockParagraph {...props} />
      case 'table':
        return <BlockTable {...props} />
      case 'table-cell':
        return <TableCell {...attributes}>{children}</TableCell>
      case 'table-blob':
        return <TableBlob {...attributes}>{children}</TableBlob>
      case 'table-paragraph':
        return <TableParagraph {...attributes}>{children}</TableParagraph>
      case 'table-row':
        return <tr {...attributes}>{children}</tr>
      case 'footer':
        return <BlockFooter {...attributes}>{children}</BlockFooter>
      case 'page-number':
        return <BlockPageNumber {...attributes}>{children}</BlockPageNumber>
      case 'bullet':
        return <BlockBullet {...props}>{children}</BlockBullet>
      case 'exhibit':
        return <BlockExhibit {...props} />
      case 'exhibit-number':
        return <ExhibitNumber {...attributes}>{children}</ExhibitNumber>
      case 'exhibit-description':
        return (
          <ExhibitDescription {...attributes}>{children}</ExhibitDescription>
        )
      case 'content':
        return <BlockContent {...props} />
      case 'content-heading':
        return <BlockContentHeading {...props} />
      case 'content-heading-title':
        return <BlockContentHeadingTitle {...props} />
      case 'content-heading-page-number':
        return <BlockContentHeadingPageNumber {...props} />
      default:
        return null
    }
  }
}

export default DocumentEditor
