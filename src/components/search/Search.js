import React, { useState } from 'react'
import { NoQueryView } from './NoQueryView'
import { SearchHeader } from '../search/serachHeader/SearchHeader'
import { SearchResults } from "./SearchResult"
import useTrendingGifSearch from "../../hooks/useTrendingGifSearch"


export const Search = () => {
    const [text, setText] = useState('');
    const [order, setOrder] = useState('ASC');
    const { loading, data, loadMore } = useTrendingGifSearch({ query: text });
    return (
        <>

            <SearchHeader setText={setText} text={text} order={order} setOrder={setOrder} />
            {!data.length && <NoQueryView />}
            <SearchResults onScrollEnd={loadMore} loading={loading} data={data} />
        </>
    )
}

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



