import { CatchClause, DoStatement, IfStatement, Node, TryStatement } from 'ts-morph';

export type ProcessableStatement = CatchClause | DoStatement | IfStatement | TryStatement;

export const isProcessableStatement = (statement: Node): statement is ProcessableStatement =>
    Node.isIfStatement(statement) ||
    Node.isDoStatement(statement) ||
    Node.isTryStatement(statement) ||
    Node.isCatchClause(statement);

export const isTypeOf = <T>(instance: T): instance is T =>
    Object.keys(instance).every((property) => property in instance);

export const isInstanceOf = <T>(instance: T, properties?: string[]): instance is T =>
    properties ? properties.every((property) => property in instance) : isTypeOf(instance);
