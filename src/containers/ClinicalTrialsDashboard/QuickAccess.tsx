import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { pathOr, uniq } from 'ramda'
import { useHistory } from 'react-router-dom'

import { Loading } from '../../components'
import {
  Header,
  BodyWrapper,
  LoadingWrapper,
} from './ClinicalTrialsDashboard.style'
import {
  fetchQuickAccessInfo as fetchQuickAccessInfoAction,
  IRootState,
  IState,
  quickAccessInfoSelector,
  quickAccessInfoType,
  timePeriod,
} from '../../redux/DashboardClinicalEdge'
import { baseColors } from '../../constants/colors'
import SingleSelectDropdown, {
  ISingleSelectValue,
} from '../../components/SingleSelectDropdown'

export const Container = styled.div`
  height: 350px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-gap: 10px;
  padding: 10px;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid ${baseColors.TABLE_BORDER};
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${baseColors.TABLE_BORDER};
  }
`

const InfoItemTitle = styled.span``
const InfoItemCount = styled.span`
  font-weight: bold;
`

const infoItems = [
  {
    key: quickAccessInfoType.earningsAndFinancialPresentations,
    label: 'Earnings & Financial Presentations',
  },
  {
    key: quickAccessInfoType.IPOActivity,
    label: 'IPO Activity',
  },
  {
    key: quickAccessInfoType.companyUpdates,
    label: 'Company Updates',
  },
  {
    key: quickAccessInfoType.MAndAOrPartnerships,
    label: 'M&A Activity',
  },
  {
    key: quickAccessInfoType.scientificPresentations,
    label: 'Scientific Presentations',
  },
  {
    key: quickAccessInfoType.patentActivity,
    label: 'Patent Activity',
  },
  {
    key: quickAccessInfoType.grantsOrAwards,
    label: 'Grants/Awards',
  },
  {
    key: quickAccessInfoType.licensingOrCollaborations,
    label: 'Licensing/Collaborations',
  },
]

interface IProps {
  quickAccessInfo: IState['quickAccessInfo']
  fetchQuickAccessInfo: (periodInDays: string) => void
}
const QuickAccess = ({ quickAccessInfo, fetchQuickAccessInfo }: IProps) => {
  const { push } = useHistory()
  const items: ISingleSelectValue[] = [
    { key: timePeriod.seven, label: 'Last 7 days' },
    { key: timePeriod.fourteen, label: 'Last 14 days' },
    { key: timePeriod.thirty, label: 'Last 30 days' },
    { key: timePeriod.sixty, label: 'Last 60 days' },
    { key: timePeriod.ninety, label: 'Last 90 days' },
  ]
  const [period, setPeriod] = useState<ISingleSelectValue>(items[0])

  useEffect(() => {
    if (
      !quickAccessInfo[period.key].errorFetching &&
      !quickAccessInfo[period.key].isFetching &&
      quickAccessInfo[period.key].data === null
    ) {
      fetchQuickAccessInfo(period.key)
    }
  }, [quickAccessInfo, fetchQuickAccessInfo, period])

  return (
    <React.Fragment>
      <Header>
        <p>Quick Access</p>
        <span>
          <SingleSelectDropdown
            label={items[0].label}
            defaultValue={items[0]}
            values={items}
            onSelect={(newValue) => {
              setPeriod(newValue)
            }}
          />
        </span>
      </Header>
      <BodyWrapper>
        {quickAccessInfo[period.key].isFetching && (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        )}
        {!quickAccessInfo[period.key].isFetching && (
          <Container>
            {infoItems.map((infoItem) => (
              <InfoItem
                key={infoItem.key}
                onClick={() => {
                  push('/clinical-trials/trial-catalysts', {
                    newsIDs: uniq(
                      pathOr(
                        [],
                        [infoItem.key]
                      )(quickAccessInfo[period.key].data)
                    ),
                  })
                }}
              >
                <InfoItemTitle>{infoItem.label}</InfoItemTitle>
                <InfoItemCount>
                  {
                    uniq(
                      pathOr(
                        [],
                        [infoItem.key]
                      )(quickAccessInfo[period.key].data)
                    ).length
                  }
                </InfoItemCount>
              </InfoItem>
            ))}
          </Container>
        )}
      </BodyWrapper>
    </React.Fragment>
  )
}

function mapStateToProps(state: IRootState) {
  return {
    quickAccessInfo: quickAccessInfoSelector(state),
  }
}

const mapDispatchToProps = {
  fetchQuickAccessInfo: fetchQuickAccessInfoAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickAccess)
