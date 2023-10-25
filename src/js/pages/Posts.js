import React, { useState } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useGetPosts } from "../hooks/posts";
import Card from "../components/dashboard/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const Post = ({ title, content, ...props }) => {
    return (
        <Paper className="mt-2 px-2 py-1 flex flex-col max-w-[520px] h-32" elevation={3} {...props}>
            <Typography className="text-center" variant="h6">{ title }</Typography>
            <Typography variant="body2">{ content }</Typography>
        </Paper>
    );
}

const PostsPage = () => {
    const [page, setPage] = useState(1);
    const params = useParams();
    console.log(params, 'params Albums');

    const { data, error, isLoading } = useGetPosts();

    const posts = _.map(
        data,
        post => <Post title={post.title} content={post.body} key={`post_${post.id}`} />
    );

    const postsChunk = _.chunk(posts, 6);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Card
            title={"Posts"}
            subheader={"All the posts fetched from API"}
            isLoading={isLoading}
            error={error}
        >
            <Box className="flex flex-col justify-between h-5/6 border-[1px] border-gray-300 border-solid rounded items-center">
                <Stack direction="row" useFlexGap flexWrap="wrap" className="justify-evenly">
                    { postsChunk.at(page)}
                </Stack>

                <Box className="flex justify-center w-full py-3 border-[1px] border-b-0 border-x-0 border-inherit border-solid">
                    {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                    <Pagination
                        onChange={handleChange}
                        count={postsChunk.length}
                        page={page}
                        variant="outlined"
                        color="primary"
                        shape="rounded"
                        size="small"
                    />
                </Box>
            </Box>
        </Card>
    );
}

export default PostsPage;
