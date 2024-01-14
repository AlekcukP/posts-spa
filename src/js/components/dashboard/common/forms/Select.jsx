import React from "react";
import _ from "lodash";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import ComponentsHelper from "../../../../helpers/components";

const makeSelectOptionsFromOperators = entries => _.map(entries, value => ({ value, name: value }));

const makeSelectOptionsFromFields = fields => _.map(
    fields, field => ({ name: _.capitalize(field), value: field })
);

const Select = ({ onChange, id, value, options, name, ref, ...props }) => {
    return (
        <FormControl fullWidth {...props}>
            <InputLabel variant="standard" htmlFor={id}>
                { _.upperFirst(name) }
            </InputLabel>
            <NativeSelect
                onChange={onChange}
                value={value}
                inputProps={{ name: name, id: id }}
            >
                { _.map(options, ({ name, value }) => <option
                    key={ComponentsHelper.generateKey('SelectOption')}
                    value={value}
                >
                    { name }
                </option> )}
            </NativeSelect>
        </FormControl>
    );
}

export { makeSelectOptionsFromOperators, makeSelectOptionsFromFields };
export default Select;
