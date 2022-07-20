import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import styled from 'styled-components'

import { History } from 'history'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import Tree from '../../components/Tree'
import { baseColors } from '../../constants/colors'
import {
  currentCompanyNameSelector,
  errorFetchingKnowledgeGraphSelector,
  fetchCompanyKnowledgeGraph as fetchCompanyKnowledgeGraphAction,
  isFetchingKnowledgeGraphSelector,
  knowledgeGraphSelector,
} from '../../redux/Companies'
import {
  getTreeDataForCompany,
  IData,
  NODE_COLOR_MAPPING,
  NODE_TYPES,
} from './treeHelper'

const Container = styled.div`
  border-bottom: 1px solid ${baseColors.GREY};
  margin: auto;
  width: 80%;
  height: 100%;
`
const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

interface IMatch {
  params: {
    companyName: string
  }
}
function UnconnectedCompany({
  match,
  history,
  companyData,
  currentCompanyName,
  errorFetchingCompanyData,
  isFetchingCompanyData,
  fetchCompanyData,
}: {
  match: IMatch
  history: History

  companyData: IData[]
  currentCompanyName: string
  errorFetchingCompanyData: boolean
  isFetchingCompanyData: boolean
  fetchCompanyData: (companyName: string) => void
}) {
  const { companyName } = match.params

  useEffect(() => {
    if (
      companyName &&
      companyName !== currentCompanyName &&
      !errorFetchingCompanyData
    ) {
      fetchCompanyData(companyName)
    }
  }, [
    companyName,
    fetchCompanyData,
    currentCompanyName,
    errorFetchingCompanyData,
  ])

  const handleNodeClick = (node: { nodeType: string; name: string }) => {
    if (
      node.nodeType === NODE_TYPES.trialNonPending ||
      node.nodeType === NODE_TYPES.trialPending
    ) {
      history.push(`/patents/trials/${node.name}`)
    } else if (node.nodeType === NODE_TYPES.compound) {
      history.push(`/patents/dashboard-drug/${node.name}`)
    }
  }

  const CompanyTree = () => {
    if (companyData.length === 0) {
      return <div>Sorry, no data found</div>
    }

    const treeData = getTreeDataForCompany(companyName, companyData)
    return (
      <Tree
        key={companyName}
        data={treeData}
        handleNodeClick={handleNodeClick}
        nodeColorMapping={NODE_COLOR_MAPPING}
        isRootNodeCollapseEnabled={false}
        height={700}
        width={1300}
        margin={{ bottom: 30, left: 300, right: 90, top: 20 }}
      />
    )
  }

  return (
    <Container>
      {isFetchingCompanyData && (
        <ContainerLoading>
          <Loading />
        </ContainerLoading>
      )}
      {!isFetchingCompanyData && errorFetchingCompanyData && <ErrorMessage />}
      {!isFetchingCompanyData && !errorFetchingCompanyData && companyData && (
        <CompanyTree />
      )}
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    companyData: knowledgeGraphSelector(state),
    currentCompanyName: currentCompanyNameSelector(state),
    errorFetchingCompanyData: errorFetchingKnowledgeGraphSelector(state),
    isFetchingCompanyData: isFetchingKnowledgeGraphSelector(state),
  }
}

const mapDispatchToProps = {
  fetchCompanyData: fetchCompanyKnowledgeGraphAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedCompany)
