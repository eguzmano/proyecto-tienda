const capitalize = (str) => {
  if (typeof str !== 'string') return '' // Si no es string, retorna cadena vacía
  return str
    .split(' ') // Divide la frase en palabras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
    .join(' ') // Une las palabras de nuevo
}

export default capitalize
