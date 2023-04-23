import { IWhereClauseOption } from "@/app/contracts/repositories/common/i-where-clause-option";

function snakeCaseToCamelCase(snakeCaseText: string): string {
	let camelCaseText = snakeCaseText;

	if (snakeCaseText.indexOf('_') > 0) {
		const camelCaseText = snakeCaseText
			.split('_')
			.map((word, index) => index !== 0 ? word[0].toUpperCase().concat(word.substring(1)) : word)
			.join('');

		return camelCaseText;
	}

	return camelCaseText;
}

export function adaptWhere<
  IInternalDatabaseModel = string,
  IPrismaWhereInput = {}
>(where: IWhereClauseOption<IInternalDatabaseModel>[] = []): IPrismaWhereInput {
  let adaptedWhere = {} as IPrismaWhereInput;

  if (where && where.length > 0) {
    for (let [ column, operator, value ] of where) {
			column = snakeCaseToCamelCase(column as string) as keyof IInternalDatabaseModel;

      switch (true) {
        case operator === '<':
          adaptedWhere = {
            ...adaptedWhere,
            [column]: {
              lt: value,
            }
          };

          break;

        case operator === '<=':
          adaptedWhere = {
            ...adaptedWhere,
            [column]: {
              lte: value,
            }
          };

          break;

        case operator === '=':
          adaptedWhere = {
            ...adaptedWhere,
            [column]: {
              equals: value,
            }
          };

          break;

        case operator === '>=':
          adaptedWhere = {
            ...adaptedWhere,
            [column]: {
              gte: value,
            }
          };

          break;

        case operator === '>':
          adaptedWhere = {
            ...adaptedWhere,
            [column]: {
              gt: value,
            }
          };
          break;

        case operator === '<>':
          adaptedWhere = {
            ...adaptedWhere,
            [column]: {
              not: value,
            }
          };

        case operator === 'in':
          adaptedWhere = {
            ...adaptedWhere,
            [column]: {
              in: value,
            }
          };

          break;
      }
    }
  }

  return adaptedWhere;
}
