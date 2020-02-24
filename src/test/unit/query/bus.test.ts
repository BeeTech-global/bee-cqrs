import { InMemoryHandlerRegistry, QueryBus, QueryHandler } from '../../../index';
import { AsyncMultiplierHandler, Multiplier, MultiplierHandler } from '../../mock/query';

describe('QueryBus', () => {
    it('Should execute all sync queries', () => {
        const multiplierHandler = new MultiplierHandler();
        const registry = (new InMemoryHandlerRegistry<QueryHandler<any, any>>())
            .register('Multiplier', multiplierHandler);

        const queryBus = new QueryBus(registry);
        const result = queryBus.query(new Multiplier(5, 4));

        expect(result).toEqual(20);
    });

    it('Should execute all async queries', async () => {
        const multiplierHandler = new AsyncMultiplierHandler();
        const registry = (new InMemoryHandlerRegistry<QueryHandler<any, any>>())
            .register('Multiplier', multiplierHandler);

        const queryBus = new QueryBus(registry);
        const result = await queryBus.query(new Multiplier(3, 10));

        expect(result).toEqual(30);
    });
});
