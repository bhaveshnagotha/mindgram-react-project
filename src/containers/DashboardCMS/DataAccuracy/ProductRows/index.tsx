import React, { useEffect } from 'react'
import {
  companyDataSelector,
  conceptsDataSelector,
  fetchConcepts as fetchConceptsAction,
  isErrorFetchingConceptsSelector,
  isFetchingConceptsSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { History } from 'history'
import { LoadingWrapper } from '../../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Loading } from '../../../../components'
import ErrorMessage from '../../../../components/ErrorMessage'
import ProductRow from './ProductRow'
import { ICompany, IConceptData } from '../interfaces'

interface IProps {
  selectedCompany: ICompany
  conceptsData: IConceptData
  fetchConcepts: (companyId: string) => void
  errorFetchingConcepts: boolean
  isFetchingConcepts: boolean
  history: History
}

function ProductRows(props: IProps) {
  const {
    conceptsData,
    errorFetchingConcepts,
    isFetchingConcepts,
    selectedCompany,
    fetchConcepts,
    history,
  } = props
  useEffect(() => {
    if (selectedCompany?.id && selectedCompany?.type) {
      fetchConcepts(selectedCompany?.type + selectedCompany?.id)
    }
    // eslint-disable-next-line
  }, [selectedCompany])
  const renderProductRows = () => {
    return conceptsData?.data?.map((concept, index) => {
      return (
        <div style={{ position: 'relative' }} key={index}>
          <ProductRow
            cindex={index}
            isAddNewProductRow={true}
            history={history}
            concept={concept}
          />
        </div>
      )
    })
  }
  return (
    <>
      {isFetchingConcepts && !errorFetchingConcepts && (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      )}
      {!isFetchingConcepts && errorFetchingConcepts && (
        <LoadingWrapper>
          <ErrorMessage />
        </LoadingWrapper>
      )}
      {!isFetchingConcepts && !errorFetchingConcepts && (
        <div style={{ height: 10000 }}>
          {conceptsData?.data &&
            conceptsData?.data?.length > 0 &&
            renderProductRows()}
        </div>
      )}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductRows)
