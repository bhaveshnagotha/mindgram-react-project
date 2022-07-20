import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Table, { TableRow } from '../../../../../components/Table'
import { TableLink } from '../../../../Dashboard/dashboardHelper'
import { IClaims } from '../../TrialInsightsRightPanel/treeHelper'
import {
  errorFetchingTrialClaimsSelector,
  fetchClaims as fetchClaimsAction,
  isFetchingTrialClaimsSelector,
  trialClaimsDataSelector,
} from '../../../../../redux/TrialClaims'
import ReactTooltip from 'react-tooltip'
import '../tooltipStyles.css'
import { baseColors } from '../../../../../constants/colors'
import { DocListTag } from '../../../TrialNew.styles'

type TItem = string[]

function ClaimsChallenged({
  ptabTrialNum,
  claims,
  fetchClaimsData,
  errorFetchingTrialClaims,
  isFetchingTrialClaims,
}: {
  onOpenRight: any
  ptabTrialNum: string
  claims: IClaims
  errorFetchingTrialClaims: boolean
  isFetchingTrialClaims: boolean
  fetchClaimsData: (ptabTrialNum: string) => void
}) {
  useEffect(() => {
    if (
      claims === null ||
      claims === undefined ||
      (claims && claims[ptabTrialNum] === null) ||
      (claims && claims[ptabTrialNum] === undefined)
    ) {
      fetchClaimsData(ptabTrialNum)
    }
    // eslint-disable-next-line
  }, [errorFetchingTrialClaims, fetchClaimsData])

  let buildData: TItem[] = []
  if (claims && claims[ptabTrialNum]) {
    buildData = Object.keys(claims[ptabTrialNum]).map((key: string) => {
      return [
        claims[ptabTrialNum][key].claim_text,
        claims[ptabTrialNum][key].claim_number,
        Object.keys(claims[ptabTrialNum][key].grounds_of_challenge).length !==
          0,
      ]
    })
  }

  const renderRow = (item: string[], index: number, match: any) => {
    return (
      <TableRow key={index} style={{}}>
        <TableLink>
          <div className="container">
            <div className="box">
              <span data-for={`custom-class-${index}`} data-tip>
                {`Claim ${item[1]}`}
              </span>
            </div>
            <div className="box">
              <span>
                {item[2] && (
                  <DocListTag
                    style={{ marginRight: 20 }}
                    bgColor={baseColors.GREY}
                    width={'90px'}
                    height={20}
                  >
                    {'Challenged'}
                  </DocListTag>
                )}
              </span>
            </div>
            <div className="box">
              <span></span>
            </div>
          </div>
          <ReactTooltip
            id={`custom-class-${index}`}
            className="extraClass"
            delayHide={300}
            delayShow={100}
            effect="solid"
            place={'right'}
            type={'light'}
            backgroundColor={baseColors.GREY_LIGHT}
          >
            {item[0]}
          </ReactTooltip>
        </TableLink>
      </TableRow>
    )
  }

  return (
    <Table
      textAlign={'left'}
      id="claimsChallenged"
      items={buildData}
      renderRow={renderRow}
      title="Claims Challenged"
      columnHeadings={undefined}
      tableHeaderWidth={undefined}
      sortableColumns={undefined}
      loaderSize={30}
      onSort={undefined}
      isSearchable={false}
      onSearch={undefined}
      isLoading={isFetchingTrialClaims}
      error={errorFetchingTrialClaims}
    />
  )
}

function mapStateToProps(state: object) {
  return {
    claims: trialClaimsDataSelector(state),
    errorFetchingTrialClaims: errorFetchingTrialClaimsSelector(state),
    isFetchingTrialClaims: isFetchingTrialClaimsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchClaimsData: fetchClaimsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsChallenged)
