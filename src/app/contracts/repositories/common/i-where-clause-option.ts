import { IConditionalOperators } from "./i-conditional-operators";

/**
 * This is used to generically typing the internal where
 * clause standard for "get" method of repositories.
 *
 * @interface IWhereClauseOption
 * @param {String} IWhereClauseOption.0 - model property or table column
 * @param {String} IWhereClauseOption.1 - conditional operator
 * @param {Any} IWhereClauseOption.2 - available values
 *
 * @param {Object} M - generic data source model
 */
export type IWhereClauseOption<M> = [
  keyof M,
  IConditionalOperators,
  M[keyof M],
];
