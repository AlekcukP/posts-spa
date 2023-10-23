import React from "react";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();
    console.log(params, 'params Users');

    return (
        <article>
            This is User List
        </article>
    );
}

export default Users;
