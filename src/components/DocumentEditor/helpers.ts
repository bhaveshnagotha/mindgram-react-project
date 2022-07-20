const INDENTATION_LEVELS = {
  one: {
    padding: '50px',
    value: 1,
  },
  three: {
    padding: '150px',
    value: 3,
  },
  two: {
    padding: '100px',
    value: 2,
  },
  zero: {
    padding: '0px',
    value: 0,
  },
}

const getBlockPadding = (indentation: number) => {
  if (indentation === INDENTATION_LEVELS.one.value) {
    return INDENTATION_LEVELS.one.padding
  }
  if (indentation === INDENTATION_LEVELS.two.value) {
    return INDENTATION_LEVELS.two.padding
  }
  if (indentation === INDENTATION_LEVELS.three.value) {
    return INDENTATION_LEVELS.three.padding
  }
  return INDENTATION_LEVELS.zero.padding
}

export default getBlockPadding
