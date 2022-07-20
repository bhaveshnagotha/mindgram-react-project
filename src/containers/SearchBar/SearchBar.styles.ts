import styled from 'styled-components'

import { baseColors } from '../../constants/colors'
import theme from '../../theme'

export const Container = styled.div`
  background: white;
  z-index: 1000;
  width: 100%;
  border-radius: 24px;
  box-shadow: ${theme.boxShadow};
`

export const ContainerResults = styled.div`
  padding: 5px 15px;
  border-radius: 24px;
`

export const ContainerResultItem = styled.div`
  display: flex;
  align-items: center;
  background: ${(props: { isSelected: boolean }) =>
    props.isSelected ? baseColors.GREY : baseColors.WHITE};
  padding: 10px;
  flex-direction: row;
  border-radius: 24px;
  padding: 8px 15px;
  font-weight: 600;

  &:last-child {
    margin-bottom: 10px;
  }

  &:hover {
    background: ${(props) =>
      props.isSelected ? baseColors.BLUE_FIVE : baseColors.WHITE};
    color: ${(props) => props.isSelected && baseColors.WHITE} !important;
    cursor: ${(props) => (props.isSelected ? 'pointer' : 'none')};
  }
`

export const ContainerItemValue = styled.span`
  width: calc(100% - 90px);
  // width: auto;
  word-wrap: break-word;
  // font-size: 12px;
`

export const MRCONSOConditionItem = styled.div`
  width: 50%;
  margin-right: 1rem;
  & div:last-child {
    color: ${baseColors.GREY_ONE};
    margin-left: 1rem;
  }
`
