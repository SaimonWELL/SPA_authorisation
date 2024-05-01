import * as React from 'react';
import AddPerson from "./AddPerson.jsx";
import {useSelector} from "react-redux";

export default function EditPerson(){
    const usersArr = useSelector(state =>state.users.users)
    const needId = useSelector(state => state.id.userId)

    const {id, username,first_name,last_name,password,is_active} = usersArr.find(item => item.id===needId)



    return(
        <AddPerson us={username} fName={first_name} lName={last_name} reUse={true} pass={password} act={is_active}/>
    )
}