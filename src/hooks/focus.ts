import { useEffect, useState } from 'react'

function useFocus(ref: React.RefObject<HTMLElement>) {
  const [isFocussed, setIsFocussed] = useState(false)

  function removeFocus() {
    setIsFocussed(false)
  }

  useEffect(() => {
    function listener(e: any) {
      if (ref.current && ref.current.contains(e.target)) {
        setIsFocussed(true)
        return
      }
      setIsFocussed(false)
    }
    document.addEventListener('mousedown', listener, false)

    return function cleanup() {
      document.removeEventListener('mousedown', listener, false)
    }
  }, [ref])
  return { isMouseFocussed: isFocussed, removeMouseFocus: removeFocus }
}

export { useFocus }
