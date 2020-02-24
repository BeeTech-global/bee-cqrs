import { delay } from './';

export class Multiplier {
    public constructor(
        public readonly value: number,
        public readonly factor: number,
    ) {}
}

export class MultiplierHandler {
    public query(query: Multiplier): number {
        return query.value * query.factor;
    }
}

export class AsyncMultiplierHandler {
    public async query(query: Multiplier): Promise<number> {
        const value = query.value;
        const factor = query.factor;
        return await delay<number>(500, () => {
            return value * factor;
        });
    }
}
