import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import {selectCurrentToken} from "./authSlice.js";


const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    return (
        <div>
            {token
                ? <Outlet/>
                : <Navigate to="/login" state={{from: location}} replace/>
            }
        </div>
    )
}
export default RequireAuth