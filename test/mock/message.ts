import { HandlerFunc, MessageBus } from '../../src/message-bus';

export class Message {
    public constructor(
        public count: number = 0
    ) {}
}

export class StubMessageBus extends MessageBus {
    public execute<TMsg>(message: TMsg, handler: HandlerFunc): void {
        return this.handle(message, handler);
    }
}
