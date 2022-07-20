import styled from 'styled-components'

const InterventionDetailsElement = styled.form`
  display: table;
  > div {
    display: table-row;
  }

  div > label {
    display: table-cell;
    padding-bottom: 2em;
  }

  div > textarea {
    display: table-cell;
    padding-bottom: 1em;
  }
`

const FormField = styled.div`
  > textarea {
    vertical-align: middle;
  }
  > label {
    vertical-align: middle;
  }
  > input {
    vertical-align: middle;
  }
`
const Area = styled.textarea`
  wrap: soft;
  overflow-x: hidden;
  overflow-y: auto;
  resize: none;
  height: 3em;
`
const ClearElement = styled.div({
  clear: 'both',
})
export { FormField, InterventionDetailsElement, ClearElement, Area }
