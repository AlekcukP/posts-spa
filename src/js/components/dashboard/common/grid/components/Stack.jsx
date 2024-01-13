import React from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import Paper from "@mui/material/Paper";
import MuiStack from '@mui/material/Stack';
import EmptyDataOverlay from "../../EmptyDataOverlay";
import ComponentsHelper from "../../../../../helpers/components";

const Stack = ({ cell: Cell, rows }) => {
    if (!rows.length) {
        return <EmptyDataOverlay />;
    }

    const cells = _.map(rows, row => _.isFunction(Cell) ?
        <Cell
            row={row}
            key={ComponentsHelper.generateKey('CellItem')}
            className={classnames('flex-1', 'basis-full', 'md:basis-5/12')}
        />
            : <Paper
                elevation={6}
                key={ComponentsHelper.generateKey('CellPaper')}
                className={classnames('text-center', 'h-fit', 'w-full', 'p-1', 'flex-1', 'basis-full', 'md:basis-5/12')}
            >
                { _.map(
                    row,
                    (value) => <div key={ComponentsHelper.generateKey('CellDiv')}>{ value }</div>
                )}
        </Paper>
    );

    return (
        <MuiStack
            useFlexGap
            flexWrap="wrap"
            direction="row"
            className={classnames('overflow-auto', { 'justify-evenly': _.isFunction(Cell) })}
            spacing={_.isFunction(Cell) ? 0 : 0.5}
        >
            { cells }
        </MuiStack>
    );
}

export default Stack;
