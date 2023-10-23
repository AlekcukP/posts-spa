import React from "react";
import { useParams } from "react-router-dom";

const Albums = () => {
    const params = useParams();
    console.log(params, 'params Albums');

    return (
        <article>
            This is Albums
        </article>
    );
}

export default Albums;
