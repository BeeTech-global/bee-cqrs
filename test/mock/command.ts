import { CommandHandler } from '../../src';

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

export class AsyncSetNameHandler implements CommandHandler<SetName> {
    public name: string;
    public async execute(cmd: SetName): Promise<void> {
        this.name = cmd.name;
    }
}

export class AsyncSetIdHandler implements CommandHandler<SetId> {
    public id: string;

    public async execute(cmd: SetId): Promise<void> {
        this.id = cmd.id;
    }
}
