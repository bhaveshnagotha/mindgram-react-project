import React, { useEffect, useState } from 'react'
import {
  addSubsidiary as addSubsidiaryAction,
  companyDataSelector,
  fetchSubsidiaries as fetchSubsidiariesAction,
  isErrorFetchingSubsidiariesSelector,
  isFetchingSubsidiariesSelector,
  subsidiariesDataSelector,
  unlinkSubsidiary as unlinkSubsidiaryAction,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { Button, List } from '../../../../components'
import { ICompany, ISubsidiary } from '../interfaces'

interface IProps {
  selectedCompany: ICompany
  subsidiariesData: any
  fetchSubsidiaries: (companyId: string) => void
  errorFetchingSubsidiaries: boolean
  isFetchingSubsidiaries: boolean
  addSubsidiary: any
  unlinkSubsidiary: any
}

function SubsidiariesList(props: IProps) {
  const {
    subsidiariesData,
    errorFetchingSubsidiaries,
    isFetchingSubsidiaries,
    selectedCompany,
    fetchSubsidiaries,
    addSubsidiary,
    unlinkSubsidiary,
  } = props
  useEffect(() => {
    fetchSubsidiaries(selectedCompany?.type + selectedCompany?.id)
    // eslint-disable-next-line
  }, [selectedCompany])
  const [subsidiaryName, setSubsidiaryName] = useState<any>()
  const renderItem = (subsidiary: ISubsidiary, index: number) => {
    return (
      <div>
        <span style={{ fontSize: 12 }}>{subsidiary?.name}</span>
        <Button
          style={{ height: 25, marginLeft: 50 }}
          onClick={() => {
            unlinkSubsidiary(index, subsidiary?.id, subsidiary?.name)
          }}
        >
          <span style={{ fontSize: 12 }}> delete </span>
        </Button>
      </div>
    )
  }
  const addForm = () => {
    return (
      <form>
        <input
          type="text"
          name="add"
          placeholder="type subsidiary name"
          value={subsidiaryName}
          onChange={(e) => setSubsidiaryName(e.target.value)}
        />
        <Button
          onClick={() => {
            addSubsidiary(
              subsidiaryName,
              selectedCompany?.type + selectedCompany?.id
            )
          }}
        >
          Add
        </Button>
      </form>
    )
  }
  return (
    <div>
      {!errorFetchingSubsidiaries &&
        !isFetchingSubsidiaries &&
        subsidiariesData && (
          <div style={{ display: 'flex', flexFlow: 'column' }}>
            <div style={{ overflow: 'auto', marginBottom: 20, height: 250 }}>
              <List
                renderItem={renderItem}
                items={subsidiariesData?.subsidiaries}
              />
            </div>
            <div>{addForm()}</div>
          </div>
        )}
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    subsidiariesData: subsidiariesDataSelector(state),
    selectedCompany: companyDataSelector(state),
    errorFetchingSubsidiaries: isErrorFetchingSubsidiariesSelector(state),
    isFetchingSubsidiaries: isFetchingSubsidiariesSelector(state),
  }
}

const mapDispatchToProps = {
  fetchSubsidiaries: fetchSubsidiariesAction,
  addSubsidiary: addSubsidiaryAction,
  unlinkSubsidiary: unlinkSubsidiaryAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubsidiariesList)
