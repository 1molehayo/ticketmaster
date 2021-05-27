export const formatNumberWithComa = (value) => {
  if (!value) {
    return
  }
  const arr = `${value}`.split('.')
  const formatted = `${arr[0]}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)

  if (arr[1]) {
    return `${formatted}.${arr[1]}`
  }

  return formatted
}

export const isArrayEmpty = (arr) => !arr || arr.length === 0

export const isObjectEmpty = (obj) => {
  if (!obj) {
    return true
  }

  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }

  return true
}
