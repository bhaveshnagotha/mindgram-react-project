import { nodeColors } from '../../../../../constants/colors'

export const NODE_TYPES = {
  pacerCase: 'pacerCase',
  ptabTrial: 'ptabTrial',
  root: 'root',
}

export const NODE_COLOR_MAPPING = {
  [NODE_TYPES.pacerCase]: {
    strokeColor: nodeColors.BLUE_FOUR,
  },
  [NODE_TYPES.ptabTrial]: {
    strokeColor: nodeColors.AFFAIR_ONE,
  },
  [NODE_TYPES.root]: {
    strokeColor: nodeColors.BLUE_THREE,
  },
}
