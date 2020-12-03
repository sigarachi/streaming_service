import React, {useState} from 'react'
import {useHttp} from "../hooks/http.hook";

export const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const {loading, error, request, clearError} = useHttp()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerHandler = async () => {
        try{
            console.log(email, username, password)
            const data = await request('/api/auth/register', 'POST', {email: email,  password: password, username: username})
            console.log('Data', data)
        }
        catch (e){

        }
    }

    return(
        <div className="container" style={{marginTop:"100px"}}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                       aria-describedby="basic-addon1" onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
                <input type="Password" className="form-control" placeholder="Password" aria-label="Password"
                       aria-describedby="basic-addon1" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" aria-label="email"
                       aria-describedby="basic-addon1" onChange={e => setEmail(e.target.value)}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={registerHandler}>Register</button>
        </div>
    )
}
