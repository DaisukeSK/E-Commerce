import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppContext, getShoppingCart } from '../App'

type newAccountType={ name:string, password1:string, password2:string }
type signInType={ name:string, password:string }

function SignIn(){

    const { setShoppingCartQ, backendURL } =useContext(AppContext)
    const [newAccountInfo, setNewAccountInfo]=useState<newAccountType>({name:'',password1:'',password2:''})
    const [signInInfo, setSignInInfo]=useState<signInType>({name:'',password:''})
    const [loginFailed, setLoginFailed]=useState<boolean>(false)
    const [signUpFailed, setSignUpFailed]=useState<string>('')
    const [signIn, setSignIn]=useState<boolean>(true)
    
    const navigate = useNavigate();

    const onchangeSignIn=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.target.type=='text'?
        setSignInInfo({...signInInfo,name:e.target.value}):
        setSignInInfo({...signInInfo,password:e.target.value})
    }

    const onchangeSignUp=(e:React.ChangeEvent<HTMLInputElement>)=>{

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

        // console.log("signInInfo",signInInfo)
        // console.log("NewAccountInfo",newAccountInfo)

        if(signInInfo.name!){
            axios.post(`${backendURL}/user/signin`,{name:signInInfo.name,password:signInInfo.password})
            .then((res:any)=>{
                res.data=='no match' && (setLoginFailed(true))
                redirectToHomepage(res)
            })
        }else{
            switch(true){
                case newAccountInfo.password1!==newAccountInfo.password2:
                    setSignUpFailed('Passwords do not match.');
                    break;

                default:
                    axios.post(`${backendURL}/user/createAccount`,{name:newAccountInfo.name,password:newAccountInfo.password1})
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

    const toggle=(boolean:boolean)=>{
        setSignIn(boolean)
        setNewAccountInfo({name:'',password1:'',password2:''})
        setSignInInfo({name:'',password:''})
        // console.log("NewAccountInfo",newAccountInfo)
        setLoginFailed(false)
        setSignUpFailed('')
    }

    return (
        <main className='signInMain'>
            {signIn &&
            <>
                <div className='signInDiv'>
                    <h1>Sign In</h1>
                    <form onSubmit={(e)=>submitHandler(e)}>
                        <div className='alert'>{loginFailed?'You entered incorrect information.':''}</div>
                        <label>User Name:</label>
                        <input type='text' required onChange={(e)=>onchangeSignIn(e)}/>
                        <label>Password:</label>
                        <input type='password' required onChange={(e)=>onchangeSignIn(e)}/>
                        <input className='redButton' type='submit' value='Sign In'/>
                    </form>
                </div>

                <div className='alert'>Don't have an account yet? <span onClick={()=>toggle(false)}>Sign Up.</span></div>
            
            </>
            }

            {!signIn &&

            <>
                <div className='signUpDiv'>
                    <h1>Sign Up</h1>
                    <form onSubmit={(e)=>submitHandler(e)}>
                        <div className='alert'>{signUpFailed}</div>
                        <label>User Name:</label>
                        <input className='name' type='input' required onChange={(e)=>onchangeSignUp(e)}/>
                        <label>Password:</label>
                        <input className='p1' type='password' required onChange={(e)=>onchangeSignUp(e)}/>
                        <label>Password {`(`}Confirm{`)`}:</label>
                        <input className='p2' type='password' required onChange={(e)=>onchangeSignUp(e)}/>
                        <input className='redButton' type='submit' value='Sign Up'/>
                    </form>
                </div>
                <div className='alert'>Already have an account? <span onClick={()=>toggle(true)}>Sign In.</span></div>
            </>
            
            
            }
            {/* <Link to={'/'}>Go back</Link> */}
        </main>
    )
}

export default SignIn