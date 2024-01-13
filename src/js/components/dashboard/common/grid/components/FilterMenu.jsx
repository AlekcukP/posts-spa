import React, { useState, useCallback } from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Select from "../../forms/Select";
import ToggleMenu from "./ToggleMenu";
import FilterMenuHelper from "../helpers/filter/menu";
import { useControls } from "../hooks/useControls";

const List = ({ fields }) => {
    const [filterColumn, setFilterColumn] = useState(null);
    const [filterOperator, setFilterOperator] = useState(null);
    const [filterValue, setFilterValue] = useState(null);

    const handleFilterOperatorChange = ({ target: { value } }) => setFilterOperator(value);
    const handleFilterColumnChange = ({ target: { value } }) => setFilterColumn(value);
    const handleFilterValueChange = ({ target: { value } }) => setFilterValue(value);

    const onResetFiltersBtnClick = useCallback(() => {
        _.isEmpty(filterValue) && setFilterMenuAnchorEl(null) || setFilterValue(null);
    }, [filterValue]);

    return (
        <Paper sx={{ width: 510, height: 64, padding: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                component="form"
                autoComplete="off"
                sx={{ display: 'flex', flexFlow: 'row', width: '100%', padding: '0 2px' }}
            >
                <IconButton sx={{ width: 50 }} onClick={onResetFiltersBtnClick}>
                    <ClearIcon />
                </IconButton>
                <Select
                    id="filter-columns-select"
                    name="columns"
                    options={FilterMenuHelper.makeOptionsFromObjects(fields)}
                    onChange={handleFilterColumnChange}
                    value={filterColumn}
                />
                <Select
                    id="filter-operators-select"
                    name="operators"
                    options={FilterMenuHelper.makeOptionsFromEntries(FilterMenuHelper.OPERATORS)}
                    onChange={handleFilterOperatorChange}
                    value={filterOperator}
                />
                <FormControl fullWidth>
                    <TextField
                        id="filter-input-field"
                        label="Value"
                        type="number"
                        variant="standard"
                        placeholder="Filter value"
                        fullWidth={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        disabled={FilterMenuHelper.isOperatorRequireCompareValue(
                            FilterMenuHelper.OPERATORS,
                            filterOperator
                        )}
                    />
                </FormControl>
            </Box>
        </Paper>
    );
};

const FilterMenu = ({ fields }) => {
    const {
        filterMenuId,
        filterMenuAnchorEl,
        filterMenuOpen,
        handleFilterMenuBtnClick,
        closeFilterMenu
    } = useControls();

    return (
        <ToggleMenu
            id={filterMenuOpen ? filterMenuId : undefined}
            name={'Filter'}
            icon={FilterAltIcon}
            onClick={handleFilterMenuBtnClick}
            onClickAway={closeFilterMenu}
            onClose={closeFilterMenu}
            open={filterMenuOpen}
            anchorEl={filterMenuAnchorEl}
        >
            <List fields={fields}/>
        </ToggleMenu>
    );
};

export default FilterMenu;

