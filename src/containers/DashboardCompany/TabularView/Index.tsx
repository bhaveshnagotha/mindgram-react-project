import { History } from 'history'
import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import { IMatch } from '..'
import Card from '../../../components/Card'
import theme from '../../../theme'
import Header from '../header'
import ActiveIprProceedingsInfo from './ActiveIprProceedingsInfo'
import CompanyInfo from './CompanyInfo'
import PatentsInfo from './PatentsInfo'
import ProductsInfo from './ProductsInfo'
import TerminatedIprProceedingsInfo from './TerminatedIprProceedingsInfo'

function TabularView({
  history,
  match,
  onSwitchView,
  isTreeViewActive,
  isDataLoading,
  patentData,
  activeIprInfoData,
  terminatedIprInfoData,
  productInfoData,
  companyInfoData,
}: {
  history: History
  match: IMatch
  onSwitchView: (d) => void
  isTreeViewActive: boolean
  isDataLoading: boolean
  patentData: string[][]
  activeIprInfoData: string[][]
  terminatedIprInfoData: string[][]
  productInfoData: string[][]
  companyInfoData: any
}) {
  return (
    <Fragment>
      <Row className="mt-4">
        <Col md={{ span: 12 }}>
          <Card padding="20px" boxShadow={theme.boxShadow}>
            <Header
              history={history}
              match={match}
              onSwitchView={(d) => onSwitchView(d)}
              isTreeViewActive={isTreeViewActive}
            />
            <CompanyInfo
              isDataLoading={isDataLoading}
              companyInfoData={companyInfoData}
            />
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6 }}>
          <Card height="400px" boxShadow={theme.boxShadow}>
            <ProductsInfo
              isDataLoading={isDataLoading}
              productInfoData={productInfoData}
            />
          </Card>
        </Col>
        <Col md={{ span: 6 }}>
          <Card height="400px" boxShadow={theme.boxShadow}>
            <PatentsInfo
              isDataLoading={isDataLoading}
              patentData={patentData}
            />
          </Card>
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col md={{ span: 6 }}>
          <Card height="400px" boxShadow={theme.boxShadow}>
            <ActiveIprProceedingsInfo
              activeIprInfoData={activeIprInfoData}
              isDataLoading={isDataLoading}
            />
          </Card>
        </Col>
        <Col md={{ span: 6 }}>
          <Card height="400px" boxShadow={theme.boxShadow}>
            <TerminatedIprProceedingsInfo
              terminatedIprInfoData={terminatedIprInfoData}
              isDataLoading={isDataLoading}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default TabularView
