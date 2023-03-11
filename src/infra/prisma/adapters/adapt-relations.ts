import {
  IAvailableModelsWithColumns,
  IRelationsClauseOption
} from "@/app/contracts/repositories/common/i-relations-clause-option";

export function adaptRelations<
  T extends keyof IAvailableModelsWithColumns
>(withClause: IRelationsClauseOption<T>) {
  const adaptedObject = {};

  for (const [model, options] of Object.entries(withClause) as any) {
    Object.assign(adaptedObject, {
      [model]: typeof options === 'boolean' ? options : {
        select: options.fields.reduce((accumulator: object, field: string) => {
          return Object.assign(accumulator, {
            [field]: true
          });
        }, {}),
      }
    });
  }

  return adaptedObject;
}
