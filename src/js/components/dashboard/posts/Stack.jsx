import React from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import Box from "@mui/material/Box";
import MuiStack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import EmptyDataOverlay from "../EmptyDataOverlay";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import Controls from "./Controls";

const Stack = ({ posts = [] }) => {
    return (
        <Box className={classnames(
            "flex flex-col border-[1px] border-gray-300 border-solid rounded items-center",
            {
                "h-[38rem]": posts.length > 6,
                "min-h-[38rem]":  posts.length < 6
            }
        )}>
            <Controls />

            <MuiStack direction="row" useFlexGap flexWrap="wrap" className="justify-evenly overflow-auto grow">
                {
                _.isEmpty(posts) ?
                    <EmptyDataOverlay />
                    : _.map(posts, post => <PostItem
                        title={post.title}
                        content={post.body}
                        number={post.id}
                        key={`post_${post.id}`}
                    />)
                }
            </MuiStack>

            <Divider variant="fullWidth" flexItem />

            <Pagination />
        </Box>
    );
};

export default Stack;
