export interface Class {
  name: string;
}

export default interface HandlerRegistry<HandlerType> {
  locate<T>(cmd: T): HandlerType;
  register(cmd: Class, handler: HandlerType): HandlerRegistry<HandlerType>;
}
