import * as React from 'react'
import { Form } from 'react-bootstrap'
import { IDealsFilterData } from '../../Header'

export const ROUNDS = [
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Series D',
  'Series E',
  'Series F',
  'Series G',
  'Growth',
  'Pre-IPO',
  'Crossover',
  'PIPE',
  'Private Placement',
  'Follow-On',
  'Debt',
  'Grant',
  'Regulation A',
]
interface IProps {
  onChange: any
  initialRounds: IDealsFilterData['rounds']
}
export function RoundFilter(props: IProps) {
  return (
    <>
      <Form style={{ backgroundColor: 'white' }}>
        {ROUNDS?.map((r, i) => {
          const isChecked = props?.initialRounds[i]
          return (
            <Form.Label
              style={{
                margin: 0,
                padding: 0,
                width: '100%',
                cursor: 'pointer',
              }}
            >
              <Form.Check
                key={i}
                type={'checkbox'}
                id={r}
                label={r}
                // style={{cursor: 'pointer'}}
                checked={isChecked}
                onChange={() => {
                  const copy = props?.initialRounds.slice(0)
                  copy[i] = !copy[i]
                  props?.onChange({ key: 'rounds', value: copy })
                }}
              />
            </Form.Label>
          )
        })}
      </Form>
    </>
  )
}
