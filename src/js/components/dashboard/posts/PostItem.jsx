import React from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PostItem = ({ title, content, number, ...props }) => {
    return (
        <Paper className="m-2 px-2 py-1 flex flex-col max-w-[520px] min-h-32 justify-between" elevation={3} {...props}>
            <Typography className="text-center" variant="h6">{title}</Typography>
            <Typography variant="body2">{content}</Typography>
            <Typography className="self-center" variant="caption" display="block" gutterBottom>{number}</Typography>
        </Paper>
    );
};

export default PostItem;
