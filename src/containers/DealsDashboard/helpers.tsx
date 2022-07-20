export function convertNumber(labelValue) {
  const num = Number(labelValue)
  if (!labelValue || !num) {
    return '0'
  }
  const toFixed = (n: number, d: number): number => {
    return +(Math.round(Number(n + 'e+' + d)) + 'e-' + d)
  }
  const sign = Math.sign(num)
  const absVal = Math.abs(num)
  const numDecimals = 1
  const value =
    absVal >= 1.0e9
      ? toFixed(sign * (absVal / 1.0e9), numDecimals) + 'B'
      : absVal >= 1.0e6
      ? toFixed(sign * (absVal / 1.0e6), numDecimals) + 'M'
      : absVal >= 1.0e3
      ? toFixed(sign * (absVal / 1.0e3), numDecimals) + 'K'
      : labelValue
  return value
  // return roundedValue
}
