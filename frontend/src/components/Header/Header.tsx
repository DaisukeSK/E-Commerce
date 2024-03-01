// import { useContext } from 'react'
// import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
// import LoginSVG from './svg/LoginSVG'
import Login2SVG from './svg/Login2SVG'
import Home from './svg/Home'

function Header(){

// const { setLoaded }= useContext(AppContext)

    return (
        <header>
            
            <div className="logo"><Link to={'/'}><Home/><span>Homepage</span></Link></div>

            {
            localStorage.getItem('id')?
            <HeaderMenu/>:
            <Link className='headerAnchor signIn' to={'/signIn'}><Login2SVG/><span>Sign In</span></Link>
            }
            
        </header>
    )
}

export default Header