import { HandlerFunc, MessageBus } from './message-bus';
import { HandlerRegistry } from './registry';

export interface CommandHandler<TCommand, TResult> {
    execute(cmd: TCommand): TResult;
}

export class CommandBus extends MessageBus {
    public constructor(
        private readonly registry: HandlerRegistry<CommandHandler<any, any>>
    ) {
        super();
    }

    public execute<TCommand, TResult>(cmd: TCommand): TResult {
        const handler = this.registry.locate(cmd);
        let result: TResult;
        const handlerFn: HandlerFunc = <TMsg, TResult>(msg: TMsg): TResult => {
            result = handler.execute(msg);

            return null;
        };

        this.handle<TCommand>(cmd, handlerFn);
        return result;
    }
}
