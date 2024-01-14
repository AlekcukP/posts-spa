export const usePipe = () => (...functions) =>
    (initialValue, extraParam = null) => functions.reduce((value, func) => func(value, extraParam), initialValue);

