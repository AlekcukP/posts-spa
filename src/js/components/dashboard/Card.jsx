import React from "react";
import MuiCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Spinner from "../Spinner";
import Modal from "./Modal";

const Card = ({ title, subheader, isLoading, error, children }) => {
    if (isLoading) return <Spinner />;

    return (
        <MuiCard className="h-full">
            <CardHeader
                title={title}
                subheader={subheader}
                className="py-3"
            />

            <CardContent className="h-full py-2">
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
