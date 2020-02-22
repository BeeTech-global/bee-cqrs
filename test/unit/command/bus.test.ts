import { InMemoryHandlerRegistry } from '../../../src/registry/registry';
import { CommandBus, CommandHandler } from '../../../src/command/bus';
import { SetId, SetIdHandler, SetName, SetNameHandler } from '../../mock/command';

describe('CommandBus', () => {
    const nameHandler = new SetNameHandler();
    const idHandler = new SetIdHandler();

    const registry = (new InMemoryHandlerRegistry<CommandHandler<any>>())
        .register<string>('SetId', idHandler)
        .register('SetName', nameHandler);

    const commandBus = new CommandBus(registry);

    it('Should execute all sync commands', async () => {
        const nameCmd = new SetName('fake-name');
        const idCmd = new SetId('fake-id');

        await commandBus.execute(nameCmd);
        await commandBus.execute(idCmd);

        expect(nameHandler.name).toBe(nameCmd.name);
        expect(idHandler.id).toBe(idCmd.id);
    });
});
