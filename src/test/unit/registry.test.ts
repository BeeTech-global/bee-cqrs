import { HandlerRegistry, InMemoryHandlerRegistry } from '../..';
import { HandlerAlreadyExists, HandlerNotFound } from '../..';

class GenericCommand {}
class GenericCommand2 {}
class GenericHandler {}
class GenericHandler2 {}

describe('InMemoryHandlerRegistry', () => {
    let registry: HandlerRegistry<GenericHandler>;

    beforeEach(() => {
        registry = new InMemoryHandlerRegistry<GenericHandler>();
    });

    it('Should register a new handler', () => {
        const handler = new GenericHandler();
        const cmd = new GenericCommand();

        registry.register(GenericCommand, handler);
        expect(registry.locate(cmd)).toBe(handler);
    });

    it('Should fail when trying to register a handler for an existing command', () => {
        const handler = new GenericHandler();
        const cmd = new GenericCommand();

        registry.register(GenericCommand, handler);
        expect(() => registry.register(GenericCommand, handler)).toThrowError(HandlerAlreadyExists);
        expect(registry.locate(cmd)).toBe(handler);
    });

    it('Should fail when trying to find a non registered handler', () => {
        const cmd = new GenericCommand();
        expect(() => registry.locate(cmd)).toThrowError(HandlerNotFound);
    });

    it('Should allow multiple commands and handlers', () => {
        const cmd1 = new GenericCommand();
        const cmd2 = new GenericCommand2();
        const handler1 = new GenericHandler();
        const handler2 = new GenericHandler2();

        registry.register(GenericCommand, handler1);
        registry.register(GenericCommand2, handler2);

        expect(registry.locate(cmd1)).toBe(handler1);
        expect(registry.locate(cmd2)).toBe(handler2);
    });
});
