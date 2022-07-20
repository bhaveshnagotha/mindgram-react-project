import { useEffect, useState } from 'react'

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    return function cleanup() {
      clearTimeout(handler)
    }
  }, [delay, value])

  return debouncedValue
}

export { useDebounce }
