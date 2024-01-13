import React from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PostItem = ({ row: { title, content, id, userId }, className }) => {
    return (
        <Paper
            className={classnames(
                ["m-2", "px-2", "py-1", "flex", "flex-col", "min-h-20", "md:min-h-32", "justify-between"],
                className
            )}
            elevation={4}
        >
            <Typography className="text-center" variant="h6">{ title }</Typography>
            <Typography variant="body2" className="mb-2">{ content }</Typography>
            <Box className='flex justify-between'>
                <Typography className="self-center" variant="caption" display="block" gutterBottom>
                    Post ID: <b>{ id }</b>
                </Typography>
                <Typography className="self-center" variant="caption" display="block" gutterBottom>
                    User ID: <b>{ userId }</b>
                </Typography>
            </Box>
        </Paper>
    );
};

export default PostItem;
