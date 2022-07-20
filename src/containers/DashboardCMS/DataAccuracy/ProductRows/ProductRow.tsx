import { History } from 'history'
import React, { useEffect, useState } from 'react'
import PharmActionsList, { getIvids } from '../PharmActionsList'
import TargetsList from '../TargetsList'
import { postCollection } from '../../../../helpers/api'
import { Col, Row } from 'react-bootstrap'
import SynonymsList from '../SynonymsList'
import SearchBar from '../../../SearchBar'
import { SEARCH_TYPE } from '../../../../hooks/search'
import { Button } from '../../../../components'
import { IConcept } from '../interfaces'
import {
  addMoa as addMoaAction,
  addMoaSearchedConcept as addMoaSearchedConceptAction,
  addTarget as addTargetAction,
  addTargetSearchedConcept as addTargetSearchedConceptAction,
  companyDataSelector,
  conceptsDataSelector,
  isErrorFetchingConceptsSelector,
  isFetchingConceptsSelector,
  setConceptDataSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import NewMoaForm from '../PharmActionsList/MoaInput'

function ProductRow(props: {
  cindex?: number
  isAddNewProductRow: boolean
  concept: IConcept
  history: History
  addMoa: any
  addMoaSearchedConcept: any
  addTarget: any
  addTargetSearchedConcept: any
  selectedConcept: any
  emptyConceptIndex?: number
}) {
  const {
    concept,
    history,
    cindex,
    addMoa,
    addMoaSearchedConcept,
    addTarget,
    addTargetSearchedConcept,
    isAddNewProductRow,
    emptyConceptIndex,
  } = props
  const currentConcept = isAddNewProductRow ? concept : concept
  const [sc, setSearchedMoa] = useState<any>()
  const [searchedTarget, setSearchedTarget] = useState<any>()

  useEffect(() => undefined, [currentConcept])

  const handleAddMoa = () => {
    if (!sc?.value?.id) {
      return
    }
    const lst = getIvids(currentConcept)
    const url = `/v1/ct/interventions/moa/add`
    const payload = {
      intervention_ids: lst,
      moa_id: sc?.value?.id,
    }

    const moa = {
      pharm_action_id: sc?.value?.id,
      pharm_action: sc?.value?.pharm_action,
      pharm_action_uid: sc?.value?.pharm_action_id,
    }

    postCollection(url, payload)
      .then((response) => {
        isAddNewProductRow
          ? addMoa(cindex, moa)
          : addMoaSearchedConcept(emptyConceptIndex ?? 0, moa)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  const handleAddTarget = () => {
    if (!searchedTarget?.value) {
      return
    }
    const lst = getIvids(currentConcept)
    const url = `/v1/ct/interventions/target/add`
    const payload = {
      intervention_ids: lst,
      target_id: searchedTarget?.value?.target_id,
    }

    const target = {
      synonym: searchedTarget?.value?.synonym,
      target_cui: searchedTarget?.value?.target_cui,
      target_id: searchedTarget?.value?.target_id,
      target_name: searchedTarget?.value?.target_name,
      target_symbol: searchedTarget?.value?.target_symbol,
    }

    postCollection(url, payload)
      .then((response) => {
        isAddNewProductRow
          ? addTarget(cindex, target)
          : addTargetSearchedConcept(emptyConceptIndex ?? 0, target)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  if (!currentConcept) {
    return <div>no data</div>
  }

  return (
    <div>
      <Row
        style={{
          height: 'auto',
          maxHeight: 4000,
          overflow: 'hidden',
          paddingBottom: 20,
          paddingTop: 20,
          backgroundColor: 'white',
          border: '1px solid black',
        }}
        noGutters={true}
      >
        <Col md={{ span: 12 }} className="pl-0" style={{ marginBottom: 10 }}>
          <span style={{ marginRight: 10 }}>
            <strong>CUI: </strong> {currentConcept?.norm_cui}
          </span>
          <span>
            <strong>Concept Name: </strong> {currentConcept.intervention_name}
          </span>
        </Col>
        <Col md={{ span: 6 }} className="pl-0">
          <h6>Synonyms:</h6>
          <SynonymsList
            cindex={cindex}
            isAddNewProductRow={props.isAddNewProductRow}
            concept={currentConcept}
            history={history}
          />
        </Col>
        <Col md={{ span: 3 }} className="pl-0">
          <h6>Mechanism(s) of Action:</h6>
          <div>
            <PharmActionsList
              concept={currentConcept}
              cindex={cindex}
              isAddNewProductRow={isAddNewProductRow}
              emptyConceptIndex={emptyConceptIndex}
            />
          </div>
          <div style={{ display: 'flex', marginTop: 20, position: 'relative' }}>
            <SearchBar
              fontSize={14}
              history={history}
              isAuthenticated={false}
              activeLandingType={'r'}
              setSelectedItem={(item) => setSearchedMoa(item)}
              searchType={SEARCH_TYPE.MOA}
              placeholder={'Search moa'}
            />
            <div>
              <Button onClick={() => handleAddMoa()}>add</Button>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <NewMoaForm
              ivids={getIvids(currentConcept)}
              cindex={cindex}
              isAddNewProductRow={isAddNewProductRow}
              emptyConceptIndex={emptyConceptIndex}
            />
          </div>
        </Col>
        <Col md={{ span: 3 }} className="pl-0">
          <h6>Targets:</h6>
          <div>
            <TargetsList
              concept={currentConcept}
              cindex={cindex}
              isAddNewProductRow={isAddNewProductRow}
              emptyConceptIndex={emptyConceptIndex}
            />
          </div>
          <div style={{ display: 'flex', marginTop: 20, position: 'relative' }}>
            <SearchBar
              fontSize={14}
              history={history}
              isAuthenticated={false}
              activeLandingType={'r'}
              setSelectedItem={(item) => {
                setSearchedTarget(item)
              }}
              searchType={SEARCH_TYPE.TARGET}
              placeholder={'Search target'}
            />
            <div>
              <Button onClick={() => handleAddTarget()}>add</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    conceptsData: conceptsDataSelector(state),
    selectedCompany: companyDataSelector(state),
    errorFetchingConcepts: isErrorFetchingConceptsSelector(state),
    isFetchingConcepts: isFetchingConceptsSelector(state),
    selectedConcept: setConceptDataSelector(state),
  }
}

const mapDispatchToProps = {
  addMoa: addMoaAction,
  addMoaSearchedConcept: addMoaSearchedConceptAction,
  addTarget: addTargetAction,
  addTargetSearchedConcept: addTargetSearchedConceptAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow)
