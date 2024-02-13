import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { Link,useNavigate } from 'react-router-dom'
import ShopCart from './ShopCart'
// import cartPath from '../../../public/shop-cart.svg'
// import historyPath from '../../../public/history.svg'
// import favoritePath from '../../../public/heart.svg'

// import settingPath from '../../../public/setting.svg'
// import logoutPath from '../../../public/logout.svg'
import FavoriteSVG from './svg/FavoriteSVG'
// import CartSVG from './svg/CartSVG'
import Cart2SVG from './svg/Cart2SVG'
import HistorySVG from './svg/HistorySVG'
import SettingSVG from './svg/SettingSVG'
// import LogoutSVG from './svg/LogoutSVG'
import Logout2SVG from './svg/Logout2SVG'


function HeaderMenu(){

    const { shoppingCartQ, favList } =useContext(AppContext)
    const [showHeaderMenu, setShowHeaderMenu]=useState(false)
    const navigate = useNavigate();

    const signOut=()=>{
        localStorage.clear();
        navigate("/")
        alert('See you')
        window.location.reload();
    }

    

    return (
        <>
            <div className='headerRightFlex'>

                <div><b>Hello, {localStorage.getItem('user')}</b></div>

                <div className='cartSVGflex'>

                    <ShopCart/>
                    <div className='shoppingCartQ'>
                        <b>{shoppingCartQ==undefined?'-':shoppingCartQ}</b>
                    </div>

                </div>

                <svg onMouseEnter={()=>setShowHeaderMenu(true)} onMouseLeave={()=>setShowHeaderMenu(false)} className='arrowSVG' width='16' height='8'>
                    <path d='m0,0 h16 l-8,8' fill='#ffffff'/>
                </svg>

            </div>

            {showHeaderMenu &&
            
                <ul onMouseEnter={()=>setShowHeaderMenu(true)} onMouseLeave={()=>setShowHeaderMenu(false)}>
                    <li><Link className='headerAnchor' to={'/cart'}><Cart2SVG/><span>Shopping Cart&nbsp;{`(`}<b>{shoppingCartQ}</b>{`)`}</span></Link></li>
                    <li><Link className='headerAnchor' to={'/history'}><HistorySVG/><span>Shopping History</span></Link></li>
                    <li><Link className='headerAnchor' to={'/favorite'}><FavoriteSVG fillColor={'none'}/><span>Favorite&nbsp;{`(`}<b>{favList.length}</b>{`)`}</span></Link></li>
                    <li><Link className='headerAnchor' to={'/setting'}><SettingSVG/><span>Setting</span></Link></li>
                    <li onClick={signOut}><a className='headerAnchor'><Logout2SVG/><span>Sign Out</span></a></li>
                </ul>
            }
        </>
    )
}

export default HeaderMenu