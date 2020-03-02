import CommandHandler from './CommandHandler';
import HandlerFunc from '../message/HandlerFunc';
import HandlerRegistry from '../registry/HandlerRegistry';
import MessageBus from '../message/MessageBus';

export default class CommandBus extends MessageBus {
  public constructor(
    private readonly registry: HandlerRegistry<CommandHandler<any, any>>
  ) {
    super();
  }

  public execute<TCommand, TResult>(cmd: TCommand): TResult {
    const handler = this.registry.locate(cmd);
    let result: TResult;
    const handlerFn: HandlerFunc = <TMsg, TResult>(msg: TMsg): TResult => {
      result = handler.execute(msg);

      return null;
    };

    this.handle<TCommand>(cmd, handlerFn);

    return result;
  }
}
