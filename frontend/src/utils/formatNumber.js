const formatNumber = (number) => {
  if (typeof number !== 'number') return '0'
  return number.toLocaleString('es-CL')
}
export default formatNumber
