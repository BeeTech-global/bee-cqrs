import HandlerFunc from '../message/HandlerFunc';
import HandlerRegistry from '../registry/HandlerRegistry';
import QueryHandler from './QueryHandler';
import MessageBus from '../message/MessageBus';

export default class QueryBus extends MessageBus {
  public constructor(
    private readonly registry: HandlerRegistry<QueryHandler<any, any>>
  ) {
    super();
  }

  public query<TQuery, TResult>(query: TQuery): TResult {
    const handler = this.registry.locate(query);
    let result: TResult;
    const handlerFn: HandlerFunc = <TMsg, TResult>(msg: TMsg): TResult => {
      result = handler.query(msg);

      return null;
    };

    this.handle<TQuery>(query, handlerFn);

    return result;
  }
}
