export const generateGridTemplateColumns = fields => {
  return fields.reduce((accum, currentValue) => {
    if (typeof accum === 'object') {
      return `minmax(${accum.width || '200px'}, ${accum.width || '1fr'}) minmax(${currentValue.width || '200px'}, ${currentValue.width || '1fr'})`
    } else {
      return `${accum} minmax(${currentValue.width || '200px'}, ${currentValue.width || '1fr'})`
    }
  })
}

const TAKE_LIMIT = 5

export {
  TAKE_LIMIT
}
