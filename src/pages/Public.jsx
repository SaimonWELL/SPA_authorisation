import { Link } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Public = () => {

    const content = (
        <Container maxWidth="sm">
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} >

                <Typography component="h1" variant="h3">
                    Тестовое задание
                </Typography>

                <Link to="/login" style={{width:'100%'}}><Button
                    fullWidth
                    variant="contained"
                    sx={{mt:5}}
                >Log in</Button></Link>



            </Box>
        </Container>

    )
    return content
}
export default Public