import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Setting(){

    const navigate=useNavigate()

    const [passwordAlert, setPasswordAlert]=useState<string>()
    const [userNameAlert, setUserNameAlert]=useState<string>()

    const userName=useRef<HTMLInputElement>(null)
    const password1=useRef<HTMLInputElement>(null)
    const password2=useRef<HTMLInputElement>(null)

    const changeUserName=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/user/changeUserName', {userId:localStorage.getItem('id'), newName:userName.current!.value})
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

    const changePassword=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/user/changePassword',{userId:localStorage.getItem('id'), currentPassword:password1.current!.value, newPassword:password2.current!.value})
        .then((res:any)=>{
            
            if(res.data=='no match'){
                setPasswordAlert('Current password is not right.')
            }else{
                alert('Password changed.')
                window.location.reload();
            }
        })
    }

    const deleteAccount=()=>{
        if(confirm('Are you sure that you want to delete account?')){
            axios.post('http://localhost:8080/user/deleteAccount',{userId:localStorage.getItem('id')})
            .then(()=>{
                localStorage.clear();
                alert('See you around.')
                navigate('/')
                window.location.reload();
            })
        }
    }

    return (
        <main className="settingMain">

            <form onSubmit={(e)=>changeUserName(e)}>
                <h2>Change User Name</h2>
                <div className="alertDiv">{userNameAlert}</div>
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

            <form onSubmit={deleteAccount}>
                <h2>Delete Account</h2>
                {/* <button>Delete Account</button> */}
                <input className='redButton' type='submit' value='Delete Account'/>
            </form>


        </main>
    )
}

export default Setting