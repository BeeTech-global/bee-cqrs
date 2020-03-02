import faker from 'faker';
import each from 'jest-each';
import SetName from '../mock/command/SetNameCommand';
import SetNameHandler from '../mock/command/SetNameHandler';
import AsyncSetNameHandler from '../mock/command/AsyncSetNameHandler';
import {
  InMemoryHandlerRegistry, CommandBus, CommandHandler, HandlerRegistry
} from '../..';

const dataProvider = () => {
  const dataSet = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    const first = faker.name.firstName();
    const last = faker.name.lastName();
    const complete = `${first} ${last}`;

    dataSet.push([first, last, complete]);
  }

  return {
    'Should execute synchronous commands': { sync: true, dataSet },
    'Should execute asynchronous commands': { sync: false, dataSet },
  };
};

const buildRegistry = (sync: boolean): HandlerRegistry<CommandHandler<any, any>> => {
  const registry = new InMemoryHandlerRegistry<CommandHandler<any, any>>();
  if (sync) {
    return registry.register(SetName, new SetNameHandler());
  }

  return registry.register(SetName, new AsyncSetNameHandler());
};

describe('CommandBus', () => {
  Object.entries(dataProvider()).forEach(([name, { sync, dataSet }]) => {
    const registry = buildRegistry(sync);
    const commandBus = new CommandBus(registry);

    describe(name, () => {
      each(dataSet).describe('returns the complete name of %s', (a, b, expected) => {
        if (sync) {
          test(`expected name: ${expected}`, () => {
            const cmd = new SetName(a, b);
            commandBus.execute(cmd);
            expect(cmd.result).toBe(expected);
          });
        } else {
          test(`expected name: ${expected}`, async () => {
            const cmd = new SetName(a, b);
            await commandBus.execute(cmd);
            expect(cmd.result).toBe(expected);
          });
        }
      });
    });
  });
});
