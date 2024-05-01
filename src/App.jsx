import React, { useState } from 'react'
import './App.css'
import SignIn from "./pages/SignIn.jsx";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Public from "./pages/Public.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import Welcome from "./pages/Welcome.jsx";
import UsersList from "./components/UsersList.jsx";
import AddPerson from "./pages/AddPerson.jsx";
import EditPerson from "./pages/EditPerson.jsx";


function App() {
    return(
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*public routes*/}
                <Route index element={<Public/>} />
                <Route path='login' element={<SignIn/>} />

                {/* private routes*/}
                <Route element={<RequireAuth />}>
                    <Route path='userslist' element={<UsersList />} />
                    <Route path='add' element={<AddPerson />} />
                    <Route path='edit' element={<EditPerson />} />

                </Route>
            </Route>
        </Routes>
    )
}

export default App
