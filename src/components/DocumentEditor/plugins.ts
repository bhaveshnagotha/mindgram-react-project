function MarkHotKey(options: any) {
  const { type, key } = options
  return {
    onKeyDown(event: any, change: any) {
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key !== key) {
        return
      }

      // Prevent the default characters from being inserted.
      event.preventDefault()
      // Toggle the mark `type`.
      change.toggleMark(type)
    },
  }
}

export default MarkHotKey
