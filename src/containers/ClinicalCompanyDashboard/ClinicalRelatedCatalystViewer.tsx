import React from 'react'
import styled from 'styled-components'
import CatalystViewer from '../TrialCatalysts/Middle/CatalystViewer'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const ClinicalRelatedCatalystViewer = ({
  activeCatalyst,
  fdaLabelURL,
  onCloseActiveCatalyst,
  height,
  width,
}: {
  activeCatalyst: any
  fdaLabelURL: string
  onCloseActiveCatalyst?: any
  height?: number
  width?: number
}) => {
  return (
    <Wrapper>
      <CatalystViewer
        activeCatalyst={activeCatalyst}
        fdaLabelURL={fdaLabelURL}
        isWindowView={true}
        onCloseActiveCatalyst={onCloseActiveCatalyst}
        height={height}
        width={width}
      />
    </Wrapper>
  )
}

export default ClinicalRelatedCatalystViewer
