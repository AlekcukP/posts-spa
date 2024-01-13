import React from "react";
import MuiCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Spinner from "./Spinner";
import Modal from "./Modal";

const Card = ({ title, subheader, isLoading, error, children }) => {
    if (isLoading) return <Spinner />;

    return (
        <MuiCard className='h-full'>
            <CardHeader
                title={title}
                subheader={subheader}
                className="py-2"
            />

            <CardContent className="py-1 h-full">
                { children }
            </CardContent>

            <Modal
                title={"Error"}
                description={error}
                open={!!error}
                type={'error'}
            />
        </MuiCard>
    );
};

export default Card;
