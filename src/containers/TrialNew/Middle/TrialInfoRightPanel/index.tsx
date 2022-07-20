import React, { Component } from 'react'
import styled from 'styled-components'

import { INFO_ITEM_IDS } from '../../constants'
import Analytics from './Analytics'
import MolecularInfo from './MolecularInfo'
import RelatedMattersInfo from './RelatedMattersInfo'
import StatsInfo from './StatsInfo'
import TrialInfoHooks from './TrialInfoHooks'

const Container = styled.div`
  height: 100%;
`

interface IProps {
  activeInfoItemId: string | null
  ptabTrialNum: string
  onOpenRight: (x: object) => void
  onCloseRight: (x: object) => void
}
class TrialInfoRightPanel extends Component<IProps> {
  public render() {
    const { activeInfoItemId } = this.props

    return (
      <Container>
        {activeInfoItemId === INFO_ITEM_IDS.summary && (
          <StatsInfo
            ptabTrialNum={this.props.ptabTrialNum}
            onOpenRight={this.props.onOpenRight}
            onCloseRight={this.props.onCloseRight}
          />
        )}
        {activeInfoItemId === INFO_ITEM_IDS.analytics && (
          <Analytics ptabTrialNum={this.props.ptabTrialNum} />
        )}
        {activeInfoItemId === INFO_ITEM_IDS.trialInfo && (
          <TrialInfoHooks ptabTrialNum={this.props.ptabTrialNum} />
        )}
        {activeInfoItemId === INFO_ITEM_IDS.molecularInfo && (
          <MolecularInfo ptabTrialNum={this.props.ptabTrialNum} />
        )}
        {activeInfoItemId === INFO_ITEM_IDS.relatedMattersInfo && (
          <RelatedMattersInfo
            ptabTrialNum={this.props.ptabTrialNum}
            onNodeClick={this.props.onOpenRight}
          />
        )}
      </Container>
    )
  }
}

export default TrialInfoRightPanel
