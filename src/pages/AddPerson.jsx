import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useState} from "react";
import {
    handleFirstNameInput,
    handleLastNameInput,
    handlePasswordInput,
    handleUserInput
} from "../features/validationForm/validation.js";
import {useSelector} from "react-redux";
import {useQueryMutation} from "../app/requests/addUserApiSlice.js";
import {Link, useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {useEditMutation} from "../app/requests/editUserApiSlice.js";


export default function AddPerson({us,pass,fName,lName,act,reUse}) {

    const savedUsers = useSelector(state => state.users.users)

    const savedId = useSelector(state => state.id.userId)

    const navigate = useNavigate();
    const [query,{isLoading}]=useQueryMutation()
    const [edit] = useEditMutation()

    const [serverError, setServerError] = useState('')


    const [user, setUser] = useState(us ||'');
    const [userError, setUserError] = useState('')

    const [firstName, setFirstName] = useState(fName||'');
    const [firstNameError, setFirstNameError] = useState('')

    const [lastName, setLastName] = useState(lName||'');
    const [lastNameError, setLastNameError] = useState('');

    const [password, setPassword] = useState(pass||'');
    const [passwordError, setPasswordError] = useState('');

    const [active, setActive] = useState(act||false);

    const handleActive = (e) => {setActive(e.target.checked)}

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!reUse){
            try {
                await query({username: user, first_name: firstName, last_name: lastName, password, is_active: active})
                    .unwrap()
                navigate('/userslist')
            } catch (err) {
                setServerError('Add failed')
            }
        }else{
            try {
                const newData = {
                    username: user,
                    first_name: firstName,
                    last_name: lastName,
                    is_active: active
                }
                if (password){
                    newData.password=password
                }

                await edit({id:savedId,credentials:newData}).unwrap()

                navigate('/userslist')

            }catch (err){
                setServerError('Edit failed')
                navigate('/userslist')
            }
        }
    }

    let checkerForBtn ;
    if(reUse){
         checkerForBtn = !!((lastNameError ||  firstNameError || userError) || (!lastName || !firstName || !user ))
    }else{
        checkerForBtn = !!((lastNameError || passwordError || firstNameError || userError) || (!lastName || !firstName || !user || !password))
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1,},marginX:'auto',maxWidth:'400px',mt:5
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Box style={{display:"flex",flexDirection:'column'}}>
                <Button sx={{justifyContent:'flex-start',alignSelf:'flex-start'}}>
                    <Link to="/userslist">
                        <ArrowBackIcon sx={{fontSize: 40}} />
                    </Link>
                </Button>
                <h1>{(reUse) ?'Edit Person':'New Person'} </h1>
                {serverError ? <Alert sx={{mt: 3, width: '100%'}} severity="error">{serverError}</Alert> : ''}
                <TextField
                    id="outlined-required"
                    label="Username"
                    defaultValue={user}
                    onChange={event => handleUserInput(event,setUser,false,setUserError,savedUsers,reUse,savedId)}
                    error={(!!userError)}
                    helperText={userError}
                />
                <TextField
                    id="outlined-required"
                    label="Frist Name"
                    defaultValue={firstName}
                    onChange={event => handleFirstNameInput(event,setFirstName,setFirstNameError)}
                    error={(!!firstNameError)}
                    helperText={firstNameError}
                />
                <TextField
                    id="outlined-required"
                    label="Last Name"
                    defaultValue={lastName}
                    onChange={event => handleLastNameInput(event,setLastName,setLastNameError)}
                    error={(!!lastNameError)}
                    helperText={lastNameError}
                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue={password}
                    onChange={event => handlePasswordInput(event,setPassword,false,setPasswordError)}
                    error={(!!passwordError)}
                    helperText={passwordError}
                />
                <FormControlLabel  control={<Checkbox checked={active} onChange={handleActive}/>}  label="Active" />
                <Button
                    disabled={checkerForBtn}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, }}
                >
                    {(reUse)?'Save':'Add Person'}
                </Button>
            </Box>

        </Box>

    );
}