import React, { createContext } from "react";
import _ from "lodash";
import Card from "../common/Card";
import Stack from "./Stack";
import { useGetPosts } from "../../../hooks/api/posts";
import { usePostsPagination } from "../../../hooks/components/posts/usePostsPagination";
import { usePostsSortMenu } from "../../../hooks/components/posts/usePostsSortMenu";
import { usePostsFilterMenu } from "../../../hooks/components/posts/usePostsFilterMenu";
import { useSortPosts } from "../../../hooks/components/posts/useSortPosts";
import { useFilterPosts } from "../../../hooks/components/posts/useFilterPosts";
import { sortRecords } from "./controls/utils/sortRecords";
import { filterRecords } from "./controls/utils/filterRecords";

const PostsContext = createContext(null);

const PostsContent = () => {
    const contextValues = {
        getPosts: useGetPosts(),
        sortPosts: useSortPosts(),
        filterPosts: useFilterPosts(),
        postsPagination: usePostsPagination(),
        postsSortMenu: usePostsSortMenu(),
        postsFilterMenu: usePostsFilterMenu()
    }

    const {
        getPosts: { postRecords, error, isLoading },
        sortPosts: { postsSortField, postsSortOrder },
        filterPosts: { postsFilterColumn, postsFilterOperator, postsFilterValue },
        postsPagination: { postRecordsPerPage, postPage }
    } = contextValues;

    const sortedPostRecords = sortRecords(postRecords, postsSortField, postsSortOrder);

    const filteredPostRecords = filterRecords(
        sortedPostRecords,
        postsFilterColumn,
        postsFilterOperator,
        postsFilterValue
    );

    const postsGroup = _.chunk(filteredPostRecords, postRecordsPerPage);

    return (
        <Card
            title={"Posts"}
            subheader={"Explore All Posts Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <PostsContext.Provider value={{ ...contextValues, postsCount: filteredPostRecords.length}}>
                <Stack posts={postsGroup.at(postPage)} />
            </PostsContext.Provider>
        </Card>
    );
};

export { PostsContext };
export default PostsContent;
