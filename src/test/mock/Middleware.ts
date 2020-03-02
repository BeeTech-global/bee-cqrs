import HandlerFunc from '../../lib/message/HandlerFunc';

export default class MiddlewareFoo {
  private foo: number = 0;

  public constructor(init: number = 0) {
    this.foo = init;
  }

  public getFooCound(): number {
    return this.foo;
  }

  public handle(next: HandlerFunc): HandlerFunc {
    return <TMsg, TResult>(msg: TMsg): TResult => {
      // eslint-disable-next-line no-plusplus,react/no-this-in-sfc
      this.foo++;
      next(msg);

      return null;
    };
  }
}
