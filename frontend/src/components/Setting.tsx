import { useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

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

        if(localStorage.getItem('user')=='guest'){
            alert('You cannot change the information since this is a shared account.')
        }else{
            axios.post(`${backendURL}/user/changeUserName`, {userId:localStorage.getItem('id'), newName:userName.current!.value})
            .then((res:any)=>{
                if(res.data=='exist'){
                    setUserNameAlert('That user name is already taken.')
                }else{
                    localStorage.setItem('user',userName.current!.value)
                    alert('User name changed.')
                    window.location.reload();
                }
            })
        }
    }

    const changePassword=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(localStorage.getItem('user')=='guest'){
            alert('You cannot change the information since this is a shared account.')
        }else{
            axios.post(`${backendURL}/user/changePassword`,{userId:localStorage.getItem('id'), currentPassword:password1.current!.value, newPassword:password2.current!.value})
            .then((res:any)=>{
                if(res.data=='no match'){
                    setPasswordAlert('Current password is not right.')
                }else{
                    alert('Password changed.')
                    window.location.reload();
                }
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
        <main className="settingMain">

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
            
        </main>
    )
}

export default Setting