import React, { useState } from 'react'
import { postCollection } from '../../../../helpers/api'
import { connect } from 'react-redux'
import {
  addMoa as addMoaAction,
  addMoaSearchedConcept as addMoaSearchedConceptAction,
} from '../../../../redux/CMS/DataAccuracy'

interface IProps {
  ivids: any
  isAddNewProductRow: boolean
  cindex?: number
  addMoa: any
  addMoaSearchedConcept: any
  emptyConceptIndex?: number
}

const NewMoaForm = (props: IProps) => {
  const [name, setName] = useState<string>('')
  const {
    ivids,
    isAddNewProductRow,
    cindex,
    addMoa,
    addMoaSearchedConcept,
    emptyConceptIndex,
  } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = `/v1/ct/interventions/moa/add-new`
    const payload = {
      intervention_ids: ivids,
      moa: name,
    }
    postCollection(url, payload)
      .then((response) => {
        const moa = response
        isAddNewProductRow
          ? addMoa(cindex, moa)
          : addMoaSearchedConcept(emptyConceptIndex ?? 0, moa)
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        id="moa"
        name="moa"
        value={name}
        placeholder={'type moa'}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  )
}

const mapDispatchToProps = {
  addMoa: addMoaAction,
  addMoaSearchedConcept: addMoaSearchedConceptAction,
}

export default connect(null, mapDispatchToProps)(NewMoaForm)
