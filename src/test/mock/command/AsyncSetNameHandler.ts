import SetName from './SetNameCommand';
import delay from '../delay';

export default class AsyncSetNameHandler {
  // eslint-disable-next-line class-methods-use-this
  public async execute(cmd: SetName): Promise<null> {
    await delay<null>(200, () => {
      // eslint-disable-next-line no-param-reassign
      cmd.result = `${cmd.firstName} ${cmd.lastName}`;
    });

    return null;
  }
}
