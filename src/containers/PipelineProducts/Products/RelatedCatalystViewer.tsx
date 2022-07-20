import React from 'react'
import styled from 'styled-components'
import CatalystViewer from '../../TrialCatalysts/Middle/CatalystViewer'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  right: 0;
`

const RelatedCatalystViewer = ({
  activeCatalyst,
  fdaLabelURL,
  onCloseActiveCatalyst,
}: {
  activeCatalyst: any
  fdaLabelURL: string
  onCloseActiveCatalyst: () => void
}) => {
  return (
    <Wrapper>
      <CatalystViewer
        activeCatalyst={activeCatalyst}
        fdaLabelURL={fdaLabelURL}
        isWindowView={true}
        onCloseActiveCatalyst={onCloseActiveCatalyst}
      />
    </Wrapper>
  )
}

export default RelatedCatalystViewer
