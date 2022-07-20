import React, { useEffect, Fragment, useState } from 'react'
import styled from 'styled-components'
import { Table } from 'react-bootstrap'
import theme from '../../theme'
import { baseColors } from '../../constants/colors'
import { ExpandableLinkList, Loading } from '../../components'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  mergersOverlapsSelector,
  errorFetchingMergersOverlaps,
  isFetchingMergersOverlapsSelector,
  fetchMergersOverlaps as fetchMergersOverlapsAction,
  mergerOverlapsKey,
} from '../../redux/MergerOverlaps'
import { IMergersOverlaps, IPharmActions } from './PharmaMergers.helper'
import { scrollBarStyles, StyledLink } from '../App/App.styles'
import { debounce } from 'lodash'
import usePrevious from '../../hooks/usePrevious'

const Container = styled.div<{ isFetching: boolean }>`
  padding: 0 1.5rem;
  height: 100%;
  overflow: ${({ isFetching }) => (isFetching ? 'hidden' : 'auto')};
  ${scrollBarStyles};
`
const OverlapsFound = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  padding: 0.8rem 1rem;
  font-weight: 600;
  font-size: 16px;
  background-color: ${baseColors.MAROON_SIX};
  color: ${baseColors.GREY_DARKER};
  max-width: 200px;
  margin-bottom: 0.8rem;
`
const StyledTable = styled(Table)`
  background-color: ${baseColors.WHITE};
  box-shadow: ${theme.boxShadow};
  thead,
  th {
    border-top: none;
  }
  th {
    text-transform: uppercase;
    font-size: 16px;
    color: ${baseColors.GREY_DARK};
    vertical-align: baseline;
  }
  th:first-child {
    border-right: 1px solid ${baseColors.GREY_DARK};
  }
  th:nth-child(3) {
    color: ${baseColors.GREY_DARKER};
    background-color: ${baseColors.GREY_LIGHT};
  }
`

const StyledRow = styled.tr<{ isSelected?: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? baseColors.MAROON_SIX : ''};
  td {
    border-top: none;
    color: ${baseColors.GREY_DARKER};
    font-size: 14px;
    font-weight: 600;
    padding: 1.5rem;
    max-width: 300px;
  }
  > td:first-child {
    border-right: 1px solid ${baseColors.GREY_DARK};
  }
  > td:nth-child(3) {
    color: ${baseColors.GREY_DARKER};
    background-color: ${(props) =>
      props.isSelected ? baseColors.MAROON_SIX : baseColors.GREY_LIGHT};
  }
`
const LazyLoadIndicator = styled.tr`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100px;
  width: 100%;
  background-color: ${baseColors.WHITE};
  opacity: 0.5;
  position: absolute;
  bottom: 0;
`

const OverlapTooltip = ({
  pharmActions,
}: {
  pharmActions?: IPharmActions[]
}) => {
  return (
    <div>
      {pharmActions?.map((action, idx) => (
        <div key={idx}>
          <p className="mb-0">
            <strong>Description:</strong> {action?.pharm_action}
          </p>
          {idx !== pharmActions?.length - 1 && <hr />}
        </div>
      ))}
    </div>
  )
}

const MergerDetails = ({
  mergersOverlaps,
  isFetchingMergersOverlaps,
  isErrorFetchingMergersOverlaps,
  fetchMergersOverlaps,
}: {
  mergersOverlaps: any
  isFetchingMergersOverlaps: boolean
  isErrorFetchingMergersOverlaps: boolean
  fetchMergersOverlaps: ({
    mergerName,
    offset,
  }: {
    mergerName: string
    offset: number
  }) => any
}) => {
  const { mergerName } = useParams<any>()
  const initialOffsetCount = 0
  const [dataOffset, setDataOffset] = useState(initialOffsetCount)
  const previousOffset = usePrevious(dataOffset)
  const mData = mergerName
    ? mergersOverlaps?.[mergerOverlapsKey]?.[mergerName]
    : {}
  const mergerOverlapData: IMergersOverlaps = mData
  const overlapsFound = mergerOverlapData?.merger_overlap_data?.filter?.(
    (merger) => merger?.overlap
  )

  useEffect(() => {
    if (!mergerOverlapData && !isErrorFetchingMergersOverlaps && mergerName) {
      fetchMergersOverlaps({ mergerName, offset: initialOffsetCount })
    }
  }, [
    mergerOverlapData,
    fetchMergersOverlaps,
    isErrorFetchingMergersOverlaps,
    mergerName,
  ])

  useEffect(() => {
    if (
      !isFetchingMergersOverlaps &&
      !isErrorFetchingMergersOverlaps &&
      mergerName
    ) {
      if (
        dataOffset &&
        dataOffset > initialOffsetCount &&
        previousOffset !== dataOffset
      ) {
        fetchMergersOverlaps({ mergerName, offset: dataOffset })
      }
    }
  }, [
    dataOffset,
    previousOffset,
    mergerName,
    fetchMergersOverlaps,
    isErrorFetchingMergersOverlaps,
    isFetchingMergersOverlaps,
  ])

  const handleScroll = (e) => {
    e.persist()
    const divElement: HTMLDivElement = e?.currentTarget
    const { scrollTop = 0, clientHeight = 0, scrollHeight = 0 } =
      divElement ?? {}
    const threshhold = scrollTop + clientHeight
    if (threshhold >= scrollHeight && !isFetchingMergersOverlaps) {
      if (mergerOverlapData?.next_offset) {
        setDataOffset(mergerOverlapData?.next_offset)
      }
    }
  }

  const isFirstFetch =
    isFetchingMergersOverlaps && dataOffset === initialOffsetCount
  const isSubsequentFetch =
    isFetchingMergersOverlaps && dataOffset > initialOffsetCount

  if (isFirstFetch) {
    return (
      <LoadingWrapper>
        <Loading size={30} />
      </LoadingWrapper>
    )
  }

  return (
    <div>
      <Container
        isFetching={isSubsequentFetch}
        onScroll={(e) =>
          debounce((ev) => handleScroll(ev), 200, {
            leading: true,
            trailing: true,
          })(e)
        }
      >
        <OverlapsFound>{overlapsFound?.length} overlaps found</OverlapsFound>
        <StyledTable>
          <thead>
            <tr>
              <th style={{ verticalAlign: 'baseline' }}>Condition</th>
              <th style={{ minWidth: '250px' }}>
                <p className="mb-0 text-center">Target</p>
                <div className="d-flex justify-content-center">
                  <StyledLink
                    to={`/clinical-trials/company-dashboard/${mergerOverlapData?.target?.company_type}${mergerOverlapData?.target?.company_id}`}
                    bgcolor={baseColors.BLUE_SIX}
                    width="30px"
                    content={mergerOverlapData?.target?.company_ticker}
                  >
                    {mergerOverlapData?.target?.company_name}
                  </StyledLink>
                  {/* <Tag
                    bgColor={baseColors.BLUE_SIX}
                    color={baseColors.GREY_DARKER}
                    width="15px"
                    className="ml-3"
                  >
                    {mergerOverlapData?.target?.company_ticker}
                  </Tag> */}
                </div>
              </th>
              <th
                style={{
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  textTransform: 'capitalize',
                }}
              >
                Overlaps
              </th>
              <th style={{ minWidth: '250px' }}>
                <p className="mb-0 text-center">Acquirer</p>
                <div className="d-flex justify-content-center">
                  <StyledLink
                    className="mb-0"
                    style={{
                      textTransform: 'initial',
                    }}
                    to={`/clinical-trials/company-dashboard/${mergerOverlapData?.acquirer?.company_type}${mergerOverlapData?.acquirer?.company_id}`}
                    bgcolor={baseColors.BLUE_SIX}
                    width="30px"
                    content={mergerOverlapData?.acquirer?.company_ticker}
                  >
                    {mergerOverlapData?.acquirer?.company_name}
                  </StyledLink>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {mergerOverlapData?.merger_overlap_data?.map?.((merger, index) => {
              return (
                <StyledRow isSelected={merger?.overlap} key={index}>
                  <td>{merger?.condition}</td>
                  <td>
                    {!merger?.overlap && (
                      <ExpandableLinkList
                        linkPrefix="/clinical-trials/pipeline-products"
                        items={merger?.target?.map((target) => {
                          return {
                            name: target?.name,
                            link: target?.norm_cui,
                            hasTooltip: true,
                            tooltipTitle: 'Mechanism of Action / Drug Class',
                            tooltipContent: (
                              <OverlapTooltip
                                pharmActions={target?.pharm_actions}
                              />
                            ),
                          }
                        })}
                        limit={2}
                      />
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-between px-2 mx-1">
                      {merger?.overlap && (
                        <Fragment>
                          <div>
                            <ExpandableLinkList
                              linkPrefix="/clinical-trials/pipeline-products"
                              items={merger?.target?.map((target) => {
                                return {
                                  name: target?.name,
                                  link: target?.norm_cui,
                                  hasTooltip: true,
                                  tooltipTitle:
                                    'Mechanism of Action / Drug Class',
                                  tooltipContent: (
                                    <OverlapTooltip
                                      pharmActions={target?.pharm_actions}
                                    />
                                  ),
                                }
                              })}
                              limit={2}
                            />
                          </div>
                          <div className="mb-0">
                            <ExpandableLinkList
                              linkPrefix="/clinical-trials/pipeline-products"
                              items={merger?.acquirer?.map((acq) => {
                                return {
                                  name: acq?.name,
                                  link: acq?.norm_cui,
                                  hasTooltip: true,
                                  tooltipTitle:
                                    'Mechanism of Action / Drug Class',
                                  tooltipContent: (
                                    <OverlapTooltip
                                      pharmActions={acq?.pharm_actions}
                                    />
                                  ),
                                }
                              })}
                              limit={2}
                            />
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </td>
                  <td>
                    {!merger?.overlap && (
                      <ExpandableLinkList
                        linkPrefix="/clinical-trials/pipeline-products"
                        items={merger?.acquirer?.map((acq) => {
                          return {
                            name: acq?.name,
                            link: acq?.norm_cui,
                            hasTooltip: true,
                            tooltipTitle: 'Mechanism of Action / Drug Class',
                            tooltipContent: (
                              <OverlapTooltip
                                pharmActions={acq?.pharm_actions}
                              />
                            ),
                          }
                        })}
                        limit={2}
                      />
                    )}
                  </td>
                </StyledRow>
              )
            })}
            {isSubsequentFetch && (
              <LazyLoadIndicator>
                <td colSpan={4}>
                  <Loading size={30} />
                </td>
              </LazyLoadIndicator>
            )}
          </tbody>
        </StyledTable>
      </Container>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    mergersOverlaps: mergersOverlapsSelector(state),
    isErrorFetchingMergersOverlaps: errorFetchingMergersOverlaps(state),
    isFetchingMergersOverlaps: isFetchingMergersOverlapsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchMergersOverlaps: fetchMergersOverlapsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MergerDetails)
