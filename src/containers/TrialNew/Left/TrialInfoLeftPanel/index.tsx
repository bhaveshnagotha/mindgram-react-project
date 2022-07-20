import React, { Component } from 'react'

import styled from 'styled-components'

import List from '../../../../components/List'
import RightArrowIcon from '../../../../components/SvgIcons/RightArrowIcon'
import { baseColors } from '../../../../constants/colors'
import theme from '../../../../theme'
import { INFO_ITEM_IDS } from '../../constants'
import {
  dataSelector as documentsSelector,
  fetchDocumentsList as fetchDocumentsListAction,
} from '../../../../redux/TrialDocuments'
import { IDocumentRow } from '../TrialDocumentsLeftPanel'
import { connect } from 'react-redux'
import {
  fetchClaims,
  trialClaimsDataSelector,
} from '../../../../redux/TrialClaims'

const infoItemRows = [
  {
    id: INFO_ITEM_IDS.summary,
    title: 'Summary',
  },
  // DEVNOTE: Show Analytics info item in left frame.Code commented out for future use. Please do not remove.
  // {
  //   id: INFO_ITEM_IDS.analytics,
  //   title: 'Analytics',
  // },
  // {
  //   id: INFO_ITEM_IDS.trialInfo,
  //   title: 'Trial Information',
  // },
  // {
  //   id: INFO_ITEM_IDS.molecularInfo,
  //   title: 'Molecular Information',
  // },
  {
    id: INFO_ITEM_IDS.relatedMattersInfo,
    title: 'Related Proceedings',
  },
]

const ContainerRows = styled.div`
  height: calc(100% - 10px);
`
const ContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  cursor: pointer;
  padding: 15px 25px;
  box-shadow: ${(props: { isActive: boolean }) =>
    props.isActive ? theme.boxShadow : 'unset'};
  color: ${(props: { isActive: boolean }) =>
    props.isActive ? baseColors.BLUE_FIVE : baseColors.GREY_DARKER};
  transition: ease-in all 200ms;
  margin-bottom: 10px;

  &:hover {
    box-shadow: ${theme.boxShadow};
    color: ${baseColors.BLUE_FIVE};
    transition: all ease-in 200ms;
    > svg {
      > g {
        > path {
          fill: ${baseColors.BLUE_FIVE};
          transition: ease-in all 200ms;
        }
      }
    }
  }
`

interface IProps {
  activeInfoItemId: string | null
  handleInfoItemClick: (id: string) => void
  ptabTrialNum: string
  documents: IDocumentRow[]
  fetchDocumentsList: (ptabTrialNum: string) => void
  fetchClaims: (ptabTrialNum: string) => void
  claims: { [x: string]: any }
}
class TrialInfoLeftPanel extends Component<IProps> {
  public componentDidMount() {
    const { ptabTrialNum, documents, fetchDocumentsList, claims } = this.props
    if (
      (ptabTrialNum && !documents) ||
      (ptabTrialNum && documents && documents.length === 0)
    ) {
      fetchDocumentsList(this.props.ptabTrialNum)
    }
    if (
      claims === null ||
      (claims && claims[ptabTrialNum] === null) ||
      (claims && claims[ptabTrialNum] === undefined)
    ) {
      this.props.fetchClaims(this.props.ptabTrialNum)
    }
  }

  public render() {
    return this.getInfoRows()
  }

  private getInfoRow = (
    infoItem: { id: string; title: string },
    index: number
  ) => {
    const { id, title } = infoItem

    const text = `${title}`

    return (
      <ContainerRow
        key={id}
        isActive={id === this.props.activeInfoItemId}
        onClick={() => this.props.handleInfoItemClick(id)}
      >
        {text}
        <RightArrowIcon
          color={
            id === this.props.activeInfoItemId
              ? baseColors.BLUE_FIVE
              : baseColors.GREY_DARK
          }
          height={15}
        />
      </ContainerRow>
    )
  }

  private getInfoRows() {
    return (
      <ContainerRows>
        <List items={infoItemRows} renderItem={this.getInfoRow} />
      </ContainerRows>
    )
  }
}

function mapStateToProps(state: object) {
  return {
    documents: documentsSelector(state),
    claims: trialClaimsDataSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDocumentsList: fetchDocumentsListAction,
  fetchClaims,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrialInfoLeftPanel)
