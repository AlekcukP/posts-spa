import React, { useCallback } from "react";
import Card from "../components/dashboard/Card";
import Table from "../components/dashboard/Table";
import { useGetAlbums } from "../hooks/api/albums";
import { albumsTableColumns } from "../tablesConfig";
import { useSearchParams } from "react-router-dom";

const AlbumsPage = () => {
    const { albumRecords, error, isLoading } = useGetAlbums();
    const [searchParams, setSearchParams] = useSearchParams()

    const onFilterChange = useCallback((filterModel) => {
        const { field, value } = _.first(filterModel.items);
        if (field && value) {
            if (searchParams.size && !searchParams.has(field)) {
                for (const key of searchParams.keys()) {
                    searchParams.delete(key);
                }
            }
            searchParams.set(field, value);
            setSearchParams(searchParams.toString())
        }

            return filterModel;
    }, []);

    return (
        <Card
            title={"Albums"}
            subheader={"Discover All Albums Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <Table
                className="h-5/6"
                rows={albumRecords}
                columns={albumsTableColumns}
                pageSizeOptions={[5, 10, 15]}
                onFilterModelChange={onFilterChange}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    filter: {
                        filterModel: {
                            items: [
                                { field: 'id', operator: 'equals', value: searchParams.get('id') },
                                { field: 'userId', operator: 'equals', value: searchParams.get('userId') },
                            ],
                        },
                    },
                }}
            />
        </Card>
    );
}

export default AlbumsPage;
