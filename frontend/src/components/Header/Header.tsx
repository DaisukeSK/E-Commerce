import { useState, useContext } from 'react'
import { AppContext, categoriesType } from '../../App'
import { Link, useLocation } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import Login2SVG from './svg/Login2SVG'
import logo from '../../../public/logo2.svg'
import { AsideForMobile } from '../StyledComponents'
import hamburger from '../../../public/hamburger.svg'

function Header(){

    const { categories } =useContext(AppContext)
    const [ openAside, setOpenAside ] =useState<boolean>(false)

    const loc=useLocation()

    return (
        <header>
            
            <div className='hamburger' onClick={()=>setOpenAside(true)}><img src={hamburger}/></div>

            <Link to={'/'} className='leftLogo' style={{pointerEvents:!loc.pathname.split('/')[1]?'none':'auto'}}>
                <img src={logo}/>
            </Link>

            <AsideForMobile open={openAside}>
                <img onClick={()=>setOpenAside(false)} src={hamburger}/>
                <ul>
                    <li>
                        <Link onClick={()=>setOpenAside(false)} to={`/`}>Homepage</Link>
                    </li>
                    {categories.map((category:categoriesType,key:number)=>{
                        return (
                            <li key={key}>
                                <Link onClick={()=>setOpenAside(false)} to={`/category/${category.category_id}`}>{category.category_name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </AsideForMobile>

            {localStorage.getItem('id')?
                <HeaderMenu/>:
                <Link className='headerAnchor signIn' to={'/signIn'}><Login2SVG/><span>Sign In</span></Link>
            }
            
        </header>
    )
}

export default Header