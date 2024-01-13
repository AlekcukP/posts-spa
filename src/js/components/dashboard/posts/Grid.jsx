import React from "react";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import Post from "./Post";
import Grid from "../common/grid/Grid";
import SortMenuHelper from "../common/grid/helpers/sort/menu";

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
        sortable: false,
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

const PostsGrid = ({ posts }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Grid
            columns={columns}
            rows={posts}
            pageSizeOptions={[10, 25, 50, 100]}
            onFilterChange={() => {}}
            cell={Post}
            initialState={{
                pagination:  { page: 0, pageSize: 10 },
                filter: {
                    // items: [
                    //     { field: 'id', operator: 'equals', value: searchParams.get('id') },
                    //     { field: 'userId', operator: 'equals', value: searchParams.get('userId') },
                    // ],
                    field: 'id',
                    operator: 'equals',
                    value: searchParams.get('id')
                },
                sort: { field: 'id', order: SortMenuHelper.ORDERS.ASC }
            }}
        />
    );
};

export default PostsGrid;
