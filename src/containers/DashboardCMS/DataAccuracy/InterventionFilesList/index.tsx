import React, { useEffect, useState } from 'react'
import {
  addInterventionFile as addInterventionFileAction,
  deleteInterventionFile as deleteInterventionFileAction,
  fetchInterventionInfo as fetchInterventionInfoAction,
  interventionInfoDataSelector,
  isErrorFetchingInterventionInfoSelector,
  isFetchingInterventionInfoSelector,
  synonymSelector,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { LinkExternal } from '../../../../components'
import { Button } from 'react-bootstrap'
import { ISynonym } from '../interfaces'

interface IProps {
  selectedSynonym: ISynonym
  fetchInterventionInfo: any
  interventionInfoData: any
  errorFetchingInterventionInfo: boolean
  isFetchingInterventionInfo: boolean
  addInterventionFile: any
  deleteInterventionFile: any
}

function InterventionFilesList(props: IProps) {
  const {
    selectedSynonym,
    interventionInfoData,
    fetchInterventionInfo,
    addInterventionFile,
    deleteInterventionFile,
  } = props
  useEffect(() => {
    if (selectedSynonym?.intervention_id)
      fetchInterventionInfo(selectedSynonym?.intervention_id)
    // eslint-disable-next-line
  }, [])
  const [fileUrl, setFileUrl] = useState<any>()
  const [fileType, setFileType] = useState<any>()
  const addForm = () => {
    return (
      <form>
        <div style={{ display: 'flex', flexFlow: 'column' }}>
          <input
            type="text"
            name="add"
            placeholder="file url"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />
          <input
            type="text"
            name="add"
            placeholder="file type"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
          />
          <Button
            onClick={() => {
              addInterventionFile(
                interventionInfoData?.basic_info?.intervention_id,
                fileUrl,
                fileType
              )
            }}
          >
            Add
          </Button>
        </div>
      </form>
    )
  }

  const renderItem = (file: any, index: number) => {
    const interventionId = interventionInfoData?.basic_info?.intervention_id
    return (
      <div style={{ marginTop: 10 }}>
        <span>
          <LinkExternal href={file?.s3_url}>
            {file?.file_name} {'   '}
          </LinkExternal>
        </span>
        <Button
          onClick={() =>
            deleteInterventionFile(
              interventionId,
              file?.file_id,
              file?.file_type,
              index
            )
          }
        >
          {' '}
          delete{' '}
        </Button>
      </div>
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        // marginBottom: 20,
      }}
    >
      <div
        style={{
          maxHeight: 200,
          marginRight: 5,
          marginBottom: 20,
          overflow: 'auto',
        }}
      >
        {interventionInfoData?.intervention_files?.map((item, index) => {
          return renderItem(item, index)
        })}
      </div>
      <div>{addForm()}</div>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    interventionInfoData: interventionInfoDataSelector(state),
    errorFetchingInterventionInfo: isErrorFetchingInterventionInfoSelector(
      state
    ),
    isFetchingInterventionInfo: isFetchingInterventionInfoSelector(state),
    selectedSynonym: synonymSelector(state),
  }
}

const mapDispatchToProps = {
  fetchInterventionInfo: fetchInterventionInfoAction,
  addInterventionFile: addInterventionFileAction,
  deleteInterventionFile: deleteInterventionFileAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterventionFilesList)
