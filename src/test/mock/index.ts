export const delay = <T>(timer: number, callback: Function): Promise<T> => {
    return new Promise(resolve => setTimeout(() => {
        resolve(callback());
    }, timer));
};
