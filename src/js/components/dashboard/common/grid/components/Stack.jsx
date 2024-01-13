import React, { useContext } from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import Paper from "@mui/material/Paper";
import MuiStack from '@mui/material/Stack';
import ComponentsHelper from "../../../../../helpers/components";
import { Context } from "../Grid";

const Stack = () => {
    const { cell: Cell, rows } = useContext(Context);

    const isPropCellFuction = _.isFunction(Cell);

    const cells = _.map(rows, row => isPropCellFuction ?
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
            className={classnames(
                ['overflow-auto'],
                { 'justify-evenly': isPropCellFuction }
            )}
            spacing={isPropCellFuction ? 0 : 0.5}
        >
            { cells }
        </MuiStack>
    );
}

export default Stack;
