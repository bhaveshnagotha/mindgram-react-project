import React, { Fragment, useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'
import { Loading } from '../../../components'
import { baseColors } from '../../../constants/colors'
import { getCollection } from '../../../helpers/api'
import theme from '../../../theme'
import { TdWrapper } from '../../Dashboard/dashboardHelper'
import { ContainerLoading } from '../Middle/TrialDocumentsRightPanel/TrialDocumentsRightPanel.styles'
import { ContainerRowWrapper } from './DocumentReferencePreview'

const ContainerRow = styled.div<{ flexFlow?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  color: ${baseColors.GREY_DARKER};
  ${(props) => props.flexFlow && `flex-flow: ${props.flexFlow}`}
  cursor:pointer;
  border-bottom: 1px solid ${baseColors.GREY_DARK};
  > p {
    margin-bottom: 0;
    font-weight: 600;
    flex: 2;
  }
`
const RowHeader = styled.div`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 15px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${theme.boxShadow};
  padding: 15px 10px;
  > p {
    margin-bottom: 0;
  }
  &:hover {
    background-color: ${baseColors.GREY_LIGHT};
    transition: all ease-in 200ms;
  }
`

interface ITrialPatentInfo {
  trialPatentData: {
    patentId: string
  }
}

function fetchTrialPatentInfo(patentId) {
  const url = `/v1/patent-ifw?patent_id=${patentId}`
  return getCollection(url)
}

const renderTooltip = (props, tooltipText) => (
  <Tooltip id="reference-tooltip" {...props}>
    {tooltipText}
  </Tooltip>
)

const TrialPatentInfo = (props: ITrialPatentInfo) => {
  const { trialPatentData } = props
  const [patentIfwData, setPatentIfwData] = useState<any>(null)
  const [isDataLoading, setIsDataLoading] = useState<any>(false)

  useEffect(() => {
    let isMounted = true
    if (trialPatentData.patentId) {
      setIsDataLoading(true)
      fetchTrialPatentInfo(trialPatentData.patentId)
        .then((responseData) => {
          if (isMounted) {
            setPatentIfwData(responseData)
            setIsDataLoading(false)
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsDataLoading(false)
          }
        })
    }
    return () => {
      isMounted = false
    }
  }, [trialPatentData])

  if (isDataLoading) {
    return (
      <ContainerLoading>
        <Loading size={30} />
      </ContainerLoading>
    )
  }

  return (
    <Fragment>
      <RowHeader>
        <p>Document Code</p>
        <p>Description</p>
      </RowHeader>
      <ContainerRowWrapper>
        {patentIfwData?.map?.((ifwData: any, idx) => {
          return (
            <ContainerRow
              key={idx}
              onClick={() => {
                if (ifwData.link) {
                  window.open(
                    ifwData.link,
                    `patent-ifw-${ifwData.document_code}`
                  )
                }
              }}
            >
              <p className="mr-3">{ifwData?.document_code}</p>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={(overlayProps) =>
                  renderTooltip(overlayProps, ifwData?.document_description)
                }
              >
                <TdWrapper>{ifwData?.document_description}</TdWrapper>
              </OverlayTrigger>
            </ContainerRow>
          )
        })}
      </ContainerRowWrapper>
    </Fragment>
  )
}

export default TrialPatentInfo
