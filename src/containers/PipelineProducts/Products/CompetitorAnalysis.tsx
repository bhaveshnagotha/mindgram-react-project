import React, { Fragment, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Checkbox, MultiSelectDropdown, Tag } from '../../../components'
import { baseColors } from '../../../constants/colors'
import {
  errorFetchingProductCompetitor,
  fetchProductCompetitor as fetchProductCompetitorAction,
  isFetchingProductCompetitorSelector,
  productCompetitorKey,
  productCompetitorSelector,
} from '../../../redux/ProductCompetitor'
import { normCuiSelector } from '../../../redux/ProductCompetitor/selectors'
import { NoDataErrorMsg } from '../../App/App.styles'
import { ActionsList } from '../PipelineProducts.styles'
import { CompanyWrapper } from './MarketAnalysis'

const CompetitorProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  padding: 1.5rem;
  padding-top: 0;
  height: calc(100% - 35px - 1rem);
  overflow-y: auto;
`

const TableItemContainer = styled.div<{ isChecked }>`
  // max-height: 220px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 0.25rem;
  border: ${(props) =>
    props.isChecked
      ? `1px solid ${baseColors.GREEN_ONE}`
      : '1px solid transparent'};
  padding: 1rem;
  transition: all 0.5s ease-in;

  & h6 {
    font-weight: 600;
  }

  .label {
    font-size: 1rem;
    font-weight: 600;
  }
`

const ProductInfoGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 0.5rem;
`

const ProductInfoRow = styled.div`
  display: flex;
  column-gap: 1rem;
`

const TagContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
`

const CompetitorAnalysis = ({
  isErrorFetchingProductCompetitor,
  normCuiPayload,
  isFetchingProductCompetitor,
  productCompetitor,
  fetchProductCompetitor,
}) => {
  const competitorData = productCompetitor[productCompetitorKey]
  const { normCui } = useParams<any>()
  const { push } = useHistory()

  useEffect(() => {
    if (
      !isErrorFetchingProductCompetitor &&
      !isFetchingProductCompetitor &&
      (!competitorData || normCui !== normCuiPayload)
    ) {
      fetchProductCompetitor(normCui)
    }
  }, [
    fetchProductCompetitor,
    normCui,
    isErrorFetchingProductCompetitor,
    isFetchingProductCompetitor,
    competitorData,
    normCuiPayload,
  ])

  const modalityDropdownRef: any = useRef(null)
  const targetDropdownRef: any = useRef(null)
  const indicationDropdownRef: any = useRef(null)

  const [selectedModalityFilters, setSelectedModalityFilters] = useState<
    string[]
  >([])
  const [selectedTargetFilters, setSelectedTargetFilters] = useState<string[]>(
    []
  )
  const [selectedIndicationFilters, setSelectedIndicationFilters] = useState<
    string[]
  >([])

  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const modalitySet = new Set<any>()
  const targetSet = new Set<any>()
  const indicationSet = new Set<any>()

  if (!!competitorData)
    Object.values(competitorData).forEach((item: any) => {
      item?.modality.forEach((m) => modalitySet.add(m))
      item?.targets.forEach((t) => targetSet.add(t))
      item?.overlapping_indications?.forEach((o) =>
        indicationSet.add(o?.condition_name)
      )
    })

  const modalityOptions = Array.from(modalitySet)
    .sort()
    .map((item) => ({ key: item, label: item }))
  const targetOptions = Array.from(targetSet)
    .sort()
    .map((item) => ({ key: item?.target_name, label: item?.target_name }))
  const indicationOptions = Array.from(indicationSet)
    .sort()
    .map((item) => ({ key: item, label: item }))

  let data = Object.values(competitorData ?? {}) ?? []
  if (selectedModalityFilters.length) {
    data = data.filter((item: any) =>
      selectedModalityFilters.some((modality) => {
        for (const m of item?.modality) {
          if (m?.toLowerCase() === modality) return true
        }
        return false
      })
    )
  }

  if (selectedTargetFilters.length) {
    data = data.filter((item: any) =>
      selectedTargetFilters.some((target) => {
        for (const t of item?.targets) {
          if (t?.target_name?.toLowerCase() === target) return true
        }
        return false
      })
    )
  }

  if (selectedIndicationFilters.length) {
    data = data.filter((item: any) =>
      selectedIndicationFilters.some((val) => {
        for (const t of item?.overlapping_indications) {
          if (t?.condition_name?.toLowerCase() === val) return true
        }
        return false
      })
    )
  }

  const TableItem = ({
    name,
    company,
    moa,
    targets,
    modality,
    itemNormCui,
    overlappingIndications,
  }) => {
    return (
      <TableItemContainer isChecked={checkedItems.includes(itemNormCui)}>
        <h6 className="d-inline-block">{name}</h6>
        <div className="d-inline-block float-right">
          <Checkbox
            checked={checkedItems.includes(itemNormCui)}
            label=""
            onChange={() => {
              if (checkedItems.includes(itemNormCui)) {
                checkedItems.splice(checkedItems.indexOf(itemNormCui), 1)
                setCheckedItems([...checkedItems])
              } else {
                checkedItems.push(itemNormCui)
                setCheckedItems([...checkedItems])
              }
            }}
          />
        </div>
        <ProductInfoGrid>
          <ProductInfoRow>
            <span className="label">Company</span>
            <CompanyWrapper style={{ alignItems: 'center' }}>
              <div>
                <span className="value">{company.company_name}</span>
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
                {company.company_ticker}
              </Tag>
            </CompanyWrapper>
          </ProductInfoRow>
          <ProductInfoRow>
            <span className="label">Target(s)</span>
            <TagContainer>
              {targets.map((target, i) => (
                <Tag
                  fontWeight={600}
                  color={baseColors.WHITE}
                  bgColor="#749D83"
                  fontSize={10}
                  height={18}
                  width="fit-content"
                  key={i}
                >
                  {target.target_symbol}
                </Tag>
              ))}
            </TagContainer>
          </ProductInfoRow>
          <ProductInfoRow>
            <span className="label">Modality</span>
            <TagContainer>
              {modality.map((item, i) => (
                <Tag
                  fontWeight={600}
                  color={baseColors.WHITE}
                  bgColor="#654F83"
                  fontSize={10}
                  height={18}
                  width="fit-content"
                  key={i}
                >
                  {item}
                </Tag>
              ))}
            </TagContainer>
          </ProductInfoRow>
          <h6 className="my-0">Overlapping Indication(s)</h6>
          <TagContainer>
            {overlappingIndications.map((item, i) => (
              <span style={{ fontSize: 14, textAlign: 'left' }} key={i}>
                {item?.condition_name}{' '}
                {i !== overlappingIndications.length - 1 && ' | '}
              </span>
            ))}
          </TagContainer>
        </ProductInfoGrid>
        <h6 className="my-2">Mechanism of Action</h6>
        <p>{!!moa ? moa : 'n/a'}</p>
      </TableItemContainer>
    )
  }
  return (
    <Fragment>
      <div className="mx-3 mb-3">
        <ActionsList>
          {/* company */}
          <MultiSelectDropdown
            id="modalityType"
            ref={modalityDropdownRef}
            values={modalityOptions}
            label="Modality"
            onSelect={(items) => {
              // handleSelectFilters(item, FilterType.Company)
              setSelectedModalityFilters(items)
            }}
            onClear={() => {
              // handleSelectFilters([], FilterType.Company)
              setSelectedModalityFilters([])
            }}
          />
          {/* target */}
          <MultiSelectDropdown
            id="targetType"
            ref={targetDropdownRef}
            values={targetOptions}
            label="Target"
            onSelect={(items) => {
              // handleSelectFilters(item, FilterType.Condition)
              setSelectedTargetFilters(items)
            }}
            onClear={() => {
              // handleSelectFilters([], FilterType.Condition)
              setSelectedTargetFilters([])
            }}
          />
          {/*Overlapping Indication */}
          {
            <MultiSelectDropdown
              id="indicationType"
              ref={indicationDropdownRef}
              values={indicationOptions}
              label="Indication"
              onSelect={(items) => {
                // handleSelectFilters(item, FilterType.Action)
                setSelectedIndicationFilters(items)
              }}
              onClear={() => {
                // handleSelectFilters([], FilterType.Action)
                setSelectedIndicationFilters([])
              }}
            />
          }

          <Button
            onClick={() => {
              const finalCheckedItems = [normCui, ...checkedItems]
              push(
                `/clinical-trials/compare-products?${finalCheckedItems
                  .map((item, index) => {
                    if (index === 0) {
                      return `normCui=${item}`
                    } else {
                      return `&normCui=${item}`
                    }
                  })
                  .join('')}`
              )
            }}
            disabled={checkedItems.length === 0}
          >
            Compare
          </Button>
        </ActionsList>
      </div>
      {data.length > 0 ? (
        <CompetitorProductGrid>
          {data.map((item: any, index: number) => (
            <TableItem
              name={item?.product_name}
              company={item?.company}
              moa={item?.moa?.join(', ')}
              targets={item?.targets}
              modality={item?.modality}
              itemNormCui={item?.product_dict?.norm_cui}
              overlappingIndications={item?.overlapping_indications}
              key={index}
            />
          ))}
        </CompetitorProductGrid>
      ) : (
        <NoDataErrorMsg>No data found</NoDataErrorMsg>
      )}
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    productCompetitor: productCompetitorSelector(state),
    isErrorFetchingProductCompetitor: errorFetchingProductCompetitor(state),
    normCuiPayload: normCuiSelector(state),
    isFetchingProductCompetitor: isFetchingProductCompetitorSelector(state),
  }
}

const mapDispatchToProps = {
  fetchProductCompetitor: fetchProductCompetitorAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(CompetitorAnalysis)
