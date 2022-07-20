import React, { useEffect, useState } from 'react'
import {
  addSynonym as addSynonymAction,
  attachSynonym as attachSynonymAction,
  attachSynonymCompany as attachSynonymCompanyAction,
  detachSynonym as detachSynonymAction,
  detachSynonymCompany as detachSynonymCompanyAction,
  fetchInterventionInfo as fetchInterventionInfoAction,
  setSynonym as setSynonymAction,
  subsidiariesDataSelector,
  subsidiariesIdSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { Button } from '../../../../components'
import { IConcept, ISynonym } from '../interfaces'

import {
  hideSlidingPane as hideSlidingPaneAction,
  isShowingSlidingPaneSelector,
  showSlidingPane as showSlidingPaneAction,
  slidingPaneTypes,
} from '../../../../redux/GlobalSlidingPane'
import { postCollection } from '../../../../helpers/api'
import { SEARCH_TYPE } from '../../../../hooks/search'
import SearchBar from '../../../SearchBar'
import { History } from 'history'
import { baseColors } from '../../../../constants/colors'

interface IReduxProps {
  fetchInterventionInfo: any
  attachSynonymCompany: any
  detachSynonymCompany: any
  attachSynonym: any
  setSynonym: (synonym: ISynonym) => void
  showSlidingPane: (type: string, paneProps: object) => void
  addSynonym: any
  detachSynonym: any
}

interface IProps {
  concept: IConcept
  subsidiaries: any
  isAddNewProductRow: boolean
  cindex?: number
  subsidiaryIds: number[]
  history?: History
  onlyEditSynonym?: boolean
}

function SynonymsList(props: IProps & IReduxProps) {
  const {
    concept,
    showSlidingPane,
    setSynonym,
    attachSynonym,
    subsidiaries,
    attachSynonymCompany,
    detachSynonym,
    detachSynonymCompany,
    subsidiaryIds,
    cindex,
    addSynonym,
    history,
    fetchInterventionInfo,
    onlyEditSynonym,
  } = props
  useEffect(() => {
    return
  }, [concept])

  const [name, setName] = useState<string>('')
  const [sconcept, setSearchedConcept] = useState<any>()

  function newSynonymForm() {
    return (
      <form onSubmit={(e) => handleSubmit(e, 'new')}>
        <input
          type="text"
          id="synonym"
          name="synonym"
          value={name}
          placeholder={'type synonym'}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }

  const handleSubmit = (e, type) => {
    e.preventDefault()
    const inputs = e.target.getElementsByTagName('input')
    let normCuiName = ''
    let uid
    let newSynonym
    if (type === 'new') {
      normCuiName = inputs.synonym.value
      const temp = normCuiName
      const w = temp.replace(/\s/g, '')
      uid = 'ID' + w.substring(0, 10)
      newSynonym = true
    } else if (type === 'search') {
      normCuiName = sconcept?.intervention_name
      uid = sconcept?.cui
      newSynonym = false
    }
    if (!normCuiName || !uid) {
      return
    }

    const payload = {
      intervention_uid: uid,
      preferred_term: normCuiName,
      norm_cui: concept?.norm_cui,
      norm_cui_name: concept?.intervention_name,
      subsidiary_ids: subsidiaryIds,
      primary_subsidiary_id: subsidiaries?.primary_subsidiary?.id,
      new_synonym: newSynonym,
    }
    const url = `/v1/ct/new-concept-synonym`
    postCollection(url, payload)
      .then((response: any) => {
        const info = response?.data?.data?.[0]?.synonyms_subsidiary_info
        addSynonym(cindex, info)
      })
      .catch((error) => {
        return
      })
  }

  const renderItem = (synonym: ISynonym, index: number) => {
    if (!synonym) {
      return null
    }
    const belongsToCompany = synonym?.belongs_to_company
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: onlyEditSynonym ? '3fr 1fr' : '1.5fr 2fr',
        }}
      >
        <span>{synonym.synonym}</span>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: onlyEditSynonym ? 'center' : 'normal',
          }}
        >
          {!onlyEditSynonym && (
            <>
              <Button
                style={{ height: 25 }}
                backgroundColor={belongsToCompany ? 'red' : baseColors.BLUE_TWO}
                hoverBackgroundColor={
                  belongsToCompany ? 'red' : baseColors.BLUE_TWO
                }
                onClick={() => {
                  if (props.isAddNewProductRow) {
                    attachSynonymCompany(
                      belongsToCompany ? 'detach' : 'attach',
                      index,
                      props.cindex,
                      synonym?.intervention_id,
                      belongsToCompany
                        ? synonym?.subsidiary_id
                        : subsidiaries?.primary_subsidiary?.id,
                      synonym?.norm_cui
                    )
                  } else {
                    attachSynonym(
                      belongsToCompany ? 'detach' : 'attach',
                      index,
                      synonym?.intervention_id,
                      belongsToCompany
                        ? synonym?.subsidiary_id
                        : subsidiaries?.primary_subsidiary?.id
                    )
                  }
                }}
              >
                <span style={{ fontSize: 12 }}>
                  {belongsToCompany
                    ? 'detach from company'
                    : 'attach to company'}
                </span>
              </Button>
              <Button
                backgroundColor={baseColors.MAROON_ONE}
                hoverBackgroundColor={baseColors.MAROON_ONE}
                style={{ height: 25 }}
                onClick={() => {
                  if (props.isAddNewProductRow) {
                    detachSynonymCompany(
                      index,
                      props.cindex,
                      synonym.intervention_id,
                      concept?.norm_cui
                    )
                  } else {
                    detachSynonym(
                      index,
                      synonym.intervention_id,
                      concept?.norm_cui
                    )
                  }
                }}
              >
                <span style={{ fontSize: 12 }}>detach from concept</span>
              </Button>
            </>
          )}
          <Button
            backgroundColor={baseColors.GREEN_ONE}
            hoverBackgroundColor={baseColors.GREEN_ONE}
            style={{ height: 25 }}
            onClick={() => {
              setSynonym(synonym)
              if (synonym?.intervention_id) {
                fetchInterventionInfo(synonym?.intervention_id)
              }
              showSlidingPane(slidingPaneTypes.SYNONYM_PREVIEW, {
                width: 680,
                isStatic: true,
              })
            }}
          >
            <span style={{ fontSize: 12 }}> edit </span>
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div
        style={{
          height: 200,
          overflow: 'auto',
          marginBottom: 20,
        }}
      >
        <div style={{ overflow: 'auto' }}>
          {concept?.synonyms_subsidiary_info?.map((item, index) => {
            return renderItem(item, index)
          })}
        </div>
      </div>
      <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
        <div>{newSynonymForm()}</div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '100%' }}>
            <SearchBar
              fontSize={12}
              history={history}
              isAuthenticated={false}
              activeLandingType={'r'}
              setSelectedItem={(item) => setSearchedConcept(item?.value)}
              searchType={SEARCH_TYPE.INTERVENTIONS}
              placeholder={'Search synonym'}
            />
          </div>
          <div>
            <Button onClick={(e) => handleSubmit(e, 'search')}>add</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    isShowingSlidingPane: isShowingSlidingPaneSelector(state),

    subsidiaries: subsidiariesDataSelector(state),
    subsidiaryIds: subsidiariesIdSelector(state),
  }
}

const mapDispatchToProps = {
  hideSlidingPane: hideSlidingPaneAction,
  showSlidingPane: showSlidingPaneAction,
  setSynonym: setSynonymAction,
  attachSynonym: attachSynonymAction,
  attachSynonymCompany: attachSynonymCompanyAction,
  detachSynonymCompany: detachSynonymCompanyAction,
  detachSynonym: detachSynonymAction,
  addSynonym: addSynonymAction,
  fetchInterventionInfo: fetchInterventionInfoAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(SynonymsList)
