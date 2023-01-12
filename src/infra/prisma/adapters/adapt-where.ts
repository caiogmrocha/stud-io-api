import { IWhereClauseOption } from "@/app/contracts/repositories/common/i-where-clause-option";

export function adaptWhere<
  IInternalDatabaseModel = any,
  IPrismaWhereInput = {}
>(where: IWhereClauseOption<IInternalDatabaseModel>[] = []): IPrismaWhereInput {
  let adaptedWhere = {} as IPrismaWhereInput;

  if (where && where.length > 0) {
    for (let [ column, operator, value ] of where) {
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

          break;
      }
    }
  }

  return adaptedWhere;
}
