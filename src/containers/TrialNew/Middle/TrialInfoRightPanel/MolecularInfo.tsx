import React, { Component } from 'react'

import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ErrorMessage from '../../../../components/ErrorMessage'
import Image from '../../../../components/Image'
import Loading from '../../../../components/Loading'
import { baseColors } from '../../../../constants/colors'
import {
  errorFetchingTrialPatentCompoundsSelector,
  fetchTrialPatentCompounds,
  isFetchingTrialPatentCompoundsSelector,
  trialPatentCompoundsSelector,
} from '../../../../redux/TrialPatent'

const Container = styled.div`
  height: 100%;
`

const StyledTable = styled(Table)`
  margin-top: 20px;
  width: 100%;
`

const SectionHeading = styled.div`
  border-bottom: 1px solid ${baseColors.GREY};
  font-size: 22px;
  padding-top: 20px;
`

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

const ContainerBody = styled.div`
  height: 100%;
`

const LinkExternal = ({ url, children }: { url: string; children: any }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

interface IPatentCompound {
  cid: string
  structure_url: string
  pubchem_url: string
  compound_name: string
  iupac_name: string
  molecular_formula: string
  molecular_weight: string
}
interface IProps {
  ptabTrialNum: string

  fetchTrialPatentCompounds: (ptabTrialNum: string) => void
  errorFetchingTrialPatentCompounds: boolean
  isFetchingTrialPatentCompounds: boolean
  patentCompounds: IPatentCompound[]
}
class UnconnectedMolecularInfo extends Component<IProps> {
  public componentDidMount() {
    this.props.fetchTrialPatentCompounds(this.props.ptabTrialNum)
  }

  public render() {
    const {
      errorFetchingTrialPatentCompounds,
      isFetchingTrialPatentCompounds,
    } = this.props

    return (
      <Container>
        {isFetchingTrialPatentCompounds && (
          <ContainerLoading>
            <Loading />
          </ContainerLoading>
        )}
        {!isFetchingTrialPatentCompounds &&
          errorFetchingTrialPatentCompounds && <ErrorMessage />}
        {!isFetchingTrialPatentCompounds &&
          !errorFetchingTrialPatentCompounds &&
          this.getMolecularInfoBody()}
      </Container>
    )
  }

  private getMolecularInfoBody() {
    const patentCompounds =
      this.props.patentCompounds &&
      this.props.patentCompounds[this.props.ptabTrialNum]

    if (!patentCompounds) {
      return null
    }

    return (
      <ContainerBody>
        <SectionHeading>Molecular Information</SectionHeading>
        <StyledTable bordered hover>
          <tbody>
            <tr>
              <th>Structure</th>
              <th>Compound CID</th>
              <th>Name</th>
              <th>IUPAC Name</th>
              <th>Molecular Formula</th>
              <th>Molecular Weight</th>
            </tr>

            {patentCompounds.map((patentCompound: IPatentCompound) => (
              <tr key={patentCompound.cid}>
                <td>
                  <Image src={patentCompound.structure_url} height="100px" />
                </td>
                <td>
                  <LinkExternal url={patentCompound.pubchem_url}>
                    {patentCompound.cid}
                  </LinkExternal>
                </td>
                <td>{patentCompound.compound_name}</td>
                <td>{patentCompound.iupac_name}</td>
                <td>{patentCompound.molecular_formula}</td>
                <td>{patentCompound.molecular_weight}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </ContainerBody>
    )
  }
}

function mapStateToProps(state: object) {
  return {
    errorFetchingTrialPatentCompounds: errorFetchingTrialPatentCompoundsSelector(
      state
    ),
    isFetchingTrialPatentCompounds: isFetchingTrialPatentCompoundsSelector(
      state
    ),
    patentCompounds: trialPatentCompoundsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTrialPatentCompounds,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedMolecularInfo)
