import React from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Post = ({ row: { title, content, id, userId }, key }) => {
    return (
        <Paper className="m-2 px-2 py-1 flex flex-col max-w-[520px] min-h-32 justify-between" elevation={3} key={key}>
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

export default Post;
