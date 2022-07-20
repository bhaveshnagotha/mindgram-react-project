import { baseColors } from '../../constants/colors'

const NODE_TYPES = Object.freeze({
  blue: 'blue',
  green: 'green',
  lightBlue: 'lightBlue',
  maroon: 'maroon',
  peach: 'peach',
  root: 'root',
})

export const mockData = {
  children: [
    {
      children: [
        { name: 'Son of A', nodeType: NODE_TYPES.green },
        {
          name: 'Daughter of sdasdasdasdasdasdasdsad',
          nodeType: NODE_TYPES.green,
        },
      ],
      hasNodeTextClick: true,
      name: 'Level 2: A',
      nodeType: NODE_TYPES.green,
    },
    { name: 'Level 2: B', nodeType: NODE_TYPES.peach, hasDetailsClick: true },
  ],
  hasDetailsClick: true,
  hasNodeTextClick: true,
  helperText: 'Test text',
  id: 1,
  name: 'Root Node',
  nodeType: NODE_TYPES.root,
}

export const deeplyNestedMockData = {
  children: [
    {
      children: [
        { name: 'Son of A', nodeType: NODE_TYPES.blue },
        { name: 'Daughter of A', nodeType: NODE_TYPES.blue },
      ],
      hasNodeTextClick: true,
      name: 'Level 2: A',
      nodeType: NODE_TYPES.blue,
    },
    {
      children: [
        { name: 'Son of B', nodeType: NODE_TYPES.maroon },
        { name: 'Daughter of B', nodeType: NODE_TYPES.maroon },
      ],
      name: 'Level 2: B',
      nodeType: NODE_TYPES.peach,
    },
    {
      children: [
        {
          children: [
            { name: 'Son of C - A', nodeType: NODE_TYPES.green },
            { name: 'Daughter of C - A', nodeType: NODE_TYPES.green },
          ],
          name: 'Son of C',
          nodeType: NODE_TYPES.lightBlue,
        },
        {
          children: [
            {
              children: [
                {
                  hasDetailsClick: true,
                  helperText: 'Test text',
                  name: 'Son of C - B - A',
                  nodeType: NODE_TYPES.green,
                },
                { name: 'Daughter of C - B - A', nodeType: NODE_TYPES.green },
              ],
              name: 'Son of C - B',
              nodeType: NODE_TYPES.maroon,
            },
            {
              children: [
                {
                  children: [
                    {
                      name: 'Son of C - B - B - A',
                      nodeType: NODE_TYPES.lightBlue,
                    },
                    {
                      name: 'Daughter of C - B - A',
                      nodeType: NODE_TYPES.lightBlue,
                    },
                  ],
                  name: 'Son of C - B - B',
                  nodeType: NODE_TYPES.peach,
                },
                { name: 'Daughter of C - B - B', nodeType: NODE_TYPES.peach },
              ],
              name: 'Daughter of C - B',
              nodeType: NODE_TYPES.maroon,
            },
          ],
          name: 'Daughter of C',
          nodeType: NODE_TYPES.lightBlue,
        },
      ],
      hasDetailsClick: true,
      id: 2,
      name: 'Level 2: C',
      nodeType: NODE_TYPES.lightBlue,
    },
    {
      children: [
        {
          children: [
            { name: 'Son of D - A', nodeType: NODE_TYPES.lightBlue },
            { name: 'Daughter of D - A', nodeType: NODE_TYPES.lightBlue },
          ],
          name: 'Son of D',
          nodeType: NODE_TYPES.green,
        },
        { name: 'Daughter of D', nodeType: NODE_TYPES.green },
      ],
      hasNodeTextClick: true,
      helperText: 'Test text',
      name: 'Level 2: D',
      nodeType: NODE_TYPES.green,
    },
  ],
  hasDetailsClick: true,
  helperText: 'Test text',
  id: 1,
  name: 'Root Node',
  nodeType: NODE_TYPES.root,
}

export const NODE_COLOR_MAPPING = {
  [NODE_TYPES.peach]: {
    fillColor: baseColors.PEACH_TWO,
    strokeColor: baseColors.PEACH_ONE,
  },
  [NODE_TYPES.green]: {
    fillColor: baseColors.GREEN_THREE,
    strokeColor: baseColors.GREEN_TWO,
  },
  [NODE_TYPES.root]: {
    fillColor: baseColors.YELLOW_TWO,
    strokeColor: baseColors.YELLOW_ONE,
  },
  [NODE_TYPES.maroon]: {
    fillColor: baseColors.MAROON_TWO,
    strokeColor: baseColors.MAROON_ONE,
  },
  [NODE_TYPES.lightBlue]: {
    fillColor: baseColors.BLUE_THREE,
    strokeColor: baseColors.BLUE_TWO,
  },
  [NODE_TYPES.blue]: {
    fillColor: baseColors.SELECTED,
    strokeColor: baseColors.PRIMARY,
  },
}
