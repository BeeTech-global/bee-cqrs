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
        return query.value * query.factor;
    }
}
