// @flow
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Loading from '../../components/Loading'
import { logout as logoutAction } from '../../redux/Auth'

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`

function UnconnectedLogout({ logout }: { logout: () => void }) {
  useEffect(() => {
    logout()
  })

  return (
    <ContainerLoading>
      <Loading />
    </ContainerLoading>
  )
}

export default connect(null, {
  logout: logoutAction,
})(UnconnectedLogout)
