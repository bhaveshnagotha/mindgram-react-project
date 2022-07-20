import React, { useEffect, useState } from 'react'
import { Table } from '../../../components'
import { baseColors } from '../../../constants/colors'
import { StyledLink } from '../../App/App.styles'
import {
  TargetCondition,
  TargetDetailsWrapper,
  TargetLeftWrapper,
  TargetTableRow,
} from '../Target.styles'
import TargetProductDetails from './TargetProductDetails'

interface ITargetCompanies {
  companies: any
}

const headerStyles: React.CSSProperties[] = [
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
  { fontSize: '14px', fontWeight: 100, paddingLeft: '1.25rem' },
]

export default function TargetCompanies(props: ITargetCompanies) {
  const { companies } = props
  const [selectedCompany, setSelectedCompany] = useState<any>(null)

  const TargetProducts = (item, index) => {
    return (
      <TargetTableRow key={index}>
        <td>
          <TargetProductDetails data={item} />
        </td>
        <td>
          {item?.conditions?.map((c) => (
            <div key={c.condition_id}>
              <StyledLink
                to={`/clinical-trials/therapeutic-areas/c/${c?.condition_id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {c?.condition}
              </StyledLink>
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
    if (!!companies?.length) {
      setSelectedCompany(companies?.[0])
    }
  }, [companies])

  return (
    <TargetDetailsWrapper>
      <TargetLeftWrapper>
        <div className="overflow-auto h-full">
          {companies?.map((company) => (
            <TargetCondition
              key={company.company_id}
              onClick={() => setSelectedCompany(company)}
              active={selectedCompany?.company_id === company?.company_id}
            >
              {company?.company_name ?? ''}
              <span>({company?.products?.length ?? 0})</span>
            </TargetCondition>
          ))}
        </div>
      </TargetLeftWrapper>

      <div className="flex-1">
        <Table
          id="target-products-details"
          items={productsData(selectedCompany?.products)}
          renderRow={TargetProducts}
          columnHeadings={['Product', 'Indication(s)', 'Information']}
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
