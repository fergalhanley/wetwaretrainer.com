
const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

export const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

export const deepCopy = obj => JSON.parse(JSON.stringify(obj));
export const changed = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

export const swapElems = (arr, a, b) => {
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
};