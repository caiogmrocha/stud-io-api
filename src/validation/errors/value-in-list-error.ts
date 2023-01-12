export class ValueInListError extends Error {
  constructor (fieldName: string, validValues: Array<any>) {
    super(`O campo "${fieldName}" precisa estar entre os valores: ${validValues.join(', ')}.`);
    this.name = 'ValueInListError';
  }
}
