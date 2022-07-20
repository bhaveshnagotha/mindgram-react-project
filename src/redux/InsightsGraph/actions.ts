import { insightsGraphKey } from './constants'

export const HANDLE_NODE_CLICK = `${insightsGraphKey}/HANDLE_NODE_CLICK`

export function handleNodeClick(node: object) {
  return {
    payload: node,
    type: HANDLE_NODE_CLICK,
  }
}
