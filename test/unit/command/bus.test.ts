import { InMemoryHandlerRegistry } from '../../../src/registry';
import { CommandBus, CommandHandler } from '../../../src/command-bus';
import {
    AsyncSetIdHandler,
    AsyncSetNameHandler,
    SetId, SetIdHandler,
    SetName,
    SetNameHandler
} from '../../mock/command';

let nameCmd: SetName;
let idCmd: SetId;

describe('CommandBus', () => {
    beforeEach(() => {
        nameCmd = new SetName('fake-name');
        idCmd = new SetId('fake-id');
    });

    it('Should execute all sync commands', () => {
        const nameHandler = new SetNameHandler();
        const idHandler = new SetIdHandler();

        const registry = (new InMemoryHandlerRegistry<CommandHandler<any>>())
            .register('SetId', idHandler)
            .register('SetName', nameHandler);

        const commandBus = new CommandBus(registry);

        commandBus.execute(nameCmd);
        commandBus.execute(idCmd);

        expect(nameHandler.name).toBe(nameCmd.name);
        expect(idHandler.id).toBe(idCmd.id);
    });

    it('Should execute all async commands', async () => {
        const nameHandler = new AsyncSetNameHandler();
        const idHandler = new AsyncSetIdHandler();

        const registry = (new InMemoryHandlerRegistry<CommandHandler<any>>())
            .register('SetId', idHandler)
            .register('SetName', nameHandler);

        const commandBus = new CommandBus(registry);

        await commandBus.execute(nameCmd);
        expect(nameHandler.name).toBe(nameCmd.name);

        await commandBus.execute(idCmd);
        expect(idHandler.id).toBe(idCmd.id);
    });
});
