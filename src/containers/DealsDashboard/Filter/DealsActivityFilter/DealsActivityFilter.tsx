import * as React from 'react'
import { useState } from 'react'
import { Popover } from '@material-ui/core'
import { IndicationSearch } from './IndicationSearch'
import { Collapse } from 'react-bootstrap'
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons'
import { baseColors } from '../../../../constants/colors'
import { RoundFilter } from './RoundFilter'
import { IDealsFilterData, IFilterChangeProps } from '../../Header'
import { ModalityFilter } from './ModalityFilter'
import { TargetSearch } from './TargetSearch'
import { StageFilter } from './StageFilter'
import { InvestorSearch } from './InvestorSearch'
import { DealsButton } from '../../index'
import { CompanySearch } from './CompanySearch'

export interface IDealsActivityFilterChangeProps {
  days: string
}

interface IProps {
  filters: IDealsFilterData
  applyFilters: () => void
}

export const MAX_SELECT_MENU_HEIGHT = 200

export function DealsActivityFilter(props: IFilterChangeProps & IProps) {
  const { applyFilters } = props
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return (
    <>
      <DealsButton onClick={handleClick} style={{}}>
        <span>Filters</span>
      </DealsButton>
      <Popover
        // open={true}
        open={open}
        anchorOrigin={{
          // vertical: 'top',
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <div
          style={{
            height: 400,
            width: 400,
            display: 'flex',
            flexFlow: 'column',
            gap: 20,
            padding: 20,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div>Filters</div>
            <DealsButton
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                applyFilters()
                setAnchorEl(null)
              }}
            >
              Apply Filters
            </DealsButton>
          </div>
          <div
            style={{
              overflow: 'auto',
              display: 'flex',
              flexFlow: 'column',
              gap: 20,
              paddingRight: 10,
              flex: 1,
              paddingBottom: 100,
            }}
          >
            <FilterItem title={'Company Search'}>
              <CompanySearch
                onChange={props?.handleFilterChange}
                initialCompanies={props?.filters?.companies}
              />
            </FilterItem>
            <FilterItem title={'Indication Search'}>
              <IndicationSearch
                onChange={props?.handleFilterChange}
                initialIndications={props?.filters?.conditions}
              />
            </FilterItem>
            <FilterItem title={'Round'}>
              <RoundFilter
                initialRounds={props?.filters?.rounds}
                onChange={props?.handleFilterChange}
              />
            </FilterItem>
            <FilterItem title={'Modality'}>
              <ModalityFilter
                onChange={props?.handleFilterChange}
                initialValues={props?.filters?.modalities}
              />
            </FilterItem>
            <FilterItem title={'Target'}>
              <TargetSearch
                onChange={props?.handleFilterChange}
                initialTargets={props?.filters?.targets}
              />
            </FilterItem>
            <FilterItem title={'Stage'}>
              <StageFilter
                onChange={props?.handleFilterChange}
                initialValues={props?.filters?.stages}
              />
            </FilterItem>
            <FilterItem title={'Investors'}>
              <InvestorSearch
                onChange={props?.handleFilterChange}
                initialInvestors={props?.filters?.investors}
              />
            </FilterItem>
          </div>
        </div>
      </Popover>
    </>
  )
}

export const FilterItem = (props) => {
  const { children } = props
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          userSelect: 'none',
          marginBottom: open ? 5 : 0,
        }}
      >
        <div style={{}}>{props?.title}</div>
        <div style={{ marginLeft: 'auto' }}>
          {!open ? <ChevronRight /> : <ChevronDown />}
        </div>
      </div>
      <Collapse in={open} timeout={10}>
        <div style={{ backgroundColor: baseColors.GREY_DARK }}>{children}</div>
      </Collapse>
    </div>
  )
}
