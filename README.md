# Bee CQRS

This is a simple CQRS framework with a Command and a Query bus.

## Motivation

There are a lot of CQRS frameworks for JavaScript out there, 
this is not new. The one thing we're trying to achieve here is the
ability to take advantage of such a framework but without coupling
it into the application's domain. The main goal here is to create
a framework that you can use without injecting any dependencies
into your domains.  

## Getting started

Install it using [`npm`](https://www.npmjs.com/):
```bash
npm install @beetech/cqrs
```

## Usage

Let's use a coupled example to show how the types are glued together.

```typescript
import { InMemoryHandlerRegistry, QueryBus, QueryHandler } from '@beetech/cqrs';

export class Multiplier {
    public constructor(
        public readonly value: number,
        public readonly factor: number,
    ) {}
}

export class MultiplierHandler implments QueryHandler<Multiplier, number> {
    public query(query: Multiplier): number {
        return query.value * query.factor;
    }
}

const registry = (new InMemoryHandlerRegistry<QueryHandler<any, any>>())
    .register('Multiplier', multiplierHandler);

const queryBus = new QueryBus(registry);
const result = queryBus.query(new Multiplier(5, 4));
// result should be equal to 20
```

You can see that `MultiplierHandler` is implementing an interface called `QueryHandler`, right? This is an example 
of a "coupled" implementation. Imagine this being used inside your domain, you'll have a domain importing an external library
and that's not ideal.

By taking advantage of TypeScript's gererics, we were able to create a structure that will work event if you don't explicitly
implements our interface. Here's the same example but not coupled: 

```typescript
import { InMemoryHandlerRegistry, QueryBus, QueryHandler } from '@beetech/cqrs';

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

const registry = (new InMemoryHandlerRegistry<QueryHandler<any, any>>())
    .register('Multiplier', multiplierHandler);

const queryBus = new QueryBus(registry);
const result = queryBus.query(new Multiplier(5, 4));
// result should be equal to 20
```

As you can see, the query and the query handler have nothing to do with the CQRS framework, all the bindings will
be where they belong: inside the application layer and not on the domain layer.

It's a subtle but, at the same time, huge difference.
