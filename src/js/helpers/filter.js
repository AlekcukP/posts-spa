import _ from "lodash";

class FilterHelper {
    static OPERATORS = {
        equal: '=',
        notEqual: '!=',
        above: '>',
        aboveOrEqual: '>=',
        less: '<',
        lessOrEqual: '<=',
        isEmpty: 'isEmpty',
        isNotEmpty: 'isNotEmpty'
    }

    static needsComparableValue(operator) {
        return FilterHelper.OPERATORS.isEmpty !== operator ||
        FilterHelper.OPERATORS.isNotEmpty !== operator;
    }

    static normalizeValue(value) {
        if (_.isNumber(+value) && !_.isNaN(+value)) {
            return _.toInteger(value);
        }

        if (_.isString(value)) return value;

        return null;
    }

    static filter(rows, filter = {}) {
        if (_.isEmpty(filter) || _.some(filter, value => !value)) return rows;

        const { operator, field, value } = filter;
        const comparableValue = FilterHelper.normalizeValue(value);

        switch (operator) {
            case FilterHelper.OPERATORS.equal:
                return _.filter(rows, row => FilterHelper.normalizeValue(row[field]) === comparableValue);
            case FilterHelper.OPERATORS.notEqual:
                return _.filter(rows, row => FilterHelper.normalizeValue(row[field]) !== comparableValue);
            case FilterHelper.OPERATORS.above:
                return _.filter(rows, row => FilterHelper.normalizeValue(row[field]) > comparableValue);
            case FilterHelper.OPERATORS.aboveOrEqual:
                return _.filter(rows, row => FilterHelper.normalizeValue(row[field]) >= comparableValue);
            case FilterHelper.OPERATORS.less:
                return _.filter(rows, row => FilterHelper.normalizeValue(row[field]) < comparableValue);
            case FilterHelper.OPERATORS.lessOrEqual:
                return _.filter(rows, row => FilterHelper.normalizeValue(row[field]) <= comparableValue);
            case FilterHelper.OPERATORS.isEmpty:
                return _.filter(rows, row => FilterHelper.normalizeValue(_.isEmpty(row[field])));
            case FilterHelper.OPERATORS.isNotEmpty:
                return _.filter(rows, row => FilterHelper.normalizeValue(!_.isEmpty(row[field])));
            default:
                return rows;
        }
    }
}

export default FilterHelper;
