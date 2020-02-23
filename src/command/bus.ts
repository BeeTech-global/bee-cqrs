import { HandlerRegistry } from '../registry/registry';
import { HandlerFunc, MessageBus } from '../message/bus';

export interface CommandHandler<TCommand> {
    execute(cmd: TCommand): void;
}

export class CommandBus extends MessageBus {
    public constructor(
        private readonly registry: HandlerRegistry<CommandHandler<any>>
    ) {
        super();
    }

    public execute<T>(cmd: T): void {
        const handler = this.registry.locate(cmd);
        const handlerFn: HandlerFunc = <TMsg, TResult>(msg: TMsg): TResult | null => {
            handler.execute(msg);

            return null;
        };

        this.handle<T>(cmd, handlerFn);
    }
}
