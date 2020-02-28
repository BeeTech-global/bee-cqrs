import { HandlerAlreadyExists, HandlerNotFound } from './error';

interface HandlerRef<T> {
    [cmd: string]: T;
}

interface Class {
    name: string;
}

export interface HandlerRegistry<HandlerType> {
    locate<T>(cmd: T): HandlerType;
    register(cmd: Class, handler: HandlerType): HandlerRegistry<HandlerType>;
}

export class InMemoryHandlerRegistry<HandlerType> implements HandlerRegistry<HandlerType> {
    private handlers: HandlerRef<HandlerType> = {};

    public locate<T>(cmd: T): HandlerType {
        const cmdName = cmd.constructor.name;
        if (this.handlers[cmdName]) {
            return this.handlers[cmdName];
        }

        throw new HandlerNotFound(`Handler not found for: ${cmdName}`);
    }

    public register(cmd: Class, handler: HandlerType): HandlerRegistry<HandlerType> {
        const cmdName = cmd.name;

        if (this.handlers[cmdName]) {
            throw new HandlerAlreadyExists(`Handler already exists for: ${cmdName}`);
        }

        this.handlers[cmdName] = handler;

        return this;
    }
}
