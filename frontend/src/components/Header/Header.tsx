import { Link } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import Login2SVG from './svg/Login2SVG'
import logo from '../../../public/logo2.svg'

function Header(){

    return (
        <header>
            
            <Link to={'/'}>
                <img src={logo} width='80px'/>
            </Link>

            {localStorage.getItem('id')?
                <HeaderMenu/>:
                <Link className='headerAnchor signIn' to={'/signIn'}><Login2SVG/><span>Sign In</span></Link>
            }
            
        </header>
    )
}

export default Header