import { IConditionalOperators } from "./i-conditional-operators";

export type IWhereClauseOption<M> = [
  keyof M,
  IConditionalOperators,
  M[keyof M],
];
