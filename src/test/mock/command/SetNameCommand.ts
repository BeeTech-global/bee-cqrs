export default class SetName {
  // let the handler change this state so we can test it
  public result: string = '';

  public constructor(
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
