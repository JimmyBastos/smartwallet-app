export default function getValidationErrors (error) {
  const validationErrors = error.inner.reduce(
    (result, exception) => {
      result[exception.path] = exception.message
      return result
    }, {})

  return validationErrors
}
