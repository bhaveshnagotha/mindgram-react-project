import React, { useEffect } from 'react'
import {
  deleteTarget as deleteTargetAction,
  deleteTargetSearchedConcept as deleteTargetSearchedConceptAction,
  subsidiariesDataSelector,
  subsidiariesIdSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { Button, Tag } from '../../../../components'
import { IConcept } from '../interfaces'

import { postCollection } from '../../../../helpers/api'
import { baseColors } from '../../../../constants/colors'

interface IProps {
  concept: IConcept
  subsidiaries: any
  isAddNewProductRow: boolean
  cindex?: number
  subsidiaryIds: number[]
  deleteTarget: any
  deleteTargetSearchedConcept: any
  emptyConceptIndex?: number
}

export const getIvids = (concept) => {
  const ids = concept?.synonyms_subsidiary_info?.map(({ intervention_id }) => {
    return intervention_id
  })
  return ids
}

function TargetsList(props: IProps) {
  const {
    concept,
    deleteTarget,
    deleteTargetSearchedConcept,
    cindex,
    isAddNewProductRow,
    emptyConceptIndex,
  } = props
  useEffect(() => {
    return
  }, [concept])

  const dTarget = (id, index) => {
    const lst = getIvids(concept)

    const url = `/v1/ct/interventions/target/delete`
    const payload = {
      intervention_ids: lst,
      target_id: id,
    }
    postCollection(url, payload)
      .then((response) => {
        if (isAddNewProductRow) {
          deleteTarget(cindex, index)
        } else {
          deleteTargetSearchedConcept(emptyConceptIndex ?? 0, index)
        }
      })
      .catch((error) => {
        return
      })
  }

  const renderItem = (target: any, index: number) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr' }}>
        <div>
          <div style={{ fontSize: 12 }}>{target?.target_name}</div>
          <div style={{ marginLeft: 10, color: baseColors.GREY_DARK2 }}>
            {target?.target_cui}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginRight: 10 }}>
          <Tag
            bgColor={baseColors.BLUE_SEVEN}
            color={baseColors.WHITE}
            height={25}
            width={'auto'}
          >
            {target?.target_symbol}
          </Tag>
        </div>
        <Button
          style={{ height: 25 }}
          onClick={() => dTarget(target?.target_id, index)}
        >
          <span style={{ fontSize: 12 }}>delete</span>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ height: '200px', overflow: 'auto', marginBottom: 20 }}>
        <div style={{ overflow: 'auto' }}>
          {concept?.targets?.map((item, index) => {
            return renderItem(item, index)
          })}
        </div>
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
  deleteTarget: deleteTargetAction,
  deleteTargetSearchedConcept: deleteTargetSearchedConceptAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetsList)
