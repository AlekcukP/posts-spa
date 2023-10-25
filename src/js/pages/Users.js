import React, { useMemo } from "react";
import { useGetUsers } from "../hooks/users";
import { Link } from "react-router-dom";
import { getGridNumericOperators } from "@mui/x-data-grid";
import Card from "../components/dashboard/Card";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Table from "../components/dashboard/Table";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'name', headerName: 'Full Name', width: 150, sortable: false },
    { field: 'email', headerName: 'Email', width: 180, sortable: false },
    { field: 'website', headerName: 'Website', width: 120, sortable: false },
    {
        field: 'city',
        headerName: 'City',
        width: 120,
        sortable: false,
        valueGetter: (params) => {
            return params.row.address.city;
        }
    },
    {
        field: 'company',
        headerName: 'Company',
        width: 120,
        sortable: false,
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
    },
];

const LinkCell = ({ to }) => {
    return (
        <Link to={to}>
            <OpenInNewIcon color="primary"/>
        </Link>
    );
}

const UsersPage = () => {
    const { data, error, isLoading } = useGetUsers();

    const memoColumns = useMemo(
        () => columns.map((col) => {
            if (col.field !== 'id') {
                return col;
            }

            return {
                ...col,
                filterOperators: getGridNumericOperators().filter(
                    (operator) => operator.value === '=',
                ),
            };
        }),
        [columns],
    );

    return (
        <Card
            title={"Users List"}
            subheader={"All the users fetched from API"}
            isLoading={isLoading}
            error={error}
        >
        <Table
            className="h-5/6"
            rows={data}
            columns={memoColumns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[5, 10, 15]}
        />
        </Card>
    );
};

export default UsersPage;
