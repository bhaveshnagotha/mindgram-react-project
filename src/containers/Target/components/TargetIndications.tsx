import React, { useEffect, useState } from 'react'
import { Table, Tag } from '../../../components'
import { baseColors } from '../../../constants/colors'
import { StyledLink } from '../../App/App.styles'
import {
  TargetCondition,
  TargetDetailsWrapper,
  TargetLeftWrapper,
  TargetTableRow,
} from '../Target.styles'
import TargetProductDetails from './TargetProductDetails'

interface ITargetIndications {
  indications: any
}

const headerStyles: React.CSSProperties[] = [
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
]

export default function TargetIndications(props: ITargetIndications) {
  const { indications } = props
  const [selectedIndication, setSelectedIndication] = useState<any>(null)

  const TargetProducts = (item, index) => {
    return (
      <TargetTableRow key={index}>
        <td>
          <TargetProductDetails data={item} />
        </td>
        <td>
          {item?.company?.map((c) => (
            <div key={c.company_id} className="flex align-center">
              <StyledLink
                to={`/clinical-trials/company-dashboard/${c?.company_type}${c?.company_id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {c?.company_name}
              </StyledLink>

              <Tag
                fontWeight={600}
                color={baseColors.GREY_BLUE}
                bgColor={baseColors.BLUE_SIX}
                fontSize={10}
                style={{ marginLeft: 8, padding: '4px 10px' }}
                width={'fit-content'}
              >
                {c?.company_ticker}
              </Tag>
            </div>
          ))}
        </td>
        <td></td>
      </TargetTableRow>
    )
  }

  function productsData(products) {
    if (!products) return []
    return products
  }

  useEffect(() => {
    if (!!indications?.length) {
      setSelectedIndication(indications?.[0])
    }
  }, [indications])

  return (
    <TargetDetailsWrapper>
      <TargetLeftWrapper>
        <div className="overflow-auto h-full">
          {indications?.map((indication) => (
            <TargetCondition
              key={indication.condition_id}
              onClick={() => setSelectedIndication(indication)}
              active={
                selectedIndication?.condition_id === indication?.condition_id
              }
            >
              {indication?.condition_name ?? ''}
              <span>({indication?.products?.length ?? 0})</span>
            </TargetCondition>
          ))}
        </div>
      </TargetLeftWrapper>

      <div className="flex-1">
        <Table
          id="target-products-details"
          items={productsData(selectedIndication?.products)}
          renderRow={TargetProducts}
          columnHeadings={['Product', 'Company(s)', 'Information']}
          columnHeaderStyles={headerStyles}
          tableHeaderStyle={{
            borderBottom: `0.5px solid ${baseColors.GREY_LIGHT}`,
          }}
          fullHeight
          noShadow
          hideHeader={true}
        />
      </div>
    </TargetDetailsWrapper>
  )
}
