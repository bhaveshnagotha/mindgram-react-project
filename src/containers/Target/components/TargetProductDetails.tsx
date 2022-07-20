import React from 'react'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { Tag } from '../../../components'
import { baseColors } from '../../../constants/colors'
import { TargetProduct } from '../Target.styles'
import { getStageName } from '../Target.utils'

interface ITargetProductDetails {
  data: any
}

export default function TargetProductDetails(props: ITargetProductDetails) {
  const { data } = props
  return (
    <TargetProduct>
      <div className="flex align-center mb-1">
        <h2 className="product__name">{data?.intervention_name ?? ''}</h2>

        <Link
          to={`/clinical-trials/pipeline-products/${encodeURIComponent(
            data?.norm_cui
          )}`}
        >
          <ArrowRightSquare
            className="arrowIcon ml-2"
            color={baseColors.BLUE_FIVE}
            size={20}
          />
        </Link>
      </div>

      <p className="product__alias">
        {!!data?.synonyms?.length ? `Alias: ${data?.synonyms?.join(', ')}` : ''}
      </p>

      <Tag
        fontWeight={600}
        color={baseColors.GREY_BLUE}
        bgColor={baseColors.GREEN_THREE}
        fontSize={10}
        style={{ padding: '4px 10px' }}
        width={'fit-content'}
      >
        {data?.intervention_modality}
      </Tag>

      <p className="product__phase">
        Max Phase: {getStageName(data?.max_stage)}
      </p>
    </TargetProduct>
  )
}
