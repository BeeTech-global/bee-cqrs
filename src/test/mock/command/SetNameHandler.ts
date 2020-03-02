import SetName from './SetNameCommand';

export default class SetNameHandler {
  // eslint-disable-next-line class-methods-use-this
  public execute(cmd: SetName): void {
    // eslint-disable-next-line no-param-reassign
    cmd.result = `${cmd.firstName} ${cmd.lastName}`;
  }
}
