import React, { createContext, useCallback, useEffect } from "react";
import _ from "lodash";
import Card from "../components/dashboard/Card";
import PostsStack from "../components/dashboard/posts/Stack";
import { useGetPosts } from "../hooks/api/posts";
import { usePostsPagination } from "../hooks/components/posts/usePostsPagination";
import { usePostsSortMenu } from "../hooks/components/posts/usePostsSortMenu";
import { usePostsFilterMenu } from "../hooks/components/posts/usePostsFilterMenu";
import { useSortPosts } from "../hooks/components/posts/useSortPosts";
import { useFilterPosts } from "../hooks/components/posts/useFilterPosts";
import { sortRecords } from "../utils/sortRecords";
import { filterRecords } from "../utils/filterRecords";

const PostsPageContext = createContext(null);

const PostsPage = () => {
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
        filterPosts: { postsFilterColumn, postsFilterOperator, postsFilterValue, setPostsFilterValue, setPostsFilterColumn },
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
            <PostsPageContext.Provider value={{ ...contextValues, postsCount: filteredPostRecords.length}}>
                <PostsStack posts={postsGroup.at(postPage)} />
            </PostsPageContext.Provider>
        </Card>
    );
};

export { PostsPageContext };
export default PostsPage;
