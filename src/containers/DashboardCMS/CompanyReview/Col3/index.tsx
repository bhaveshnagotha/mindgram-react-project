import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setModify as setModifyAction } from '../../../../redux/CMS/DealsCMS'
import { CompanySearch } from './CompanySearch'
import { modifySelector } from '../../../../redux/CMS/DealsCMS/selectors'
import { companySelector } from '../../../../redux/CMS/CompanyReviewCMS'
import Products from './Products'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0px;
  height: 100%;
  padding: 5px;
  overflow-y: auto;
`

interface ReduxProps {
  selectedCompany: any
  modify: any
}

const Col3Content = (props: ReduxProps) => {
  const { selectedCompany, modify } = props
  const [company, setCompany] = useState<any>(selectedCompany)
  const [render, setRender] = useState<boolean>(false)

  return (
    <Container>
      <div>
        <CompanySearch
          baseUrl={'/v1/company-search'}
          initial={[company]}
          onCompanyChange={(tcomp: any) => {
            setCompany(tcomp)
            // console.log('compch', render)
            setRender(!render)
          }}
          disabled={modify}
        />
      </div>
      <strong style={{ marginBottom: 10 }}>Products:</strong>
      <div style={{ flexGrow: 1 }}>
        <Products
          company_type_id={company?.company_type + company?.company_id}
          render={render}
        />
      </div>
    </Container>
  )
}

const mapDispatchToProps = {
  setModify: setModifyAction,
}

function mapStateToProps(state: object) {
  return {
    selectedCompany: companySelector(state),
    modify: modifySelector(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Col3Content)
