import MessageBus from '../../../lib/message/MessageBus';
import HandlerFunc from '../../../lib/message/HandlerFunc';

export default class StubMessageBus extends MessageBus {
  public execute<TMsg>(message: TMsg, handler: HandlerFunc): void {
    return this.handle(message, handler);
  }
}
