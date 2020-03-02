export default interface HandlerFunc {
  <TMsg, TResult>(message: TMsg): TResult | null;
}
