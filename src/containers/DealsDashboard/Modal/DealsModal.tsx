import React from 'react'
import {
  dealsModalDataSelector,
  errorFetchingDealsModalDataSelector,
  isDealsModalOpenSelector,
  isFetchingDealsModalDataSelector,
  setDealsModalOpen as setDealsModalOpenAction,
} from '../../../redux/DealsActivity'
import { connect } from 'react-redux'
import DealsDashboardLatestDeals from './DealsDashboardLatestDeals'
import { ModalComponent } from '../../../components'

interface IReduxProps {
  isDealsModalOpen: boolean
  setDealsModalOpen: any
  dealsModalData: any
  isFetchingDealsModalData: any
  errorFetchingDealsModalData: any
}

const DealsModal = (props: IReduxProps) => {
  const {
    isDealsModalOpen,
    setDealsModalOpen,
    dealsModalData,
    isFetchingDealsModalData,
  } = props

  return (
    <ModalComponent
      show={isDealsModalOpen}
      onClose={() => {
        setDealsModalOpen(false)
      }}
      width={window.innerWidth / 2}
    >
      <DealsDashboardLatestDeals
        isLoadingDeals={isFetchingDealsModalData}
        latestDeals={dealsModalData}
      />
    </ModalComponent>
  )
}

function mapStateToProps(state: object) {
  return {
    isDealsModalOpen: isDealsModalOpenSelector(state),
    dealsModalData: dealsModalDataSelector(state),
    isFetchingDealsModalData: isFetchingDealsModalDataSelector(state),
    errorFetchingDealsModalData: errorFetchingDealsModalDataSelector(state),
  }
}

const mapDispatchToProps = {
  setDealsModalOpen: setDealsModalOpenAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DealsModal)
