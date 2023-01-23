export class BCryptCompareError extends Error {
  public readonly comparable: Buffer;
  public readonly comparing: Buffer;

  constructor (comparable: string, comparing: string) {
    const formattedComparable = comparable.length > 15 ? `${comparable.substring(0, 15)}..` : comparable;
    const formattedComparing = comparing.length > 15 ? `${comparing.substring(0, 15)}..` : comparing;

    super(`Não foi possível fazer uma comparação entre os valores: "${formattedComparable}" e "${formattedComparing}"`);

    this.comparable = Buffer.from(comparable);
    this.comparing = Buffer.from(comparing);
    this.name = 'BCryptCompareError';
  }
}
