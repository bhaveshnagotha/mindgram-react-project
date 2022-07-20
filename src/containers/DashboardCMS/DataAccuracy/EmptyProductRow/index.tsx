import { History } from 'history'
import { Col, Row } from 'react-bootstrap'
import SearchBar from '../../../SearchBar'
import { SEARCH_TYPE } from '../../../../hooks/search'
import React, { useEffect, useState } from 'react'
import ProductRow from '../ProductRows/ProductRow'
import { Button } from '../../../../components'
import {
  addConcept as addConceptAction,
  setConcept as setConceptAction,
  setConceptDataSelector,
  subsidiariesDataSelector,
  subsidiariesIdSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { postCollection } from '../../../../helpers/api'
import { IConcept } from '../interfaces'
import Select from 'react-select'

interface IProps {
  history: History
  addConcept: any
  setConcept: any
  selectedConcept: any
  subsidiaryIds: number[]
  subsidiaries: any
}

function EmptyProductRow(props: IProps) {
  const {
    history,
    setConcept,
    selectedConcept,
    subsidiaries,
    subsidiaryIds,
    addConcept,
  } = props
  const [concept, setSearchedConcept] = useState<any>()
  const { register, handleSubmit } = useForm<any>()

  const [dropdownConcept, setDropdownConcept] = useState<any>()
  let e: IConcept
  if (dropdownConcept) {
    e = selectedConcept?.data?.[dropdownConcept?.index]
    // console.log(e)
  } else {
    e = selectedConcept?.data?.[0]
      ? selectedConcept?.data?.[0]
      : ({} as IConcept)
  }
  useEffect(() => {
    // return
  }, [selectedConcept])
  const handleAddConcept = () => {
    if (!concept || !subsidiaries) {
      return
    }
    setConcept(concept?.value?.cui, subsidiaryIds, concept?.value?.id)
  }
  const onSubmit = (data) => {
    const name = data.name
    const w = name.replace(/\s/g, '')
    const id = 'ID' + w.substring(0, 10)
    const payload = {
      intervention_uid: id,
      preferred_term: name,
      norm_cui: id,
      norm_cui_name: name,
      subsidiary_ids: subsidiaryIds,
      primary_subsidiary_id: subsidiaries?.primary_subsidiary?.id,
      new_concept: true,
    }

    const url = `/v1/ct/new-concept-synonym`
    postCollection(url, payload)
      .then((response: any) => {
        addConcept(response?.data?.data[0])
      })
      .catch((error) => {
        return
      })
  }
  function form() {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="name"
          ref={register}
          placeholder={'type concept'}
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }

  function dropdown() {
    const ops = selectedConcept?.data?.map((item, index) => {
      return {
        value: index,
        data: item,
        label: item?.intervention_name,
      }
    })
    const handleChange = (val) => {
      const data = val?.data
      const index = val?.value
      setDropdownConcept({ concept: data, index })
    }

    return <Select options={ops} onChange={handleChange} />
  }
  return (
    <Row>
      <Col md={{ span: 2 }}>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <SearchBar
            fontSize={14}
            history={history}
            isAuthenticated={false}
            activeLandingType={'r'}
            setSelectedItem={(item) => {
              setSearchedConcept(item)
            }}
            searchType={SEARCH_TYPE.INTERVENTIONS}
            placeholder={'Search concept'}
          />
          <div>
            <Button onClick={() => handleAddConcept()}>add</Button>
          </div>
        </div>
        <div>
          {/*{selectedConcept?.length>1 && }*/}
          {dropdown()}
        </div>
        <div style={{ marginTop: 100 }}>{form()}</div>
      </Col>
      <Col md={{ span: 10 }} style={{ position: 'relative' }}>
        <div>
          <ProductRow
            isAddNewProductRow={false}
            concept={e}
            emptyConceptIndex={dropdownConcept?.index ?? 0}
            history={history}
          />
        </div>
      </Col>
    </Row>
  )
}

function mapStateToProps(state: object) {
  return {
    selectedConcept: setConceptDataSelector(state),
    subsidiaries: subsidiariesDataSelector(state),
    subsidiaryIds: subsidiariesIdSelector(state),
  }
}

const mapDispatchToProps = {
  addConcept: addConceptAction,
  setConcept: setConceptAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptyProductRow)
