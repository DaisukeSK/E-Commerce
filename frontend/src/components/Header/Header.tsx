import { Link } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import LoginSVG from './svg/LoginSVG'
import Login2SVG from './svg/Login2SVG'

function Header(){

    return (
        <header>
            
            <div className="logo"><Link to={'/'}>Homepage</Link></div>

            {
            localStorage.getItem('id')?
            <HeaderMenu/>:
            <Link className='headerAnchor signIn' to={'/signIn'}><Login2SVG/><span>Sign In</span></Link>
            }
            
        </header>
    )
}

export default Header