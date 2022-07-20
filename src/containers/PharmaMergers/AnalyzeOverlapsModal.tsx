import React, { useState } from 'react'
import { Button, ModalComponent } from '../../components'
import { baseColors } from '../../constants/colors'
import { buttonTypes } from '../../components/Button'
import styled from 'styled-components'
import theme from '../../theme'
import CompanySearchBar from '../SearchBar/CompanySearchBar'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { IGlobalSearchResult } from '../SearchBar'
import { SEARCH_TYPE } from '../../hooks/search'

const AnalyzeInputWrapper = styled.div`
  box-shadow: ${theme.boxShadow};
  border-radius: 24px;
  overflow: hidden;
`

const ModalFooter = ({
  setIsAnalyzeOverlapsModalOpen,
  onSearch,
  isSubmitDisabled,
}) => {
  return (
    <div style={{ fontSize: '14px' }}>
      <Button
        className="mr-4"
        onClick={() => setIsAnalyzeOverlapsModalOpen(false)}
        color={baseColors.BLUE_FIVE}
        backgroundColor={baseColors.WHITE}
        hoverBackgroundColor={baseColors.GREY_LIGHT}
        type={buttonTypes.SHADOWED}
        hasShadow={true}
        width={150}
      >
        Cancel
      </Button>
      <Button
        disabled={isSubmitDisabled}
        onClick={onSearch}
        backgroundColor={baseColors.BLUE_FIVE}
        hoverBackgroundColor={baseColors.BLUE_NINE}
        type={buttonTypes.SHADOWED}
        hasShadow={true}
        width={150}
      >
        Analyze
      </Button>
    </div>
  )
}

const AnalyzeOverlapsModal = ({
  isAnalyzeOverlapsModalOpen,
  setIsAnalyzeOverlapsModalOpen,
  activeLandingType,
}) => {
  const history = useHistory()
  const match = useRouteMatch()
  const [
    targetCompany,
    setTargetCompany,
  ] = useState<IGlobalSearchResult | null>(null)
  const [
    acquirerCompany,
    setAcquirerCompany,
  ] = useState<IGlobalSearchResult | null>(null)

  return (
    <ModalComponent
      title="Analyze Overlaps"
      isStatic={true}
      show={isAnalyzeOverlapsModalOpen}
      onClose={() => setIsAnalyzeOverlapsModalOpen(false)}
      modalFooter={() => (
        <ModalFooter
          isSubmitDisabled={!targetCompany || !acquirerCompany}
          setIsAnalyzeOverlapsModalOpen={setIsAnalyzeOverlapsModalOpen}
          onSearch={() => {
            const target = `${targetCompany?.value?.type}${targetCompany?.value?.id}`
            const acquirer = `${acquirerCompany?.value?.type}${acquirerCompany?.value?.id}`
            setIsAnalyzeOverlapsModalOpen(false)
            history.push(`${match.url}/${target}-${acquirer}`)
          }}
        />
      )}
    >
      <AnalyzeInputWrapper className="mb-3">
        <CompanySearchBar
          activeLandingType={activeLandingType}
          searchType={SEARCH_TYPE.OVERLAPS}
          id="searchTargetCompany"
          history={history}
          fontSize={15}
          isAuthenticated={false}
          placeholder="Enter company 1"
          onSelect={(result) => {
            setTargetCompany(result)
          }}
        />{' '}
      </AnalyzeInputWrapper>
      <CompanySearchBar
        activeLandingType={activeLandingType}
        searchType={SEARCH_TYPE.OVERLAPS}
        id="searchAcquirerCompany"
        history={history}
        fontSize={15}
        isAuthenticated={false}
        placeholder="Enter company 2"
        onSelect={(result) => {
          setAcquirerCompany(result)
        }}
      />
    </ModalComponent>
  )
}

export default AnalyzeOverlapsModal
