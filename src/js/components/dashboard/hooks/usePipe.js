export const usePipe = () => {
    return (...functions) => (initialValue) =>
    functions.reduce((value, func) => func(value), initialValue);
}
