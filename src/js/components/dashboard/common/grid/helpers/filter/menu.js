import _ from "lodash";

class FilterMenuHelper {
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

    static normalizeKeyString(keyString) {
        return keyString.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim()
    }

    static makeOptionsFromEntries(entries) {
        return _.map(entries, (value, key) => ({ name: FilterMenuHelper.normalizeKeyString(key), value }));
    }

    static makeOptionsFromObjects(fields) {
        return _.map(fields, field => ({ name: _.capitalize(field), value: field }));
    }

    static isOperatorRequireCompareValue(operators, rule) {
        return _.includes([operators.isEmpty, operators.isNotEmpty], rule);
    }
}

export default FilterMenuHelper;
