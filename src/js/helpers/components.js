import _ from "lodash";

class ComponentsHelper {
    static generateKey(prefix) {
        return _.uniqueId(`${prefix}_${new Date().getTime()}`);
    }
}

export default ComponentsHelper;
