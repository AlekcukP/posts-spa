import React from "react";
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
import FilterHelper from "../../../../../helpers/filter";
import { makeSelectOptionsFromOperators, makeSelectOptionsFromFields } from "../../forms/Select";
import { useFilterSortControls } from "../hooks/useFilterSortControls";

const List = ({ handleFilterChange, onResetBtnClick, fields, selected: { field, operator, value } }) => {
    return (
        <Paper className="grid-filter-box">
            <Box
                component="form"
                autoComplete="off"
                sx={{ display: 'flex', flexFlow: 'row', width: '100%', padding: '0 2px' }}
            >
                <IconButton sx={{ width: 50 }} onClick={onResetBtnClick}>
                    <ClearIcon />
                </IconButton>
                <Select
                    id="filter-fields-select"
                    name="field"
                    options={makeSelectOptionsFromFields(fields)}
                    onChange={handleFilterChange}
                    value={field}
                />
                <Select
                    id="filter-operators-select"
                    name="operator"
                    options={makeSelectOptionsFromOperators(FilterHelper.OPERATORS)}
                    onChange={handleFilterChange}
                    value={operator}
                />
                <FormControl fullWidth>
                    <TextField
                        id="filter-value-field"
                        label="Value"
                        name="value"
                        type="number"
                        variant="standard"
                        placeholder="Filter value"
                        fullWidth={true}
                        InputLabelProps={{ shrink: true }}
                        value={value}
                        onChange={handleFilterChange}
                        disabled={!FilterHelper.needsComparableValue(operator)}
                    />
                </FormControl>
            </Box>
        </Paper>
    );
};

const FilterMenu = ({ fields, selected, handleFilterModelChange }) => {
    const {
        filterMenuId,
        filterMenuAnchorEl,
        filterMenuOpen,
        handleFilterMenuBtnClick,
        closeFilterMenu
    } = useFilterSortControls();

    const handleFilterChange = ({ target: { value, name } }) => handleFilterModelChange(
        { ...selected, [name]: value }
    );

    const onResetBtnClick = () => {
        handleFilterModelChange({ ...selected, value: null });
        closeFilterMenu();
    }

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
            <List
                fields={fields}
                selected={selected}
                handleFilterChange={handleFilterChange}
                onResetBtnClick={onResetBtnClick}
            />
        </ToggleMenu>
    );
};

export default FilterMenu;

