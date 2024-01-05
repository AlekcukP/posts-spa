import React, { useCallback, useContext } from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Select from "../../common/forms/Select";
import { ClickAwayListener } from '@mui/base';
import { PostsContext } from "../Content";
import { filterColumnsByType, filterOperators } from "./utils/filterRecords";
import { isOperatorRequireCompareValue } from "./utils/filterRecords";
import { useSearchParams } from "react-router-dom";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        sortable: true,
        filterable: true
    },
    {
        field: 'userId',
        headerName: 'User ID',
        type: 'number',
        sortable: true,
        filterable: true
    },
    {
        field: 'title',
        headerName: 'Title',
        type: 'string',
        sortable: true,
        filterable: false
    },
    {
        field: 'body',
        headerName: 'Body',
        type: 'string',
        sortable: false,
        filterable: false
    }
];

const normalizeKeyString = keyString => keyString.replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(s) { return s.toUpperCase(); }).trim();

const makeOptionsFromEntries = arr => _.map(arr, (value, key) => {
    return { name: normalizeKeyString(key), value };
});

const makeOptionsFromObjects = (arr, valueAccessor, nameAccessor) => _.map(arr, obj => {
    return { name: obj[nameAccessor], value: obj[valueAccessor]};
});

const FilterPopupMenu = () => {
    const [searchParams] = useSearchParams();

    const {
        postsFilterMenu: { filterMenuId, filterMenuAnchorEl, filterMenuOpen, closePostsFilterMenu },
        filterPosts: {
            postsFilterColumn,
            postsFilterOperator,
            postsFilterValue,
            resetFilterValue,
            handleFilterColumnChange,
            handleFilterOperatorChange,
            handleFilterValueChange
        },
    } = useContext(PostsContext);

    const filteredColumns = filterColumnsByType(columns, typeof Number());

    const onResetFiltersBtnClick = useCallback(() => {
        if (_.isEmpty(postsFilterValue)) {
            closePostsFilterMenu()
        };

        for (const key of searchParams.keys()) {
            searchParams.delete(key);
        }

        resetFilterValue();
    }, [postsFilterValue]);

    return (
        <Popper
            id={filterMenuId}
            open={filterMenuOpen}
            anchorEl={filterMenuAnchorEl}
            sx={{ width: 240 }}
            popperOptions={{ placement: 'bottom' }}
        >
            <Paper sx={{ width: 510, height: 64, padding: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{ display: 'flex', flexFlow: 'row', width: '100%', padding: '0 2px' }}
                >
                    <IconButton sx={{ width: 50 }} onClick={onResetFiltersBtnClick}>
                        <ClearIcon/>
                    </IconButton>
                    <Select
                        id="filter-columns-select"
                        name="columns"
                        options={makeOptionsFromObjects(filteredColumns, 'field', 'headerName')}
                        onChange={handleFilterColumnChange}
                        value={postsFilterColumn || 'id'}
                    />
                    <Select
                        id="filter-operators-select"
                        name="operators"
                        options={makeOptionsFromEntries(filterOperators)}
                        onChange={handleFilterOperatorChange}
                        value={postsFilterOperator}
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
                            value={postsFilterValue}
                            onChange={handleFilterValueChange}
                            disabled={isOperatorRequireCompareValue(postsFilterOperator)}
                        />
                    </FormControl>
                </Box>
            </Paper>
        </Popper>
    );
};

const FilterOptions = () => {
    const {
        postsFilterMenu: { filterMenuId, handleFilterMenuBtnClick, closePostsFilterMenu }
    } = useContext(PostsContext);

    return (
        <ClickAwayListener onClickAway={closePostsFilterMenu}>
            <Box>
                <Button
                    aria-describedby={filterMenuId}
                    onClick={handleFilterMenuBtnClick}
                    variant="text"
                    size="small"
                    startIcon={<FilterAltIcon />}
                >
                    Filter
                </Button>

                <FilterPopupMenu />
            </Box>
        </ClickAwayListener>
    );
};

export default FilterOptions;
