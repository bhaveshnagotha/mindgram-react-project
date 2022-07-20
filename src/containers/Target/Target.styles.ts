import styled from 'styled-components'
import { baseColors } from '../../constants/colors'

export const TargetContainer = styled.div`
  margin: 0 1.5rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const TargetDetailsWrapper = styled.div`
  display: flex;
  flex-flow: row;
  flex: 1;
  background-color: ${baseColors.WHITE};
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`

export const TargetLeftWrapper = styled.div`
  width: 400px;
  box-shadow: 5px 0 10px -4px ${baseColors.GREY_LIGHT};
  z-index: 10;
`

export const TargetCondition = styled.div<{ active?: boolean }>`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${baseColors.GREY_DARKER};
  user-select: none;
  ${(props) =>
    props.active ? `background-color: ${baseColors.GREY_LIGHTER};` : ''}

  > span {
    color: ${baseColors.BLUE_ELEVEN};
    margin-left: 4px;
  }

  &:hover {
    background-color: ${baseColors.GREY_LIGHTER};
  }
`

export const TargetTableRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};

  > td {
    padding: 1rem 20px;
    :not(:last-child) {
      border-right: 0.5px solid ${baseColors.GREY_LIGHT};
    }
  }
`

export const TargetInfo = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;

  > h2 {
    font-size: 22px;
    font-weight: 600;
    color: ${baseColors.BLUE_FIVE};
    &::first-letter {
      text-transform: uppercase;
    }
  }

  > p {
    font-size: 14px;
    color: ${baseColors.GREY_ONE};
  }
`

export const TargetProduct = styled.div`
  & .product {
    &__name {
      font-size: 20px;
      font-weight: 600;
      color: ${baseColors.BLUE_FIVE};
      margin: 0;
    }

    &__alias {
      font-size: 14px;
      color: ${baseColors.GREY_ONE};
      margin: 0 0 8px;
    }

    &__phase {
      font-size: 14px;
      color: ${baseColors.GREY_ONE};
      margin: 8px 0 0;
    }
  }
`
