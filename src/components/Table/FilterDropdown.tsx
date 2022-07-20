import React from 'react'

import { baseColors } from '../../constants/colors'
import { Box } from '../../primitives/box'
import Dropdown, { IValue } from '../Dropdown'

interface IFilterDropdownProps {
  onFilter: (value: string) => void
  filterOptions: IValue[]
  selected: string
  isDisabled?: boolean
}
interface IFilterDropdownState {
  selected: string
}
class FilterDropdown extends React.Component<
  IFilterDropdownProps,
  IFilterDropdownState
> {
  constructor(props: IFilterDropdownProps) {
    super(props)

    this.state = {
      selected: props.selected,
    }
  }

  public render() {
    const { filterOptions, isDisabled } = this.props

    return (
      <Box position="relative" background={isDisabled && baseColors.GREY_LIGHT}>
        <Dropdown
          showCarat={false}
          values={filterOptions}
          value={this.state.selected}
          onSelect={this.handleSelect}
          width={null}
          icon="filter"
          isDisabled={isDisabled}
          left
        />
      </Box>
    )
  }

  private handleSelect = (selected: string) => {
    if (this.state.selected !== selected) {
      this.setState({ selected }, () => this.props.onFilter(selected))
    }
  }
}

export default FilterDropdown
