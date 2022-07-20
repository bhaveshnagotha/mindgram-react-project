import React, { useEffect, useState } from 'react'
import { Card, TimeLine, Loading } from '../../../../../components'
import {
  trialStagesSelector,
  errorFetchingTrialStages,
  isFetchingTrialStagesSelector,
  fetchTrialStages,
  trialStagesKey,
} from '../../../../../redux/TrialStages'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { fetchSingleDocumentUrl } from '../../../Right/PriorArtCombinationPreview'

const TrialTimeline = ({
  ptabTrialNum,
  errorFetchingTrialStagesData,
  isFetchingTrialStagesData,
  trialStagesData,
  fetchTrialStagesData,
}: {
  ptabTrialNum: string
  trialStagesData: any
  fetchTrialStagesData: (companyName: string) => void
  errorFetchingTrialStagesData: boolean
  isFetchingTrialStagesData: boolean
}) => {
  const stagesData = trialStagesData?.[trialStagesKey]?.[ptabTrialNum]
  const [timeLineData, setTimeLineData] = useState<any>(null)
  const [isLoadingTimeLineData, setIsLoadingTimeLineData] = useState(true)
  useEffect(() => {
    if (!stagesData) {
      fetchTrialStagesData(ptabTrialNum)
    }
  }, [
    errorFetchingTrialStagesData,
    fetchTrialStagesData,
    stagesData,
    ptabTrialNum,
  ])

  const getStepUrl = async (fileId) => {
    return fetchSingleDocumentUrl(fileId)
      .then((responseData) => {
        return responseData.url
      })
      .catch((err) => {
        return ''
      })
  }

  useEffect(() => {
    let isCancelled = false
    setIsLoadingTimeLineData(true)
    const getData = async () => {
      const iterableData = stagesData?.data ?? []
      return Promise.all(
        iterableData
          ?.sort((d1, d2) => (d1.order > d2.order ? 1 : -1))
          ?.map((data) => {
            const filedDate = data?.filed_date && new Date(data.filed_date)
            if (data.file_id) {
              return getStepUrl(data.file_id).then((url) => {
                return {
                  stepTitle: data.stage,
                  stepText: filedDate && format(filedDate, 'yyyy-MM-dd'),
                  stepUrl: url,
                }
              })
            } else {
              return {
                stepTitle: data.stage,
                stepText: filedDate && format(filedDate, 'yyyy-MM-dd'),
                stepUrl: '',
              }
            }
          })
      )
    }

    getData()
      .then((data) => {
        if (!isCancelled) {
          if (data?.length) {
            setTimeLineData(data)
          }
          setIsLoadingTimeLineData(false)
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setTimeLineData([])
          setIsLoadingTimeLineData(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [stagesData])

  return (
    <Card
      style={{
        padding: '10px 30px',
        marginBottom: '30px',
        height: isLoadingTimeLineData || !stagesData ? '150px' : '',
      }}
    >
      {isLoadingTimeLineData || !stagesData ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Loading size={20} />
        </div>
      ) : (
        <TimeLine
          data={timeLineData}
          activeIndex={stagesData?.active_step}
          title={`Timeline for ${ptabTrialNum}`}
        />
      )}
    </Card>
  )
}

function mapStateToProps(state: object) {
  return {
    trialStagesData: trialStagesSelector(state),
    errorFetchingTrialStagesData: errorFetchingTrialStages(state),
    isFetchingTrialStagesData: isFetchingTrialStagesSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTrialStagesData: fetchTrialStages,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrialTimeline)
