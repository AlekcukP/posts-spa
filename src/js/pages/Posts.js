import React from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
    const params = useParams();
    console.log(params, 'params Albums');

    return (
        <article className="pl-10 text-cyan-500">
            This is Postss
        </article>
    );
}

export default Posts;
