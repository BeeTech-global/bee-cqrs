const delay = <T>(timer: number, callback: Function): Promise<T> => new Promise(
  (resolve) => setTimeout(() => {
    resolve(callback());
  }, timer)
);

export default delay;
