import HandlerFunc from '../../lib/message/HandlerFunc';
import MiddlewareFoo from '../mock/Middleware';
import Message from '../mock/message/Message';
import StubMessageBus from '../mock/message/SubMessageBus';


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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handlerFn: HandlerFunc = <TMsg, TResult>(tmsg: TMsg): TResult => null;
    bus.execute(msg, handlerFn);

    expect(m.getFooCound()).toBe(1);
    expect(m2.getFooCound()).toBe(11);
    expect(m3.getFooCound()).toBe(21);
  });
});
