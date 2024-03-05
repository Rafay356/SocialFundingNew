import { styled } from "@mui/system";
import React from 'react'

const Box = styled('h4')({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    widtth: "100%",
    height: "250px",
    paddingBottom: "100px"

});


export const NoQueryView = () => {
    return (
        <Box>
            Search Results
        </Box>
    )
}


