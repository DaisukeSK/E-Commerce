import { Link, useLocation } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import Login2SVG from './svg/Login2SVG'
import logo from '../../../public/logo2.svg'

function Header(){

    const loc=useLocation()

    return (
        <header>
            
            <Link to={'/'} style={{pointerEvents:!loc.pathname.split('/')[1]?'none':'auto'}}>
                <img className='leftLogo' src={logo}/>
            </Link>

            {localStorage.getItem('id')?
                <HeaderMenu/>:
                <Link className='headerAnchor signIn' to={'/signIn'}><Login2SVG/><span>Sign In</span></Link>
            }
            
        </header>
    )
}

export default Header