import axios from "axios"
import { debounce } from "lodash";
import { useCallback, useState, useEffect } from 'react';



const URL = `${process.env.REACT_APP_GIF_API_URL}search?api_key=${process.env.REACT_APP_GIF_SEARCH_API_KEY}`;


const useTrendingGifSearch = ({ query = "", limit = "25" }) => {

    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);

    const URL_ = `${URL}&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=en`


    const fetchGifs = useCallback(debounce(async (url) => {

        if (loading) return
        setLoading(true)
        await axios.get(url).then(res => {
            setData((data) => [...data, ...res?.data?.data])
        }).catch((e) => { console.log(e) })
        setLoading(true);
    }, 500), []);


    useEffect(() => {
        (() => {
            fetchGifs(URL_)
        })()
    }, [URL_, fetchGifs])



    useEffect(() => {
        setData([])
        setOffset(0)
    }, [query])


    const loadMore = () => setOffset((offset) => offset + limit + 1);

    return { loading, data, loadMore }
}

export default useTrendingGifSearch
