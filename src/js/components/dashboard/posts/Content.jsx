import React from "react";
import _ from "lodash";
import Card from "../common/Card";
import { useGetPosts } from "../../../hooks/api/posts";
import PostsGrid from "./Grid";

const PostsContent = () => {
    const { postRecords, error, isLoading } = useGetPosts();

    return (
        <Card
            title={"Posts"}
            subheader={"Explore All Posts Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <PostsGrid
                posts={postRecords}
            />
        </Card>
    );
};

export default PostsContent;
