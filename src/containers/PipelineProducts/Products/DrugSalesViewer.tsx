import { format } from 'date-fns'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Tag } from '../../../components'
import { HtmlDocViewer } from '../../../components/HtmlParser'
import CrossIcon from '../../../components/SvgIcons/CrossIcon'
import { baseColors } from '../../../constants/colors'
import { getCollection } from '../../../helpers/api'
import {
  CloseViewerButton,
  FilingToggle,
  StyledModal,
} from './DrugSalesViewer.styles'
import {
  CompanyWrapper,
  SalesItemHeader,
  TablePrecedingText,
} from './MarketAnalysis'

const DrugSalesViewer = ({
  activeItem,
  onCloseActiveItem,
  height,
  width,
}: {
  activeItem: any
  onCloseActiveItem: () => void
  height?: string
  width?: string
}) => {
  const [originalSECFiling, setOriginalSECFiling] = useState<string | null>(
    null
  )
  const [showOriginalFiling, setShowOriginalFiling] = useState(false)

  useEffect(() => {
    if (activeItem !== null && originalSECFiling === null) {
      getCollection(`/v1/ct/catalysts/sec/${activeItem?.sec_filing_id}`).then(
        (res) => {
          setOriginalSECFiling(res?.url)
        }
      )
    }
  })

  return (
    <StyledModal
      show={activeItem}
      onHide={() => {
        setOriginalSECFiling(null)
        setShowOriginalFiling(false)
        onCloseActiveItem()
      }}
      size="lg"
      width={width}
      centered
    >
      <Modal.Header className="py-4 border-0">
        <SalesItemHeader>
          <div>
            <span className="label">Filing:</span>
            <span className="value"> {activeItem?.sec_form_header}</span>
          </div>
          <div>
            <span className="label">Date:</span>{' '}
            <span className="value">
              {activeItem?.sec_filing_date &&
                format(new Date(activeItem?.sec_filing_date), 'MMM dd, yyyy')}
            </span>
          </div>

          <CompanyWrapper>
            <div>
              <span className="label">Company:</span>{' '}
              <span className="value">{activeItem?.company.company_name}</span>
            </div>
            <Tag
              className="ml-2"
              fontWeight={600}
              color={baseColors.GREY_BLUE}
              bgColor={baseColors.BLUE_SIX}
              fontSize={10}
              height={18}
              width="fit-content"
            >
              {activeItem?.company.company_ticker}
            </Tag>
          </CompanyWrapper>
          <div>
            <FilingToggle
              onClick={() => {
                setShowOriginalFiling((prev) => !prev)
              }}
            >
              {!showOriginalFiling
                ? 'See Original Filing'
                : 'See Filing Summary'}
            </FilingToggle>
          </div>
        </SalesItemHeader>
        <CloseViewerButton
          onClick={() => {
            setOriginalSECFiling(null)
            setShowOriginalFiling(false)
            onCloseActiveItem()
          }}
        >
          <CrossIcon height={20} color={baseColors.GREY_DARKER} />
        </CloseViewerButton>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: height, overflowY: 'auto' }}>
        {showOriginalFiling ? (
          <HtmlDocViewer url={originalSECFiling} />
        ) : (
          <>
            <TablePrecedingText>
              {activeItem?.table_preceding_info}
            </TablePrecedingText>
            <HtmlDocViewer url={activeItem?.table_url} />
          </>
        )}
      </Modal.Body>
    </StyledModal>
  )
}

export default DrugSalesViewer
