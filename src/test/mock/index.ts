export const delay = (timer: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, timer));
};
