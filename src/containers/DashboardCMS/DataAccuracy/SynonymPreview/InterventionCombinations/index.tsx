import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { interventionInfoDataSelector } from '../../../../../redux/CMS/DataAccuracy'
import SearchBar from '../../../../SearchBar'
import { SEARCH_TYPE } from '../../../../../hooks/search'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../../../components'
import { postCollection } from '../../../../../helpers/api'
import { toast } from 'react-toastify'

const addUrl = '/v1/ct/interventions/combination/add'
const deleteUrl = '/v1/ct/interventions/combination/delete'

function InterventionCombinations(props) {
  const { interventionInfo } = props
  const initialInterventionCombinations =
    interventionInfo?.combination_interventions
  const [interventionCombinations, setInterventionCombinations] = useState<
    any[]
  >(initialInterventionCombinations)
  const interventionId = interventionInfo?.basic_info?.intervention_id
  useEffect(() => {
    setInterventionCombinations(initialInterventionCombinations)
  }, [initialInterventionCombinations])
  const [searchedVal, setSearchedVal] = useState()

  const handleAdd = (val) => {
    const payload = {
      intervention_id: interventionId,
      combination_intervention_id: val?.id,
    }
    postCollection(addUrl, payload)
      .then((responseData: any) => {
        toast.success(`Successfully added`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setInterventionCombinations(responseData)
      })
      .catch(() => {
        toast.error(`Failed to add`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const handleDelete = (val) => {
    const payload = {
      intervention_id: interventionId,
      combination_intervention_id: val?.combination_intervention_id,
    }
    postCollection(deleteUrl, payload)
      .then((responseData: any) => {
        toast.success(`Successfully deleted`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setInterventionCombinations(responseData)
      })
      .catch(() => {
        toast.error(`Failed to delete`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  return (
    <div>
      <div
        style={{
          maxHeight: 200,
          marginRight: 5,
          marginBottom: 20,
          overflow: 'auto',
        }}
      >
        {interventionCombinations?.map((item) => {
          return (
            <div>
              <span>{item?.combination_preferred_term}</span>
              <button onClick={() => handleDelete(item)}>delete</button>
            </div>
          )
        })}
      </div>
      <div style={{ width: '100%' }}>
        <SearchBar
          fontSize={12}
          history={useHistory()}
          isAuthenticated={false}
          activeLandingType={'r'}
          setSelectedItem={(item) => {
            setSearchedVal(item?.value)
          }}
          searchType={SEARCH_TYPE.INTERVENTIONS}
          placeholder={'Search synonym'}
        />
      </div>
      <div>
        <Button onClick={() => handleAdd(searchedVal)}>add</Button>
      </div>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    interventionInfo: interventionInfoDataSelector(state),
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterventionCombinations)
