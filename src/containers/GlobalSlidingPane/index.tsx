import React, { Component } from 'react'

import { connect } from 'react-redux'

import SlidingPane from '../../components/SlidingPane'
import { baseColors } from '../../constants/colors'
import {
  hideSlidingPane,
  isShowingSlidingPaneSelector,
  slidingPaneComponents,
  slidingPanePropsSelector,
  slidingPaneTypeSelector,
} from '../../redux/GlobalSlidingPane'
import { NAVBAR_HEIGHT } from '../App/App.styles'

interface ISlidingPaneProps {
  width: number
  data: any
  hasTags: boolean
  tagsData: string[]
  tagBorderColor: string
  tagColor: string
  tagBgColor: string
  tagHelperText: string
  isStatic?: boolean
}
interface IProps {
  isShowingSlidingPane: boolean
  slidingPaneProps: ISlidingPaneProps
  slidingPaneType: string
  hideSlidingPane: () => void
}
class UnconnectedGlobalSlidingPane extends Component<IProps> {
  public render() {
    const {
      isShowingSlidingPane,
      slidingPaneType,
      slidingPaneProps,
    } = this.props

    const top = NAVBAR_HEIGHT
    const ChildComponent = slidingPaneComponents[slidingPaneType]
    const {
      width,
      hasTags,
      tagsData,
      tagBorderColor,
      tagColor,
      tagBgColor,
      tagHelperText,
      isStatic,
      ...childProps
    } = slidingPaneProps

    if (!isShowingSlidingPane) {
      return null
    }

    return (
      <SlidingPane
        backgroundColor={baseColors.WHITE}
        isShowing={isShowingSlidingPane}
        onClose={this.props.hideSlidingPane}
        top={top}
        width={width}
        hasTags={hasTags}
        tagsData={tagsData}
        tagBorderColor={tagBorderColor}
        tagColor={tagColor}
        tagBgColor={tagBgColor}
        tagHelperText={tagHelperText}
        isStatic={isStatic}
        style={{ zIndex: 10000 }}
      >
        {isShowingSlidingPane && <ChildComponent {...childProps} />}
      </SlidingPane>
    )
  }
}

function mapStateToProps(state: object) {
  return {
    isShowingSlidingPane: isShowingSlidingPaneSelector(state),
    slidingPaneProps: slidingPanePropsSelector(state),
    slidingPaneType: slidingPaneTypeSelector(state),
  }
}

const mapDispatchToProps = {
  hideSlidingPane,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedGlobalSlidingPane)
