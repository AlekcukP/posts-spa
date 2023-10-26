import React, { useMemo, useCallback } from "react";
import _ from "lodash";
import Card from "../components/dashboard/Card";
import Table from "../components/dashboard/Table";
import { useGetUsers } from "../hooks/api/users";
import { getGridStringOperators } from "@mui/x-data-grid";
import { userTableColumns } from "../tablesConfig";
import { useSearchParams } from "react-router-dom";

const UsersPage = () => {
    const { userRecords, error, isLoading } = useGetUsers();
    const [searchParams, setSearchParams] = useSearchParams();

    const memoColumns = useMemo(
        () => userTableColumns.map((col) => {
            if (col.field !== 'id') return col;

            return {
                ...col,
                filterOperators: getGridStringOperators()
                    .filter(operator => operator.value === 'equals')
                    .map(operator => ({ ...operator }))
            };
        }), []);

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
            title={"Users List"}
            subheader={"Browse All Users Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <Table
                className="h-5/6"
                rows={userRecords}
                columns={memoColumns}
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
                            ],
                        },
                    },
                }}
            />
        </Card>
    );
};

export default UsersPage;
