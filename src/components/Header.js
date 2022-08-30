import * as React from 'react';

import { styled } from "@mui/system";
const Component = styled('div')({
    backgroundColor: "white",
    boxShadow: "0 0 2px lightgrey",
    top: 0,
    position: "fixed",
    width: "100%",
    height: "100px",
    zIndex: 999
});

const Box = styled('h2')({
    height: "100%",
    width: "fit-content",
    margin: "0 10px",
    display: "flex",
    alignItems: "center",

});


export const Header = () => {
    return (

        <Component >
            <Box >
                Front-End Challenge
            </Box>
        </Component>

    )
}
