import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Loading, ModalComponent, Tag } from '../../../components'
import { connect } from 'react-redux'
import {
  acceptDesignationsOutboxItem as acceptDesignationsOutboxItemAction,
  acceptedItemSelector,
  addDesignationsOutboxItem as addDesignationsOutboxItemAction,
  addedItemSelector,
  designationsCMSKey,
  designationsCMSSelector,
  fetchDesignationsOutbox as fetchDesignationsOutboxAction,
  isAcceptingItemSelector,
  isAddingItemSelector,
  isErrorAcceptingItemSelector,
  isErrorAddingItemSelector,
  isErrorFetchingDesignationsSelector,
  isErrorRejectingItemSelector,
  isErrorSavingItemSelector,
  isFetchingDesignationsSelector,
  isRejectingItemSelector,
  isSavingItemSelector,
  rejectDesignationsOutboxItem as rejectDesignationsOutboxItemAction,
  rejectedItemSelector,
  saveAndRemoveDesignationsOutboxItem as saveAndRemoveDesignationsOutboxItemAction,
  savedItemSelector,
} from '../../../redux/CMS/DesignationsCMS'
import { baseColors } from '../../../constants/colors'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Modal } from 'react-bootstrap'
import SearchBar from '../../SearchBar'
import { SEARCH_TYPE } from '../../../hooks/search'
import { useHistory } from 'react-router-dom'
import { getCollection, postCollection } from '../../../helpers/api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CatalystViewer from '../../TrialCatalysts/Middle/CatalystViewer'

const Container = styled.div`
  background-color: ${baseColors.WHITE};
  height: fit-content;
  & h2 {
    font-weight: 600;
  }
`
const OutboxListContainer = styled.ol``

const OutboxItemContainer = styled.li`
  &::marker {
    font-size: 1.5rem;
    margin-right: 10px;
  }
`

const OutboxItemInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 230px;
  column-gap: 5px;
`

const CompanyNameWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  & h6 {
    margin: 0;
  }
`

const InfoItem = styled.div`
  & h5 {
    font-size: 1rem;
    color: ${baseColors.GREY_ONE};
    font-weight: 600;
    text-transform: uppercase;
  }
`

const DesignationTextContainer = styled.div`
  margin-top: 20px;
  & p {
    font-size: 1rem;
  }
  & p span {
    font-weight: 600;
  }
`

const ModalNewsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  column-gap: 10px;
  align-items: center;

  & h6 {
    margin: 0;
    width: fit-content;
  }

  margin-bottom: 15px;
`

const SearchBarWrapper = styled.div`
  margin: 30px 0;
`

interface IValidationResponse {
  message: string
  intervention_condition_id: number
  stage: string
  valid: boolean
}

const DesignationsCMS = ({
  isErrorFetchingDesignations,
  isFetchingDesignations,
  designationsCMS,
  fetchDesignationsOutbox,
  acceptDesignationsOutboxItem,
  isAcceptingItem,
  isErrorAcceptingItem,
  acceptedItem,
  rejectDesignationsOutboxItem,
  isRejectingItem,
  isErrorRejectingItem,
  rejectedItem,
  addDesignationsOutboxItem,
  isAddingItem,
  isErrorAddingItem,
  addedItem,
  saveAndRemoveDesignationsOutboxItem,
  isSavingItem,
  isErrorSavingItem,
  savedItem,
}: {
  isErrorFetchingDesignations: boolean
  isFetchingDesignations: boolean
  designationsCMS: any
  fetchDesignationsOutbox: any
  acceptDesignationsOutboxItem: any
  isAcceptingItem: boolean
  isErrorAcceptingItem: boolean
  acceptedItem: boolean
  rejectDesignationsOutboxItem: any
  isRejectingItem: boolean
  isErrorRejectingItem: boolean
  rejectedItem: boolean
  addDesignationsOutboxItem: any
  isAddingItem: boolean
  isErrorAddingItem: boolean
  addedItem: boolean
  saveAndRemoveDesignationsOutboxItem: any
  isSavingItem: boolean
  isErrorSavingItem: boolean
  savedItem: boolean
}) => {
  const history = useHistory()
  const designationsList = designationsCMS?.[designationsCMSKey] || []
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false)
  const [currModifyModalItem, setCurrModifyModalItem] = useState<any>(null)
  const [currNewsArticle, setCurrNewsArticle] = useState<any>(null)

  const [currAcceptRejectItemId, setCurrAcceptRejectItemId] = useState<
    number | null
  >(null)

  const [currModifyIntervention, setCurrModifyIntervention] = useState<any>(
    null
  )
  const [currModifyCondition, setCurrModifyCondition] = useState<any>(null)

  const [designationsListDropdown, setDesignationsListDropdown] = useState<any>(
    null
  )
  const [currSelectedDesignation, setCurrSelectedDesignation] = useState<
    string
  >('')
  const handleDesignationDropdownChange = (event) => {
    setCurrSelectedDesignation(event.target.value)
  }

  const [isValidating, setIsValidating] = useState(false)
  const [currValidationResponse, setCurrValidationResponse] = useState<any>(
    null
  )
  const [
    currInterventionConditionId,
    setCurrInterventionConditionId,
  ] = useState<number | null>(null)
  const [currValidationMessage, setCurrValidationMessage] = useState<string>('')

  const resetModifyPaneFields = () => {
    // setCurrAcceptRejectItemId(null)
    setCurrSelectedDesignation('')
    setCurrModifyIntervention(null)
    setCurrModifyCondition(null)
    setCurrInterventionConditionId(null)
    setCurrValidationResponse(null)
    setCurrValidationMessage('')
  }

  useEffect(() => {
    if (!isFetchingDesignations && designationsList.length === 0) {
      fetchDesignationsOutbox()
    }
  }, [isFetchingDesignations, designationsList, fetchDesignationsOutbox])

  useEffect(() => {
    if (currModifyIntervention && currModifyCondition) {
      setIsValidating(true)
      postCollection('/v1/ct/designations-outbox/validate', {
        norm_cui: currModifyIntervention?.value?.norm_cui,
        condition_id: currModifyCondition?.value?.id,
      })
        .then((res) => {
          setIsValidating(false)
          setCurrValidationResponse(res)
          // console.log(res)
        })
        .catch((err) => {
          // console.log(err)
        })
    }
  }, [currModifyIntervention, currModifyCondition])

  useEffect(() => {
    if (currValidationResponse) {
      if (currValidationResponse.valid)
        setCurrInterventionConditionId(
          currValidationResponse.intervention_condition_id
        )
      setCurrValidationMessage(currValidationResponse.message)
    }
  }, [currValidationResponse])

  useEffect(() => {
    if (
      isErrorAcceptingItem ||
      isErrorRejectingItem ||
      isErrorAddingItem ||
      isErrorSavingItem
    ) {
      toast.error('Error accepting/rejecting/adding designation outbox item.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      if (!isErrorAddingItem) setCurrAcceptRejectItemId(null)
      resetModifyPaneFields()
    }
  }, [
    isErrorAcceptingItem,
    isErrorRejectingItem,
    isErrorAddingItem,
    isErrorSavingItem,
  ])

  useEffect(() => {
    if (acceptedItem || rejectedItem || addedItem || savedItem) {
      toast.success(
        'Successfully accepted/rejected/added designation outbox item.',
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      if (!addedItem) setCurrAcceptRejectItemId(null)
      resetModifyPaneFields()
    }
  }, [acceptedItem, rejectedItem, addedItem, savedItem])

  return (
    <Fragment>
      {isFetchingDesignations ? (
        <LoadingWrapper>
          <Loading size={40} />
        </LoadingWrapper>
      ) : (
        <Container className="m-3 p-3 rounded">
          <h2>Designations Outbox</h2>

          <OutboxListContainer>
            {designationsList.map((item, index) => {
              return (
                <OutboxItemContainer key={index}>
                  <OutboxItemInfoContainer>
                    <InfoItem>
                      <h5>Product</h5>
                      <h6>
                        Name:{' '}
                        {item?.intervention_name?.length &&
                          item?.intervention_name[0]}
                      </h6>
                      <CompanyNameWrapper>
                        <h6>Company: {item?.company?.company_name || 'N/A'}</h6>
                        {item?.company?.company_name && (
                          <Tag
                            fontWeight={600}
                            color={baseColors.GREY_BLUE}
                            bgColor={baseColors.BLUE_SIX}
                            width="fit-content"
                            style={{
                              height: 'fit-content',
                              justifySelf: 'start',
                            }}
                          >
                            {item?.company?.company_ticker}
                          </Tag>
                        )}
                      </CompanyNameWrapper>
                    </InfoItem>
                    <InfoItem>
                      <h5>Indication</h5>
                      <h6>Name: {item?.condition || 'N/A'}</h6>
                      <h6>CUI: {item?.condition_cui || 'N/A'}</h6>
                    </InfoItem>
                    <InfoItem>
                      <h5>Designation</h5>
                      <h6>Name: {item?.designation}</h6>
                    </InfoItem>
                    <InfoItem>
                      <h5>News Article</h5>
                      <Button
                        onClick={() => {
                          getCollection(
                            `/v1/ct/catalysts/news/${item?.news_id}`
                          )
                            .then((res) => {
                              setCurrNewsArticle(res)
                            })
                            .catch((err) => {
                              return
                            })
                        }}
                      >
                        Open Link
                      </Button>
                      <CompanyNameWrapper>
                        <h6>
                          Company: {item?.news_company?.company_name || 'N/A'}
                        </h6>
                        {item?.news_company?.company_name && (
                          <Tag
                            fontWeight={600}
                            color={baseColors.GREY_BLUE}
                            bgColor={baseColors.BLUE_SIX}
                            width="fit-content"
                            style={{
                              height: 'fit-content',
                              justifySelf: 'start',
                            }}
                          >
                            {item?.news_company?.company_ticker}
                          </Tag>
                        )}
                      </CompanyNameWrapper>
                    </InfoItem>
                    <div>
                      <Button
                        style={{ textTransform: 'uppercase' }}
                        onClick={() => {
                          setIsModifyModalOpen(true)
                          setCurrModifyModalItem(item)
                          getCollection(
                            '/v1/ct/designations-outbox/designations/list'
                          )
                            .then((res) => {
                              setDesignationsListDropdown(res)
                            })
                            .catch((err) => {
                              return
                            })
                        }}
                        disabled={
                          (isAcceptingItem ||
                            isRejectingItem ||
                            isAddingItem ||
                            isSavingItem) &&
                          item?.id === currAcceptRejectItemId
                        }
                      >
                        Modify
                      </Button>
                      <Button
                        style={{ textTransform: 'uppercase' }}
                        onClick={() => {
                          setCurrAcceptRejectItemId(item.id)
                          rejectDesignationsOutboxItem(item.id)
                        }}
                        disabled={
                          (isAcceptingItem ||
                            isRejectingItem ||
                            isAddingItem ||
                            isSavingItem) &&
                          item?.id === currAcceptRejectItemId
                        }
                      >
                        Reject
                      </Button>
                      <Button
                        style={{ textTransform: 'uppercase' }}
                        onClick={() => {
                          setCurrAcceptRejectItemId(item.id)
                          acceptDesignationsOutboxItem(item.id)
                        }}
                        disabled={
                          (isAcceptingItem ||
                            isRejectingItem ||
                            isAddingItem ||
                            isSavingItem) &&
                          item?.id === currAcceptRejectItemId
                        }
                      >
                        Accept
                      </Button>
                    </div>
                  </OutboxItemInfoContainer>
                  <DesignationTextContainer>
                    <p>
                      <span>Designation Text: </span>
                      {item?.designation_text}
                    </p>
                  </DesignationTextContainer>
                </OutboxItemContainer>
              )
            })}
          </OutboxListContainer>
          <Modal
            size="lg"
            show={isModifyModalOpen}
            onHide={() => {
              setIsModifyModalOpen(false)
              setCurrModifyModalItem(null)
              resetModifyPaneFields()
            }}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>Modify Designation Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Designation Outbox ID: {currModifyModalItem?.id}</h6>
              <DesignationTextContainer>
                <p>
                  <span>Designation Text: </span>
                  {currModifyModalItem?.designation_text}
                </p>
              </DesignationTextContainer>
              <ModalNewsWrapper>
                <h6>News:</h6>
                <Button
                  width={100}
                  onClick={() => {
                    getCollection(
                      `/v1/ct/catalysts/news/${currModifyModalItem?.news_id}`
                    )
                      .then((res) => {
                        setCurrNewsArticle(res)
                      })
                      .catch((err) => {
                        return
                      })
                  }}
                >
                  Open Link
                </Button>
              </ModalNewsWrapper>
              <CompanyNameWrapper>
                <h6>
                  Company:{' '}
                  {currModifyModalItem?.news_company?.company_name || 'N/A'}
                </h6>
                {currModifyModalItem?.news_company?.company_name && (
                  <Tag
                    fontWeight={600}
                    color={baseColors.GREY_BLUE}
                    bgColor={baseColors.BLUE_SIX}
                    width="fit-content"
                    style={{
                      height: 'fit-content',
                      justifySelf: 'start',
                    }}
                  >
                    {currModifyModalItem?.news_company?.company_ticker}
                  </Tag>
                )}
              </CompanyNameWrapper>
              <SearchBarWrapper>
                <h6>Intervention:</h6>
                <SearchBar
                  fontSize={14}
                  history={history}
                  isAuthenticated={false}
                  activeLandingType={'r'}
                  setSelectedItem={(item) => {
                    setCurrModifyIntervention(item)
                    // console.log(item)
                  }}
                  searchType={SEARCH_TYPE.INTERVENTIONS_DESIGNATION_OUTBOX}
                  placeholder={'Search interventions'}
                />
              </SearchBarWrapper>
              <SearchBarWrapper>
                <h6>Condition:</h6>
                <SearchBar
                  fontSize={14}
                  history={history}
                  isAuthenticated={false}
                  activeLandingType={'r'}
                  setSelectedItem={(item) => {
                    setCurrModifyCondition(item)
                    // console.log(item)
                  }}
                  searchType={SEARCH_TYPE.CONDITIONS_DESIGNATION_OUTBOX}
                  placeholder={'Search conditions'}
                />
              </SearchBarWrapper>
              <h6>Designation:</h6>
              <select
                className="mb-3"
                style={{ minWidth: '365px' }}
                value={currSelectedDesignation}
                onChange={handleDesignationDropdownChange}
              >
                <option value="none">None</option>
                {designationsListDropdown?.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
              <h6>
                Validation Message:{' '}
                {isValidating ? (
                  <LoadingWrapper>
                    <Loading size={30} />
                  </LoadingWrapper>
                ) : (
                  currValidationMessage || 'N/A'
                )}
              </h6>
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
              <Button
                disabled={
                  !(
                    currValidationResponse?.valid &&
                    currModifyCondition &&
                    currModifyIntervention &&
                    currSelectedDesignation
                  )
                }
                onClick={() => {
                  addDesignationsOutboxItem(
                    currModifyModalItem?.id,
                    currInterventionConditionId,
                    currSelectedDesignation
                  )
                  // setIsModifyModalOpen(false)
                  // setCurrModifyModalItem(null)
                }}
              >
                Add
              </Button>
              <Button
                disabled={
                  !(
                    currValidationResponse?.valid &&
                    currModifyCondition &&
                    currModifyIntervention &&
                    currSelectedDesignation
                  )
                }
                onClick={() => {
                  saveAndRemoveDesignationsOutboxItem(
                    currModifyModalItem?.id,
                    currInterventionConditionId,
                    currSelectedDesignation
                  )
                  setIsModifyModalOpen(false)
                  setCurrModifyModalItem(null)
                }}
              >
                Save and Remove
              </Button>
              <Button
                onClick={() => {
                  setIsModifyModalOpen(false)
                  setCurrModifyModalItem(null)
                  resetModifyPaneFields()
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div onClick={(e) => e.stopPropagation()}>
            <ModalComponent
              show={currNewsArticle?.company?.length > 0}
              width={window.innerWidth / 1.1}
              onClose={() => {
                setCurrNewsArticle(null)
              }}
            >
              <CatalystViewer
                activeCatalyst={currNewsArticle}
                fdaLabelURL={''}
                onCloseActiveCatalyst={(e) => {
                  e.stopPropagation()
                  setCurrNewsArticle(null)
                }}
              />
            </ModalComponent>
          </div>
          <ToastContainer />
        </Container>
      )}
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    designationsCMS: designationsCMSSelector(state),
    isErrorFetchingDesignations: isErrorFetchingDesignationsSelector(state),
    isFetchingDesignations: isFetchingDesignationsSelector(state),
    isAcceptingItem: isAcceptingItemSelector(state),
    isErrorAcceptingItem: isErrorAcceptingItemSelector(state),
    acceptedItem: acceptedItemSelector(state),
    isRejectingItem: isRejectingItemSelector(state),
    isErrorRejectingItem: isErrorRejectingItemSelector(state),
    rejectedItem: rejectedItemSelector(state),
    isAddingItem: isAddingItemSelector(state),
    isErrorAddingItem: isErrorAddingItemSelector(state),
    addedItem: addedItemSelector(state),
    isSavingItem: isSavingItemSelector(state),
    isErrorSavingItem: isErrorSavingItemSelector(state),
    savedItem: savedItemSelector(state),
  }
}

const mapDispatchToProps = {
  fetchDesignationsOutbox: fetchDesignationsOutboxAction,
  acceptDesignationsOutboxItem: acceptDesignationsOutboxItemAction,
  rejectDesignationsOutboxItem: rejectDesignationsOutboxItemAction,
  addDesignationsOutboxItem: addDesignationsOutboxItemAction,
  saveAndRemoveDesignationsOutboxItem: saveAndRemoveDesignationsOutboxItemAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignationsCMS)
