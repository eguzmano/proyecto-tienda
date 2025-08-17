const capitalize = (str) => {
  if (typeof str !== 'string') return ''
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export default capitalize
