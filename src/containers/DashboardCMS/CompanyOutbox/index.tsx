import React from 'react'
import styled from 'styled-components'
import Headlines from './Col1/Headlines'
import Col2Content from './Col2'
import Col3Content from './Col3'
import { uniqueId } from 'lodash'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  dealOutboxIdSelector,
  setHeadline as setHeadlineAction,
} from '../../../redux/CMS/CompanyOutboxCMS'
import { connect } from 'react-redux'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
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

const CompanyOutbox = (props) => {
  const [childKey, setChildKey] = React.useState(generateUniqueKey())
  const resetHeadlines = () => {
    setChildKey(generateUniqueKey())
    props?.setHeadline(null)
  }
  return (
    <Container className="p-3">
      <Col1>
        <Headlines key={childKey} />
      </Col1>
      <Col2>
        <Col2Content resetHeadlines={resetHeadlines} />
      </Col2>
      <Col3>
        <Col3Content resetHeadlines={resetHeadlines} />
      </Col3>
      <ToastContainer />
    </Container>
  )
}

const mapDispatchToProps = {
  setHeadline: setHeadlineAction,
}

function mapStateToProps(state: object) {
  return {
    dealOutboxId: dealOutboxIdSelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOutbox)
