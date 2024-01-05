import React from "react";
import _ from "lodash";
import Card from "../common/Card";
import UsersTable from "./Table";
import { useGetUsers } from "../../../hooks/api/users";

const UsersContent = () => {
    const { userRecords, error, isLoading } = useGetUsers();

    return (
        <Card
            title={"Users List"}
            subheader={"Browse All Users Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <UsersTable rows={userRecords} />
        </Card>
    );
};

export default UsersContent;