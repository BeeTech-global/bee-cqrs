import { delay } from './';

export class SetName {
    public constructor(
        public readonly name: string,
    ) {}
}

export class SetId {
    public constructor(
        public readonly id: string,
    ) {}
}

export class SetNameHandler {
    public name: string;
    public execute(cmd: SetName): void {
        this.name = cmd.name;
    }
}

export class SetIdHandler {
    public id: string;

    public execute(cmd: SetId): void {
        this.id = cmd.id;
    }
}

export class AsyncSetNameHandler {
    public name: string;
    public async execute(cmd: SetName): Promise<void> {
        await delay(2000);

        this.name = cmd.name;
        return;
    }
}

export class AsyncSetIdHandler {
    public id: string;

    public async execute(cmd: SetId): Promise<void> {
        await delay(2000);

        this.id = cmd.id;
        return;
    }
}
