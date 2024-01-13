import React from "react";
import _ from "lodash";
import { useGetPosts } from "../../api/posts";
import { useQueryParams } from "./common/grid/hooks/useQueryParams";
import ColumnsList from "../../classes/columnsList";
import Card from "./common/Card";
import PostItem from "./PostItem";
import Grid from "./common/grid/Grid";

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
    const { postRecords, error, isLoading } = useGetPosts();
    const { searchParams, omitSearchParams, mergeSearchParams } = useQueryParams();

        const handleFilterChange = filterModel => {
            omitSearchParams(columns.getFilterableFields());

            if (filterModel?.items?.length) {
                const { field, value } = _.first(filterModel.items);

                mergeSearchParams(
                    field && value ? { [field]: value } : {}
                );
            }

            return filterModel;
        }

        const handleSortChange = sortModel => {
            omitSearchParams(['field', 'sort']);

            if (!_.isEmpty(sortModel)) {
                const { field, sort } = _.first(sortModel);

                mergeSearchParams(
                    field && sort ? { field, sort } : {}
                );
            }

            return sortModel;
        }

        const handlePaginationChange = ({ page, pageSize }) => {
            omitSearchParams(['page', 'pageSize']);

            if (_.isInteger(page) && _.isInteger(pageSize)) mergeSearchParams({ page, pageSize });

            return { page, pageSize };
        }

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
                rows={postRecords}
                onFilterModelChange={handleFilterChange}
                onSortModelChange={handleSortChange}
                onPaginationModelChange={handlePaginationChange}
                initialState={{
                    pagination: { page: searchParams.get('page') ?? 0, pageSize: searchParams.get('pageSize') ?? 10 },
                    filter: {
                        items: [
                            { field: 'id', operator: 'equals', value: searchParams.get('id') },
                            { field: 'userId', operator: 'equals', value: searchParams.get('userId') },
                        ],
                    },
                    sorting: {
                        sortModel: [
                            { field: searchParams.get('field'), sort: searchParams.get('sort') }
                        ],
                    },
                }}
            />
        </Card>
    );
};

export default PostsContent;
