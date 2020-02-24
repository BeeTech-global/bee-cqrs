import { HandlerFunc } from '../../index';

export class MiddlewareFoo {
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
            return null;
        }
    }
}
