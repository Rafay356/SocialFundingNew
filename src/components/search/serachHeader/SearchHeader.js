import Box from '@mui/material/Box'
import Container from "@mui/material/Container"
import Input from "@mui/material/Input"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import SearchIcon from '@mui/icons-material/Search';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';

export const SearchHeader = ({ text, setText }) => {

    return <Container maxWidth="lg">
        <Box p="40px 8px" display="flex" flexDirection="column" alignItems="center">
            <Box m="16px 0 40px" component="h3" lineHeight="1.5">Trending GiFs</Box>

            <Input
                disableUnderline
                fullWidth
                value={text}
                onChange={({ target: { value } }) => setText(value)}
                placeholder="search"
                style={{ borderRadius: '4px', padding: "2px 5px", border: "1px solid lightgray" }}
                startAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="search"
                            onMouseDown={() => undefined}
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                } />
            <Box my={2} display="flex" alignItems="center">

            </Box>
        </Box>

    </Container >
}