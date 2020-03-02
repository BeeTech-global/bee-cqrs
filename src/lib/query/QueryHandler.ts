export default interface QueryHandler<TQuery, TResult> {
  query(query: TQuery): TResult;
}
