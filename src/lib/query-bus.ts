import { HandlerFunc, MessageBus } from './message-bus';
import { HandlerRegistry } from './registry';

export interface QueryHandler<TQuery, TResult> {
    query(query: TQuery): TResult;
}

export class QueryBus extends MessageBus {
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

