import HandlerFunc from './HandlerFunc';

export default interface Middleware {
  (handler: HandlerFunc): HandlerFunc;
}
