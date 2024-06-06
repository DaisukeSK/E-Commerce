import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext, getShoppingCart } from '../App'
import axios from 'axios'
import logo from '../../public/logo.svg'

type newAccountType={ name:string, password1:string, password2:string }
type signInType={ name:string, password:string }

export const sha256 = async(password:string)=>{

    const p:Array<string> = password.split('')

    p.splice(p.length-1, 0, p[0])
    p.splice(p.length-3, 0, p[1])

    p.splice(1, 0, p[p.length-1])
    p.splice(3, 0, p[p.length-3])
    
    const merged:string = p.join('')

    const uint8:Uint8Array  = new TextEncoder().encode(merged)
    const digest:ArrayBuffer = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
}

export const escapeSpecilChars=(string:string | undefined):string | undefined=>{

    let str=string;
    // .replaceAll() method is not available somehow.
    while(str!.includes('<')||str!.includes('>')||str!.includes('&')||str!.includes('"')||str!.includes("'")){
        str=str!.replace('<','*lt')
        .replace('>','*gt')
        .replace('&','*amp')
        .replace('"','*quot')
        .replace("'",'*apos')
    }
    return str;
}

export const decode=(string:string):string=>{

    let str=string;
    // .replaceAll method is not available somehow.
    while(str.includes('*lt')||str.includes('*gt')||str.includes('*amp')||str.includes('*quot')||str.includes('*apos')){
        str=str.replace('*lt','<')
        .replace('*gt','>')
        .replace('*amp','&')
        .replace('*quot','"')
        .replace('*apos',"'")
    }
    return str;
}

function SignIn(){

    const { setShoppingCartQ, backendURL } =useContext(AppContext)
    const [ newAccountInfo, setNewAccountInfo ] =useState<newAccountType>({name:'',password1:'',password2:''})
    const [ signInInfo, setSignInInfo ] =useState<signInType>({name:'',password:''})
    const [ loginFailed, setLoginFailed ] =useState<boolean>(false)
    const [ signUpFailed, setSignUpFailed ] =useState<string>('')
    const [ signIn, setSignIn ] =useState<boolean>(true)
    
    const navigate = useNavigate();

    const onchangeSignIn=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        e.target.type=='text'?
        setSignInInfo({...signInInfo,name:e.target.value}):
        setSignInInfo({...signInInfo,password:e.target.value})
    }

    const onchangeSignUp=(e:React.ChangeEvent<HTMLInputElement>):void=>{

        switch(e.target.className){
            case 'name':
                setNewAccountInfo({...newAccountInfo,name:e.target.value});
                break;
            case 'p1':
                setNewAccountInfo({...newAccountInfo,password1:e.target.value});
                break;
            case 'p2':
                setNewAccountInfo({...newAccountInfo,password2:e.target.value});
                break;
            default: return;
        }
    }

    const redirectToHomepage=(res:any):void=>{

        if(res.data[0].user_id && res.request.status==200){
            localStorage.setItem('id',res.data[0].user_id);
            localStorage.setItem('user',decode(res.data[0].user_name));
            getShoppingCart(res.data[0].user_id,setShoppingCartQ)
            navigate("/")
            window.location.reload()
        }
    }

    const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(signInInfo.name!){
            sha256(signInInfo.password)
            .then((hash:string)=>{

                axios.post(`${backendURL}/user/signin`,{name:escapeSpecilChars(signInInfo.name), password:hash})
                .then((res:any)=>{
                    res.data=='no match' && (setLoginFailed(true))
                    redirectToHomepage(res)
                })

            })
        }else{

            switch(true){
                case newAccountInfo.password1!==newAccountInfo.password2:
                    setSignUpFailed('Passwords do not match.');
                    break;

                case newAccountInfo.password1.length<6:
                    setSignUpFailed('At least 6 characters required.');
                    break;

                case newAccountInfo.name.includes('*'):
                    setSignUpFailed('Special character * cannot be used.');
                    break;

                default:
                    sha256(newAccountInfo.password1)
                    .then((hash:string)=>{

                        axios.post(`${backendURL}/user/createAccount`,{name:escapeSpecilChars(newAccountInfo.name), password:hash})
                        .then((res:any)=>{
                            if(res.data=='exist'){
                                setSignUpFailed('That user name is already taken.');
                            }else if(res.request.status==200){
                                redirectToHomepage(res)
                            }
                        })
                        
                    })
            }
        }
    }

    const toggle=(boolean:boolean)=>{
        setSignIn(boolean)
        setNewAccountInfo({name:'',password1:'',password2:''})
        setSignInInfo({name:'',password:''})
        setLoginFailed(false)
        setSignUpFailed('')
    }

    return (
        <main className='signInMain'>
            <img src={logo} width='30%'/>
            {signIn?
                <>
                    <div className='signInDiv'>
                        <h1>Sign In</h1>
                        <form onSubmit={(e)=>submitHandler(e)}>
                            <div className='alert'>{loginFailed?'You entered incorrect information.':''}</div>
                            <input type='text' placeholder='User Name' required onChange={(e)=>onchangeSignIn(e)}/>
                            <input type='password' placeholder='Password' required onChange={(e)=>onchangeSignIn(e)}/>
                            <input className='redButton' type='submit' value='Sign In'/>
                        </form>
                    </div>
                    <div className='alert'>Don't have an account yet? <span onClick={()=>toggle(false)}>Sign Up.</span></div>
                </>
                :
                <>
                    <div className='signUpDiv'>
                        <h1>Sign Up</h1>
                        <form onSubmit={(e)=>submitHandler(e)}>
                            <div className='alert'>{signUpFailed}</div>
                            <input className='name' type='input' placeholder='User Name' required onChange={(e)=>onchangeSignUp(e)}/>
                            <input className='p1' type='password' placeholder='Password' required onChange={(e)=>onchangeSignUp(e)}/>
                            <input className='p2' type='password' placeholder='Password (Confirm)' required onChange={(e)=>onchangeSignUp(e)}/>
                            <input className='redButton' type='submit' value='Sign Up'/>
                        </form>
                    </div>
                    <div className='alert'>Already have an account? <span onClick={()=>toggle(true)}>Sign In.</span></div>
                </>
            }
        </main>
    )
}

export default SignIn