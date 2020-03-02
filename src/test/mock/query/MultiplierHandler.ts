import Multiplier from './Multiplier';

export default class MultiplierHandler {
  // eslint-disable-next-line class-methods-use-this
  public query(query: Multiplier): number {
    return query.value * query.factor;
  }
}
