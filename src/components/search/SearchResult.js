import CircularProgress from '@mui/material/CircularProgress';
import { Gif } from '../../components/card/gif'
import { Box, Container } from "@mui/material";
import { useScrollToBottom } from "../../hooks/useScrollToBottom"



export const SearchResults = ({ data, onScrollEnd, loading }) => {
    useScrollToBottom(() => !loading && onScrollEnd())

    return <Container maxWidth="lg" style={{ minHeight: "500px" }}>
        <Box my={4} display="flex" justifyContent="center" flexWrap="wrap"  >
            {data.map(item => <Box key={item.id} m="4px"><Gif item={item} /></Box>)}

        </Box>
        <Box minHeight="50px" py={2} display="flex" justifyContent="center">
            {loading || <CircularProgress />}
        </Box>
    </Container>
}