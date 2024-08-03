import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, categoriesType } from '../App'
import { StyledAside } from './StyledComponents'

function Aside(){

    const { categories } =useContext(AppContext)

    const loc=useLocation()

    return loc.pathname.split('/')[1]!=='signIn' && (
        <StyledAside>

            <ul>
                {categories.map((category:categoriesType,key:number)=>{
                    return (
                        <li key={key}>
                            <Link to={`/category/${category.category_id}`}>{category.category_name}</Link>
                        </li>
                        )
                })}
            </ul>

        </StyledAside>
    )
}

export default Aside