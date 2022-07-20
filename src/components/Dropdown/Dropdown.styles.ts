import styled from 'styled-components'

import { baseColors } from '../../constants/colors'
import { Box } from '../../primitives'
import theme from '../../theme'

const boxShadow = `0 6px 18px 0 ${baseColors.GREY_LIGHT}`

export const Container = styled(Box)`
  float: left;
  height: 100%;
  width: ${(props: { width: number | null }) =>
    props.width ? `${props.width}px` : 'auto'};
  font-family: ${theme.fonts.sourceSansPro};
`

export const ContainerHeader = styled(Box)<{ isDisabled?: boolean }>`
  background: ${(props) =>
    props.isDisabled ? baseColors.GREY_LIGHT : baseColors.WHITE};
  cursor: ${(props) => (props.isDisabled ? '' : 'pointer')};
  height: 35px;
  padding: 7px 14px;
  width: 100%;
  outline: 0;
  border-radius: ${(props: { isListOpen: boolean }) =>
    props.isListOpen ? '10px 10px 0 0' : '0'};
  box-shadow: ${(props) => (props.isListOpen ? boxShadow : 'none')};
  font-family: ${theme.fonts.sourceSansPro};
`

export const ContainerHeaderText = styled(Box)`
  float: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
  font-family: ${theme.fonts.sourceSansPro};
  transition: all ease-in 100ms;
  color: ${(props: { isListOpen: boolean; hasValue: boolean }) =>
    props.isListOpen || props.hasValue
      ? theme.colors.darkPurple
      : theme.colors.gray};

  span {
    color: ${(props) =>
      props.isListOpen || props.hasValue
        ? theme.colors.darkPurple
        : theme.colors.gray};
  }

  &:hover {
    transition: all ease-in 200ms;
    color: ${(props) =>
      props.isListOpen || props.hasValue
        ? theme.colors.darkPurple
        : theme.colors.purple};

    span {
      color: ${(props) =>
        props.isListOpen || props.hasValue
          ? theme.colors.darkPurple
          : theme.colors.purple};
    }
  }
`

export const ContainerIcon = styled(Box)`
  float: right;
  width: 10%;
  margin-left: 0.7rem;
  color: ${(props: { isListOpen: boolean }) =>
    props.isListOpen ? theme.colors.darkPurple : baseColors.GREY_DARKER};
`

interface IContainerListProps {
  left: boolean
  height: null | number
}
export const ContainerList = styled.ul<IContainerListProps>`
  /* border-radius: ${(props) =>
    props.left ? '16px 0 16px 16px' : '0 16px 16px 16px'}; */
  border-radius: 16px; 
  box-shadow: 0 8px 11px ${baseColors.GREY_LIGHT};
  box-sizing: border-box;
  background: white;
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  max-height: 800px;
  list-style: none;
  margin-top: 0px;
  overflow-y: auto;
  padding: 5px 10px 2px 10px;
  position: absolute;
  z-index: 1000;
  
  display: flex;
  flex-flow: column nowrap;

  min-width: 300px;
  right: ${(props) => (props.left ? '0' : 'auto')};
`

export const ContainerItem = styled.li`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  border-radius: 16px;
  box-sizing: border-box;
  cursor: pointer;
  height: auto;
  overflow-x: hidden;
  padding: 7px 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  color: ${(props: { selected: boolean }) =>
    props.selected ? theme.colors.darkPurple : baseColors.GREY_DARKER};
  background: white;
  transition: all ease-in 100ms;
  font-weight: 600;
  user-select: none;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    transition: all ease-in 200ms;
    color: ${baseColors.WHITE};
    background: ${theme.colors.darkPurple};
    > div > label > span {
      border-color: ${baseColors.WHITE};
    }
  }
`
