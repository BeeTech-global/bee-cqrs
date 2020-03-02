import each from 'jest-each';
import Multiplier from '../mock/query/Multiplier';
import AsyncMultiplierHandler from '../mock/query/AsyncMultiplierHandler';
import MultiplierHandler from '../mock/query/MultiplierHandler';
import {
  HandlerRegistry, InMemoryHandlerRegistry, QueryBus, QueryHandler
} from '../..';

const dataProvider = () => {
  const dataSet = [
    [5, 10, 50],
    [99, 2, 198],
    [123, 99, 12177],
    [567, 700, 396900],
  ];

  return {
    'Should execute synchronous queries': { sync: true, dataSet },
    'Should execute asynchronous queries': { sync: false, dataSet },
  };
};

const buildRegistry = (sync: boolean): HandlerRegistry<QueryHandler<any, any>> => {
  const registry = new InMemoryHandlerRegistry<QueryHandler<any, any>>();
  if (!sync) {
    return registry.register(Multiplier, new AsyncMultiplierHandler());
  }

  return registry.register(Multiplier, new MultiplierHandler());
};

describe('QueryBus', () => {
  Object.entries(dataProvider()).forEach(([name, { sync, dataSet }]) => {
    const registry = buildRegistry(sync);
    const queryBus = new QueryBus(registry);

    describe(name, () => {
      each(dataSet).describe('returns the result of multiplying %s by %s', (a, b, expected) => {
        if (sync) {
          test(`returns ${expected}`, () => {
            const result = queryBus.query(new Multiplier(a, b));
            expect(result).toBe(expected);
          });
        } else {
          test(`returns ${expected}`, async () => {
            const query = new Multiplier(a, b);
            const result = await queryBus.query(query);
            expect(result).toBe(expected);
          });
        }
      });
    });
  });
});
