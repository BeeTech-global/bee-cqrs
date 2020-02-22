import { HandlerFunc, MessageBus } from '../../../src/message/bus';

class Message {
    public constructor(
        public count: number= 0
    ) {}
}

class MiddlewareFoo {
    private foo: number = 0;

    public constructor(init: number = 0) {
        this.foo = init;
    }

    public getFooCound(): number {
        return this.foo;
    }

    public handle(next: HandlerFunc): HandlerFunc {
        return <TMsg, TResult>(msg: TMsg): TResult => {
            this.foo++;
            next(msg);
            return
        }
    }
}

class StubMessageBus extends MessageBus {
    public execute<TMsg>(message: TMsg, handler: HandlerFunc): void {
        return this.handle(message, handler);
    }
}

describe('MessageBus', () => {
    it('Should handle all middlewares', () => {
        const m = new MiddlewareFoo(0);
        const m2 = new MiddlewareFoo(10);
        const m3 = new MiddlewareFoo(20);
        const bus = new StubMessageBus();
        bus.use(m.handle.bind(m));
        bus.use(m2.handle.bind(m2));
        bus.use(m3.handle.bind(m3));

        const msg = new Message();
        const handlerFn: HandlerFunc = <TMsg, TResult>(msg: TMsg): TResult => {
            const x = msg;
            return null;
        };
        bus.execute(msg, handlerFn);

        expect(m.getFooCound()).toBe(1);
        expect(m2.getFooCound()).toBe(11);
        expect(m3.getFooCound()).toBe(21);
    });
});
