import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {useLoginMutation} from "../features/auth/authApiSlice.js";
import {setCredentials} from "../features/auth/authSlice.js";
import {Alert, CircularProgress} from "@mui/material";
import {handlePasswordInput, handleUserInput} from "../features/validationForm/validation.js";




const defaultTheme = createTheme();

export default function SignIn() {

    const [serverErr, setServerErr] = useState('')

    const [loginValid, setLoginValid] = useState(true);
    const [loginError, setLoginError] = useState('');

    const [passValid, setPassValid] = useState(true);
    const [passError, setPassError] = useState('');

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');


    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setServerErr('')
    }, [user, password])


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userData = await login({ username:user,password}).unwrap()
            dispatch(setCredentials({...userData,user}))

            setUser('');
            setPassword('')

            navigate('/userslist')
        }catch (err) {

            if (!err?.status) {
                setServerErr('No Server Response');
            } else if (err.status === 400) { // Error http cod correct is 401
                setServerErr('Incorrect Username or Password');
            } else {
                setServerErr('Login Failed');
            }
        }


    };

    const loadingBlock = (
        <Box sx={{ display: 'flex',width:'100%',justifyContent:'center'}}>
            <CircularProgress sx={{mt:5 }}/>
        </Box>
    )

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{height:'100vh',display:'flex'}}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent:'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {serverErr ? <Alert sx={{mt: 3, width: '100%'}} severity="error">{serverErr}</Alert> : ''}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            name="login"
                            value={user}
                            onChange={event => handleUserInput(event,setUser,setLoginValid,setLoginError,[])}
                            autoFocus
                            error={!loginValid}
                            helperText={loginError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={event => handlePasswordInput(event,setPassword,setPassValid,setPassError)}
                            value={password}
                            error={!passValid}
                            helperText={passError}
                        />

                        {isLoading ? loadingBlock : <Button
                            disabled={!(loginValid && passValid && user.length>1 && password.length>1)}
                            type="submit"
                            fullWidth
                            variant="contained"

                        >
                            Sign In
                        </Button>}

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}