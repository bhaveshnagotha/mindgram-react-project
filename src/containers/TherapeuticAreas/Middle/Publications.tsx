import {
  CatalystItemHeader,
  CatalystItemTitle,
  CatalystItemWrapper,
} from '../../TrialCatalysts/Left/TrialCatalystsLeft.styles'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, Loading } from '../../../components'
import { NoDataErrorMsg, scrollBarStyles } from '../../App/App.styles'
import { headerHeight } from '../../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'
import { useParams } from 'react-router'
import { getCollection } from '../../../helpers/api'
import { format } from 'date-fns'
import { debounce } from 'lodash'

const tableHeaderHeight = 70

const PublicationsHeader = styled.div`
  display: flex;
  flex-flow: row;
  height: ${tableHeaderHeight}px;
  align-items: center;
  padding: 10px 20px 0;
  > div > div {
    position: relative;
  }
`

const PublicationsTitle = styled.p<{ textAlign?: string }>`
  margin: 0;
  font-weight: bold;
  color: ${baseColors.GREY_DARKER};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: 18px;
  line-height: 20px;
  flex-grow: 1;
  flex-basis: 50%;
  text-align: ${(props) => props.textAlign || ''};
`

const BodyWrapper = styled.div`
  height: calc(95% - ${headerHeight}px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  ${scrollBarStyles};
`

const LazyLoadIndicator = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 200px;
  position: absolute;
  bottom: 0;
  width: calc(100% - 30px);
  background-color: ${baseColors.WHITE};
  opacity: 0.5;
`

const Item = ({ file, onFileClick, activeItem, lastItem }) => {
  return (
    <CatalystItemWrapper
      onClick={() => onFileClick(file)}
      isActive={activeItem}
      isLastItem={lastItem}
    >
      <CatalystItemHeader>{file?.title}</CatalystItemHeader>

      <CatalystItemTitle isActive={activeItem}>
        {file?.journal_text}{' '}
        {file?.date_completed &&
          `| Date: ${format(new Date(file.date_completed), 'dd MMM yyyy')}`}
      </CatalystItemTitle>
    </CatalystItemWrapper>
  )
}

const getUrl = (conditionId, offset) =>
  `/v1/ct/publications?condition=${conditionId}&offset=${offset}`

function fetchPublications(conditionId, offset) {
  const url = getUrl(conditionId, offset)
  return getCollection(url)
}

const Publications = ({ onFileClick }) => {
  const [files, setFiles] = useState<any>([])
  const [isLoadingPublications, setIsLoadingPublications] = useState<boolean>(
    true
  )
  const { therapeuticConditionId } = useParams<any>()

  const [isSubsequentFetch, setIsSubsequentFetch] = useState(false)
  const [nextOffset, setNextOffset] = useState(-1)

  const handleScrollFetch = () => {
    if (nextOffset !== -1) {
      setIsSubsequentFetch(true)
      fetchPublications(therapeuticConditionId, nextOffset)
        .then((responseData) => {
          setFiles((prevData) => [...prevData, ...responseData?.data])
          setIsSubsequentFetch(false)
          setNextOffset(
            responseData?.next_offset ? responseData?.next_offset : -1
          )
        })
        .catch(() => {
          setIsSubsequentFetch(false)
          setFiles([])
        })
    }
  }

  const currentScrollHeight = useRef(0)
  const handleScroll = (e) => {
    const divElement: HTMLDivElement = e?.currentTarget
    const { scrollTop = 0, clientHeight = 0, scrollHeight = 0 } =
      divElement ?? {}
    const scrollPos = scrollTop + clientHeight
    // 300 -> offset to fetch the data a little bit earlier before the user reaches the end of the scroll
    const isBottom = scrollHeight - 300 < scrollPos
    if (
      !isSubsequentFetch &&
      isBottom &&
      currentScrollHeight.current < scrollHeight
    ) {
      handleScrollFetch()
      currentScrollHeight.current = scrollHeight
    }
  }

  useEffect(() => {
    setIsLoadingPublications(true)
    fetchPublications(therapeuticConditionId, 0)
      .then((responseData) => {
        setFiles(responseData?.data)
        setNextOffset(
          responseData?.next_offset ? responseData?.next_offset : -1
        )
        setIsLoadingPublications(false)
      })
      .catch(() => {
        setIsLoadingPublications(false)
        setFiles([])
      })
  }, [therapeuticConditionId])

  return (
    <Card
      height="calc(1000px + 1.5rem)"
      width="100%"
      boxShadow={`0 6px 18px 0 ${baseColors.GREY_LIGHT}`}
    >
      {isLoadingPublications ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        <Fragment>
          <PublicationsHeader>
            <PublicationsTitle>Publications</PublicationsTitle>
          </PublicationsHeader>
          <BodyWrapper
            onScroll={(e) =>
              debounce((ev) => handleScroll(ev), 200, {
                leading: true,
                trailing: true,
              })(e)
            }
          >
            {isLoadingPublications ? (
              <LoadingWrapper>
                <Loading size={30} />
              </LoadingWrapper>
            ) : files?.length === 0 ? (
              <NoDataErrorMsg>No publications found</NoDataErrorMsg>
            ) : (
              <Fragment>
                {files?.map((d, index) => (
                  <Item
                    lastItem={index === files?.length - 1}
                    activeItem={false}
                    file={d}
                    onFileClick={(file) => {
                      onFileClick(file)
                    }}
                    key={index}
                  />
                ))}
                {isSubsequentFetch && (
                  <LazyLoadIndicator>
                    <Loading size={30} />
                  </LazyLoadIndicator>
                )}
              </Fragment>
            )}
          </BodyWrapper>
        </Fragment>
      )}
    </Card>
  )
}

export default Publications
