import HandlerFunc from './HandlerFunc';
import Middleware from './Middleware';

export default abstract class MessageBus {
  private middlewares: Middleware[] = [];

  public use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  protected handle<TMsg>(message: TMsg, handler: HandlerFunc): void {
    let h = handler;
    this.middlewares.slice().reverse().forEach((middleware) => {
      h = middleware(h);
    });
    h(message);
  }
}
