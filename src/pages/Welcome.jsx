import {useSelector} from "react-redux";
import {selectCurrentToken, selectCurrentUser} from "../features/auth/authSlice.js";
import {Link} from "react-router-dom";

const Welcome = () =>{
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}` : 'Welcome!'
    const tokenAbbr = `${token.slice(0,9)}...`

    const content = (
        <section>
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Users List</Link></p>
        </section>
    )
    return content
}

export default Welcome