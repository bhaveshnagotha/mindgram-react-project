import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { ActionBar, headerHeight } from './ClinicalCompanyDashboard.styles'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'
import { NoDataErrorMsgSmall, scrollBarStyles } from '../App/App.styles'
import { useParams } from 'react-router-dom'
import {
  ItemBody,
  ItemWrapper,
  NotesList,
} from '../PipelineProducts/Products/MarketAnalysis'
import { CatalystItemHeader } from '../TrialCatalysts/Left/TrialCatalystsLeft.styles'
import PublicationsModal from '../../components/ModalComponent/PublicationsModal'
import { getCollection } from '../../helpers/api'
import { cloneDeep } from 'lodash'
import { Loading, MultiSelectDropdown } from '../../components'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'

const Container = styled.div`
  height: 49%;
  box-shadow: ${theme.boxShadow};
  background-color: ${baseColors.WHITE};
`
const Header = styled.div`
  height: ${headerHeight}px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  color: ${baseColors.GREY_DARKER};
  > p {
    margin-bottom: 0;
    flex: 1;
  }
  > div {
    flex: 1;
    > div {
      padding-left: 0;
      padding-right: 0;
      > input {
        width: 100%;
      }
    }
  }
`
export const BodyWrapper = styled.div`
  height: calc(100% - ${headerHeight}px);
  overflow-y: auto;
  ${scrollBarStyles};
`

function fetchFiles(companyId) {
  const url = `/v1/ct/company-files/${companyId}`
  return getCollection(url)
}

const getFilterOptions = (data) => {
  const options: any[] = []
  const optionsSet = new Set()
  for (const val of data) {
    const tag = val?.file_tag
    if (!tag) continue
    if (optionsSet.has(tag)) continue
    const item = {
      key: tag,
      label: tag,
    }
    optionsSet.add(tag)
    options.push(item)
  }
  return options
}

const PresentationsPublications = ({ onActiveCatalystSelect }) => {
  const { companyId } = useParams<any>()
  const [isOpen, setOpen] = useState<boolean>(false)
  const [selectedFile, setFile] = useState<any>()
  const [companyFilings, setFiles] = useState<any>([])
  const [selectedFilters, setSelectedFilters] = useState<any>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    fetchFiles(companyId)
      .then((responseData) => {
        setLoading(false)
        setFiles(responseData)
      })
      .catch(() => {
        setLoading(false)
        setFiles([])
      })
  }, [companyId])
  useEffect(() => {
    return
  }, [companyId])
  const filterOptions = useMemo(() => getFilterOptions(companyFilings), [
    companyFilings,
  ])
  let filteredData = useMemo(() => cloneDeep(companyFilings), [companyFilings])
  if (selectedFilters.length && filteredData) {
    filteredData = filteredData?.filter((item) =>
      selectedFilters.includes(item?.file_tag?.toLowerCase())
    )
  }
  return (
    <>
      <PublicationsModal
        isOpen={isOpen}
        height={window.innerHeight - 150}
        width={window.innerWidth / 1.1}
        file={selectedFile}
        onCloseActiveCatalyst={(e) => {
          e.stopPropagation()
          setOpen(false)
        }}
      />
      <Container>
        <Header>
          <p>Posters / Presentations / Publications</p>
        </Header>
        <ActionBar>
          <MultiSelectDropdown
            disableSearch
            id="filterFilings"
            values={filterOptions}
            label="Filing Type"
            onSelect={(item) => {
              setSelectedFilters(item)
            }}
            onClear={() => setSelectedFilters([])}
          />
        </ActionBar>
        <BodyWrapper>
          {isLoading ? (
            <LoadingWrapper>
              <Loading size={30} />
            </LoadingWrapper>
          ) : filteredData?.length > 0 ? (
            <NotesList
              data={filteredData}
              element={(d, index) => (
                <Fragment key={index}>
                  <Item
                    lastItem={index === filteredData.length - 1}
                    activeItem={false}
                    data={d}
                    handleClick={() => {
                      // onActiveCatalystSelect(d)
                      setFile(d)
                      if (d?.file_type === 'external_url') {
                        window.open(d?.file_url)
                      } else {
                        setOpen(true)
                      }
                    }}
                  />
                </Fragment>
              )}
            />
          ) : (
            <div className="py-4">
              <NoDataErrorMsgSmall>
                Mindgram is working on identifying relevant publications for
                this company.
              </NoDataErrorMsgSmall>
            </div>
          )}
        </BodyWrapper>
      </Container>
    </>
  )
}

const Item = ({ data, activeItem, handleClick, lastItem }) => {
  return (
    <ItemWrapper
      onClick={handleClick}
      isActive={activeItem}
      isLastItem={lastItem}
    >
      <CatalystItemHeader>
        <span>{data?.file_header}</span>
        {/*<strong>{data?.file_header}</strong>*/}
      </CatalystItemHeader>

      <ItemBody isActive={activeItem}>{data?.file_name}</ItemBody>
      <ItemBody
        isActive={activeItem}
        style={{ color: baseColors.GREY_DARK3, fontSize: 12 }}
      >
        {data?.file_footer}
      </ItemBody>
    </ItemWrapper>
  )
}

export default PresentationsPublications
