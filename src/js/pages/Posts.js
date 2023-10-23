import React from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
    const params = useParams();
    console.log(params, 'params Albums');

    return (
        <article>
            This is Posts
        </article>
    );
}

export default Posts;
