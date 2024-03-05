import React from 'react';
import { LazyLoadWrapper } from "../LazyLoadWrapper"
import { styled } from "@mui/material"

export const GifCardDimension = { height: "320px", width: "280px" };

const GifCardStyle = styled('div')({
    position: "relative",
    display: "flex",
    borderRadius: "4px",
    boxShadow: "0 0 2px lightgrey",
    ...GifCardDimension
})





export const Gif = ({ item }) => {
    return (
        <GifCardStyle>
            <LazyLoadWrapper>
                {({ onLoad }) => <img onLoad={onLoad} height="100%" width="100%" src={item?.images?.fixed_height_small?.webp} alt="loading..." />}
            </LazyLoadWrapper>
        </GifCardStyle>
    )
}


