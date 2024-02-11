import { Link } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import LoginSVG from './svg/LoginSVG'

function Header(){

    return (
        <header>
            
            <div className="logo"><Link to={'/'}>Homepage</Link></div>

            {
            localStorage.getItem('id')?
            <HeaderMenu/>:
            <Link className='headerAnchor' to={'/signIn'}><LoginSVG/><span>Sign In</span></Link>
            }
            
        </header>
    )
}

export default Header