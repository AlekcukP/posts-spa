import React, { useState } from "react";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import { useGetPosts } from "../hooks/posts";
import Card from "../components/dashboard/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import TablePagination from "@mui/material/TablePagination";
import EmptyDataOverlay from "../components/dashboard/EmptyDataOverlay";

const PostsStack = ({ rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const posts = _.map(
        rows,
        post => <Post title={post.title} content={post.body} number={post.id} key={`post_${post.id}`} />
    );

    const postsChunk = _.chunk(posts, rowsPerPage);

    if (_.isEmpty(rows)) {
        return <EmptyDataOverlay message="No Posts Found" />
    }

    return (
        <Box className="flex flex-col max-h-[38rem] border-[1px] border-gray-300 border-solid rounded items-center">
            <Box className="py-1 px-2 self-start">
                <Button variant="text" size="small" startIcon={<FilterAltIcon />}>Filter</Button>
                <Button variant="text" size="small" startIcon={<SortIcon />}>Sort</Button>
            </Box>

            <Stack direction="row" useFlexGap flexWrap="wrap" className="justify-evenly overflow-auto grow">
                { postsChunk.at(page)}
            </Stack>

            <Divider variant="fullWidth" flexItem />

            <TablePagination
                component="div"
                count={posts.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="flex items-center self-end min-h-[53px]"
            />
        </Box>
    );
}

const Post = ({ title, content, number, ...props }) => {
    return (
        <Paper className="m-2 px-2 py-1 flex flex-col max-w-[520px] min-h-32 justify-between" elevation={3} {...props}>
            <Typography className="text-center" variant="h6">{ title }</Typography>
            <Typography variant="body2">{ content }</Typography>
            <Typography className="self-center" variant="caption" display="block" gutterBottom>{ number }</Typography>
        </Paper>
    );
}

const PostsPage = () => {
    const [searchParams] = useSearchParams();
    const { data, error, isLoading } = useGetPosts();

    return (
        <Card
            title={"Posts"}
            subheader={"All the posts fetched from API"}
            isLoading={isLoading}
            error={error}
        >
            <PostsStack
                rows={data}
                initialState={{
                    filter: {
                        filterModel: {
                            items: [{ field: 'userId', operator: 'equals', value: searchParams.get('userId') ?? '' }],
                        },
                    },
                }}
            />
        </Card>
    );
}

export default PostsPage;
