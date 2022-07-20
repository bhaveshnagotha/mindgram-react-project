import React, { useState } from 'react'
import {
  addCompanyFile as addCompanyFileAction,
  companyDataSelector,
  deleteCompanyFile as deleteCompanyFileAction,
} from '../../../../redux/CMS/DataAccuracy'
import { connect } from 'react-redux'
import { LinkExternal, List } from '../../../../components'
import { Button } from 'react-bootstrap'
import { ICompany } from '../interfaces'

interface IProps {
  addCompanyFile: any
  deleteCompanyFile: any
  selectedCompany: ICompany
}

function CompanyFilesList(props: IProps) {
  const { addCompanyFile, deleteCompanyFile, selectedCompany } = props
  const [fileUrl, setFileUrl] = useState<string>()
  const [fileType, setFileType] = useState<string>()
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
              addCompanyFile(
                selectedCompany?.type + selectedCompany?.id,
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
    return (
      <div style={{ marginTop: 10 }}>
        <span>
          <LinkExternal href={file?.s3_url}>
            {file?.file_name} {'   '}
          </LinkExternal>
        </span>
        <Button
          onClick={() =>
            deleteCompanyFile(
              selectedCompany?.type + selectedCompany?.id,
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
        overflow: 'auto',
        marginBottom: 20,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ height: 500, marginBottom: 20 }}>
        <List renderItem={renderItem} items={selectedCompany?.company_files} />
      </div>
      <div>{addForm()}</div>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    selectedCompany: companyDataSelector(state),
  }
}

const mapDispatchToProps = {
  addCompanyFile: addCompanyFileAction,
  deleteCompanyFile: deleteCompanyFileAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyFilesList)
