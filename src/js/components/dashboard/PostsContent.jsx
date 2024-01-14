import React from "react";
import _ from "lodash";
import { useQueryParams } from "./hooks/useQueryParams";
import ColumnsList from "../../classes/columnsList";
import Card from "./common/Card";
import PostItem from "./PostItem";
import Grid from "./common/grid/Grid";
import { useGetData } from "./hooks/useGetData";
import { useInitialState } from "./hooks/useInitialState";

const columns = ColumnsList.from([
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
]);

const PostsContent = () => {
    const { updateFilterSearchParams, updatePaginationSearchParams, updateSortSearchParams } = useQueryParams();
    const { data, error, isLoading } = useGetData('posts');
    const initialState = useInitialState();

    return (
        <Card
            title={"Posts"}
            subheader={"Explore All Posts Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <Grid
                cell={PostItem}
                columns={columns}
                rows={data}
                onFilterModelChange={updateFilterSearchParams}
                onSortModelChange={updateSortSearchParams}
                onPaginationModelChange={updatePaginationSearchParams}
                initialState={initialState}
            />
        </Card>
    );
};

export default PostsContent;
