import React, { useEffect } from 'react'
import {
  addMoa as addMoaAction,
  addMoaSearchedConcept as addMoaSearchedConceptAction,
  deleteMoa as deleteMoaAction,
  deleteMoaSearchedConcept as deleteMoaSearchedConceptAction,
  subsidiariesDataSelector,
  subsidiariesIdSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { Button } from '../../../../components'
import { IConcept } from '../interfaces'

import { postCollection } from '../../../../helpers/api'

interface IProps {
  concept: IConcept
  subsidiaries: any
  isAddNewProductRow: boolean
  cindex?: number
  subsidiaryIds: number[]
  deleteMoa: any
  deleteMoaSearchedConcept: any
  emptyConceptIndex?: number
}

export const getPharmActions = (concept) => {
  return
}

export const getIvids = (concept) => {
  const ids = concept?.synonyms_subsidiary_info?.map(({ intervention_id }) => {
    return intervention_id
  })
  return ids
}

function PharmActionsList(props: IProps) {
  const {
    concept,
    deleteMoa,
    deleteMoaSearchedConcept,
    cindex,
    isAddNewProductRow,
    emptyConceptIndex,
  } = props
  useEffect(() => {
    return
  }, [concept])

  const dmoa = (id, index) => {
    const lst = getIvids(concept)

    const url = `/v1/ct/interventions/moa/delete`
    const payload = {
      intervention_ids: lst,
      moa_id: id,
    }
    postCollection(url, payload)
      .then((response) => {
        if (isAddNewProductRow) {
          deleteMoa(cindex, index)
        } else {
          deleteMoaSearchedConcept(emptyConceptIndex ?? 0, index)
        }
      })
      .catch((error) => {
        return
      })
  }

  const renderItem = (moa: any, index: number) => {
    return (
      <div
        style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}
        key={index}
      >
        <span style={{ fontSize: 12 }}>{moa?.pharm_action}</span>
        <Button
          style={{ height: 25 }}
          onClick={() => dmoa(moa?.pharm_action_id, index)}
        >
          <span style={{ fontSize: 12 }}>delete</span>
        </Button>
      </div>
    )
  }

  return (
    <div style={{ height: '200px', overflow: 'auto', marginBottom: 20 }}>
      <div style={{ overflow: 'auto' }}>
        {concept?.pharm_action_info?.map((item, index) => {
          return renderItem(item, index)
        })}
      </div>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    subsidiaries: subsidiariesDataSelector(state),
    subsidiaryIds: subsidiariesIdSelector(state),
  }
}

const mapDispatchToProps = {
  deleteMoa: deleteMoaAction,
  deleteMoaSearchedConcept: deleteMoaSearchedConceptAction,
  addMoa: addMoaAction,
  addMoaSearchedConcept: addMoaSearchedConceptAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PharmActionsList)
