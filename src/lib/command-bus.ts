import { HandlerRegistry } from './registry';
import { HandlerFunc, MessageBus } from './message-bus';

export interface CommandHandler<TCommand, TResult> {
    execute(cmd: TCommand): TResult | void;
}

export class CommandBus extends MessageBus {
    public constructor(
        private readonly registry: HandlerRegistry<CommandHandler<any, any>>
    ) {
        super();
    }

    public execute<TCommand, TResult>(cmd: TCommand): TResult | void {
        const handler = this.registry.locate(cmd);
        const handlerFn: HandlerFunc = <TMsg, TResult>(msg: TMsg): TResult => {
            handler.execute(msg);

            return null;
        };

        this.handle<TCommand>(cmd, handlerFn);
    }
}
