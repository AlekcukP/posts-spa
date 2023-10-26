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
import Select from "../../Select";
import { ClickAwayListener } from '@mui/base';
import { PostsPageContext } from "../../../pages/PostsPage";
import { filterColumnsByType, filterOperators } from "../../../utils/filterRecords";
import { makeOptionsFromEntries, makeOptionsFromObjects } from "../../../helpers/forms";
import { isOperatorRequireCompareValue } from "../../../utils/filterRecords";
import { postsDataColumns } from "../../../tablesConfig";
import { useSearchParams } from "react-router-dom";

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
    } = useContext(PostsPageContext);

    const filteredColumns = filterColumnsByType(postsDataColumns, typeof Number());

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
    } = useContext(PostsPageContext);

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
