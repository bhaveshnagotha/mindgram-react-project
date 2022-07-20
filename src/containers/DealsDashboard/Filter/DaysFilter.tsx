import * as React from 'react'
import { useState } from 'react'
import { CaretDownFill } from 'react-bootstrap-icons'
import { List, ListItem, makeStyles, Popover } from '@material-ui/core'
import styled from 'styled-components'
import { IFilterChangeProps } from '../Header'

const StyledListItem = styled(ListItem)`
  // font-size: 9;
`
const useStyles = makeStyles({
  listItemText: {
    fontSize: '.8em', // Insert your required size
  },
})

interface IProps {
  initialDays: number
}

export const DAYS_TRANSLATE = {
  7: 'Last Week',
  30: 'Last Month',
  90: 'Last 3 Months',
  180: 'Last 6 Months',
  365: 'Last 1 Year',
  730: 'Last 2 Years',
}

export function DaysFilter(props: IFilterChangeProps & IProps) {
  const classes = useStyles()
  const [days, setDays] = useState<number>(props?.initialDays)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const items = [7, 30, 90, 180, 365, 730]
  return (
    <>
      <div onClick={handleClick}>
        <span>
          {days in DAYS_TRANSLATE ? DAYS_TRANSLATE[days] : `${days} days`}{' '}
        </span>
        <CaretDownFill />
      </div>
      <Popover
        open={open}
        anchorOrigin={{
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
        <div>
          <List>
            {items.map((val, index) => {
              const translateTo: string = DAYS_TRANSLATE[val]
              return (
                <StyledListItem
                  key={index}
                  onClick={() => {
                    setDays(val)
                    props.handleFilterChange({
                      key: 'days',
                      value: val?.toString(),
                    })
                  }}
                  button
                  className={classes.listItemText}
                >
                  {translateTo}
                </StyledListItem>
              )
            })}
          </List>
        </div>
      </Popover>
    </>
  )
}
