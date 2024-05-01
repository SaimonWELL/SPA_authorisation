import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import {CircularProgress, SvgIcon} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import Button from "@mui/material/Button";

import TextField from '@mui/material/TextField';


import { useGetUsersQuery } from "../app/requests/usersApiSlice.js"

import {useDispatch, useSelector} from "react-redux";
import {addUsers} from "../app/users/usersSlice.js";
import {useDeleteMutation} from "../app/requests/deleteUserApiSlice.js";

import {addId} from "../app/users/userIdSlice.js";
import Container from "@mui/material/Container";


const UsersList = () => {

    let {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetUsersQuery()

    const [del] = useDeleteMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const [searchValue, setSearchValue] = useState('');
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if(!loading){
            const prepareArr = users.map(({id, username,first_name,last_name,password,is_active}) => {
                return {id, username,first_name,last_name,password,is_active}
            })

            dispatch(addUsers(prepareArr))
        }

    }, [isSuccess, users, dispatch]);
    useEffect(() => {
        dispatch(addId(id))
    }, [id]);


    let renderUsers = users
    if (!isLoading){
        renderUsers = users.filter((item)=>{
            return item.username.toLowerCase().includes(searchValue.toLowerCase())}
        )
        if(loading){
            setLoading(false)
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };
    const handleActiveId = (e) => {
        if(e.length === 0){
            setId(0);
        }else{
            setId(e[0])
        }
    }
    const deleteUser = async () => {
        if(id){
            try{
                await del(id)
                setId(0)
                refetch();
                navigate('/userslist')
            }catch (err){
                console.log(err)
            }
        }
    }
    const refresh = () =>{
        refetch()
        console.log(users)
    }


    const columns = [
        { field: 'id', headerName: 'ID'},
        { field: 'first_name', headerName: 'First name'},
        { field: 'last_name', headerName: 'Last name'},
        {
            field: 'username',
            headerName: 'Username',
            sortable: false,
        },
    ];
    let content;
    const loadingBlock = (
        <Box sx={{ display: 'flex',width:'100%',justifyContent:'center'}}>
            <CircularProgress sx={{mt:5 }}/>
        </Box>
    )


    if (isLoading) {
        content = loadingBlock
    } else if (isSuccess) {
        content = (

                <Container maxWidth="sm" style={{ height:'100%'}}>
                    <Box style={{display: 'flex',justifyContent:'space-between'}}>

                        <Box>
                            <Button sx={{pt:1.5}}>
                                <Link to="/add"><AddBoxOutlinedIcon sx={{fontSize: 40}} color="primary"/></Link>
                            </Button>

                            <Button onClick={refresh}>
                                <AutorenewIcon sx={{fontSize: 40}} />
                            </Button>
                        </Box>

                        <Box>
                            <Button disabled={(id === 0)}>
                                <Link to="/edit">
                                    <EditIcon sx={{fontSize: 40, color: (id ===0) ? 'gray': 'green'}} />
                                </Link>
                            </Button>

                            <Button
                                sx={{ p:0 }}
                                onClick={deleteUser}
                                disabled={(id === 0)}
                            >
                                <DeleteIcon sx={{fontSize: 40, color:  (id ===0) ? 'gray': 'red'}} />
                            </Button></Box>


                    </Box>
                    <h1>Users List </h1>

                    <TextField id="standard-basic" label="Search username" variant="standard" sx={{mb: 5, width: '40%'}}
                               onChange={onChangeSearchInput}/>
                    <DataGrid
                        sx={{minHeight:"300px"}}
                        rows={renderUsers}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 5},
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        onRowSelectionModelChange={handleActiveId}
                        checkboxSelection={true}
                        disableMultipleRowSelection={true}
                    />
                </Container>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default UsersList