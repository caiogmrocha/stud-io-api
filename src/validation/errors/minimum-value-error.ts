export class MinimumValueError extends Error {
  constructor (fieldName: string, fieldValue: unknown, minimumValue: number) {
    if (Array.isArray(fieldValue)) {
      super(`O campo ${fieldName} deveria ter ${minimumValue} elementos.`)
    } else {
      switch (typeof fieldValue) {
        case 'string':
          super(`O campo ${fieldName} precisar ter, no mínimo, ${minimumValue} caracteres.`)
          break

        case 'number':
          super(`O campo ${fieldName} precisar ser maior que ${minimumValue}.`)
          break

        case 'object':
          super(`O campo ${fieldName} precisar ter ${minimumValue} propriedades.`)
          break

        default:
          super(`O campo ${fieldName} não é válido.`)
          break
      }
    }

    this.name = 'MinimumValueError'
  }
}
