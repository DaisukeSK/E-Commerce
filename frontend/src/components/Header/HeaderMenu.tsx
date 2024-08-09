import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { Link,useNavigate } from 'react-router-dom'
import ShopCart from './ShopCart'
import FavoriteSVG from './svg/FavoriteSVG'
import Cart2SVG from './svg/Cart2SVG'
import HistorySVG from './svg/HistorySVG'
import SettingSVG from './svg/SettingSVG'
import Logout2SVG from './svg/Logout2SVG'

function HeaderMenu(){

    const { shoppingCart, favList } =useContext(AppContext)
    const [ showHeaderMenu, setShowHeaderMenu ]=useState(false)
    const navigate = useNavigate();

    const signOut=()=>{
        localStorage.clear();
        navigate("/")
        alert('See you')
        window.location.reload();
    }

    return (
        <>
            <div className='headerRight'>

                <div><b>Hello, {localStorage.getItem('user')}</b></div>

                <div className='cartSVGflex'>

                    <ShopCart/>
                    <div className='shoppingCartQ'>
                        <b>{shoppingCart.length}</b>
                    </div>

                </div>

                <svg onMouseEnter={()=>setShowHeaderMenu(true)} onMouseLeave={()=>setShowHeaderMenu(false)} className='arrowSVGforLaptop' width='16' height='8'>
                    <path d='m0,0 h16 l-8,8' fill={showHeaderMenu?'rgb(246, 166, 31)':'#ffffff'}/>
                </svg>

                <svg onClick={()=>setShowHeaderMenu(!showHeaderMenu)} className='arrowSVGforMobile' width='16' height='8'>
                    <path d='m0,0 h16 l-8,8' fill={showHeaderMenu?'rgb(246, 166, 31)':'#ffffff'}/>
                </svg>

            </div>

            {showHeaderMenu &&
            
                <ul onMouseEnter={()=>setShowHeaderMenu(true)} onMouseLeave={()=>setShowHeaderMenu(false)}>
                    <li><Link className='headerAnchor' to={'/cart'} onClick={()=>setShowHeaderMenu(false)}><Cart2SVG/><span>Shopping Cart&nbsp;{`(`}<b>{shoppingCart.length}</b>{`)`}</span></Link></li>
                    <li><Link className='headerAnchor' to={'/history'} onClick={()=>setShowHeaderMenu(false)}><HistorySVG/><span>Shopping History</span></Link></li>
                    <li><Link className='headerAnchor' to={'/favorite'} onClick={()=>setShowHeaderMenu(false)}><FavoriteSVG fillColor={'#ffffff'}/><span>Favorite&nbsp;{`(`}<b>{favList.length}</b>{`)`}</span></Link></li>
                    <li><Link className='headerAnchor' to={'/setting'} onClick={()=>setShowHeaderMenu(false)}><SettingSVG/><span>Setting</span></Link></li>
                    <li onClick={signOut}><a className='headerAnchor'><Logout2SVG/><span>Sign Out</span></a></li>
                </ul>
            }
        </>
    )
}

export default HeaderMenu