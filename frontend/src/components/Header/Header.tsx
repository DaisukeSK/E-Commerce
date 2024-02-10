import { Link } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'

function Header(){

    return (
        <header>
            
            <div className="logo"><Link to={'/'}>Homepage</Link></div>

            { localStorage.getItem('id')? <HeaderMenu/> : <Link to={'/signIn'}>Sign In</Link> }
            
        </header>
    )
}

export default Header