import _ from "lodash";

export const normalizeKeyString = keyString => keyString.replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(s) { return s.toUpperCase(); }).trim();

export const makeOptionsFromEntries = arr => _.map(arr, (value, key) => {
    return { name: normalizeKeyString(key), value };
});

export const makeOptionsFromObjects = (arr, valueAccessor, nameAccessor) => _.map(arr, obj => {
    return { name: obj[nameAccessor], value: obj[valueAccessor]};
});
