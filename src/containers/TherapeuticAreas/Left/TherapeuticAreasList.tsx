import React, { Fragment, useEffect, useState } from 'react'
import { debounce, isEmpty } from 'lodash'
import { InputSearchBar, Tag } from '../../../components'
import { ContainerTabBody } from '../../TrialNew/TrialNew.styles'
import {
  TherapeuticItemWrapper,
  InputSearchBarWrapper,
} from './TherapeuticLeft.styles'
import { useHistory } from 'react-router-dom'
import CrossIcon from '../../../components/SvgIcons/CrossIcon'
import { baseColors } from '../../../constants/colors'
import { getCollection } from '../../../helpers/api'
import { NoDataErrorMsg } from '../../App/App.styles'

export const TherapeuticSearchBar = ({
  onSearch,
  searchPlaceholder,
  onClose,
}: {
  onSearch: any
  searchPlaceholder: string
  onClose?: () => void
}) => {
  const debouncedSearch = debounce(onSearch, 200, { trailing: true })
  return (
    <InputSearchBarWrapper key="ActionBar">
      <InputSearchBar
        handleChange={(text) => debouncedSearch(text.trim())}
        placeholder={searchPlaceholder}
        roundedBorder={false}
        showSearchIcon={true}
        id="searchCatalysts"
      />
      {onClose && (
        <CrossIcon
          className="px-3"
          onClick={onClose}
          height={14}
          color={baseColors.GREY_ONE}
        />
      )}
    </InputSearchBarWrapper>
  )
}

export interface ITherapeuticAreasData {
  id: number
  name: string
}

const TherapeuticItem = ({
  name,
  handleClick,
  type,
}: {
  name: string
  handleClick: () => void
  type?: string
}) => {
  return (
    <TherapeuticItemWrapper onClick={handleClick}>
      <>
        {name}
        {type && (
          <Tag
            fontWeight={600}
            color={baseColors.GREY_BLUE}
            bgColor={baseColors.BLUE_SIX}
            width="fit-content"
            style={{ height: 'fit-content' }}
          >
            {type === 'condition' ? 'Condition' : 'Therapeutic Area'}
          </Tag>
        )}
      </>
    </TherapeuticItemWrapper>
  )
}

const TherapeuticAreasList = ({
  therapeuticAreasData,
  baseUrl,
}: {
  therapeuticAreasData: any
  baseUrl: string
}) => {
  const { push } = useHistory()
  const [searchBy, setSearchBy] = useState('')
  const [listData, setListData] = useState<any>([])
  const [condQueryResults, setCondQueryResults] = useState<any>([])

  useEffect(() => {
    if (searchBy) {
      getCollection(`/v1/condition-search?term=${searchBy}`).then((res) => {
        setCondQueryResults(
          res.map((curr) => ({
            name: curr.value.condition,
            id: curr.value.id,
            type: 'condition',
            cui: curr.value.cui,
          }))
        )
      })
    }
  }, [searchBy])

  useEffect(() => {
    if (isEmpty(therapeuticAreasData)) setListData([])
    else {
      const items: any[] = Object.values(therapeuticAreasData)
      let filteredData = items.map((curr) => ({
        ...curr,
        type: 'ta',
      }))

      if (searchBy) {
        filteredData = filteredData.filter((item: any) => {
          return item?.name.toLowerCase()?.includes(searchBy.toLowerCase()) || 0
        })
        filteredData.push(...condQueryResults)
      }
      setListData(filteredData)
    }
  }, [therapeuticAreasData, searchBy, condQueryResults])

  return (
    <Fragment>
      <TherapeuticSearchBar
        onSearch={(text) => setSearchBy(text)}
        searchPlaceholder="Search conditions"
      />
      <ContainerTabBody padding="0px">
        {listData.length ? (
          listData.map((d: any) => (
            <TherapeuticItem
              key={d.id}
              name={d.name}
              type={searchBy && d.type}
              handleClick={() => {
                if (d.type === 'condition') push(`${baseUrl}/c/${d.id}`)
                else push(`${baseUrl}/${d.id}`)
              }}
            />
          ))
        ) : (
          <NoDataErrorMsg>No results found</NoDataErrorMsg>
        )}
      </ContainerTabBody>
    </Fragment>
  )
}

export default TherapeuticAreasList
