import React from "react";
import { LinkCell } from "./components/dashboard/Table";
import { getGridStringOperators } from "@mui/x-data-grid";

const userTableColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70,
        sortable: true,
        filterable: true
},
    {
        field: 'username',
        headerName: 'Username',
        width: 150,
        sortable: true,
        filterable: false
},
    {
        field: 'name',
        headerName: 'Full Name',
        width: 150,
        sortable: false,
        filterable: false
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 180,
        sortable: false,
        filterable: false
    },
    {
        field: 'website',
        headerName: 'Website',
        width: 120,
        sortable: false,
        filterable: false
    },
    {
        field: 'city',
        headerName: 'City',
        width: 120,
        sortable: false,
        filterable: false,
        valueGetter: (params) => {
            return params.row.address.city;
        }
    },
    {
        field: 'company',
        headerName: 'Company',
        width: 120,
        sortable: false,
        filterable: false,
        valueGetter: (params) => {
            return params.row.company.name;
        }
    },
    {
        field: 'posts',
        headerName: 'Posts',
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: params => <LinkCell to={`/posts?userId=${params.id}`}/>
    },
    {
        field: 'albums',
        headerName: 'Albums',
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: params => <LinkCell to={`/albums?userId=${params.id}`}/>
    }
];

const postsDataColumns = [
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

const albumsTableColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 320,
        sortable: true,
        filterable: true,
        filterOperators: getGridStringOperators()
            .filter(operator => operator.value === 'equals')
            .map(operator => ({ ...operator }))
    },
    {
        field: 'userId',
        headerName: 'User ID',
        width: 320,
        sortable: true,
        filterable: true,
        filterOperators: getGridStringOperators()
            .filter(operator => operator.value === 'equals')
            .map(operator => ({ ...operator }))
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 320,
        sortable: false,
        filterable: false
    },
];

export { userTableColumns, postsDataColumns, albumsTableColumns };

