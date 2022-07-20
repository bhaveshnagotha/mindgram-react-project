import format from 'date-fns/format'

function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const formatDate = (date: any, dateFormat: string) => {
  let newDate
  const today = new Date()
  const yesterDay = new Date(new Date().setDate(today.getDate() - 1))

  // `new Date(..)` ends up giving us the date in the local timezone.
  // Since all the datetime values that the server returns are in UTC,
  // we need to extract the UTC values.
  const receivedDateLocalTZ = new Date(date)
  const receivedDateUTC = {
    date: receivedDateLocalTZ.getUTCDate(),
    month: receivedDateLocalTZ.getUTCMonth(),
    year: receivedDateLocalTZ.getUTCFullYear(),
  }
  if (
    receivedDateUTC.date === today.getDate() &&
    receivedDateUTC.month === today.getMonth() &&
    receivedDateUTC.year === today.getFullYear()
  ) {
    newDate = 'Today'
  } else if (
    receivedDateUTC.date === yesterDay.getDate() &&
    receivedDateUTC.month === yesterDay.getMonth() &&
    receivedDateUTC.year === yesterDay.getFullYear()
  ) {
    newDate = 'Yesterday'
  } else {
    newDate = format(
      new Date(
        receivedDateUTC.year,
        receivedDateUTC.month,
        receivedDateUTC.date
      ),
      dateFormat
    )
  }
  return newDate
}

export default isEmptyObject
