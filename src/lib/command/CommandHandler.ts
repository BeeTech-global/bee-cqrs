export default interface CommandHandler<TCommand, TResult> {
  execute(cmd: TCommand): TResult;
}
