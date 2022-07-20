import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'
import { Button, List, Checkbox } from '../../../../components'
import CrossIcon from '../../../../components/SvgIcons/CrossIcon'
import { baseColors } from '../../../../constants/colors'
import { postCollection, getCollection } from '../../../../helpers/api'
import { SEARCH_TYPE } from '../../../../hooks/search'
import {
  addBiomarker as addBiomarkerAction,
  addCondition as addConditionAction,
  deleteCondition as deleteConditionAction,
  interventionInfoConditionsSelector,
  removeBiomarker as removeBiomarkerAction,
  synonymSelector,
  updateConditionDesignations as updateConditionDesignationsAction,
} from '../../../../redux/CMS/DataAccuracy'
import {
  SelectedFilter,
  SelectedFiltersContainer,
} from '../../../PipelineProducts/PipelineProducts.styles'
import SearchBar from '../../../SearchBar'
import { IAddCondition, ISynonym, options } from '../interfaces'
import BiomarkerModal from '../SynonymPreview/BiomarkerModal'
import ConditionNoteModal from '../SynonymPreview/ConditionNoteModal'
import DesignationsModal from '../SynonymPreview/DesignationsModal'
import MilestonesModal from '../SynonymPreview/MilestonesModal'

interface IProps {
  selectedSynonym: ISynonym
  conditionsData: any
  addCondition: (
    newCondition: IAddCondition,
    interventionId: number,
    phase: (string | number)[]
  ) => void
  deleteCondition: any
  updateConditionDesignations: any
  addBiomarker: any
  removeBiomarker: any
}

const Item = styled.div`
  flex: 1 1 auto;
  margin: 2px;
`

function ConditionsList(props: IProps) {
  const {
    selectedSynonym,
    conditionsData,
    addCondition,
    deleteCondition,
    updateConditionDesignations,
    addBiomarker,
    removeBiomarker,
  } = props

  const [phase, setPhase] = useState(null)
  const [line, setLine] = useState(null)
  const [geography, setGeography] = useState(null)

  const [searchedCondition, setSearchedCondition] = useState<any>(null)
  const [selectedCondition, setSelectedCondition] = useState<any>(null)

  const [isBiomarkerModalOpen, setIsBiomarkerModalOpen] = useState(false)
  // Designations Modal
  const [isDesignationsModalOpen, setIsDesignationsModalOpen] = useState(false)
  // Add Note Modal
  const [isConditionNoteModalOpen, setIsConditionNoteModalOpen] = useState(
    false
  )
  // Milestones Modal
  const [isMilestonesModalOpen, setIsMilestonesModalOpen] = useState(false)

  const [conditionIndex, setSelectedConditionIndex] = useState<number | null>(
    null
  )
  const [checkedItems, setCheckedItems] = useState<any | null>(conditionsData)

  useEffect(() => {
    setCheckedItems(conditionsData)
  }, [conditionsData])

  const renderItem = (condition: any, index: number) => {
    return (
      <div style={{ marginTop: 5 }}>
        <div style={{ display: 'flex', padding: 2, fontSize: 12 }}>
          <Item style={{ fontSize: 12 }}>{condition?.condition}</Item>
          <Item>{condition?.phase?.[0]}</Item>
          <Item>Geography: {String(condition?.geography)}</Item>
          <Item>Line: {String(condition?.line)}</Item>
        </div>
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => {
              setIsBiomarkerModalOpen(true)
              setSelectedConditionIndex(index)
              setSelectedCondition(condition)
            }}
            backgroundColor="#D6F09B"
          >
            Biomarkers
          </Button>
          <Button
            onClick={() => {
              setIsMilestonesModalOpen(true)
              setSelectedConditionIndex(index)
              setSelectedCondition(condition)
            }}
            backgroundColor={baseColors.YELLOW_FOUR}
          >
            Milestones
          </Button>
          <Button
            onClick={() => {
              setIsConditionNoteModalOpen(true)
              setSelectedConditionIndex(index)
              setSelectedCondition(condition)
            }}
            backgroundColor={baseColors.CYAN_ONE}
          >
            Add Note
          </Button>
          <Button
            onClick={() => {
              setIsDesignationsModalOpen(true)
              setSelectedConditionIndex(index)
              setSelectedCondition(condition)
            }}
            backgroundColor={baseColors.BLUE_ONE}
          >
            Designations
          </Button>
          <Button
            onClick={() => {
              deleteCondition(
                selectedSynonym?.intervention_id,
                index,
                condition?.condition_id,
                condition?.phase?.[1] === null
                  ? null
                  : condition?.phase?.[1] * 10,
                condition?.geography,
                condition?.line
              )
            }}
          >
            delete
          </Button>

          <div className="ml-2 mt-1">
            <Checkbox
              checked={condition?.pediatric_flag}
              label="Pediatric"
              onChange={(e) => {
                handleCheckbox(
                  e,
                  condition?.intervention_condition_id,
                  'pediatric_flag'
                )
              }}
              id={`pediatric-${condition?.intervention_condition_id}`}
            />
          </div>

          <div className="ml-2 mt-1">
            <Checkbox
              checked={condition?.discontinued}
              label="Discontinue"
              onChange={(e) => {
                handleCheckbox(
                  e,
                  condition?.intervention_condition_id,
                  'discontinued'
                )
              }}
              id={`discontinue-${condition?.intervention_condition_id}`}
            />
          </div>
        </div>

        {condition?.biomarkers?.length > 0 && (
          <div
            className="mt-1 mb-3"
            style={{
              display: 'flex',
              columnGap: '0.25rem',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#C08DF8' }}>Biomarkers:</span>
            <SelectedFiltersContainer
              hasActiveFilters={condition?.biomarkers?.length > 0}
            >
              {condition?.biomarkers?.map((marker, markerIndex) => (
                <SelectedFilter
                  key={markerIndex}
                  style={{ borderRadius: '20px' }}
                >
                  {marker.biomarker_symbol || marker.biomarker_name}
                  <CrossIcon
                    color={baseColors.GREY_DARKER}
                    height={10}
                    onClick={() => {
                      const url = `/v1/ct/biomarkers/${condition?.intervention_condition_id}/delete`
                      const payload = {
                        intervention_condition_id:
                          condition?.intervention_condition_id,
                        biomarker_id: marker?.biomarker_id,
                        is_deleted: true,
                      }

                      postCollection(url, payload)
                        .then((res) => {
                          removeBiomarker(index, markerIndex)
                        })
                        .catch((err) => {
                          toast.error('Error removing biomarker.', {
                            position: 'bottom-right',
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          })
                        })
                    }}
                  />
                </SelectedFilter>
              ))}
            </SelectedFiltersContainer>
          </div>
        )}
      </div>
    )
  }

  const handleAddCondition = (
    cond,
    selectedPhase,
    selectedGeography,
    selectedLine
  ) => {
    const p: (string | number)[] = [selectedPhase?.label, selectedPhase?.value]
    const c: IAddCondition = {
      id: cond?.value?.id,
      cui: cond?.value?.cui,
      condition: cond?.value.condition,
      match_type: cond?.match_type,
      stage: selectedPhase?.value * 10,
      geography: selectedGeography?.value,
      line: selectedLine?.value,
    }
    addCondition(c, selectedSynonym?.intervention_id, p)
  }

  const updateDesignations = (selectedDesignations) => {
    const payload = {
      designations: selectedDesignations ?? [],
    }
    const url = `/v1/ct/designations/${selectedCondition?.intervention_condition_id}/update`
    postCollection(url, payload)
      .then((response: any) => {
        if (conditionIndex || conditionIndex === 0) {
          updateConditionDesignations(conditionIndex, selectedDesignations)
          setIsDesignationsModalOpen(false)
        }
      })
      .catch((error) => {
        return
      })
  }

  const updateConditionNote = (formValues) => {
    const { note, source, noteType } = formValues
    const conditionId = selectedCondition?.condition_id
    const type =
      noteType === 'Prevalence Note' ? 'PREVALENCE_NOTE' : 'MARKET_SIZE_NOTE'
    const payload = {
      note,
      source,
      note_type: type,
    }
    const url = `/v1/ct/conditions/${conditionId}/add-note`
    postCollection(url, payload)
      .then((response: any) => {
        setIsConditionNoteModalOpen(false)
        return true
      })
      .catch((error) => {
        return false
      })
  }

  const updateBiomarkers = (resObj) => {
    const url = `/v1/ct/biomarkers/${selectedCondition?.intervention_condition_id}/add`
    const payload = {
      intervention_condition_id: selectedCondition?.intervention_condition_id,
      biomarker_id: resObj.biomarker_id,
      is_deleted: false,
    }

    postCollection(url, payload)
      .then((res) => {
        addBiomarker(conditionIndex, resObj)
        setIsBiomarkerModalOpen(false)
      })
      .catch((err) => {
        toast.error('Error adding biomarker.', {
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

  const handleCheckbox = (e, interventionConditionId, flag) => {
    let url: any
    if (flag === 'pediatric_flag') {
      if (e.target.checked) {
        url = `/v1/ct/intervention-condition/${interventionConditionId}/pediatric/add`
      } else {
        url = `/v1/ct/intervention-condition/${interventionConditionId}/pediatric/remove`
      }
    } else if (flag === 'discontinued') {
      if (e.target.checked) {
        url = `/v1/ct/intervention-condition/${interventionConditionId}/discontinue/add`
      } else {
        url = `/v1/ct/intervention-condition/${interventionConditionId}/discontinue/remove`
      }
    }
    getCollection(url)
      .then((response) => {
        setCheckedItems(response.data)
        toast.success(response.message, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((error) => {
        toast.error('Status error.', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return
      })
  }

  return (
    <>
      <BiomarkerModal
        setIsBiomarkerModalOpen={setIsBiomarkerModalOpen}
        isBiomarkerModalOpen={isBiomarkerModalOpen}
        onSubmit={updateBiomarkers}
      />
      <MilestonesModal
        setIsConditionNoteModalOpen={setIsMilestonesModalOpen}
        isConditionNoteModalOpen={isMilestonesModalOpen}
        onSubmit={updateDesignations}
        interventionConditionId={selectedCondition?.intervention_condition_id}
      />
      <DesignationsModal
        activeLandingType={'a'}
        setIsDesignationsModalOpen={setIsDesignationsModalOpen}
        isDesignationsModalOpen={isDesignationsModalOpen}
        onSubmit={updateDesignations}
        preDesignations={
          conditionIndex !== null ? selectedCondition?.designations : []
        }
        conditionName={
          conditionIndex !== null ? selectedCondition?.condition : '---'
        }
        synonymName={selectedSynonym?.synonym ?? '---'}
      />
      <ConditionNoteModal
        activeLandingType={'a'}
        setIsConditionNoteModalOpen={setIsConditionNoteModalOpen}
        isConditionNoteModalOpen={isConditionNoteModalOpen}
        onSubmit={updateConditionNote}
        conditionName={
          conditionIndex !== null ? selectedCondition?.condition : '---'
        }
        synonymName={selectedSynonym?.synonym ?? '---'}
      />
      <div style={{ maxHeight: 400, overflow: 'auto', marginBottom: 20 }}>
        <List renderItem={renderItem} items={checkedItems} />
      </div>
      <div style={{ display: 'flex', columnGap: '0.25rem', marginTop: 20 }}>
        <div style={{ width: '50%' }}>
          <SearchBar
            fontSize={14}
            isAuthenticated={false}
            activeLandingType={'r'}
            setSelectedItem={(item) => {
              setSearchedCondition(item)
            }}
            searchType={SEARCH_TYPE.CONDITIONS}
            placeholder={'Search condition'}
          />
        </div>
        <div style={{ width: '50%' }}>
          <PhaseDropdown phase={phase} setPhase={setPhase} />
        </div>
        <div>
          <Button
            onClick={() =>
              handleAddCondition(searchedCondition, phase, geography, line)
            }
          >
            add
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', columnGap: '0.25rem' }} className="mt-3">
        <div className="w-50">
          <LineTreatmentDropdown line={line} setLine={setLine} />
        </div>
        <div className="w-50">
          <GeographyDropdown
            geography={geography}
            setGeography={setGeography}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

function PhaseDropdown(props: { phase; setPhase }) {
  const { phase, setPhase } = props
  const handleChange = (val) => {
    setPhase(val)
  }
  return <Select options={options} value={phase} onChange={handleChange} />
}

function LineTreatmentDropdown(props: { line; setLine }) {
  const { line, setLine } = props
  const lineOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => ({
    label: num,
    value: num,
  }))

  const handleChange = (val) => {
    setLine(val)
  }
  return (
    <Select
      options={lineOptions}
      value={line}
      onChange={handleChange}
      placeholder="Line of treatment..."
    />
  )
}

function GeographyDropdown(props: { geography; setGeography }) {
  const { geography, setGeography } = props
  const geoOptions = [
    'U.S.',
    'EU',
    'Japan',
    'China',
    'India',
    'Australia',
    'Canada',
  ].map((region) => ({ label: region, value: region }))

  const handleChange = (val) => {
    setGeography(val)
  }
  return (
    <Select
      options={geoOptions}
      value={geography}
      onChange={handleChange}
      placeholder="Geography..."
    />
  )
}

function mapStateToProps(state: object) {
  return {
    conditionsData: interventionInfoConditionsSelector(state),
    selectedSynonym: synonymSelector(state),
  }
}

const mapDispatchToProps = {
  addCondition: addConditionAction,
  deleteCondition: deleteConditionAction,
  updateConditionDesignations: updateConditionDesignationsAction,
  addBiomarker: addBiomarkerAction,
  removeBiomarker: removeBiomarkerAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionsList)
