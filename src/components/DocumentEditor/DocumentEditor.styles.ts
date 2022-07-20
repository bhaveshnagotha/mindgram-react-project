import styled from 'styled-components'

import { baseColors } from '../../constants/colors'

const TableCell = styled.td`
  border: 1px solid ${baseColors.GREY_DARK};
  padding: 10px;
`

const TableBlob = styled.div`
  margin-top: 10px;
`

const TableParagraph = styled.div`
  margin-top: 10px;
`

export { TableBlob, TableCell, TableParagraph }
