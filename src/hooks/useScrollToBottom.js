import { useEffect } from "react";
import { NoQueryView } from "../components/search/NoQueryView"

export const useScrollToBottom = (onScrollEnd) => {



    useEffect(() => {

        const trackScrolling = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {

                return
            }
            onScrollEnd()


        }
        document.addEventListener('scroll', trackScrolling);
        return () => document.removeEventListener('scroll', trackScrolling);
        // eslint-disable-next-line

    }, [])

}