import { InMemoryHandlerRegistry } from '../../../src/registry';
import { QueryBus, QueryHandler } from '../../../src/query-bus';

class Multiplier {
    public constructor(
        public readonly value: number,
        public readonly factor: number,
    ) {}
}

class MultiplierHandler implements QueryHandler<Multiplier, number>{
    public query(query: Multiplier): number {
        return query.value * query.factor;
    }
}

class AsyncMultiplierHandler implements QueryHandler<Multiplier, Promise<number>>{
    public async query(query: Multiplier): Promise<number> {
        return query.value * query.factor;
    }
}

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
