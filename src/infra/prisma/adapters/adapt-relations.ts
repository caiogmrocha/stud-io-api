import {
  IAvailableModelsWithColumns,
  IRelationsClauseOption
} from "@/app/contracts/repositories/common/i-relations-clause-option";

export function adaptRelations<
  T extends keyof IAvailableModelsWithColumns
>(withClause: IRelationsClauseOption<T>) {
  const adaptedObject = {};

  for (const [model, options] of Object.entries(withClause)) {
    const { fields } = options as { fields: string[] };

    Object.assign(adaptedObject, {
      [model]: fields.includes('*') ? true : {
        select: fields.reduce((accumulator, field) => {
          return Object.assign(accumulator, {
            [field]: true
          });
        }, {}),
      }
    });
  }

  return adaptedObject;
}
