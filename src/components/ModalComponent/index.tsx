import React from 'react'
import { Modal } from 'react-bootstrap'
import styled, { css } from 'styled-components'
import { baseColors } from '../../constants/colors'

interface IProps {
  show: boolean
  onClose?: () => any
  title?: string
  modalFooter?: any
  isStatic?: boolean
  width?: number
  height?: number
  titleFontSize?: number
}

const customModalWidth = (width) => css`
  .modal-dialog {
    @media (min-width: 576px) {
      max-width: ${width}px;
    }
  }
`
const customModalHeight = (height) => css`
  > .modal-dialog > .modal-content {
    height: ${height}px;
  }
`
const StyledModalComponent = styled(Modal)`
  ${(props) => (props.width ? customModalWidth(props.width) : '')};
  ${(props) => (props.height ? customModalHeight(props.height) : '')};
  > .modal-dialog > .modal-content {
    padding: 0;
    box-shadow: ${(props) => props.theme.boxShadowInverted};
    border-radius: 8px;
    .modal-header {
      background-color: ${(props) => props.theme.secondaryBg};
      color: ${(props) => props.theme.primaryTextColor};
      border-bottom: none;
    }
    .modal-body,
    .modal-footer {
      border-top: none;
      color: ${(props) => props.theme.primaryTextColor};
      background-color: ${(props) => props.theme.primaryBg};
    }
  }
  z-index: 999999;
`

const ModalComponent: React.FC<IProps> = (props) => {
  const Footer = () => props.modalFooter() ?? null
  return (
    <StyledModalComponent
      centered
      backdrop={props.isStatic ? 'static' : true}
      show={props.show}
      onHide={props.onClose}
      width={props.width}
      height={props.height}
      enforceFocus={true}
      autoFocus={false}
      scrollable={true}
    >
      {props.title && (
        <Modal.Header>
          <Modal.Title
            style={{
              color: baseColors.GREY_DARKER,
              fontSize: props.titleFontSize,
            }}
          >
            {props.title}
          </Modal.Title>
        </Modal.Header>
      )}

      <>
        <Modal.Body>{props.children}</Modal.Body>
        {props.modalFooter && (
          <Modal.Footer>
            <Footer />
          </Modal.Footer>
        )}
      </>
    </StyledModalComponent>
  )
}
export default ModalComponent
