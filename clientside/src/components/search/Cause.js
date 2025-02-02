import React from "react";

import { Causes } from "../card";
import Box from "@mui/material/Box";

import SearchResults from "../../pages/SearchResults";

export const Cause = ({ searchResults }) => {
  return (
    <>
      {searchResults.length > 0 ? (
        <Box sx={{ padding: "16px" }}>
          <SearchResults results={searchResults} />
        </Box>
      ) : (
        <Causes />
      )}
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
