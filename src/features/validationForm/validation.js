export const handlePasswordInput = (e,setPassword,setPassValid,setPassError,reUse=false) => {
    setPassword(e.target.value)
    const currentPass = e.target.value
    if(setPassValid===false){
        setPassValid=()=>{}
    }

    if(!reUse){
        if (!/[a-z]/.test(currentPass)) {
            setPassValid(false)
            setPassError('Password must contain one lowercase letter')
        } else if (!/[A-Z]/.test(currentPass)) {
            setPassValid(false)
            setPassError('Password must contain one uppercase letter')
        } else if (!/\d/.test(currentPass)) {
            setPassValid(false)
            setPassError('Password must contain digits')
        } else if (!(currentPass.length >= 8 && currentPass.length <= 20)) {
            setPassValid(false)
            setPassError('Password must be between 8 and 20 characters')
        } else {
            setPassValid(true)
            setPassError('')
        }
    }
}

export const handleUserInput = (e,setUser,setLoginValid,setLoginError,users,reUse=false,saveId) => {
    setUser(e.target.value);
    let item
    let arr = []
    if(setLoginValid===false){
        setLoginValid=()=>{}
    }
    if(users.length>0){
        arr = users.map(({username}) => username)
    }
    if(!reUse){
        saveId=false
        item=''
    }else{
         item = users.find(item => item.id===saveId)
    }

    const currentLog = e.target.value
    const loginRegex = /^[a-zA-Z][a-zA-Z0-9_.@-]+$/;
    if(!loginRegex.test(currentLog)) {
        setLoginValid(false)
        setLoginError('Login can only start with a letter.')
    }else if(!loginRegex.test(currentLog)){
        setLoginValid(false)
        setLoginError('Login can only contain the letters digits and the characters "-" or "_".')
    }else if(arr.includes(currentLog) && item.username!== currentLog){
            setLoginError('This username already exists')
    }else if(currentLog.length>25){
        setLoginValid(false)
        setLoginError('Login can only be 25 characters long.')
    }else if(currentLog.length<3){
        setLoginValid(false);
        setLoginError('Login must be more than 3 characters long.');
    } else{
        setLoginValid(true)
        setLoginError('')
    }
}

export const handleFirstNameInput=(e,setFirstName,setFirstNameError)=>{
    setFirstName(e.target.value)
    const currentFirstName = e.target.value
    const firstNameRegex = /^[a-zA-Z\s]+$/

    if(!firstNameRegex.test(currentFirstName)) {
        setFirstNameError('A first name can only consist of English letters ')
    }else if(currentFirstName.length<3){
        setFirstNameError('The first name must contain at least 3 letters  ')
    }else{
        setFirstNameError('')
    }
}

export const handleLastNameInput=(e,setLastName,setLastNameError)=>{
    setLastName(e.target.value)
    const currentLastName = e.target.value
    const lastNameRegex = /^[a-zA-Z\s]+$/

    if(!lastNameRegex.test(currentLastName)) {
        setLastNameError('A last name can only consist of English letters ')
    }else if(currentLastName.length<3){
        setLastNameError('The last name must contain at least 3 letters  ')
    }else{
        setLastNameError('')
    }
}