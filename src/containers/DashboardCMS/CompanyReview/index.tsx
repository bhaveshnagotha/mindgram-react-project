import React from 'react'
import styled from 'styled-components'
import { uniqueId } from 'lodash'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { dealOutboxIdSelector } from '../../../redux/CMS/DealsCMS/selectors'
import { connect } from 'react-redux'
import CompanyList from './Col1/CompanyList'

import Col3Content from './Col3'
import Col2Content from './Col2'

import {
  setCompany as setCompanyAction,
  setModify as setModifyAction,
} from '../../../redux/CMS/CompanyReviewCMS'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  height: 90vh;
  overflow: hidden;
`

const Col1 = styled.div`
  border: 1px solid black;
  height: 100%;
  overflow: hidden;
`
const Col2 = styled.div`
  border: 1px solid black;
  height: 100%;
  overflow: hidden;
`
const Col3 = styled.div`
  border: 1px solid black;
  height: 100%;
  overflow: hidden;
`

const generateUniqueKey = () => `child_${uniqueId()}`

const CompanyReview = (props) => {
  const [childKey, setChildKey] = React.useState(generateUniqueKey())
  const resetHeadlines = () => {
    setChildKey(generateUniqueKey())
    props?.setCompany(null)
  }
  return (
    <Container className="p-3">
      <Col1>
        <CompanyList key={childKey} />
      </Col1>
      <Col2>
        <Col2Content resetHeadlines={resetHeadlines} />
      </Col2>
      <Col3>
        <Col3Content />
      </Col3>
      <ToastContainer />
    </Container>
  )
}

const mapDispatchToProps = {
  setCompany: setCompanyAction,
  setModify: setModifyAction,
}

function mapStateToProps(state: object) {
  return {
    dealOutboxId: dealOutboxIdSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyReview)
