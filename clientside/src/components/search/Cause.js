import React, { useState } from "react";
import { styled } from "@mui/system";
// import { NoQueryView } from "./NoQueryView";
// import { SearchHeader } from "./serachHeader/SearchHeader";
// import { SearchResults } from "./SearchResult";
import useTrendingGifSearch from "../../hooks/useTrendingGifSearch";
import { Causes } from "../card";

const Box = styled("div")({
  // marginTop: "50px",
});
// import Model from "../Model";
export const Cause = () => {
  //   const [text, setText] = useState("");
  //   const [order, setOrder] = useState("ASC");
  //   const { loading, data, loadMore } = useTrendingGifSearch({ query: text });
  return (
    <>
      {/* <SearchHeader
        setText={setText}
        text={text}
        order={order}
        setOrder={setOrder}
      /> */}

      <Causes />

      {/* {!data.length && <NoQueryView />} */}
      {/* <SearchResults onScrollEnd={loadMore} loading={loading} data={data} /> */}
    </>
  );
};

// import { useState } from "react";
// import { SearchHeader } from "./SearchHeader";
// import { SearchResults } from "./SearchResults";
// import { useTrendingGifSearch } from "~/hooks";
// import { NoQueryView } from "./NoQueryView";
// export const Search = () => {
//     const [text, setText] = useState("");
//     const [order, setOrder] = useState("ASC");
//     const { loading, data, loadMore } = useTrendingGifSearch({ query: "text" });
//     return (
//         <>
//             <SearchHeader
//                 setText={setText}
//                 text={text}
//                 order={order}
//                 setOrder={setOrder}
//             />
//             {!data.length && <NoQueryView />}
//             <SearchResults onScrollEnd={loadMore} loading={loading} data={data} />
//         </>
//     );
// };
