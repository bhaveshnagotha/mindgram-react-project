import styled from 'styled-components'
import PlusIcon from '../SvgIcons/PlusIcon'
import MinusIcon from '../SvgIcons/MinusIcon'

interface IZoomWrapper {
  zoomBtnPosition?: 'flex-start' | 'center' | 'flex-end'
}

interface IHeaderButtons {
  zoomBtnPosition?: 'flex-start' | 'center' | 'flex-end'
}

const ZoomWrapper = styled.div<IZoomWrapper>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.zoomBtnPosition};
  z-index: 1;
`
const StyledPlusIcon = styled(PlusIcon)`
  margin-right: 15px;
`
const StyledMinusIcon = styled(MinusIcon)`
  margin-right: 30px;
`

const HeaderButtons = styled.div<IZoomWrapper>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.zoomBtnPosition};
  z-index: 1;
  position: absolute;
  top: 1rem;
  right: 0;
  margin-right: 10px;
`

const CloseViewerButton = styled.div`
  cursor: pointer;
`

export {
  ZoomWrapper,
  HeaderButtons,
  CloseViewerButton,
  StyledMinusIcon,
  StyledPlusIcon,
}

export type { IZoomWrapper, IHeaderButtons }
