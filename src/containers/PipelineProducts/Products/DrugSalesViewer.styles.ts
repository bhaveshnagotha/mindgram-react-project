import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
// import { baseColors } from '../../../constants/colors'
// import theme from '../../../theme'
// import { scrollBarStyles } from '../../Heatmap2/Heatmap2.styles'

export const StyledModal = styled(Modal)`
  z-index: 999999;
  & .modal-dialog {
    max-width: ${(props) => props.width ?? '80%'};
  }

  & .modal-content {
    border-style: none;
    padding: 0 1.5rem;
  }
`

export const CloseViewerButton = styled.div`
  cursor: pointer;
`

export const FilingToggle = styled.a`
  color: #007bff !important;

  &:hover {
    cursor: pointer;
    color: #0056b3 !important;
    text-decoration: underline !important;
  }
`
