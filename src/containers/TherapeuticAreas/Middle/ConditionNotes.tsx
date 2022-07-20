import React, { useState, Fragment, useEffect } from 'react'
import { Card, Loading } from '../../../components'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { useParams } from 'react-router-dom'
import { getCollection } from '../../../helpers/api'
import { baseColors } from '../../../constants/colors'
import { NoDataErrorMsg } from '../../App/App.styles'
import {
  Item,
  MainDefinition,
  NotesList,
  OtherDefinitionsDropdown,
} from '../../PipelineProducts/Products/MarketAnalysis'
import { Header as NoteHeader } from '../../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import styled from 'styled-components'

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  row-gap: 20px;
  padding: 10px 20px 20px;
  max-height: 100vh;
  overflow-y: auto;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const ContainerTitle = styled.p`
  margin-bottom: 0;
  font-weight: 700;
  font-size: 18px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
`

const ConditionNotes = () => {
  const [notesData, setNotesData] = useState<any>(null)
  const [notesLoadingError, setNotesLoadingError] = useState<boolean>(false)

  const [
    isOtherDefinitionsTabExpanded,
    setIsOtherDefinitionsTabExpanded,
  ] = useState(false)
  const [
    otherDefinitionsDropdownOptions,
    setOtherDefinitionsDropdownOptions,
  ] = useState([])
  const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false)

  const { therapeuticConditionId } = useParams<any>()

  const getUrl = (conditionId) => `/v1/ct/conditions/${conditionId}/note`

  useEffect(() => {
    if (!notesData && !isLoadingNotes) {
      setIsLoadingNotes(true)
      const url = getUrl(therapeuticConditionId)
      getCollection(url)
        .then((res) => {
          setNotesData(res)
          setOtherDefinitionsDropdownOptions(res?.other_definitions)
          setIsLoadingNotes(false)
        })
        .catch(() => {
          setIsLoadingNotes(false)
          setNotesLoadingError(true)
        })
    }
  }, [therapeuticConditionId, notesData, isLoadingNotes])

  return (
    <Card height="100%">
      {isLoadingNotes ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        <ContainerWrapper>
          <Container>
            <ContainerTitle>{notesData?.condition_name}</ContainerTitle>
          </Container>
          {notesLoadingError ? (
            <NoDataErrorMsg>Error Loading Condition Data</NoDataErrorMsg>
          ) : (
            <Fragment>
              {notesData?.main_definition && (
                <MainDefinition
                  dangerouslySetInnerHTML={{
                    __html: notesData?.main_definition,
                  }}
                />
              )}
              <div>
                <OtherDefinitionsDropdown
                  isTabExpanded={isOtherDefinitionsTabExpanded}
                  onToggle={() =>
                    setIsOtherDefinitionsTabExpanded(
                      !isOtherDefinitionsTabExpanded
                    )
                  }
                  otherDefinitionsDropdownOptions={
                    otherDefinitionsDropdownOptions
                  }
                />
              </div>

              <div>
                <NoteHeader>
                  <p>Prevalence Notes:</p>
                </NoteHeader>
                <NotesList
                  data={notesData?.prevalence_notes}
                  element={(d, index) => (
                    <Fragment key={index}>
                      <Item
                        lastItem={
                          index === notesData?.prevalence_notes?.length - 1
                        }
                        activeItem={false}
                        data={d}
                        handleClick={() => {
                          return
                        }}
                      />
                    </Fragment>
                  )}
                />
                <NoteHeader>
                  <p>Market Size Notes:</p>
                </NoteHeader>
                <NotesList
                  data={notesData?.market_size_notes}
                  element={(d, index) => (
                    <Fragment key={index}>
                      <Item
                        lastItem={
                          index === notesData?.market_size_notes?.length - 1
                        }
                        activeItem={false}
                        data={d}
                        handleClick={() => {
                          return
                        }}
                      />
                    </Fragment>
                  )}
                />
              </div>
            </Fragment>
          )}
        </ContainerWrapper>
      )}
    </Card>
  )
}

export default ConditionNotes
