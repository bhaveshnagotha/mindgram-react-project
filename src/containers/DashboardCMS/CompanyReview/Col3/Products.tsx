import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  headlineSelector,
  setModify as setModifyAction,
} from '../../../../redux/CMS/DealsCMS'
import { modifySelector } from '../../../../redux/CMS/DealsCMS/selectors'
import {
  conceptsDataSelector,
  fetchConcepts as fetchConceptsAction,
  fetchSubsidiaries as fetchSubsidiariesAction,
} from '../../../../redux/CMS/DataAccuracy'
import { AutoSizer, List } from 'react-virtualized'
import SynonymsList from '../../DataAccuracy/SynonymsList'
import styled from 'styled-components'
import { IConcept, IConceptData } from '../../DataAccuracy/interfaces'

interface IProps {
  company_type_id: string
  render: boolean
}

interface IReduxProps {
  fetchSubsidiaries: (companyId: string) => void
  fetchConcepts: (companyId: string) => void
  conceptsData: IConceptData
}

const StyledList = styled(List)`
  .ReactVirtualized__Grid__innerScrollContainer {
  }
`

const containsSynonym = (field, concept) => {
  const { intervention_name, synonyms } = concept
  if (intervention_name?.toLowerCase().startsWith(field)) {
    return true
  }
  for (const syn of synonyms) {
    if (syn?.toLowerCase().startsWith(field)) {
      return true
    }
  }
  return false
}

const filterProducts = (field, data: IConcept[]) => {
  if (!data?.length) return
  const filtered: any = []
  for (let i = 0; i < data.length; ++i) {
    if (containsSynonym(field, data[i])) {
      const obj = { cindex: i, concept: data[i] }
      filtered.push(obj)
    }
  }
  return filtered
}

const Products = (props: IProps & IReduxProps) => {
  const { company_type_id, fetchSubsidiaries, fetchConcepts, render } = props

  const conceptsData = props?.conceptsData?.data

  const [searchField, setSearchField] = useState('')

  const filteredProducts = filterProducts(searchField, conceptsData)

  useEffect(() => {
    if (company_type_id) {
      fetchConcepts(company_type_id)
      fetchSubsidiaries(company_type_id)
    }
  }, [render, company_type_id, fetchSubsidiaries, fetchConcepts])

  const renderRow = ({ index, key, style }) => {
    const item = filteredProducts?.[index]?.concept
    const cindex = filteredProducts?.[index]?.cindex
    const zindex = 100000 - index
    return (
      <div
        key={key}
        style={{
          ...style,
          zIndex: zindex,
        }}
      >
        <SynonymsList
          isAddNewProductRow={false}
          concept={item}
          onlyEditSynonym={true}
          cindex={cindex}
        />
      </div>
    )
  }

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <div
            style={{
              width,
              height,
              display: 'flex',
              flexFlow: 'column nowrap',
            }}
          >
            <input
              type={'search'}
              style={{ width, height: 30 }}
              onChange={(e) => setSearchField(e?.target?.value)}
            />
            <div>
              <StyledList
                rowCount={filteredProducts?.length ?? 0}
                rowHeight={(rindex) => {
                  if (rindex?.index === filteredProducts?.length - 1) {
                    return 1000
                  }
                  return 300
                }}
                width={width}
                height={height - 30}
                rowRenderer={renderRow}
              />
            </div>
          </div>
        )
      }}
    </AutoSizer>
  )
}

const mapDispatchToProps = {
  fetchConcepts: fetchConceptsAction,
  setModify: setModifyAction,
  fetchSubsidiaries: fetchSubsidiariesAction,
}

function mapStateToProps(state: object) {
  return {
    conceptsData: conceptsDataSelector(state),
    headline: headlineSelector(state),
    modify: modifySelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
