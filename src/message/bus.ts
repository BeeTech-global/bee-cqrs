export interface HandlerFunc {
    <TMsg, TResult>(message: TMsg): TResult;
}

export interface Middleware {
    (handler: HandlerFunc): HandlerFunc;
}

export class MessageBus {
    private middlewares: Middleware[] = [];

    public use(middleware: Middleware): void {
        this.middlewares.push(middleware);
    }

    protected handle<TMsg>(message: TMsg, handler: HandlerFunc): void {
        let h = handler;
        this.middlewares.slice().reverse().forEach(middleware => h = middleware(h));
        h(message);
    }
}
