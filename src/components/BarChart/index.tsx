import React, { useState } from 'react'
import {
  Bar,
  BarChart as BarChartRechart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Text,
  Cell,
  Label,
} from 'recharts'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'

const Container = styled.div<{ height?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : '300px')};
`
const ToolTipWrapper = styled.div`
  font-family: ${theme.fonts.sourceSansPro};
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  width: 250px;
`
const TooltipItem = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: space-between;
  padding: 5px;
`
const TooltipLabel = styled.p`
  margin-bottom: 0;
  font-size: 12px;
`
const TooltipHeader = styled.p`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 14px;
`
const ContainerTitle = styled.h6`
  font-family: ${theme.fonts.sourceSansPro};
  text-align: left;
  width: 93%;
  font-weight: 700;
  font-size: 18px;
  padding: 25px 20px;
  margin: 0;
`
interface ICustomToolTip {
  payload: IToolTipData[]
  active: boolean
  label: string
  labelPrefix?: string
  labelSuffix?: string
}
interface IToolTipData {
  name: string
  value: number
}

const CustomTooltip = (props: ICustomToolTip) => {
  const { payload, labelPrefix, labelSuffix } = props
  const tooltipData = payload
  if (props.active) {
    return (
      <ToolTipWrapper>
        <TooltipHeader>{`${props.label}`}</TooltipHeader>
        {tooltipData &&
          tooltipData.map((data, i) => (
            <TooltipItem key={i}>
              <TooltipLabel>{data.name}</TooltipLabel>
              <TooltipLabel>{`${labelPrefix || ''}${Math.round(data.value)}${
                labelSuffix || ''
              }`}</TooltipLabel>
            </TooltipItem>
          ))}
      </ToolTipWrapper>
    )
  }
  return null
}

interface ICustomizedLabel {
  x: number
  y: number
  value: number
  labelColor?: string
  labelPrefix?: string
  labelSuffix?: string
  width: number
}

const CustomizedLabel = (props: ICustomizedLabel) => {
  const { value, labelPrefix, labelSuffix, labelColor } = props
  const labelValue = Math.round(value)
  return (
    <text
      x={props.width / 2 + props.x - 10}
      y={props.y}
      dy={-10}
      fontSize="14"
      fontFamily={`${theme.fonts.sourceSansPro}`}
      fontWeight="600"
      fill={labelColor || baseColors.GREY_DARKER}
      textAnchor="right"
    >
      {`${labelPrefix || ''}${labelValue}${labelSuffix || ''}`}
    </text>
  )
}

interface ICustomAxisTick {
  x: number
  y: number
  labelColor?: string
  fill?: string
  payload: {
    value: string
  }
  isYAxis?: boolean
}
const CustomAxisTick = (props: ICustomAxisTick) => {
  return (
    <Text
      x={props.x}
      y={props.y - (props.isYAxis ? 6 : 0)}
      textAnchor="middle"
      verticalAnchor="start"
      width={30}
      fontSize={13}
      fontWeight={600}
      fontFamily={`${theme.fonts.sourceSansPro}`}
      fill={props.isYAxis ? props.labelColor : props.fill}
    >
      {`${props.payload.value}`.substring(0, 7)}
    </Text>
  )
}

export interface IDataKey {
  keyName: string
  color: string
  labelPrefix?: string
  labelSuffix?: string
}

interface ILegendLayOut {
  layout: 'horizontal' | 'vertical'
  verticalAlign: 'top' | 'middle' | 'bottom'
  align: 'left' | 'center' | 'right'
  legendFontSize: string
  legendFontWeight: number
}

interface ITitleStyle {
  color?: string
  fontSize?: string
  fontFamily?: string
  padding?: string
  fontWeight?: number
  margin?: string
  textAlign?: 'left' | 'right' | 'center'
  width?: string
}
interface ICartesianGridStyle {
  vertical?: boolean
  horizontal?: boolean
  strokeDasharray?: string
  stroke?: string
}
interface IProps {
  data: object[]
  dataKeys?: IDataKey[]
  groupKey: string
  dataKey?: string
  barColor?: string
  barClassName?: string
  barOnClick?: (data: any) => void
  height?: number
  width: number
  title?: string
  titleStyle?: ITitleStyle
  xAxisLabel?: string
  yAxisLabel?: string
  showLegend?: boolean
  legendLayout?: ILegendLayOut
  cartesianGridStyle?: ICartesianGridStyle
  showTooltip?: boolean
  labelColor?: string
  labelPrefix?: string
  labelSuffix?: string
}

interface ILegendWrapper {
  align: string
  legendFontSize: string
  legendFontWeight: number
}

const LegendWrapper = styled.div<ILegendWrapper>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.align === 'right'
      ? 'flex-end'
      : props.align === 'left'
      ? 'flex-start'
      : 'center'};
  font-family: ${theme.fonts.sourceSansPro};
  font-weight: ${(props) => props.legendFontWeight};
  font-size: ${(props) => props.legendFontSize};
  > div {
    display: flex;
    align-items: center;
    margin: 0 15px;
    > p {
      margin: 0;
      color: ${baseColors.GREY_DARKER};
    }
  }
`
const LegendIndex = styled.div<{ fill: string }>`
  background: ${(props) => props.fill};
  padding: 5px;
  height: 20px;
  width: 20px;
  border-radius: 5px;
  margin: 0 5px;
`

const BarChart = ({
  cartesianGridStyle = {
    horizontal: true,
    stroke: '#000',
    strokeDasharray: '8 8',
    vertical: false,
  },
  data,
  dataKeys,
  dataKey,
  barColor,
  barClassName = '',
  barOnClick,
  groupKey,
  height = 300,
  width = 500,
  title = '',
  titleStyle = {
    color: '',
    fontFamily: '',
    fontSize: '18px',
    fontWeight: 700,
    margin: '',
    padding: '',
    textAlign: 'left',
    width: '93%',
  },
  xAxisLabel = '',
  yAxisLabel = '',
  showLegend = true,
  showTooltip = true,
  labelColor = '',
  labelPrefix = '',
  labelSuffix = '',
  legendLayout = {
    align: 'right',
    layout: 'horizontal',
    legendFontSize: '12px',
    legendFontWeight: 700,
    verticalAlign: 'top',
  },
}: IProps) => {
  const renderLegend = (props: any) => {
    const { payload } = props
    return (
      <LegendWrapper
        align={props.align}
        legendFontSize={legendLayout.legendFontSize}
        legendFontWeight={legendLayout.legendFontWeight}
      >
        {payload.map((entry: any, index: any) => (
          <div key={`item-${index}`}>
            <LegendIndex fill={entry.payload.fill}></LegendIndex>
            <p>{entry.value}</p>
          </div>
        ))}
      </LegendWrapper>
    )
  }

  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const handleClick = (itemData, index) => {
    setActiveIndex((prevState) => {
      if (prevState === index) {
        if (barOnClick) barOnClick(null)
        return -1
      } else {
        if (barOnClick) barOnClick(itemData)
        return index
      }
    })
  }

  return (
    <Container height={height}>
      {title && <ContainerTitle style={titleStyle}>{title}</ContainerTitle>}
      <ResponsiveContainer>
        <BarChartRechart
          width={width}
          height={height}
          data={data}
          margin={{
            bottom: 5,
            left: 20,
            right: 30,
            top: 25,
          }}
        >
          <CartesianGrid
            vertical={cartesianGridStyle.vertical}
            horizontal={cartesianGridStyle.horizontal}
            strokeDasharray={cartesianGridStyle.strokeDasharray}
            stroke={cartesianGridStyle.stroke}
          />
          <XAxis
            tickLine={false}
            axisLine={false}
            dataKey={groupKey}
            interval={0}
            tick={(props: ICustomAxisTick) => (
              <CustomAxisTick
                labelColor={labelColor}
                fill={baseColors.GREY_DARKER}
                {...props}
              />
            )}
          >
            {xAxisLabel && (
              <Label value={xAxisLabel} offset={0} position="insideBottom" />
            )}
          </XAxis>
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={(props: ICustomAxisTick) => (
              <CustomAxisTick
                labelColor={labelColor}
                fill={baseColors.GREY_DARKER}
                isYAxis={true}
                {...props}
              />
            )}
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          />
          {showTooltip && (
            <Tooltip
              content={(props: ICustomToolTip) => (
                <CustomTooltip
                  labelPrefix={labelPrefix}
                  labelSuffix={labelSuffix}
                  {...props}
                />
              )}
            />
          )}
          {showLegend && (
            <Legend
              content={renderLegend}
              layout={legendLayout.layout}
              verticalAlign={legendLayout.verticalAlign}
              align={legendLayout.align}
              wrapperStyle={{
                bottom: legendLayout.verticalAlign === 'bottom' && '-5px',
                top: legendLayout.verticalAlign === 'top' && '5px',
              }}
            />
          )}
          {dataKeys?.map(({ keyName, color }: IDataKey) => (
            <Bar
              className={barClassName}
              isAnimationActive={false}
              key={keyName}
              dataKey={keyName}
              fill={color}
              label={(props: ICustomizedLabel) => (
                <CustomizedLabel
                  {...props}
                  labelColor={labelColor}
                  labelPrefix={labelPrefix}
                  labelSuffix={labelSuffix}
                />
              )}
              radius={[5, 5, 5, 5]}
            />
          ))}
          {dataKey && (
            <Bar
              className={barClassName}
              dataKey={dataKey}
              fill={barColor}
              label={(props: ICustomizedLabel) => (
                <CustomizedLabel
                  {...props}
                  labelColor={labelColor}
                  labelPrefix={labelPrefix}
                  labelSuffix={labelSuffix}
                />
              )}
              radius={[5, 5, 5, 5]}
              onClick={barOnClick && handleClick}
            >
              {barOnClick &&
                data.map((entry, index) => (
                  <Cell
                    cursor="pointer"
                    fill={
                      index === activeIndex
                        ? baseColors.BLUE_FIVE
                        : baseColors.BLUE_TEN
                    }
                    key={`cell-${index}`}
                  />
                ))}
            </Bar>
          )}
        </BarChartRechart>
      </ResponsiveContainer>
    </Container>
  )
}

export default BarChart
