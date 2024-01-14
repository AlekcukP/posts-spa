import _ from "lodash";
import FilterMenuHelper from "../helpers/filter/menu";

const normalizeValue = (compareValue) => {
    if (_.isNumber(+compareValue) && !_.isNaN(+compareValue)) {
        return Number(compareValue);
    }

    if (_.isString(compareValue)) {
        return compareValue;
    }

    return null;
}

const filterRecordsByRule = (records, field, operator, value) => {
    const normalizedCompareValue = normalizeValue(value);

    switch (operator) {
        case FilterMenuHelper.OPERATORS.equal:
            return _.filter(records, record => normalizeValue(record[field]) === normalizedCompareValue);
        case FilterMenuHelper.OPERATORS.notEqual:
            return _.filter(records, record => normalizeValue(record[field]) !== normalizedCompareValue);
        case FilterMenuHelper.OPERATORS.above:
            return _.filter(records, record => normalizeValue(record[field]) > normalizedCompareValue);
        case FilterMenuHelper.OPERATORS.aboveOrEqual:
            return _.filter(records, record => normalizeValue(record[field]) >= normalizedCompareValue);
        case FilterMenuHelper.OPERATORS.less:
            return _.filter(records, record => normalizeValue(record[field]) < normalizedCompareValue);
        case FilterMenuHelper.OPERATORS.lessOrEqual:
            return _.filter(records, record => normalizeValue(record[field]) <= normalizedCompareValue);
        case FilterMenuHelper.OPERATORS.isEmpty:
            return _.filter(records, record => _.isEmpty(normalizeValue(record[field])));
        case FilterMenuHelper.OPERATORS.isNotEmpty:
            return _.filter(records, record => !_.isEmpty(normalizeValue(record[field])));
        default:
            return records;
    }
}

export const filterColumnsByType = (columns, type) => {
    return _.filter(columns, column => column.type === type);
}

export const filterRecords = (records, { field, operator, value }) => {
    console.log(!FilterMenuHelper.isOperatorRequireCompareValue(operator))
    if (!value && !FilterMenuHelper.isOperatorRequireCompareValue(operator)) {
        return records;
    }

    return filterRecordsByRule(records, field, operator, value);
}
