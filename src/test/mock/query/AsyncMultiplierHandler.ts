import Multiplier from './Multiplier';
import delay from '../delay';

export default class AsyncMultiplierHandler {
  // eslint-disable-next-line class-methods-use-this
  public async query(query: Multiplier): Promise<number> {
    const { value } = query;
    const { factor } = query;

    // eslint-disable-next-line no-return-await
    return await delay<number>(500, () => value * factor);
  }
}
