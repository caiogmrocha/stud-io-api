import { IConditionalOperators } from "./i-conditional-operators";

/**
 * This is used to generically typing the internal where
 * clause standard for "get" method of repositories.
 *
 * @member {String} column  model property or table column
 * @member {String} operator conditional operator
 * @member {Any} value available values
 *
 * @param {Object} M - generic data source model
 */
export type IWhereClauseOption<M> = [
  column: keyof M,
  operator: IConditionalOperators,
  value: M[keyof M],
];
