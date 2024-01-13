import _ from "lodash";

const normalizeValue = (compareValue) => {
    if (_.isNumber(+compareValue) && !_.isNaN(+compareValue)) {
        return Number(compareValue);
    }

    if (_.isString(compareValue)) {
        return compareValue;
    }

    return null;
}

const filterRecordsByRule = (records, column, rule, compareValue) => {
    const normalizedCompareValue = normalizeValue(compareValue);

    switch (rule) {
        case filterOperators.equal:
            return _.filter(records, record => normalizeValue(record[column]) === normalizedCompareValue);
        case filterOperators.notEqual:
            return _.filter(records, record => normalizeValue(record[column]) !== normalizedCompareValue);
        case filterOperators.above:
            return _.filter(records, record => normalizeValue(record[column]) > normalizedCompareValue);
        case filterOperators.aboveOrEqual:
            return _.filter(records, record => normalizeValue(record[column]) >= normalizedCompareValue);
        case filterOperators.less:
            return _.filter(records, record => normalizeValue(record[column]) < normalizedCompareValue);
        case filterOperators.lessOrEqual:
            return _.filter(records, record => normalizeValue(record[column]) <= normalizedCompareValue);
        case filterOperators.isEmpty:
            return _.filter(records, record => _.isEmpty(normalizeValue(record[column])));
        case filterOperators.isNotEmpty:
            return _.filter(records, record => !_.isEmpty(normalizeValue(record[column])));
        default:
            return records;
    }
}

export const filterColumnsByType = (columns, type) => {
    return _.filter(columns, column => column.type === type)
}

export const filterRecords = (records, column, rule, compareValue) => {
    if (_.isEmpty(compareValue) && !isOperatorRequireCompareValue(rule)) {
        return records;
    }

    return filterRecordsByRule(records, column, rule, compareValue);
}
