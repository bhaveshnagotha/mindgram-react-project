import React, { useEffect } from 'react'
import {
  companyDataSelector,
  conceptsDataSelector,
  fetchConcepts as fetchConceptsAction,
  isErrorFetchingConceptsSelector,
  isFetchingConceptsSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { List, Loading } from '../../../../components'
import { LoadingWrapper } from '../../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { ICompany, IConcept, IConceptData } from '../interfaces'

interface IProps {
  selectedCompany: ICompany
  conceptsData: IConceptData
  fetchConcepts: (companyId: string) => void
  errorFetchingConcepts: boolean
  isFetchingConcepts: boolean
}

function ConceptsList(props: IProps) {
  const {
    conceptsData,
    errorFetchingConcepts,
    isFetchingConcepts,
    selectedCompany,
    fetchConcepts,
  } = props
  useEffect(() => {
    if (selectedCompany?.id && selectedCompany?.type) {
      fetchConcepts(selectedCompany?.type + selectedCompany?.id)
    }
  }, [fetchConcepts, selectedCompany])
  const renderItem = (concept: IConcept, index: number) => {
    return (
      <>
        <span style={{ cursor: 'pointer' }} onClick={() => undefined}>
          {concept.intervention_name}
        </span>
        {/*<Button> select</Button>*/}
      </>
    )
  }
  return (
    <div>
      {isFetchingConcepts && (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      )}
      {!errorFetchingConcepts && !isFetchingConcepts && conceptsData && (
        <>
          <div style={{ height: '400px', overflow: 'auto', marginBottom: 20 }}>
            <List renderItem={renderItem} items={conceptsData.data} />
          </div>
          <input placeholder={'type concept name'} />
        </>
      )}
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    conceptsData: conceptsDataSelector(state),
    selectedCompany: companyDataSelector(state),
    errorFetchingConcepts: isErrorFetchingConceptsSelector(state),
    isFetchingConcepts: isFetchingConceptsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchConcepts: fetchConceptsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptsList)
