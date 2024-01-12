import React from "react";
import _ from "lodash";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

const Select = ({ onChange, id, value, options, name, ...props }) => {
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
                { _.map(
                    options,
                    option => <option key={`option_${option.value}`} value={option.value}>
                        { option.name }
                    </option>
                )}
            </NativeSelect>
        </FormControl>
    );
}

export default Select;
