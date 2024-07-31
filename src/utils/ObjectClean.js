function removeEmptyKeys(obj) {
  const cleanObj = {}

  Object.keys(obj).forEach(key => {
    const value = obj[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedObj = removeEmptyKeys(value)
      if (Object.keys(nestedObj).length > 0) {
        cleanObj[key] = nestedObj
      }
    } else if (value !== null && value !== undefined && value !== '') {
      cleanObj[key] = value
    }
  })

  return cleanObj
}

export default removeEmptyKeys
