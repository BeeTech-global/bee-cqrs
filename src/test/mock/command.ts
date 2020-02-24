import { delay } from './';

export class SetName {
    // let the handler change this state so we can test it
    public result: string = '';

    public constructor(
        public readonly firstName: string,
        public readonly lastName: string,
    ) {}
}

export class SetNameHandler {
    public execute(cmd: SetName): void {
        cmd.result = `${cmd.firstName} ${cmd.lastName}`;
    }
}

export class AsyncSetNameHandler {
    public async execute(cmd: SetName): Promise<null> {
        return await delay<null>(200, () => {
            cmd.result = `${cmd.firstName} ${cmd.lastName}`;
        });
    }
}
