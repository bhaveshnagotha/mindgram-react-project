import React from 'react'
import Left from './Left'
import MiddleRoutes from './Middle'
import HamburgerMenu from '../../components/HamburgerMenu'
import { useLocation, useRouteMatch } from 'react-router-dom'

export interface ITrialDoc {
  id: number
  company: {
    name: string
    ticker: string
    type: string
    id: number
  }
  conditions: string[]
  date: Date
  products: string[]
  source: string
  title: string
  url: string
}

const TherapeuticAreas = () => {
  const baseProps = {}

  const leftProps = {
    ...baseProps,
  }

  const middleProps = {
    ...baseProps,
  }

  const { path } = useRouteMatch()
  const urlPath = useLocation().pathname
  const onlyNumbers = /^\d+$/

  return (
    <div style={{ marginLeft: 5 }}>
      <HamburgerMenu
        Left={Left}
        leftProps={leftProps}
        Middle={MiddleRoutes}
        middleProps={middleProps}
        isLeftPaneStatic={
          onlyNumbers.test(
            urlPath.substring(urlPath.indexOf(path + '/') + path.length + 1)
          ) || path === urlPath
        }
      />
    </div>
  )
}

export default TherapeuticAreas
