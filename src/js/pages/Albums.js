import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAlbums } from "../hooks/albums";
import Card from "../components/dashboard/Card";
import Table from "../components/dashboard/Table";

const columns = [
    { field: 'id', headerName: 'ID', width: 320 },
    { field: 'userId', headerName: 'User ID', width: 320 },
    { field: 'title', headerName: 'Title', width: 320 },
];

const AlbumsPage = () => {
    const [searchParams] = useSearchParams();
    const { data, error, isLoading } = useGetAlbums();

    return (
        <Card
            title={"Albums"}
            subheader={"All the albums fetched from API"}
            isLoading={isLoading}
            error={error}
        >
        <Table
            className="h-5/6"
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
                filter: {
                    filterModel: {
                        items: [{ field: 'userId', operator: 'equals', value: searchParams.get('userId') ?? '' }],
                    },
                },
            }}
            pageSizeOptions={[5, 10, 15]}
        />
        </Card>
    );
}

export default AlbumsPage;
