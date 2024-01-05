import React from "react";
import Card from "../common/Card";
import { useGetAlbums } from "../../../hooks/api/albums";
import AlbumsTable from "./Table";

const AlbumsContent = () => {
    const { albumRecords, error, isLoading } = useGetAlbums();

    return (
        <Card
            title={"Albums"}
            subheader={"Discover All Albums Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <AlbumsTable rows={albumRecords} />
        </Card>
    );
}

export default AlbumsContent;
