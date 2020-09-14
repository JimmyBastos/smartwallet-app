
/**
 * @brief Verifica se um dado valor é um cpf válido
 * @param {String} value
 * @returns {Boolean}
 *
 * @see http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
 */

const cpfValidator = value => {
  const SIZE = 11

  value = String(value).replace(/[^\d]/g, '')

  if (value.length !== SIZE) return false

  const fakeList = [...Array(SIZE)].map((val, idx) => idx.toString().repeat(SIZE))

  if (fakeList.includes(value)) return false

  var rest
  var sum = 0

  for (let i = 1; i <= 9; i++) { sum = sum + parseInt(value[i - 1], 10) * (SIZE - i) }

  rest = (sum * 10) % SIZE

  if ((rest === 10) || (rest === SIZE)) { rest = 0 }

  if (rest !== parseInt(value[9], 10)) { return false }

  sum = 0

  for (let i = 1; i <= 10; i++) { sum = sum + parseInt(value[i - 1], 10) * (12 - i) }

  rest = (sum * 10) % SIZE

  if ((rest === 10) || (rest === SIZE)) { rest = 0 }

  if (rest !== parseInt(value[10], 10)) { return false }

  return true
}

export default cpfValidator
