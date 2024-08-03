import { useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { escapeSpecilChars, decode } from "./Functions";
import { sha256 } from './Functions'

function Setting(){

    const { backendURL } = useContext(AppContext)
    const [ passwordAlert, setPasswordAlert ]=useState<string>()
    const [ userNameAlert, setUserNameAlert ]=useState<string>()
    
    const navigate=useNavigate()

    const userName: React.RefObject<HTMLInputElement> =useRef<HTMLInputElement>(null)
    const password1: React.RefObject<HTMLInputElement> =useRef<HTMLInputElement>(null)
    const password2: React.RefObject<HTMLInputElement> =useRef<HTMLInputElement>(null)

    const changeUserName=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        switch(true){

            case localStorage.getItem('user')=='guest':
                alert('You cannot change the information since this is a shared account.')
                break;

            case userName.current!.value.includes('*'):
                setUserNameAlert('Special character * cannot be used.')
                break;

            default:
                axios.post(`${backendURL}/user/changeUserName`, {userId:localStorage.getItem('id'), newName:escapeSpecilChars(userName.current!.value)})
                .then((res:any)=>{
                    if(res.data=='exist'){
                        setUserNameAlert('That user name is already taken.')
                    }else{
                        localStorage.setItem('user',decode(res.data[0].user_name));
                        alert('User name changed.')
                        window.location.reload();
                    }
                })
        }
        
    }

    const changePassword=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        switch(true){
            case localStorage.getItem('user')=='guest':
                alert('You cannot change the information since this is a shared account.')
                break;
            
            case password2.current!.value.length<6:
                setPasswordAlert('At least 6 characters required.')
                break;
            
            default:
                Promise.all([sha256(password1.current!.value), sha256(password2.current!.value)])
                .then(data=>{

                    axios.post(`${backendURL}/user/changePassword`,{userId:localStorage.getItem('id'), currentPassword:data[0], newPassword:data[1]})
                    .then((res:any)=>{
                        if(res.data=='no match'){
                            setPasswordAlert('Current password is not right.')
                        }else{
                            alert('Password changed.')
                            window.location.reload();
                        }
                    })
                    
                })
        }
    }

    const deleteAccount=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(localStorage.getItem('user')=='guest'){
            alert('You cannot change the information since this is a shared account.')
        }else{
            if(confirm('Are you sure that you want to delete account?')){
                axios.post(`${backendURL}/user/deleteAccount`,{userId:localStorage.getItem('id')})
                .then(()=>{
                    localStorage.clear();
                    alert('See you around.')
                    navigate('/')
                    window.location.reload();
                })
            }
        }
    }

    return (
        <section className="setting">

            <form onSubmit={(e)=>changeUserName(e)}>
                <h2>Change User Name</h2>
                <div className="alertDiv">{userNameAlert}</div>
                <label>New User Name</label>
                <input type='text' ref={userName} required/>
                <input className='redButton' type='submit' value='Submit'/>
            </form>

            <form onSubmit={(e)=>changePassword(e)}>
                <h2>Change Password</h2>
                <div className="alertDiv">{passwordAlert}</div>
                <label>Current Password</label>
                <input type='password' ref={password1} required/>
                <label>New Password</label>
                <input type='password' ref={password2} required/>
                <input className='redButton' type='submit' value='Submit'/>
            </form>

            <form onSubmit={(e)=>deleteAccount(e)}>
                <h2>Delete Account</h2>
                <input className='redButton' type='submit' value='Delete Account'/>
            </form>
            
        </section>
    )
}

export default Setting