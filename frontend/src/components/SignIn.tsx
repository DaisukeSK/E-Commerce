import { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext, getShoppingCart } from '../App'

type newAccountType={ name:string, password1:string, password2:string }
type signInType={ name:string, password:string }

function SignIn(){

    const { setShoppingCartQ } =useContext(AppContext)
    const [newAccount, setNewAccount]=useState<newAccountType>({name:'',password1:'',password2:''})
    const [signIn, setSignIn]=useState<signInType>({name:'',password:''})
    const [loginFailed, setLoginFailed]=useState<boolean>(false)
    const [signUpFailed, setSignUpFailed]=useState<string>('')
    
    const navigate = useNavigate();

    const onchangeSignIn=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.target.type=='text'?
        setSignIn({...signIn,name:e.target.value}):
        setSignIn({...signIn,password:e.target.value})
    }

    const onchangeSignUp=(e:React.ChangeEvent<HTMLInputElement>)=>{

        switch(e.target.className){
            case 'name':
                setNewAccount({...newAccount,name:e.target.value});
                break;
            case 'p1':
                setNewAccount({...newAccount,password1:e.target.value});
                break;
            case 'p2':
                setNewAccount({...newAccount,password2:e.target.value});
                break;
            default: return;
        }
    }

    const redirectToHomepage=(res:any)=>{

        if(res.data[0].user_id && res.request.status==200){
            localStorage.setItem('id',res.data[0].user_id);
            localStorage.setItem('user',res.data[0].user_name);
            getShoppingCart(res.data[0].user_id,setShoppingCartQ)
            navigate("/")
            window.location.reload()
        }
    }

    const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(signIn.name!){
            axios.post('http://localhost:8080/user/signin',{name:signIn.name,password:signIn.password})
            .then((res:any)=>{
                res.data=='no match' && (setLoginFailed(true))
                redirectToHomepage(res)
            })
        }else{
            switch(true){
                case newAccount.password1!==newAccount.password2:
                    setSignUpFailed('Passwords do not match.');
                    break;

                default:
                    axios.post('http://localhost:8080/user/createAccount',{name:newAccount.name,password:newAccount.password1})
                    .then((res:any)=>{
                        if(res.data=='exist'){
                            setSignUpFailed('That user name is already taken.');
                        }else if(res.request.status==200){
                            redirectToHomepage(res)
                        }
                    })
            }
        }
    }

    return (
        <>
            <div>
                <h1>Sign In</h1>
                <div>{loginFailed?'You entered incorrect information':''}</div>
                <form onSubmit={(e)=>submitHandler(e)}>
                    <input type='text' placeholder='name' required onChange={(e)=>onchangeSignIn(e)}/>
                    <input type='password' placeholder='password' required onChange={(e)=>onchangeSignIn(e)}/>
                    <input type='submit' value='Sign In'/>
                </form>
            </div>

            <div>
                <h1>Sign Up</h1>
                <div>{signUpFailed}</div>
                <form onSubmit={(e)=>submitHandler(e)}>
                    <input className='name' type='input' placeholder='name' required onChange={(e)=>onchangeSignUp(e)}/>
                    <input className='p1' type='password' placeholder='password' required onChange={(e)=>onchangeSignUp(e)}/>
                    <input className='p2' type='password' placeholder='password' required onChange={(e)=>onchangeSignUp(e)}/>
                    <input type='submit' value='Sign Up'/>
                </form>
            </div>
            <Link to={'/'}>Go back</Link>
        </>
    )
}

export default SignIn