import { CommandHandler } from '../../src/command/bus';

export class SetName {
    public constructor(
        public readonly name: string,
    ) {}
}

export class SetNameHandler implements CommandHandler<SetName> {
    public name: string;
    public execute(cmd: SetName): void {
        this.name = cmd.name;
    }
}

export class SetId {
    public constructor(
        public readonly id: string,
    ) {}
}

export class SetIdHandler implements CommandHandler<SetId> {
    public id: string;

    execute(cmd: SetId): void {
        this.id = cmd.id;
    }
}
